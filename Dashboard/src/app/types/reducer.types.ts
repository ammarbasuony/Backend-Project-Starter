import {IUser} from './data.types'

export interface IAction {
  type: string
  payload?: any
}

export interface IState {
  appReducer: IAppState
  crudReducer: ICrudState
}

export interface IAppState {
  user: IUser | null
  isAuthenticated: boolean
  loggedOut: boolean
}

export interface ICrudState {
  tableName: string
  tableData: any[]
  tableColumns: any[]
}
