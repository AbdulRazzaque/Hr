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