import api from '.'

export const login = async (email: string, password: string) => {
  try {
    const response = await api().post(`/api/auth/login`, {email, password})
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

export const register = async (email: string, name: string, password: string) => {
  try {
    const response = await api().post(`/api/auth/register`, {email, name, password})
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

export const getUserFromToken = async () => {
  try {
    const response = await api().get(`/api/auth/get-user`)
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}
