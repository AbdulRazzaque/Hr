import React, { useState } from 'react'
import "./PDFGenerator.scss"
import logo from '../../images/Tharblogo.png'
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import config from '../auth/Config';
import moment from 'moment';
function Resumeofworkpdf() {
  const [employeeData, setEmployeeData] = useState(null);

  const location = useLocation();
  const formData = location.state?.data;
    console.log(formData)

  React.useEffect(()=>{
 if(formData.employeeId){
  // Fetch data from backend

  const fetchEmployeeData = async()=>{
    try {
      const response = await axios.get(`${config.baseUrl}/api/oneEmployee/${formData.employeeId}`)
     
      setEmployeeData(response.data.employee)
    } catch (error) {
      console.log(error)
      
    }
  }
  fetchEmployeeData()
 }
      // window.print();
  },[])
  // let details = props.location.state;
  React.useEffect(()=>{
    setTimeout(()=>{

      window.print();
    },1000)
  },[])


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
                           <h1 className='text-center'>Resume of work </h1>
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
                        <b >Date:</b> <span >{moment.parseZone(formData.createdAt).local().format("DD/MM/YYYY")}</span>
              
                      </h2>
                    </div>
                  </div>

        <div class="container">
  <div class="row dark-border">
    <div class="col first-section">
    Leave DETAILS
    </div>
   
  </div>
{/*------------------------------------------ first row start here---------------------------------------  */}
  <div class="row dark-border">
    <div class="col col-padding">
    <h3 className='key'> Name : <span className='value'>{employeeData?.name}</span> </h3> 
    </div>
    <div class="col col-padding dark-border border-top-0 border-bottom-0 border-right-0">
    <h3 className='key'> Employee No : <span className='value'>{employeeData?.employeeNumber}</span> </h3> 
    </div>
  </div>
 
  <div class="row dark-border">
    <div class="col col-padding">
    <h3 className='key'> Nationality : <span className='value'>{employeeData?.nationality}</span> </h3> 
    </div>
   
  </div>

  <div class="row dark-border">
    <div class="col-5 col-padding">
    <h3 className='key'>Leave Start Date : <span className='value'>{moment.parseZone(formData?.leaveStartDate).local().format("DD/MM/YYYY")}</span> </h3> 
    </div>
  </div>
  <div class="row dark-border">
    <div class="col-5 col-padding">
    <h3 className='key'> Leave End Date: <span className='value'>{moment.parseZone(formData?.leaveEndDate).local().format("DD/MM/YYYY")}</span> </h3> 
    </div>
  </div>
  <div class="row dark-border">
    <div class="col-5 col-padding">
    <h3 className='key'>Resume Of Work Date : <span className='value'>{moment.parseZone(formData?.resumeOfWorkDate).local().format("DD/MM/YYYY")}</span> </h3> 
    </div>
  </div>
  <div class="row dark-border">
    <div class="col col-padding">
    <h3 className='key'>Comments : <span className='value'>{formData?.comment}</span> </h3> 
    </div>
  </div>
 




{/*------------------------------------------------ For Hr Purpose only ----------------------------------------*/}

  <div class="row  sign">
    <div class="col">
    <h3 className='key'>Employee signature</h3> 
    </div>
    <div class="col">
    <h3 className='key'>HR Department  </h3> 
    </div>
  </div>
  <div class="row sign1">
    <div class="col">
    <h3 className='key'>Manager </h3> 
    </div>
    {/* <div class="col">
    <h3 className='key'>Employee signature</h3> 
    </div> */}
  </div>

</div>
    </div>
  )
}

export default Resumeofworkpdf
