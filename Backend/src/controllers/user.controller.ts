// Services
import GeneralCRUDService from '../services/general-crud.service.js';

// CRUD Functions
export default {
  ...GeneralCRUDService(
    'user',
    {
      role: true,
    },
    [
      {
        name: 'profilePicture',
        type: 'single',
      },
    ],
    ['password'],
  ),
};
