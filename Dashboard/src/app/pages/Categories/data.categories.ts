import { IModuleData } from "../../models/data.types";

export const columns: IModuleData[] = [
  {
    name: 'Name',
    accessor: 'name',
    attr: 'name',
    type: 'text',
    required: true,
    showInTable: true,
  },
  {
    name: 'Created At',
    accessor: 'createdAt',
    attr: 'createdAt',
    mode: 'labeled',
    type: 'date',
    showInTable: true,
  },
  {
    name: 'Last Updated At',
    accessor: 'updatedAt',
    attr: 'updatedAt',
    mode: 'labeled',
    type: 'date',
    showInTable: true,
  },
]
