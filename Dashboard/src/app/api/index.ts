import axios from 'axios'
import cookies from 'js-cookie'

import properties from '../properties.json'

const api = () => {
  const token = cookies.get(properties.AUTH_COOKIE_NAME)

  return axios.create({
    baseURL: properties.API_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}
export default api
