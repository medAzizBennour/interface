import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getMsgResponse } from '../../api/axiosApi';
import axios from 'axios';
const initialState={
    loading:false,
    msg:"",
    error:''
}

export const textInput = createAsyncThunk('msgs/textInput',async(message,thunkAPI)=>{
    //const res=await getMsgResponse(message).then((response)=>console.log(response.data))
    const res=await axios.post("http://localhost:5000/api/agent/text-input",{
        message:message
    });
    return res.data;
    console.log(res.data);

});

const transcriptionSlice=createSlice({
    name:'msgs',
    initialState,
    reducers:{},
    extraReducers:{
        [textInput.pending]: (state) => {
            
            state.loading=true
        },
        [textInput.fulfilled]: (state, { payload }) => {
            
            state.loading=false;
            state.msg=payload
        },
        [textInput.rejected]: (state) => {
            state.loading=false
        }
    }
})
/*const initialState={
    loading:false,
    msg:"",
    error:''
}
 export const fetchMsg = createAsyncThunk('msgs/fetchMsg',async(thunkAPI)=>{
    const res=await axiosApi.get('/');
    console.log(res.data.data);
    return res.data.data;
});

const transcriptionSlice=createSlice({
    name:'msgs',
    initialState,
    reducers:{},
    extraReducers:{
        [fetchMsg.pending]: (state) => {
            
            state.loading=true
        },
        [fetchMsg.fulfilled]: (state, { payload }) => {
            
            state.loading=false;
            state.msg=payload
        },
        [fetchMsg.rejected]: (state) => {
            state.loading=false
        }
    }
})
*/
export default transcriptionSlice.reducer

