export const storeSocket = (socket)=>{
    return{
        type:"STORE_SOCKET",
        payload:socket
    }
}

export const updateSocket =(messages)=>{
    return {
        type:"UPDATE_SOCKET",
        payload:messages
    }
}

export const employeeData =(data)=>{
    return {
        type:"EMPLOYEE_DATA",
        payload:data
    }
}

// Action to set unread count
export const setUnreadCount = (count) => ({
    type: 'SET_UNREAD_COUNT',
    payload: count,
  });
  
  // Action to set new messages (if needed)
  export const setMessages = (message) => ({
    type: 'SET_MESSAGES',
    payload: message,
  });
  