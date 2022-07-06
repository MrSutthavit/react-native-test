import {combineReducers} from 'redux';

import dataReducers from './data.reducers';

const AppReducer = combineReducers({
  dataReducers,
});

export default AppReducer;
