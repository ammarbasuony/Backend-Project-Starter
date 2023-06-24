import Cookies from 'js-cookie'

// Properties
import properties from '../properties.json'

export const UserToken = Cookies.get(properties.AUTH_COOKIE_NAME)
export const excludeColumns = ['updatedAt', 'name', 'id', 'password']