const initialState ={
    isLoading:false,
    msg:"",
    errorMessage:null
}

const transcribeReducer=(state=initialState,{type,payload})=>
{
    switch(type)
    {
        case "TRANSCRIBE":

            return {
                ...state,
                isLoading:false,
                msg:payload,
                errorMessage:null
            };

        default:
            return state;
    }

}
export default transcribeReducer;