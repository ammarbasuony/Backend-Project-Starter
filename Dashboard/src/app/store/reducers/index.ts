import {combineReducers} from 'redux'

// Reducers
import appReducer from './app.reducer'
import crudReducer from './crud.reducer'
import modalReducer from './modal.reducer'

const rootReducer = combineReducers({
  appReducer,
  crudReducer,
  modalReducer,
})

export default rootReducer
