import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getMsgResponse } from '../../api/axiosApi';
import axios from 'axios';
const initialState={
    loading:false,
    msg:"",
    error:''
}

export const voiceInput = createAsyncThunk('msgs/voiceInput',async(message,thunkAPI)=>{
    const headers = {
        "content-type": "multipart/form-data",
      };
    //const res=await getMsgResponse(message).then((response)=>console.log(response.data))
    const res=await axios.post("http://localhost:5000/api/agent/voice-input",message,{headers});
        return res.data;
    


});

const voiceInputSlice=createSlice({
    name:'msgs',
    initialState,
    reducers:{},
    extraReducers:{
        [voiceInput.pending]: (state) => {
            
            state.loading=true
        },
        [voiceInput.fulfilled]: (state, { payload }) => {
            
            state.loading=false;
            state.msg=payload
        },
        [voiceInput.rejected]: (state) => {
            state.loading=false
        }
    }
})

export default voiceInputSlice.reducer

