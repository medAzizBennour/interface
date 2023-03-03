


const clickReducer=(state={clicked:false,btn:""},action)=>
{
    switch(action.type)
    {
        case "CLICK":
            return {
                clicked:!state.clicked,
                btn:action.payload
            };
        case "RESETCLICK":
            return{
                clicked:false
            }
        default:
            return false;
    }

}
export default clickReducer;