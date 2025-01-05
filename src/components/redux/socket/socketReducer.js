const initialStateSocket={
    unreadCount: 0,
    messages:[]
}

const userReducer = (state=initialStateSocket,action)=>{
    switch(action.type){
        case 'STORE_SOCKET':
            return {messages:action.payload}
        case 'EMPLOYEE_DATA':
            return {messages:action.payload}
        case 'UPDATE_SOCKET':
            return {messages:[...state.unreadCount,action.payload]}
        case 'SET_UNREAD_COUNT':
            return { ...state, unreadCount: action.payload };  // Update unreadCount only
            case 'SET_MESSAGES':
                return { ...state, messages: [...state.messages, action.payload] };  // Update messages
        default:
            return state;
    }
}

export default userReducer;