//import dependencies
import {createStore,applyMiddleware} from 'redux';
import counterReducer from './reducers/counterReducer';
import thunk from "redux-thunk";
import { combineReducers } from 'redux';

//connect the app to redux devtools
import {composeWithDevTools} from "redux-devtools-extension";
//setup initial state
const initialState={};
//import middleware
const middleware=[thunk];

//setup store
const store=createStore(combineReducers,initialState,composeWithDevTools(applyMiddleware(...middleware)));
export default store;