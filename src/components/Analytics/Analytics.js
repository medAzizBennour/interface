import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { increment,decrement, transcribe } from '../../Redux/actions';
import { fetchMsg } from '../../Redux/slices/transcriptionSlice';
function Analytics() {
  const counter=useSelector(state=>state.counter);
  const  msg  = useSelector((state) => state.msg)

  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(fetchMsg());
  });
  return (
 
    <>

    <div><p>{msg.toString()}</p>
</div>
    </>
   
  );
}

export default Analytics;
