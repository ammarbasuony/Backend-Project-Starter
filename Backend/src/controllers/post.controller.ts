// Services
import { Request, Response } from 'express';
import GeneralCRUDService from '../services/general-crud.service.js';

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
