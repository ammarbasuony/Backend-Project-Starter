import {
  // App Types
  SET_USER,
} from '../types'

// Types
import {IAction} from '../../types/reducer.types'

const initialState = {
  user: {},
  isAuthenticated: false,
}

const appReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      }
    default:
      return state
  }
}

export default appReducer
