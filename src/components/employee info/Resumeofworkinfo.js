

import React, { useEffect, useState } from "react";
import '../forms/forms.scss';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead";
import BusinessIcon from '@mui/icons-material/Business';
import './employee.scss';
import logo from '../../images/employee.jpeg'
import Backicon from "../header/Backicon";
import { useSelector } from "react-redux";

import config from "../auth/Config";
import axios from "axios";
import moment from 'moment'
import EditIcon from '@mui/icons-material/Edit';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Bounce, toast } from "react-toastify";
import UpdateAnnualSettlement from "../updateEmployee/UpdateAnnualSettlement";
import DeleteAnnualSettlement from "../deleteEmployee/DeleteAnnualSettlement";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateResumeofWork from "../updateEmployee/UpdateResumeofWork";
import DeleteResumeOfWork from "../deleteEmployee/DeleteResumeOfWork";
const Resumeofworkinfo = () => {
  const [display, setDisplay] = React.useState(false);
  const [data,setData] = useState([])
  const employeeData = useSelector((state) => state.socket.messages)
  const [showDialog,setShowDialog]=useState(false)
  const [update,setUpdate]=useState([])
  const [alert, setAlert] = useState(false);
  const [deleteData, setDeleteData] = useState([]);
  // console.log(employeeData,'Annual Settlement')
  const deleteRow = async()=>{

  }
const getEmployeeResumeinfo =()=>{
  if (!employeeData || !employeeData._id) {
    console.error('Employee data or ID is missing');
    return;
}

try {
  axios.get(`${config.baseUrl}/api/getEmployeeResumeinfo/${employeeData._id}`)
  .then(res=>{
    setData(res?.data?.employeeResume ||null)
  }).catch((err) => console.error('Error fetching settlements:', err));
} catch (error) {
  console.error('Unexpected error:', error);
}
}

const updateRowData= async(update)=>{
  // console.log(params,'cheack in update data in Add Product')
 setUpdate(update)
   setShowDialog(true)

}
const deleteRowData= async(update)=>{
  // console.log(params,'cheack in update data in Add Product')
 setUpdate(update)
   setAlert(true)


}



const ChangeRowData=(e)=>{
  setUpdate({...update,[e.target.name]:e.target.value})

}



useEffect(()=>{
  getEmployeeResumeinfo()
},[])

console.log(data)
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
     
     <div className="container">
     <div>
     <Backicon/>

     </div>
    <h1 className="text-center my-3 font-family">Resume of work info</h1>

     </div>
    { data && data.length > 0 ?(
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

     {
        data.map((item,index)=>(
     <div className='box'>
        

         

            <div key={index+1}>
            <div className=' bg-white'>
            <div className="my-3 mx-3 py-2 d-flex justify-content-between align-items-center">
  <div className="d-flex align-items-center">
    <EditIcon className="mr-5 cursor-pointer" onClick={() => updateRowData(item)} color="primary"/>
    <DeleteIcon color="error" className="cursor-pointer" onClick={()=>deleteRowData(item)} />
  </div>
  <p className="boxtitle text-center mb-0 flex-grow-1">Settlement Info</p>
</div>


           
              <hr className='mx-3'/>
              <div className="row my-2">
                  <div className="col">
                    <div className="col my-3 boxtextheading">Resume Of Work Date</div>
                   
                    <div className="col my-3 boxtextcontent" >{moment.parseZone(item?.resumeOfWorkDate).local().format("DD/MM/YYYY")}</div>
                  </div>
                  <div className="col">
                    <div className="col my-3 boxtextheading">Comment</div>
                    <div className="col my-3 boxtextcontent" >{item.comment} </div>
                  </div>
                  <div className="col">
      
                  </div>
                 
              </div>
               {/* ============================================ */}
               <div className="row my-2">
                  <div className="col">
                    <div className="col my-3 boxtextheading">leave Start Date</div>
                    <div className="col my-3 boxtextcontent" >{moment.parseZone(item.leaveStartDate).local().format("DD/MM/YYYY")}</div>
                  </div>
                 
                 
              </div>
              {/* ============================================ */}
              <div className="row my-3">
                  
              <div className="col">
                    <div className="col my-3 boxtextheading">leave End Date</div>
                    <div className="col my-3 boxtextcontent" >{moment.parseZone(item?.leaveEndDate).local().format("DD/MM/YYYY")}</div>
                  </div>
            
                  
              </div>
             
      </div>
      </div>
     
   
   
     <UpdateResumeofWork
      showDialog={showDialog}
      update={update}
      setShowDialog={setShowDialog}
      ChangeRowData={ChangeRowData}
      getEmployeeResumeinfo={getEmployeeResumeinfo}
      />

      <DeleteResumeOfWork
          alert={alert}
          update={update}
          setAlert={setAlert}
          getEmployeeResumeinfo={getEmployeeResumeinfo}
  //  removeDeletedItem={removeDeletedItem}
      />  
   
    
    </div>
         ))
       
   
       }

</div>
):(
  <div className="no_data">
  <div className="no_data_icon">🚫</div>
  <div className="no_data_text">No Data Available</div>
    </div>
        )}
     </div>
     </div>
  )
}

export default Resumeofworkinfo