export interface IColumn {
  name: string
  accessor: string
  attr: string
  type?: string
  mode?: string
  required?: boolean
  options?: any[]
}
