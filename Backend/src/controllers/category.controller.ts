import { PrismaClient } from '@prisma/client';

// Services
import GeneralCRUDService from '../services/general-crud.service';

export const prisma = new PrismaClient();

// CRUD Functions
export default {
  ...GeneralCRUDService('category'),
};
