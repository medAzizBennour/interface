import React, { useState, useEffect,useRef } from 'react';

import './../chat/chat.css';

import { FaRobot } from "react-icons/fa";
import { BiMicrophone } from "react-icons/bi";

const ChatBox=(props)=> {
    const [botMessages, setBotMessages] = useState(['Hello how can i help you!']);
    const [userMessages, setUserMessages] = useState([]);
    const divRef = useRef(null);
    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
      }, []);

      useEffect(()=>{

      },[userMessages,botMessages])
    let[message,setMessage] =useState({receiverID:'',
        messageText:'',
        botMessages:['Hello how can i help you!'],
        userMessages:['hello'],
        user:{},
        isAuthenticated:true
      });
      
    

    const handleClick=async(e)=>{
        const code=e.keyCode || e.which;
        if(code==13)
        {
            console.log(message);
           // userMessage(message);
            setMessage("");

        }
    }

    const handleChange=event=>
    {
        setMessage({ messageText: event.target.value });


    }
  /*  useEffect(() => {
        sendMessage()
      });*/

    const sendMessage = () => {
            console.log("Message sent successfully:", message.messageText);
            
         //   const newMsg = [...message.userMessages,message.messageText];
            setUserMessages([...userMessages,message.messageText ]);

            console.log("After:",userMessages );
            
                userMessages.map((data, index) => {
                  console.log(data);
                });
              
            };

    const handleSubmit=event=>
    {
        event.preventDefault();
        sendMessage();
        event.target.reset();
    }
 
  return (
    <div className="chatWindow" >
    <div className="chatHeader">
    <FaRobot size={30} className="botIcon"/> <label className="chatTitle">Trading Bot</label>
    </div>
    <ul className="chat" id="chatList" ref={divRef}>
    {botMessages?.map((data, index) => (    
            <li key={index}>
             <div className="msg">
            <div className="message"> {data}</div>
          </div></li>
      ))}
    </ul>
    <ul className="userChat" id="chatList">
    { userMessages?.map((data, index) => (    
            <li key={index}>
             <div className="msg">
            <div className="message"> {data}</div>
          </div>
          </li>
      ))}
    </ul>
    <div className="chatInputWrapper">
      <form onSubmit={handleSubmit}>
        <div className="inputMsg">
        <input
          className="textarea input"
          type="text"
          placeholder="Enter your message..."
          onChange={handleChange}
        />
        <BiMicrophone size={30}/>
        </div>
      
      </form>
    </div>
  </div>
  );
}

export default ChatBox;