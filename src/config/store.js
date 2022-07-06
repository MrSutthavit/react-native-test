import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['dataReducers'],
};

const persistedReuder = persistReducer(persistConfig, reducers);

export default () => {
  let store = createStore(persistedReuder, {}, applyMiddleware(thunk));
  let persistor = persistStore(store);
  return {store, persistor};
};
