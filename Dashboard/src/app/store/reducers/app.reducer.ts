import {
  // App Types
  SET_USER,
  REMOVE_USER,
} from '../types'

// Types
import {IAction, IAppState} from '../../models/reducer.types'

const initialState: IAppState = {
  user: null,
  isAuthenticated: false,
  loggedOut: false,
}

const appReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loggedOut: false,
      }
    case REMOVE_USER:
      return {
        ...initialState,
        loggedOut: true,
      }
    default:
      return state
  }
}

export default appReducer
