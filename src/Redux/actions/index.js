export const increment=()=>
{
    return{
        type:'INCREMENT'
    }
}
export const textLoadSuccess=(msg)=>({
    type:'TRANSCRIBE',
    payload:msg    
})
export const decrement=()=>
{
    return{
        type:'DECREMENT'
    }
}

export const click=(btn)=>
{
    return{
        type:'CLICK',
        payload:{
            btn
        }
    }
}

export const resetClick=()=>
{
    return{
        type:'RESETCLICK',
    }
}