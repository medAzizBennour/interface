import React, { useState, useEffect,useRef } from 'react';

import './../chat/chat.css';

import { FaRobot } from "react-icons/fa";
import { BiMicrophone } from "react-icons/bi";
import { BsStopCircle } from "react-icons/bs";

import transcriptionSlice, { textInput } from '../../Redux/slices/textInputSlice';
import { useNavigate } from 'react-router-dom';
import {FiSend} from "react-icons/fi";
import { click } from '../../Redux/actions';
import { useSelector,useDispatch } from 'react-redux';
import { ReactMic } from 'react-mic';

import axios from "axios";
import { voiceInput } from '../../Redux/slices/voiceInputSlice';
const ChatBox=(props)=> {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  var mediaRecorder; // set mediaRecorder as  an globally accessible
  var audioText;
    const [botMessages, setBotMessages] = useState(['Hello how can i help you!']);
    const [userMessages, setUserMessages] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [transcribeTimeout, setTranscribeTimout] = useState(5);
    const [stopTranscriptionSession, setStopTranscriptionSession] = useState(false);  
   const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
    const intervalRef = useRef(null);
    
    const stopTranscriptionSessionRef = useRef(stopTranscriptionSession);
    stopTranscriptionSessionRef.current = stopTranscriptionSession;
    const interleavedMessages = [];

    
   
    for (let i = 0; i < botMessages.length; i++) {
      interleavedMessages.push(botMessages[i]);
      if (userMessages[i]) {
        interleavedMessages.push(userMessages[i]);
      }
    }
    const [messageText,setMessage]=useState('');
    const divRef = useRef(null);
      useEffect(() => {
      divRef.current.scrollTop = divRef.current.scrollHeight;
      }, [botMessages]);

      const handleChange=event=>
      {

          setMessage(event.target.value);
  
  
      }
      const handleSubmit=event=>
      {
          event.preventDefault();
          sendMessage();
          event.target.reset();
      }


      const sendMessage=()=>
      {
        console.log(messageText);
        setUserMessages([...userMessages,messageText ]);

        dispatch(textInput(messageText))
        .then((originalPromiseResult) => {
          console.log(originalPromiseResult.payload);
          const intent=originalPromiseResult.payload.intent;
          setBotMessages([...botMessages,originalPromiseResult.payload.data ]);
          if(intent=="Navigate")
          {
            executeCommand(originalPromiseResult.payload.parameters.page.stringValue)
          }


        })
        .catch((rejectedValueOrSerializedError) => {
          console.log(rejectedValueOrSerializedError);
        })
      }
    const executeCommand=(object)=>
    {

      navigate(`/${object}`);

    }

 
    
      useEffect(() => {
        return () => clearInterval(intervalRef.current);
      }, []);
    
      function startRecording() {
        setStopTranscriptionSession(false)
        setIsRecording(true)
        intervalRef.current = setInterval(transcribeInterim, transcribeTimeout * 1000)
      }
    
      function stopRecording() {
        clearInterval(intervalRef.current);
        setStopTranscriptionSession(true)
        setIsRecording(false)
        setIsTranscribing(false)
      }
    

      function onStop(recordedBlob) {
        transcribeRecording(recordedBlob)
        setIsTranscribing(true)  
      }
    
      function transcribeInterim() {
        clearInterval(intervalRef.current);
        setIsRecording(false)
      }
    
      function transcribeRecording(recordedBlob) {
       
        const formData = new FormData();
        formData.append("language", "english")
        formData.append("model_size", "medium")
        formData.append("audio_data", recordedBlob.blob, 'temp_recording');
        console.log(recordedBlob.blob);

        dispatch(voiceInput(formData)).then((res) => {
       
          setIsTranscribing(false)
          intervalRef.current = setInterval(transcribeInterim, transcribeTimeout * 1000)
          const botMsg=res.payload.data;
          const userMsg=res.payload.msg;
          const intent=res.payload.intent;
          const parameters=res.payload.parameters;
          const arrayBuffer = new Uint8Array(res.payload.audioOutput.data).buffer;
          console.log(arrayBuffer);
          
           audioContext.decodeAudioData(arrayBuffer, decodedData => {
          const source = audioContext.createBufferSource();
         source.buffer = decodedData;
        source.connect(audioContext.destination);
        source.start(0);
    });
          handleCommand(botMsg,userMsg,intent,parameters);
        });
      
          
          if (!stopTranscriptionSessionRef.current){
            setIsRecording(true)    
          }
      }
    
      const handleCommand=(botMsg,userMsg,intent,parameters)=>
      {
        setUserMessages(prevUserMessages=>[...prevUserMessages,userMsg ]);

        setBotMessages(prevBotMessages=>[...prevBotMessages,botMsg ]);


        if(intent=="Navigate")
        {
          navigate(`/${parameters.page.stringValue}`);
        }
        else if(intent=="Click")
        {
          dispatch(click(parameters.btn.stringValue))
        }


      }
  
 
  return (
    <div className="chatWindow" >
    <div className="chatHeader">
    <FaRobot size={30} className="botIcon"/> <label className="chatTitle">Trading Bot</label>
    </div>
    <div className='chat' ref={divRef}>

    {interleavedMessages.map((message, index) => {
        const isBotMessage = index % 2 === 0;
        const className = isBotMessage ? 'botChat' : 'userChat';
        return (
          <ul key={`message-${index}`} className={className} id="chatList">
          <li >
             <div className="msg">
            <div className="message"> {message}
</div>
</div>
</li>
          </ul>
        );
      })}

    </div>
   
    <div className="chatInputWrapper">
      <form onSubmit={handleSubmit}>
        
        <div className="inputMsg">
        {!isRecording && !isTranscribing &&<BiMicrophone size={25} onClick={startRecording}/>}
        {(isRecording || isTranscribing) &&<BsStopCircle size={25} onClick={stopRecording} disabled={stopTranscriptionSessionRef.current}/>}
        <input
          className="textarea input"
          type="text"
          placeholder="Enter your message..."
          onChange={handleChange}
   
        />
        <div className="recordIllustration">
        <ReactMic record={isRecording} className="sound-wave" onStop={onStop}
           strokeColor="#0d6efd" backgroundColor="white" />
      </div>
  
        </div>
      
      </form>
    </div>

  </div>
  
   
  );
}

export default ChatBox;