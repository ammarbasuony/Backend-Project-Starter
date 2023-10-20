import {IModuleData} from '../../models/data.types'

export const columns: IModuleData[] = [
  {
    name: 'Profile Image',
    accessor: 'profilePicture',
    attr: 'profilePicture',
    type: 'image',
    mode: 'image',
    required: false,
  },
  {
    name: 'Name',
    accessor: 'name',
    attr: 'name',
    type: 'text',
    required: true,
  },
  {
    name: 'Email',
    accessor: 'email',
    attr: 'email',
    type: 'email',
    required: true,
  },
  {
    name: 'Role',
    accessor: 'role.name',
    attr: 'roleId',
    mode: 'highlighted',
    type: 'select',
    options: [],
    required: true,
  },
  {
    name: 'Password',
    accessor: 'password',
    attr: 'password',
    type: 'password',
    required: true,
  },
  {
    name: 'Created At',
    accessor: 'createdAt',
    attr: 'createdAt',
    mode: 'labeled',
    type: 'date',
  },
  {
    name: 'Last Updated At',
    accessor: 'updatedAt',
    attr: 'updatedAt',
    mode: 'labeled',
    type: 'date',
  },
]
