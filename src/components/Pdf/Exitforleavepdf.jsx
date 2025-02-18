import React, { useState } from 'react'
import "./PDFGenerator.scss"
import logo from '../../images/Tharblogo.png'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import config from '../auth/Config';
import moment from 'moment';
import dayjs from 'dayjs';
function Exitforleavepdf(props) {

  const [employeeData, setEmployeeData] = useState(null);
 
    const location = useLocation();
    const formData = location.state?.data.formData;
    const eligibleMessage = location.state?.data?.eligibilityMessage
   

      const fetchEmployeeData = async()=>{
        if(!formData?.employeeId){
          console.log("dont have id")
        }else{
          try {
            const response = await axios.get(`${config.baseUrl}/api/oneEmployee/${formData?.employeeId}`)
           
            setEmployeeData(response.data.employee)
          } catch (error) {
            console.log(error)
            
          }
        }
       
      }

    React.useEffect(()=>{
    fetchEmployeeData()
   
  //  setTimeout(()=>{
  //   window.print()
  //  },500)
        // window.print();
    },[])

  
    console.log(eligibleMessage,'eligibleMessage')
      console.log(formData,'formData')
      console.log(employeeData,'employeeData')
  return (
    <div className="report-pdf-2">
     <div className="row">
               <div className="col-4 text-left">
                 <div className="">
                   <h2>Tharb Camel Hospital</h2>
     
                 </div>
     
               </div>
               <div className="col-6">
                 <div className=" image-container text-right">
                   <img src={logo} alt="Thabr" />
                 </div>
     
               </div>
               <div className="col-12 empty_border mt-5"></div>
               <div className='col-12'>
                 <h1 className='text-center'>Exit For Leave </h1>
               </div>
               <div className="col-12 empty_border"></div>
           
             </div>
             <div className="row my-5 sideTitle">
          {/* <div className="col text-left">
            <p>
              <b>Ref.No:</b> <span>321321</span>
            </p>
          </div> */}
          <div className="col text-right mr-5">
            <h2>
              <b >Date:</b> <span >{moment.parseZone().local().format('DD/MM/YYYY')}</span>
    
            </h2>
          </div>
        </div>
        <div class="container">
  <div class="row dark-border">
    <div class="col first-section">
    Employee Details
    </div>
   
  </div>
{/*------------------------------------------ first row start here---------------------------------------  */}
  <div class="row dark-border">
    <div class="col col-padding">
    <h3 className='key'> Name : <span className='value'>{employeeData?.name}</span> </h3> 
    </div>
  </div>
  <div class="row dark-border">
    <div class="col col-padding">
    <h3 className='key'> Department : <span className='value'>{employeeData?.department}</span> </h3> 
    </div>
  </div>
  <div class="row dark-border">
    <div class="col col-padding">
    <h3 className='key'> position : <span className='value'>{employeeData?.position}</span> </h3> 
    </div>
  </div>
  <div class="row dark-border">
    <div class="col col-padding">
    <h3 className='key'> Employee Number : <span className='value'>{employeeData?.employeeNumber}</span> </h3> 
    </div>
  </div>
  <div class="row dark-border">
    <div class="col col-padding">
    {/* <h3 className='key'> Date Of Joining: <span className='value'> {employeeData?.dateOfJoining? employeeData?.dateOfJoining.toLocaleDateString('en-GB') : "Invalid Date" }</span> </h3>  */}
    

<h3 className='key'>
  Date Of Joining: 
  <span className='value'> 
    {employeeData?.dateOfJoining 
      ? dayjs(employeeData.dateOfJoining).format("DD/MM/YYYY") 
      : "Invalid Date"}
  </span> 
</h3>

    </div>
  </div>
  <div class="row dark-border">
    <div class="col col-padding">
    <h3 className='key'> Nationality : <span className='value'>{employeeData?.nationality}</span> </h3> 
    </div>
  </div>
  <div class="row dark-border mt-5">
    <div class="col first-section">
    Leave Details
    </div>
   
  </div>
  <div class="row dark-border">
    <div class="col col-padding">
    <h3 className='key'> Leave Type : <span className='value'>{formData?.leaveType}</span> </h3> 
    </div>
   
  </div>

  <div class="row dark-border">
    <div class="col-5 col-padding"> 
    {/* <h3 className='key'>Leave Start Date : <span className='value'>{formData?.leaveStartDate ? new Date(formData.leaveStartDate).toLocaleDateString('en-GB') : "Invalid Date"}</span> </h3>  */}
    <h3 className='key'>
  Leave Start Date : 
  <span className='value'>
    {formData?.leaveStartDate 
      ? dayjs(formData.leaveStartDate).format("DD/MM/YYYY") 
      : "Invalid Date"}
  </span>
</h3>
    </div>
    <div class="col-4  col-padding dark-border  border-top-0  border-bottom-0 ">
    {/* <h3 className='key'> Leave End Date : <span className='value'>{formData?.leaveEndDate ? new Date(formData.leaveEndDate).toLocaleDateString('en-GB') : "Invalid Date"}    </span> </h3>  */}
    <h3 className='key'>
  Leave End Date : 
  <span className='value'>
    {formData?.leaveEndDate 
      ? dayjs(formData.leaveEndDate).format("DD/MM/YYYY") 
      : "Invalid Date"}
  </span> 
</h3>
    </div>
    <div class="col-3  col-padding dark-border  border-top-0  border-bottom-0 border-right-0 ">
    <h3 className='key'> No Days: <span className='value'>{formData?.numberOfDayLeave} Days</span> </h3> 
    </div>
  </div>
  <div class="row dark-border">
    <div class="col-5 col-padding">
    {/* <h3 className='key'>Last Leave Start  Date : <span className='value'>{formData?.lastLeaveStartDate ? new Date(formData.lastLeaveStartDate).toLocaleDateString('en-GB') : "N/A"}
    </span> </h3>  */}

<h3 className='key'>
  Last Leave Start Date : 
  <span className='value'>
    {formData?.lastLeaveStartDate 
      ? dayjs(formData.lastLeaveStartDate).format("DD/MM/YYYY") 
      : "N/A"}
  </span>
</h3>
    </div>
    <div class="col-4 col-padding dark-border  border-top-0  border-bottom-0 ">
    {/* <h3 className='key'>Leave End  Date : <span className='value'>{formData?.lastLeaveEndDate ? new Date(formData.lastLeaveEndDate).toLocaleDateString('en-GB') : "N/A"}    </span> </h3>  */}
    <h3 className='key'>
  Leave End Date : 
  <span className='value'>
    {formData?.lastLeaveEndDate 
      ? dayjs(formData.lastLeaveEndDate).format("DD/MM/YYYY") 
      : "N/A"}
  </span>
</h3>
    </div>
    <div class="col-3 col-padding dark-border  border-top-0  border-bottom-0 border-right-0 ">
    <h3 className='key'>Last No Days: <span className='value'>{formData?.lastNumberOfDayLeave} Days</span> </h3> 
    </div>
  </div>
 
  <div className="row my-5">
    <div className="col">
    {/* <h3 className='key'> <span className='value'>{employeeData?.name}{eligibleMessage}</span></h3>  */}
    </div>
</div>


{/*------------------------------------------------ For Hr Purpose only ----------------------------------------*/}
<div className="row my-2">
    <div className="col">
    <h3 className='key'>Important note:  <span className='value'>The leave application is valid only after completing the essential period as per employment contract.</span></h3> 
    </div>
</div>
  <div class="row  sign">
    <div class="col">
    <h3 className='key'>Employee signature </h3> 
    </div>
    <div class="col">
    <h3 className='key'>Finance Department </h3> 
    </div>
  </div>
  <div class="row sign1">
    <div class="col">
    <h3 className='key'>HR Department </h3> 
    </div>
    <div class="col">
    <h3 className='key'>Manager </h3> 
    </div>
  </div>
  <div class="row sign">
    <div class="col">
    <h3 className='key'>Director </h3> 
    </div>
   
  </div>

</div>
    </div>
  )

}

export default Exitforleavepdf
