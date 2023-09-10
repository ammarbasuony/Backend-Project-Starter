import fs from 'fs';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import excelJS from 'exceljs';

// Utils
import { responseError } from '../utils/error-handler.util.js';
import { isValidEmail } from '../utils/validators.util.js';
import { camelToWords, isBoolean, isDate } from '../utils/functions.util.js';

// Types
import { Delegate, Model } from '../models/general-crud.types.js';

// Database Instance
export const prisma = new PrismaClient();

/**
 * General CRUD Service
 * @param model - Model name
 * @param include - Include relations
 * @param hiddenAttributes - Hidden attributes
 * @param page - Page number
 * @param itemsPerPage - Items per page
 * @returns CRUD Service Object { getAll, getOne, createOne, updateOne, deleteOne, deleteMany, exportToExcel }
 */

const GeneralCRUDService = (
  model: Model,
  include = {},
  uploadInputName = '',
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

    if (uploadInputName && req.file) {
      bodyData[uploadInputName] = `/${req.file.path}`;
    }

    // Sanitize Data
    for (const key in bodyData) {
      if (key.endsWith('Id')) bodyData[key] = Number(bodyData[key]);
      if (Number(bodyData[key])) bodyData[key] = Number(bodyData[key]);

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

    // Sanitize Data
    for (const key in bodyData) {
      if (key.endsWith('Id')) bodyData[key] = Number(bodyData[key]);
      if (Number(bodyData[key])) bodyData[key] = Number(bodyData[key]);

      if (bodyData[key] === 'true') bodyData[key] = true;
      if (bodyData[key] === 'false') bodyData[key] = false;
    }

    if (uploadInputName && req.file) {
      bodyData[uploadInputName] = `/${req.file.path}`;
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
      const workbook = new excelJS.Workbook();
      const worksheet = workbook.addWorksheet(model);

      const path = '/uploads/sheets';

      if (!fs.existsSync(`.${path}`)) {
        fs.mkdirSync(`.${path}`, { recursive: true });
      }

      // Column for data in excel. Key must match data key
      const cols = [{ header: 'No.', key: 'no', width: 10 }];

      const records: any = await (prisma[model] as Delegate).findMany({});

      // ======= Remove sensitive data from response
      if (hiddenAttributes.length) {
        (records as any).forEach((record: any) => {
          hiddenAttributes.forEach((attribute) => {
            delete record[attribute];
          });
        });
      }

      // Add column for each key in data
      Object.keys(records[0]).forEach((key) => {
        cols.push({ header: key, key, width: 32 });
      });

      // Add data to excel
      worksheet.columns = cols;

      records.forEach((record: any, index: number) => {
        worksheet.addRow({ no: index + 1, ...record });
      });

      // Making first line in excel bold
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });

      // Save excel file
      const fileName = `${model}-${Date.now()}.xlsx`;
      const filePath = `${path}/${fileName}`;

      await workbook.xlsx.writeFile(`.${filePath}`);

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
