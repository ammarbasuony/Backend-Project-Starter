import api from '.'

export const dashboardData = async () => {
  try {
    const response = await api().get(`/api/dashboard`)
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}
