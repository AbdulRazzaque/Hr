import React, { useEffect, useState } from "react";
import '../forms/forms.scss';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead";
import { Link } from "react-router-dom";
import BackIcon from "../header/BackIcon";
import { useSelector } from "react-redux";
import BusinessIcon from '@mui/icons-material/Business';
import config from "../auth/Config";
import axios from "axios";
import moment from "moment";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateExitforleave from "../updateEmployee/UpdateExitforleave";
import DeleteExitforleave from "../deleteEmployee/DeleteExitforleave";
const Exitforleaveinfo = () => {
  const employeeData = useSelector((state) => state?.socket?.messages)
  const [display, setDisplay] = React.useState(false);
  const [update,setUpdate]=useState([])
  const [alert, setAlert] = useState(false);
  const [showDialog,setShowDialog]=useState(false)
const [data,setData]= useState([])
  const getEmployeeByIdExitLeave =async()=>{
    if(!employeeData || !employeeData._id){
      console.error("Employee data or ID is missing")
    }
    try {
      axios.get(`${config.baseUrl}/api/getEmployeeByIdExitLeave/${employeeData._id}`)
      .then(res=>{
        setData(res.data.allExitOfLeave)
      })
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
  setUpdate({...update,[e.target.name]:e.target.value})
}

  useEffect(()=>{
    getEmployeeByIdExitLeave()
  },[])
  console.log(data,'Exit')
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
        <h1 className="text-center" >Exit For leave Info</h1>
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
       
          
           <div className="col-4 py-5 px-5">
           <div className="d-flex align-items-center">
           <EditIcon className="mr-5 cursor-pointer" onClick={() => updateRowData(item)} color="primary"/>
           <DeleteIcon color="error" className="cursor-pointer" onClick={()=>deleteRowData(item)} />
         </div>
       <hr/>
           <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">Date</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                         {moment.parseZone(item?.date).local().format("DD-MM-YYYY")}
                           </div>
                         </div>
                         <hr/>
                         <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">Leave Type</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                           {item.leaveType}
                           </div>
                         </div>
                         <hr/>
                         <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">Leave Start Date</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                           {moment.parseZone(item?.leaveStartDate).local().format("DD-MM-YYYY")}
                           </div>
                         </div>
                         <hr/>
                         <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">Leave End Date</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                           {moment.parseZone(item?.leaveEndDate).local().format("DD-MM-YYYY")}
                           
                           </div>
                         </div>
                         <hr/>
                         <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">last Leave Start Date</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                           {moment.parseZone(item?.lastLeaveStartDate).local().format("DD-MM-YYYY")}
                           </div>
                         </div>
                         <hr/>
                        
                         <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">last Leave EndDate</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                           {moment.parseZone(item?.lastLeaveEndDate).local().format("DD-MM-YYYY")}
                           </div>
                         </div>
                         <hr/>
                        
                       
                         <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">Number of Days of  Leave</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                        {item.numberOfDayLeave}
                           </div>
                         </div>
                         <hr/>
           </div>
           <div className="col-4 py-5">
           <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">Bank Loan</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                           {item.bankLoan}
                           </div>
                         </div>
                         <hr/>
                         <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">Personal Loan</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                           {item.personalLoan}
                           </div>
                         </div>
                         <hr/>
                         <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">credit card</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                          {item.CreditCard}
                           </div>
                         </div>
                         <hr/>
                         <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">company Loan</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                        {item.companyAssetsLoan}
                           </div>
                         </div>
                         <hr/>
                         <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">Company Assest</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                          {item.companyAssets}
                           </div>
                         </div>
                         <hr/>
                         <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">Mobile /Company Sim Card</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                         {item.companySimCard}
                           </div>
                         </div>
                         <hr/>
                         <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">Laptop /Ipad</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                      { item.companyLaptop}
                           </div>
                         </div>
                         <hr/>
                         <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">Tool</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                         {item.tools}
                           </div>
                         </div>
                         <hr/>
                         <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">Commnet</h6>
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
          ): <div className="no_data">
          <div className="no_data_icon">🚫</div>
          <div className="no_data_text">No Data Available</div>
            </div>
        }
   
    
  <hr/>

     </div>
     <UpdateExitforleave
      showDialog={showDialog}
      update={update}
      setShowDialog={setShowDialog}
      ChangeRowData={ChangeRowData}
      getEmployeeByIdExitLeave={getEmployeeByIdExitLeave}
     />
    <DeleteExitforleave
       alert={alert}
       update={update}
       setAlert={setAlert}
       getEmployeeByIdExitLeave={getEmployeeByIdExitLeave}
    />
     </div>
  )
}

export default Exitforleaveinfo