// Services
import GeneralCRUDService from '../services/general-crud.service';

// CRUD Functions
export default {
  ...GeneralCRUDService(
    'user',
    {
      role: true,
    },
    'profilePicture',
    ['password'],
  ),
};
