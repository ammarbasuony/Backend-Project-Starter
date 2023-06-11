import {
  // App Types
  SET_USER,
  REMOVE_USER,
} from './types'

// App Actions
export const setUser = (userData: any) => ({
  type: SET_USER,
  payload: userData,
})

export const removeUser = () => ({
  type: REMOVE_USER,
})
