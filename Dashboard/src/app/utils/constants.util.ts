import Cookies from 'js-cookie'

// Properties
import properties from '../properties.json'

export const UserToken = Cookies.get(properties.AUTH_COOKIE_NAME)
export const excludeColumns = ['updatedAt', 'name', 'id', 'password']
export const Roles = {
  ALLOW_POSTS_VIEW: 'allow_posts_view',
  ALLOW_POSTS_OPERATION: 'allow_posts_operations',
  ALLOW_USERS_VIEW: 'allow_users_view',
  ALLOW_USERS_OPERATION: 'allow_users_operations',
  ALLOW_ROLES_VIEW: 'allow_roles_view',
  ALLOW_ROLES_OPERATION: 'allow_roles_operations',
  ALLOW_CATEGORIES_VIEW: 'allow_categories_view',
  ALLOW_CATEGORIES_OPERATION: 'allow_categories_operations',
}
