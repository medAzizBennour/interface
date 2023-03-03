import React, { useEffect, useRef } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Client from '../../client/client';
import { resetClick } from '../../Redux/actions';

function Dashboard() {
  /*const refs = useRef({primaryRef:null,successRef:null,dangerRef:null});
  const clicked=useSelector(state=>state.click.clicked)
  const btn=useSelector(state=>state.click.btn)
  const dispatch=useDispatch();
  function callMsg(msg)
  {
    console.log(msg,"clicked!");
  }

  useEffect(()=>{
    clickBtn(btn?.btn.toLowerCase());
  },[!clicked])

  function clickBtn(btn)
  {
    switch(btn)
    {
      case "primary":
        refs.current.primaryRef.click();
        break;
        case "success":
        refs.current.successRef.click();
        break;
        case "danger":
        refs.current.dangerRef.click();   
        break;       
    }
  }

  return (
<>
<h1>Dashboard</h1>
<div className=''>
<button type="button"  ref={el=>refs.current.primaryRef=el} className="btn btn-outline-primary" onClick={()=>callMsg("Primary")}>Primary</button>
<button type="button" ref={el=>refs.current.successRef=el}  className="btn btn-outline-success" onClick={()=>callMsg("Success")}>Success</button>
<button type="button" ref={el=>refs.current.dangerRef=el}  className="btn btn-outline-danger" onClick={()=>callMsg("Danger")}>Danger</button>
</div>

</>
     
  );*/
  return(<>
  <Client></Client>
  </>)
}

export default Dashboard;
