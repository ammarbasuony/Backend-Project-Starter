import {combineReducers} from 'redux';

// Reducers
import appReducer from './app.reducer';
import crudReducer from './crud.reducer';

const rootReducer = combineReducers({
  appReducer,
  crudReducer,
});

export default rootReducer;
