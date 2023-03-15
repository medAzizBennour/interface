import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
//import redux components
import { Provider } from 'react-redux';
import {createStore,combineReducers} from 'redux';
import counterReducer from './Redux/reducers/counterReducer';
import isLoggedReducer from './Redux/reducers/isLogged';
import allReducers from './Redux/reducers';
import configureStore from './Redux/store';
import store from './Redux/store';
//import store from './Redux/store';
const root = ReactDOM.createRoot(document.getElementById('root'));

//store=>globalized state


root.render(
  <Provider store={store}>
  <BrowserRouter>
       <App />
    </BrowserRouter>
  </Provider>


  /*<Provider>
    <App/>
  </Provider>*/
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
