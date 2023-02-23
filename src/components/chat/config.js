import { useState } from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
const initMsg="hello ";

const config = { 
  botName: "Voice Assistant",
  initialMessages: [createChatBotMessage(initMsg)],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#376B7E",
    },
  }
}

export default config