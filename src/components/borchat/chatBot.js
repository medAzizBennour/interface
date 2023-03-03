import React, { useState, useEffect,useRef } from 'react';

import './../chat/chat.css';

import { FaRobot } from "react-icons/fa";
import { BiMicrophone } from "react-icons/bi";
import { BsStopCircle } from "react-icons/bs";

import { useNavigate } from 'react-router-dom';
import {FiSend} from "react-icons/fi";
import { click } from '../../Redux/actions';
import { useSelector,useDispatch } from 'react-redux';

import axios from "axios";

const ChatBox=(props)=> {
  const dispatch=useDispatch();
  var mediaRecorder; // set mediaRecorder as  an globally accessible
  var audioText;
    const [botMessages, setBotMessages] = useState(['Hello how can i help you!']);
    const [userMessages, setUserMessages] = useState([]);
    const [pages,setPages]=useState(["dashboard","profile","analytics"]);
    const [buttons,setButtons]=useState(["primary","success","danger"]);
    const [record, setRecord] = useState(false);
    const [text, setText] = useState('');
    const [cc, setCc] = useState(false);

    const [navigationCmd,setNavigationCmd]=useState(["open","navigate","go","show"]);
    const divRef = useRef(null);
    const navigate = useNavigate();


    //////
    const [transcribedData, setTranscribedData] = useState([]);
  const [interimTranscribedData, ] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [selectedModel, setSelectedModel] = useState(1);
  const [transcribeTimeout, setTranscribeTimout] = useState(5);
  const [stopTranscriptionSession, setStopTranscriptionSession] = useState(false);  

  const intervalRef = useRef(null);
  
  const stopTranscriptionSessionRef = useRef(stopTranscriptionSession);
  stopTranscriptionSessionRef.current = stopTranscriptionSession;

  const selectedLangRef = useRef(selectedLanguage);
  selectedLangRef.current = selectedLanguage;

  const selectedModelRef = useRef(selectedModel);
  selectedModelRef.current = selectedModel;
    useEffect(() => {
      divRef.current.scrollTop = divRef.current.scrollHeight;

      }, [userMessages,botMessages]);


    let[message,setMessage] =useState({receiverID:'',
        messageText:'',
        botMessages:['Hello how can i help you!'],
        userMessages:['hello'],
        user:{},
        isAuthenticated:true
      });
      
  

    const handleChange=event=>
    {
        setMessage({ messageText: event.target.value });


    }
 

    const sendMessage = () => {

            let words=message.messageText.split(" ");
            const clickIndex=words.findIndex(word=>word.toLocaleLowerCase()==='click');
            if (clickIndex >= 0 && clickIndex < words.length - 1) {
              buttons.map((button)=>{
                const btnIndex = words.findIndex(word => word.toLowerCase() === button);
                if (btnIndex >= 0 && btnIndex < words.length ) {
                  dispatch(click(button))
                }
              });
            }
            

            navigationCmd.map((cmd)=>
            {
              
              const navigateIndex = words.findIndex(word => word.toLowerCase() === cmd);
              if (navigateIndex >= 0 && navigateIndex < words.length - 1) {
                pages.map((dest)=>{
                  const pageIndex = words.findIndex(word => word.toLowerCase() === dest);
                  if (pageIndex >= 0 && pageIndex < words.length ) {
                   
                    executeCommand(cmd,dest);

                   }
                })
            }});
            setUserMessages([...userMessages,message.messageText ]);

              
            };

    const handleSubmit=event=>
    {
        event.preventDefault();

        sendMessage();
        event.target.reset();
    }
    const executeCommand=(command,object)=>
    {

      navigate(`/${object}`);

    }

    ///////////
    function startRecording() {
      setStopTranscriptionSession(false)
      setIsRecording(true)
      intervalRef.current = setInterval(transcribeInterim, transcribeTimeout * 1000)
    }

    function transcribeInterim() {
      clearInterval(intervalRef.current);
      setIsRecording(false)
    }

    function stopRecording() {
      clearInterval(intervalRef.current);
      setStopTranscriptionSession(true)
      setIsRecording(false)
      setIsTranscribing(false)
      onStop()
    }

    useEffect(() => {
      return () => clearInterval(intervalRef.current);
    }, []);
  
    function onStop(recordedBlob) {
      transcribeRecording(recordedBlob)
      setIsTranscribing(true)  
    }

    function transcribeRecording(recordedBlob) {
      const headers = {
        "content-type": "multipart/form-data",
      };
      const formData = new FormData();
      formData.append("language", "english")
      formData.append("model_size", "medium")
      formData.append("audio_data", recordedBlob.blob, 'temp_recording');
      axios.post("http://127.0.0.1:8080/transcribe", formData, { headers })
        .then((res) => {
          setTranscribedData(oldData => [...oldData, res.data])
          setIsTranscribing(false)
          intervalRef.current = setInterval(transcribeInterim, transcribeTimeout * 1000)
        });
        
        if (!stopTranscriptionSessionRef.current){
          setIsRecording(true)    
        }
    }
  
  
 
  return (
    <div className="chatWindow" >
    <div className="chatHeader">
    <FaRobot size={30} className="botIcon"/> <label className="chatTitle">Trading Bot</label>
    </div>
    <div className='chat' ref={divRef}>
    <ul className="botChat" id="chatList" ref={divRef}>
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
    </div>
   
    <div className="chatInputWrapper">
      <form onSubmit={handleSubmit}>
        <div className="inputMsg">
        {!isRecording && !isTranscribing &&<BiMicrophone size={25} onClick={startRecording}/>}
        {(isRecording || isTranscribing) &&<BsStopCircle size={25} onClick={stopRecording}/>}
        <input
          className="textarea input"
          type="text"
          placeholder="Enter your message..."
          onChange={handleChange}
        />
       
        </div>
      
      </form>
    </div>
  </div>
  );
}

export default ChatBox;