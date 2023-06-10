import {combineReducers} from 'redux';

// Reducers
import appReducer from './app.reducer';

const rootReducer = combineReducers({
  appReducer,
});

export default rootReducer;
