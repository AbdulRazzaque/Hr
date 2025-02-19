import React, { useState } from 'react'
import "./PDFGenerator.scss"
import logo from '../../images/Tharblogo.png'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import config from '../auth/Config';
import moment from 'moment';
function Rprenewalformpdf() {
 
  const [employeeData, setEmployeeData] = useState(null);

  const location = useLocation();
  const formData = location.state?.data;
    console.log(formData,'formData');

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
  // console.log(employeeData,'employeeData' );
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
                               <h1 className='text-center'>RP Renewal  </h1>
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
                            <b >Date:</b> <span >{moment.parseZone(formData?.createdAt).local().format("DD/MM/YYYY")}</span>
                  
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
  {/* <div class="row dark-border">
    <div class="col col-padding">
    <h3 className='key'> REF NO : <span className='value'>123456789</span> </h3> 
    </div>

  </div> */}
  {/* <div class="row dark-border">
    <div class="col col-padding">
    <h3 className='key'> To : <span className='value'>IMMIGRATION DEPARTMENT</span> </h3> 
    </div>
  </div> */}
  <div class="row dark-border">
    <div class="col col-padding">
    <h3 className='key'>Name : <span className='value'>{employeeData?.name}</span> </h3> 
    </div>
   
  </div>
  <div class="row dark-border">
    <div class="col col-padding">
    <h3 className='key'>Employee Number : <span className='value'>{employeeData?.employeeNumber}</span> </h3> 
    </div>
   
  </div>
  <div class="row dark-border">
    <div class="col col-padding">
    <h3 className='key'>Department : <span className='value'>{employeeData?.department}</span> </h3> 
    </div>
   
  </div>

  <div class="row dark-border">
    <div class="col-5 col-padding">
    <h3 className='key'>nationality : <span className='value'>{employeeData?.nationality}</span> </h3> 
    </div>
  </div>
  <div class="row dark-border">
    <div class="col-5 col-padding">
    <h3 className='key'>Qatar ID : <span className='value'>{employeeData?.qatarID}</span> </h3> 
    </div>
  </div>
  <div class="row dark-border">
    <div class="col-5 col-padding">
    <h3 className='key'>Passport Number : <span className='value'>{employeeData?.passportNumber}</span> </h3> 
    </div>
  </div>
  {/* <div class="row my-5">
    <div class="col col-padding">
    <h3 className='key'>Note :- <span className='value'>Kindly arrange the attached documents as per mark below</span></h3> 
    </div>
  </div> */}

  <div class="row pt-4 py-2">
    <div class="col-3 ">
    <h3 className='key'>NEW VISA : </h3> 
    </div>
    <div class="col-1">
     <span className='value  p-2 pr-5 mr-5'>{formData?.RPRenewalRequested}</span>
    </div>
  </div>
  <div class="row pt-4 py-2">
    <div class="col-3 ">
    <h3 className='key'>BUSINESS VISA : </h3> 
    </div>
    <div class="col-1">
     <span className='value p-2 pr-5 mr-5'>{formData?.BusinessVisaRequested}</span>
    </div>
  </div>
  <div class="row pt-4 py-2">
    <div class="col-3 ">
    <h3 className='key'>VISA TRANSFER : </h3> 
    </div>
    <div class="col-1">
     <span className='value p-2 pr-5 mr-5'>{formData?.TransferVisaRequested}</span>
    </div>
  </div>
  <div class="row pt-4 py-2">
    <div class="col-3 ">
    <h3 className='key'>NEW R.P : </h3> 
    </div>
    <div class="col-1">
     <span className='value  p-2 pr-5 mr-5'>{formData?.NewRPRequested}</span>
    </div>
  </div>
  <div class="row pt-4 py-2">
    <div class="col-3 ">
    <h3 className='key'>R.P Renewal : </h3> 
    </div>
    <div class="col-1">
     <span className='value  p-2 pr-5 mr-5'>{formData?.RPRenewalRequested}</span>
    </div>
  </div>
  <div class="row pt-4 py-2">
    <div class="col-3 ">
    <h3 className='key'>EXIT PERMIT : </h3> 
    </div>
    <div class="col-1">
     <span className='value  p-2 pr-5 mr-5'>{formData?.exitPermitRequested}</span>
    </div>
  </div>
  <div class="row pt-4 py-2">
    <div class="col-3 ">
    <h3 className='key'>OTHER : </h3> 
    </div>
    <div class="col-1">
     <span className='value  p-2 pr-5 mr-5'>{formData?.OthersRequested}</span>
    </div>
  </div>

{/*------------------------------------------------ For Hr Purpose only ----------------------------------------*/}

  <div class="row  sign">
    <div class="col">
    <h3 className='key'>Comment :- {formData.comment} </h3> 
    </div>
  
  </div>
  <div class="row  sign">
    <div class="col">
    <h3 className='key'>HR Department </h3> 
    </div>
    <div class="col">
    <h3 className='key'>Manager</h3> 
    </div>
  </div>
  {/* <div class="row sign1">
    <div class="col">
    <h3 className='key'>Manager </h3> 
    </div>
    <div class="col">
    <h3 className='key'>Employee signature  </h3> 
    </div>
  </div> */}

</div>
    </div>
  )
}

export default Rprenewalformpdf
