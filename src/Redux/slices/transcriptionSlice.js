import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import axiosApi from '../../api/axiosApi';

const initialState={
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

export default transcriptionSlice.reducer

