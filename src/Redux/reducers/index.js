//import dependencies
import { combineReducers } from "redux";

//import reducers
import counterReducer from "./counterReducer";
import isLoggedReducer from "./isLogged";
import clickReducer from "./clickReducer";
import transcribeReducer from "./transcribeReducer";
//export combined reducers
const allReducers=combineReducers({
    counter:counterReducer,
    logged:isLoggedReducer,
    click:clickReducer,
    transcribe:transcribeReducer
})
export default allReducers;