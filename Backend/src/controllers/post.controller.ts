import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

// Services
import GeneralCRUDService from '../services/general-crud.service.js';

// Database Instance
export const prisma = new PrismaClient();

// CRUD Functions
export default {
  ...GeneralCRUDService('post', { category: true }, [
    {
      name: 'thumbnail',
      type: 'single',
    },
    {
      name: 'images',
      type: 'multiple',
    },
  ]),
};
