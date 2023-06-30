// Services
import GeneralCRUDService from '../services/general-crud.service';

// CRUD Functions
export default {
  ...GeneralCRUDService('post', { category: true }, 'thumbnail'),
};
