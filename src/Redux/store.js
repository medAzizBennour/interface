import {createStore, applyMiddleware} from 'redux';  
import allReducers from './reducers';
import thunk from 'redux-thunk';
import transcriptionSlice from './slices/transcriptionSlice';

export default function configureStore() {  
  return createStore(
    transcriptionSlice,
    applyMiddleware(thunk)
  );
}