import api from '.'

const genericCrudAPI = (model: string) => ({
  getAll: async (options?: URLSearchParams) => {
    const queries = new URLSearchParams(options).toString()

    try {
      const response = await api().get(`/api/${model}?${queries}`)
      return response.data
    } catch (error: any) {
      return error.response.data
    }
  },
  getOne: async (id: number) => {
    try {
      const response = await api().get(`/api/${model}/${id}`)
      return response.data
    } catch (error: any) {
      return error.response.data
    }
  },
  createOne: async (data: any) => {
    try {
      const response = await api().post(`/api/${model}`, data)
      return response.data
    } catch (error: any) {
      return error.response.data
    }
  },
  updateOne: async (id: number, data: any) => {
    try {
      const response = await api().put(`/api/${model}/${id}`, data)
      return response.data
    } catch (error: any) {
      return error.response.data
    }
  },
  delete: async (id: number | number[]) => {
    try {
      const response = await api().delete(`/api/${model}/${Array.isArray(id) ? id.join(',') : id}`)
      return response.data
    } catch (error: any) {
      return error.response.data
    }
  },
  export: async (options?: URLSearchParams) => {
    const queries = new URLSearchParams(options).toString()

    try {
      const response = await api().get(`/api/${model}/data/export?${queries}`)
      return response.data
    } catch (error: any) {
      return error.response.data
    }
  },
})

export default genericCrudAPI
