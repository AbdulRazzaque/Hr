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
const Annualsettelmentinfo = () => {
  const [display, setDisplay] = React.useState(false);
  const [alert, setAlert] = useState(false);
  const [data,setData] = useState([])
  const employeeData = useSelector((state) => state.socket.messages)
  const history = useHistory()
  // console.log(employeeData,'Annual Settlement')
  const deleteRow = async(update)=>{

  }
const getEmployeeAnnualSettlements =()=>{
try {
  axios.get(`${config.baseUrl}/api/getEmployeeAnnualSettlements/${employeeData._id}`)
  .then(res=>{
// console.log(res.data.allAnnualsettelment)
    // let arr = res.data.allAnnualsettelment.map((item,index)=>{
    //   return {item,id:index +1}
    // })
    setData(res.data.allAnnualsettelment)
  }).catch(err =>console.log(err))
} catch (error) {
  console.log(error)
}
}

useEffect(()=>{
getEmployeeAnnualSettlements()
},[])
 
const handleEditClick =(item)=>{

  console.log(item)
  // history.push('/Annualsettelment',{data:item})

}

data.map((item,index)=>(
  console.log(item)
))
  return (
    <div className="row">
    <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
    <Dashhead id={2} display={display} />
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
    <h1 className="text-center my-3 font-family">Annual settlement info</h1>

     </div>
  

  
     <div className='box'>
           <div className="row bg-white mx-2">
      <div className="col-md-9 offset-md-1 "> 
        <div className="text-center profile">
        <img src= {employeeData.employeeImage}className='profileimage' alt=""  />
        <h1>{employeeData.name}</h1>
            <h6 className='profilenumber'>Mobile Number: {employeeData.mobileNumber} <span className='ml-2 profileid'> Employee Number :{employeeData.employeeNumber}</span> </h6>  

        <div className="profilecategory">
                    <BusinessIcon className='icon'/>
                     <span> <span className='mx-1'>|</span>  {employeeData.position}</span> 
                </div>
        </div>

      </div>
  
    </div>

         {
         
         data && data.length > 0 ?(
          
          data.map((item,index)=>(

            <div>
            <div className=' bg-white' key={index+1}>
            
             <p className='my-3 mx-3 py-2 boxtitle'><EditIcon  className="mr-5 cursor-pointer" onClick={()=>handleEditClick(item)} /> Annual settlement info</p>
              <hr className='mx-3'/>
              <div className="row my-2">
                  <div className="col">
                    <div className="col my-3 boxtextheading">Annual settelment Date</div>
                   
                    <div className="col my-3 boxtextcontent" >{moment.parseZone(item.date).format("DD/MM/YYYY")}</div>
                  </div>
                  <div className="col">
                    <div className="col my-3 boxtextheading">Subject</div>
                    <div className="col my-3 boxtextcontent" >{item.subject} </div>
                  </div>
                  <div className="col">
      
                  </div>
                 
              </div>
              {/* ============================================ */}
              <div className="row my-3">
                  
                  <div className="col">
                    <div className="col my-3 boxtextheading">To</div>
                    <div className="col my-3 boxtextcontent" >{item.to}</div>
                  </div>
                  <div className="col">
                    <div className="col my-3 boxtextheading">From</div>
                    <div className="col my-3 boxtextcontent" >{item.from}</div>
                  </div>
                  <div className="col">
      
                  </div>
                 
              </div>
              {/* ============================================ */}
              <div className="row my-2">
                  <div className="col">
                    <div className="col my-3 boxtextheading">Leave Start Date</div>
                    <div className="col my-3 boxtextcontent" >{moment.parseZone(item.leaveStartDate).format("DD/MM/YYYY")}</div>
                  </div>
                  <div className="col">
                    <div className="col my-3 boxtextheading">Resuming of last vacation</div>
                    <div className="col my-3 boxtextcontent" >{moment.parseZone(item.resumingVacation).format("DD/MM/YYYY")}</div>
                  </div>
                  <div className="col">
     
                  </div>
                 
              </div>
      </div>
      </div>
              ))
         ):(
          <p>No data Available</p>
         )
    
        }
   
   
      
   
    
    </div>



     </div>
     </div>
  )
}

export default Annualsettelmentinfo