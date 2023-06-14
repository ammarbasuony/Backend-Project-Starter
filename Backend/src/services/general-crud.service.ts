import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

// Utils
import { responseError } from '../utils/error-handler.utils';
import { isValidEmail } from '../utils/validators.util';

// Types
import { Delegate, Model } from '../@types/general-crud.types';

// Database Instance
export const prisma = new PrismaClient();

/**
 * General CRUD Service
 * @param model - Model name
 * @param include - Include relations
 * @param hiddenAttributes - Hidden attributes
 * @param page - Page number
 * @param itemsPerPage - Items per page
 */

const GeneralCRUDService = (
  model: Model,
  include = {},
  uploadInputName = '',
  hiddenAttributes: string[] = [],
  page = 1,
  itemsPerPage = 30,
) => ({
  /**
   * (1) [GET]
   * Get all records
   */
  getAll: async (req: Request, res: Response) => {
    const queries = req.query;

    try {
      const records = await (prisma[model] as Delegate).findMany({
        ...(Object.keys(include).length && { include }),
        skip: queries.page || (page - 1) * itemsPerPage,
        take: queries.itemsPerPage || itemsPerPage,
        orderBy: [
          {
            id: 'desc',
          },
        ],
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

    // Check if one of the attributes is ending with 'Id' and force it to be a number
    for (const key in bodyData) {
      if (key.endsWith('Id')) {
        bodyData[key] = Number(bodyData[key]);
      }
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

    if (uploadInputName && req.file) {
      bodyData[uploadInputName] = req.file.path;
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

    try {
      await (prisma[model] as Delegate).delete({
        where: { id: Number(id) },
      });

      res.status(200).json({
        success: true,
        message: `${model[0].toUpperCase()}${model.slice(1)} deleted successfully`,
      });
    } catch (error: any) {
      responseError(res, error);
    }
  },
});

export default GeneralCRUDService;
