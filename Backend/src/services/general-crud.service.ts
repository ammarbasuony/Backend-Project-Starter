import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

// Utils
import { responseError } from '../utils/error-handler.util.js';
import { isValidEmail } from '../utils/validators.util.js';
import { camelToWords, isBoolean, isDate } from '../utils/functions.util.js';

// Types
import { Delegate, Model } from '../models/general-crud.types.js';
import { exportExcelFile } from './export-excel.service.js';

// Database Instance
export const prisma = new PrismaClient();

/**
 * General CRUD Service
 * @param model - Model name
 * @param include - Include relations
 * @param uploadInputName - Upload input names (array of strings) e.g. [{ name: 'image', type: 'single' }}]
 * @param hiddenAttributes - Hidden attributes
 * @param currentPage - Page number
 * @param recordsPerPage - Items per page
 * @param orderBy - Order by (array of objects) e.g. [{ id: 'desc' }]
 * @returns CRUD Service Object { getAll, getOne, createOne, updateOne, deleteOne, deleteMany, exportToExcel }
 */

const GeneralCRUDService = (
  model: Model,
  include = {},
  uploadInputName: { name: string; type: 'single' | 'multiple' }[] = [],
  hiddenAttributes: string[] = [],
  currentPage = 1,
  recordsPerPage = 30,
  orderBy = [
    {
      id: 'desc',
    },
  ],
) => ({
  /**
   * (1) [GET]
   * Get all records
   */
  getAll: async (req: Request, res: Response) => {
    const { search, itemsPerPage, page, ...queries } = req.query;

    const totalRecords = await (prisma[model] as Delegate).count({});
    const totalRecordsPerPage = itemsPerPage ? Number(itemsPerPage) : recordsPerPage;
    const skippedRecords = (page ? Number(page) : currentPage) - 1;

    try {
      const records = await (prisma[model] as Delegate).findMany({
        ...(Object.keys(include).length && { include }),
        skip: skippedRecords * totalRecordsPerPage,
        take: totalRecordsPerPage,
        orderBy: orderBy,
        where: {
          AND: [
            // ======= Get records by name
            ...(search
              ? [
                  {
                    name: {
                      contains: search as string,
                    },
                  },
                ]
              : []),

            // ======= Get records by queries e.g { roleId: 1, email: 'test@mail.com' }
            ...Object.keys(queries).map((key) =>
              Number(queries[key]) &&
              !(queries[key] as string).startsWith('0') &&
              !(queries[key] as string).startsWith('+')
                ? {
                    [key]: {
                      equals: Number(queries[key]),
                    },
                  }
                : isDate(queries[key] as string)
                ? {
                    [key]: {
                      gte: new Date(queries[key] as string),
                    },
                  }
                : isBoolean(queries[key] as string)
                ? {
                    [key]: {
                      equals: queries[key] === 'true',
                    },
                  }
                : {
                    [key]: {
                      contains: queries[key] as string,
                    },
                  },
            ),
          ],
        },
      });

      // ======= Remove sensitive data from response
      if (hiddenAttributes.length) {
        (records as any).forEach((record: any) => {
          hiddenAttributes.forEach((attribute) => {
            delete record[attribute];
          });
        });
      }

      res.status(200).json({
        success: true,
        data: records,
        totalRecords,
      });
    } catch (error: any) {
      responseError(res, error);
    }
  },

  /**
   * (2) [GET]
   * Get one record
   */
  getOne: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const record = await (prisma[model] as Delegate).findUnique({
        where: { id: Number(id) },
        ...(Object.keys(include).length && { include }),
      });

      if (!record) {
        return res.status(404).json({
          success: false,
          message: `${model[0].toUpperCase()}${model.slice(1)} not found`,
        });
      }

      // ======= Remove sensitive data from response
      if (hiddenAttributes.length) {
        hiddenAttributes.forEach((attribute) => {
          delete (record as any)[attribute];
        });
      }

      res.status(200).json({
        success: true,
        data: record,
      });
    } catch (error: any) {
      responseError(res, error);
    }
  },

  /**
   * (3) [POST]
   * Create one record
   */
  createOne: async (req: Request, res: Response) => {
    const bodyData = req.body;

    if (req.file) {
      bodyData[uploadInputName[0].name] = `/${req.file.path}`;
    }

    if (req.files) {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      uploadInputName.forEach((input) => {
        if (files[input.name])
          if (input.type === 'multiple') {
            const uplodedFiles = files[input.name].map((file) => ({
              filename: file.originalname,
              path: `/${file.path}`,
            }));

            bodyData[input.name] = JSON.stringify(uplodedFiles);
          } else {
            bodyData[input.name] = `/${files[input.name]?.[0].path}`;
          }
      });
    }

    // Sanitize Data
    for (const key in bodyData) {
      if (key.endsWith('Id')) bodyData[key] = Number(bodyData[key]);
      if (Number(bodyData[key]) && !String(bodyData[key]).startsWith('0') && !String(bodyData[key]).startsWith('+'))
        bodyData[key] = Number(bodyData[key]);

      if (bodyData[key] === 'true') bodyData[key] = true;
      if (bodyData[key] === 'false') bodyData[key] = false;
    }

    // ======= Hashing sensitive data
    if (hiddenAttributes.length) {
      for (const attribute of hiddenAttributes) {
        const salt = await bcrypt.genSalt();
        bodyData[attribute] = await bcrypt.hash(bodyData[attribute], salt);
      }
    }

    // Validation
    if (bodyData.email && !isValidEmail(bodyData.email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email',
      });
    }

    try {
      const record = await (prisma[model] as Delegate).create({
        data: {
          ...bodyData,
        },
      });

      // ======= Remove sensitive data from response
      if (hiddenAttributes.length) {
        hiddenAttributes.forEach((attribute) => {
          delete (record as any)[attribute];
        });
      }

      res.status(201).json({
        success: true,
        data: record,
      });
    } catch (error: any) {
      responseError(res, error);
    }
  },

  /**
   * (4) [PUT]
   * Update one record
   */
  updateOne: async (req: Request, res: Response) => {
    const { id } = req.params;
    const bodyData = req.body;

    const fetchRecord = await (prisma[model] as Delegate).findUnique({
      where: { id: Number(id) },
    });

    // Sanitize Data
    for (const key in bodyData) {
      if (key.endsWith('Id')) bodyData[key] = Number(bodyData[key]);
      if (Number(bodyData[key]) && !String(bodyData[key]).startsWith('0') && !String(bodyData[key]).startsWith('+'))
        bodyData[key] = Number(bodyData[key]);

      if (bodyData[key] === 'true') bodyData[key] = true;
      if (bodyData[key] === 'false') bodyData[key] = false;
    }

    if (req.file) {
      bodyData[uploadInputName[0].name] = `/${req.file.path}`;
    }

    if (req.files) {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      uploadInputName.forEach(async (input) => {
        if (files[input.name])
          if (input.type === 'multiple') {
            const currentFiles = JSON.parse((fetchRecord as any)[input.name]);

            const uplodedFiles = files[input.name].map((file) => ({
              filename: file.originalname,
              path: `/${file.path}`,
            }));

            bodyData[input.name] = JSON.stringify([...currentFiles, ...uplodedFiles]);
          } else {
            bodyData[input.name] = `/${files[input.name]?.[0].path}`;
          }
      });
    }

    // ======= Hashing sensitive data
    if (hiddenAttributes.length) {
      for (const attribute of hiddenAttributes) {
        if (bodyData[attribute]) {
          const salt = await bcrypt.genSalt();
          bodyData[attribute] = await bcrypt.hash(bodyData[attribute], salt);
        }
      }
    }

    // Validation
    if (bodyData.email && !isValidEmail(bodyData.email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email',
      });
    }

    try {
      const record = await (prisma[model] as Delegate).update({
        where: { id: Number(id) },
        data: {
          ...bodyData,
        },
      });

      if (hiddenAttributes.length) {
        hiddenAttributes.forEach((attribute) => {
          delete (record as any)[attribute];
        });
      }

      res.status(200).json({
        success: true,
        data: record,
      });
    } catch (error: any) {
      responseError(res, error);
    }
  },

  /**
   * (5) [DELETE]
   * Delete one record
   */
  deleteOne: async (req: Request, res: Response) => {
    const { id } = req.params;
    const itemsIds = id.includes(',') ? id.split(',') : [id];

    try {
      await (prisma[model] as Delegate).deleteMany({
        where: {
          id: {
            in: itemsIds.map((id) => Number(id)),
          },
        },
      });

      res.status(200).json({
        success: true,
        message: `${model[0].toUpperCase()}${model.slice(1)} deleted successfully`,
      });
    } catch (error: any) {
      responseError(res, error);
    }
  },
  /**
   * (6) [Export Excel]
   * Export all records to excel file
   */
  export: async (req: Request, res: Response) => {
    try {
      const filePath = await exportExcelFile(model, hiddenAttributes);

      res.json({
        success: true,
        data: {
          success: true,
          message: `${camelToWords(model)} exported successfully}`,
          path: filePath,
        },
      });
    } catch (error: any) {
      responseError(res, error);
    }
  },
});

export default GeneralCRUDService;
