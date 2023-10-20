export interface IUser {
  id: number
  email: string
  name: string
  profilePicture: string
  roleId: number
  createdAt: string
  updatedAt: string
  role: IRole
}

export interface IRole {
  id: number
  name: string
  allow_posts_view: boolean
  allow_posts_operations: boolean
  allow_users_view: boolean
  allow_users_operations: boolean
  allow_roles_view: boolean
  allow_roles_operations: boolean
  allow_categories_view: boolean
  allow_categories_operations: boolean
  createdAt: string
  updatedAt: string
}

export interface IModuleData {
  name: string
  accessor: string
  attr: string
  mode?: string
  type: 'text' | 'image' | 'editor' | 'select' | 'date' | 'email' | 'password'
  options?: IOption[]
  required?: boolean
}

export interface IOption {
  label: string
  value: string | number | boolean
}
