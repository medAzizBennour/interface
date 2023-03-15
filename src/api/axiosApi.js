import axios from "axios"


const BASE_URL=`http://localhost:5000/api/agent/text-input`

export const getMsgResponse=(message)=>{
    axios.post(
        BASE_URL,{message}
    )
} 

/*const PROJECT_ID=process.env.PROJECT_ID;
const SESSION_ID=process.env.SESSION_ID;
const BASE_URL=`https://dialogflow.googleapis.com/v2/projects/${PROJECT_ID}/agent/sessions/${SESSION_ID}:detectIntent`
export default axios.create({
    baseURL:BASE_URL
})*/