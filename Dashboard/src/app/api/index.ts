import axios from 'axios'
import Cookies from 'js-cookie'

// Properties
import properties from '../properties.json'

const api = () => {
  const UserToken = Cookies.get(properties.AUTH_COOKIE_NAME)

  return axios.create({
    baseURL: properties.API_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${UserToken}`,
    },
  })
}
export default api
