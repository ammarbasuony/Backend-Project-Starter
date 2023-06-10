import api from '.'

export const login = async (email: string, password: string) => {
  try {
    const response = await api().post(`/auth/login`, {email, password})
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

export const register = async (email: string, name: string, password: string) => {
  try {
    const response = await api().post(`/auth/register`, {email, name, password})
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}
