import {IUser} from './data.types'

export interface IAction {
  type: string
  payload?: any
}

export interface IState {
  appReducer: IAppState
  crudReducer: ICrudState
  modalReducer: IModalState
}

export interface IAppState {
  user: IUser | null
  isAuthenticated: boolean
  loggedOut: boolean
}

export interface ICrudState {
  tableName: string
  isTableHasFiles: boolean
  tableData: any[]
  totalRecords: number
  tableColumns: any[]
  isOperationDone: boolean
  operationsPermission: string
  selectedRows: number[]
}

export interface IModalState {
  id: null | number
  isModalOpen: boolean
  isUpdateModalOpen: boolean
  isConfirmationModalOpen: boolean
  isConfirmed: boolean
  selectedId: number
}
