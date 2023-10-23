// Services
import { Request, Response } from 'express';
import GeneralCRUDService from '../services/general-crud.service.js';

// CRUD Functions
export default {
  ...GeneralCRUDService('post', { category: true }, ['thumbnail']),
  createOne: async (req: Request, res: Response) => {
    console.log(req.files);
  },
};
