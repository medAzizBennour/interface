import React from "react";
import {Chatbot} from "react-chatbot-kit";
import './chat.css';
import 'react-chatbot-kit/build/main.css';

import config from "./config";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
function ChatBox() {

 
  return (
    <div className="Chat">
        <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider}/>

    
    </div>
  );
}

export default ChatBox;