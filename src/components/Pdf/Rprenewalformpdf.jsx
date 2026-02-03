import React, { useState } from 'react'
import "./PDFGenerator.scss"
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import config from '../auth/Config';
import moment from 'moment';
import PdfHeader from './PdfHeader';
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
  },[])
  React.useEffect(()=>{
    setTimeout(()=>{

      window.print();
    },1000)
  },[])
  // console.log(employeeData,'employeeData' );
  return (
    <div className="report-pdf-2">
   
                     <PdfHeader/>
                             <div className="col-12 empty_border mt-5"></div>
                             <div className='col-12'>
                               <h1 className='text-center'>RP/VISA/ Request </h1>
                             </div>
                             <div className="col-12 empty_border"></div>
                         
                      
                           <div className="row my-5 sideTitle">
                    
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

<div class="row pt-4 py-2">
  <div class="col-3 ">
    <h3 className='key'>NEW VISA : </h3> 
  </div>
  <div class="col-1">
    <span className={`value p-2 pr-5 mr-5 dark-border ${formData?.newVisaRequested === "Yes" ? "bold-yes" : ""}`}>
      {formData?.newVisaRequested}
    </span>
  </div>
</div>

<div class="row pt-4 py-2">
  <div class="col-3 ">
    <h3 className='key'>BUSINESS VISA : </h3> 
  </div>
  <div class="col-1">
    <span className={`value p-2 pr-5 mr-5 dark-border ${formData?.BusinessVisaRequested === "Yes" ? "bold-yes" : ""}`}>
      {formData?.BusinessVisaRequested}
    </span>
  </div>
</div>

<div class="row pt-4 py-2">
  <div class="col-3 ">
    <h3 className='key'>VISA TRANSFER : </h3> 
  </div>
  <div class="col-1">
    <span className={`value p-2 pr-5 mr-5 dark-border ${formData?.TransferVisaRequested === "Yes" ? "bold-yes" : ""}`}>
      {formData?.TransferVisaRequested}
    </span>
  </div>
</div>

<div class="row pt-4 py-2">
  <div class="col-3 ">
    <h3 className='key'>NEW R.P : </h3> 
  </div>
  <div class="col-1">
    <span className={`value p-2 pr-5 mr-5 dark-border ${formData?.NewRPRequested === "Yes" ? "bold-yes" : ""}`}>
      {formData?.NewRPRequested}
    </span>
  </div>
</div>

<div class="row pt-4 py-2">
  <div class="col-3 ">
    <h3 className='key'>R.P Renewal : </h3> 
  </div>
  <div class="col-1">
    <span className={`value p-2 pr-5 mr-5 dark-border ${formData?.RPRenewalRequested === "Yes" ? "bold-yes" : ""}`}>
      {formData?.RPRenewalRequested}
    </span>
  </div>
</div>

<div class="row pt-4 py-2">
  <div class="col-3 ">
    <h3 className='key'>EXIT PERMIT : </h3> 
  </div>
  <div class="col-1">
    <span className={`value p-2 pr-5 mr-5 dark-border ${formData?.exitPermitRequested === "Yes" ? "bold-yes" : ""}`}>
      {formData?.exitPermitRequested}
    </span>
  </div>
</div>

<div class="row pt-4 py-2">
  <div class="col-3 ">
    <h3 className='key'>OTHER : </h3> 
  </div>
  <div class="col-1">
    <span className={`value p-2 pr-5 mr-5 dark-border ${formData?.OthersRequested === "Yes" ? "bold-yes" : ""}`}>
      {formData?.OthersRequested}
    </span>
  </div>
</div>

{/*------------------------------------------------ For Hr Purpose only ----------------------------------------*/}

  <div class="row  sign">
    <div class="col">
    <h3 className='key comment'>Comment :- {formData.comment} </h3> 
    </div>
  
  </div>
  <div class="row  sign">
    <div class="col-8">
    <h3 className='key'>HR Department </h3> 
    </div>
    <div class="col-2">
    <h3 className='key'>Manager</h3> 
    </div>
    {/* <div class="col-2">
    <h3 className='key'>Approval</h3> 
    </div> */}
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
