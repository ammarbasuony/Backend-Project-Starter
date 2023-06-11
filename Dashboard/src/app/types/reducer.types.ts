import {IUser} from './data.types'

export interface IAction {
  type: string
  payload?: any
}

export interface IState {
  appReducer: IAppState
}

export interface IAppState {
  user: IUser
  isAuthenticated: boolean
  loggedOut: boolean
}
