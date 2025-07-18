import React, { useEffect, useState } from "react";
import '../forms/forms.scss';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead";
import BackIcon from "../header/BackIcon";
import { useSelector } from "react-redux";
import BusinessIcon from '@mui/icons-material/Business';
import config from "../auth/Config";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateReNewal from "../updateEmployee/UpdateReNewal";
import DeleteRpRenewal from "../deleteEmployee/DeleteRpRenewal";
const Rprenewalforminfo = () => {
  const employeeData = useSelector((state) => state?.socket?.messages)
  const [display, setDisplay] = React.useState(false);
  const [update,setUpdate]=useState([])
  const [alert, setAlert] = useState(false);
  const [showDialog,setShowDialog]=useState(false)
const [data,setData]= useState([])
  const getEmployeeByIdRpRenewal =async()=>{
    if(!employeeData || !employeeData._id){
      console.error("Employee data or ID is missing")
    }
    try {
      axios.get(`${config.baseUrl}/api/getEmployeeByIdRpRenewal/${employeeData._id}`)
      .then(res=>{
        setData(res.data.rpRenewal)
      }).catch(error=>console.log(error))
    } catch (error) {
      console.log("Unexpected error:", error)
    }
  }
  const updateRowData= async(update)=>{
    // console.log(params,'check in update data in Add Product')
   setUpdate(update)
   console.log(update,'this is update')
     setShowDialog(true)
  
  }
  const deleteRowData= async(update)=>{
    // console.log(params,'check in update data in Add Product')
   setUpdate(update)
   console.log(update,'this is Delete')
     setAlert(true)
  }
  
const ChangeRowData=(e)=>{
  setUpdate({...update,[e.target.id]:e.target.value})
}

  useEffect(()=>{
    getEmployeeByIdRpRenewal()
  },[])
  // console.log(data,'Exit')
  return (
    <div className="row">
    <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
    <Dashhead id={1} display={display} />
    </div>

    <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container" onClick={()=>display&&setDisplay(false)}>
    <span className="iconbutton display-mobile">
    <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
    <MenuIcon fontSize="inherit" />
     </IconButton>
     </span>
  
     <div>
     <BackIcon/>

     </div>
        <h1 className="text-center" >RP Renewal Form Info</h1>
        { data && data.length> 0 ?(
            <div>
     
            <div className="row bg-white mx-2">
             <div className="col-md-9 offset-md-1 "> 
               <div className="text-center profile">
               <img src= {data[0]?.employeeId?.employeeImage || 'default-image.png'}className='profileimage' alt=""  />
               <h1>{data[0].employeeId.name}</h1>
                   <h6 className='profilenumber'>    Mobile Number: {data[0]?.employeeId?.mobileNumber || 'N/A'}  <span className='ml-2 profileid'> Employee Number: {data[0]?.employeeId?.employeeNumber || 'N/A'}</span> </h6>  
       
                   <div className="profilecategory">
                           <BusinessIcon className='icon'/>
                            <span> <span className='mx-1'>|</span>  {data[0]?.employeeId?.position}</span> 
                       </div>
               </div>
       
             </div>
         
           </div>
      
     
         
         { data.map((item,index)=>(
           <div className="row mt-5" key={index}>
       
          
         
       
           <div className="col-4 py-5 px-5 container">
           <div className="d-flex align-items-center">
           <EditIcon className="mr-5 cursor-pointer" onClick={() => updateRowData(item)} color="primary"/>
           <DeleteIcon color="error" className="cursor-pointer" onClick={()=>deleteRowData(item)} />
         </div>
            <hr/>
           <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">New Visa</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                           {item.newVisaRequested}
                           </div>
                         </div>
                         <hr/>
                         <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">Business Visa</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                           {item.BusinessVisaRequested}
                           </div>
                         </div>
                         <hr/>
                         <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">Visa Transfer</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                          {item.TransferVisaRequested}
                           </div>
                         </div>
                         <hr/>
                         <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">New RP</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                        {item.NewRPRequested}
                           </div>
                         </div>
                         <hr/>
                         <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">R.P Renewal</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                          {item.RPRenewalRequested}
                           </div>
                         </div>
                         <hr/>
                         <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">Exit Permit</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                         {item.exitPermitRequested}
                           </div>
                         </div>
                         <hr/>
                         <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">Others</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                      { item.OthersRequested}
                           </div>
                         </div>
                         <hr/>
                        
                 
                         <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">Comment</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                          {item.comment}
                           </div>
                         </div>
                         <hr/>
                   
           </div>
         </div>
       
         ))}
            
            </div>
          ):
          <div className="no_data">
          <div className="no_data_icon">🚫</div>
          <div className="no_data_text">No Data Available</div>
            </div>
        }
   
    
  <hr/>

     </div>
     <UpdateReNewal
      showDialog={showDialog}
      update={update}
      setShowDialog={setShowDialog}
      ChangeRowData={ChangeRowData}
      getEmployeeByIdRpRenewal={getEmployeeByIdRpRenewal}
     />
    <DeleteRpRenewal
       alert={alert}
       update={update}
       setAlert={setAlert}
       getEmployeeByIdRpRenewal={getEmployeeByIdRpRenewal}
    /> 
     </div>
  )
}

export default Rprenewalforminfo