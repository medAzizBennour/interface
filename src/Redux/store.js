import { applyMiddleware, configureStore } from '@reduxjs/toolkit'
import allReducers from './reducers';
import thunk from 'redux-thunk';
import textInputSlice from './slices/textInputSlice';
import voiceInputSlice from './slices/voiceInputSlice';
export default configureStore({
  reducer: {
    msg:textInputSlice,
    voiceMsg:voiceInputSlice

  }
}) 
  
