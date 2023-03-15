import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { increment,decrement, transcribe } from '../../Redux/actions';
import counterReducer from '../../Redux/reducers/counterReducer';
function Analytics() {
  const counter=useSelector(state=>state.counter);

  const dispatch=useDispatch();
  useEffect(()=>{
  });
  return (
 
    <>

    <div><p></p>
</div>
    </>
   
  );
}

export default Analytics;
