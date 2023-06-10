import {
  // App Types
  SET_USER,
} from './types'

// App Actions
export const setUser = (username: string) => ({
  type: SET_USER,
  payload: username,
})
