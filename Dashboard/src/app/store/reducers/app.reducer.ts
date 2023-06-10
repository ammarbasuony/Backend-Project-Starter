import {
  // App Types
  SET_USERNAME,
} from '../types'

// Types
import {IAction} from '../../types/reducer.types'

const initialState = {
  username: null,
}

const appReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_USERNAME:
      return {
        ...state,
        username: action.payload,
      }
    default:
      return state
  }
}

export default appReducer
