import {
  // App Types
  SET_USERNAME,
} from './types'

// App Actions
export const setUsername = (username: string) => ({
  type: SET_USERNAME,
  payload: username,
})
