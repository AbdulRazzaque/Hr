import React, { useState } from 'react'
import "./PDFGenerator.scss"

import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import config from '../auth/Config';
import moment from 'moment';
import PdfHeader from './PdfHeader';
function EndofServicepdf() {
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
  console.log(employeeData,'employeeData'  );
  return (
    <div className="report-pdf-2">
               <PdfHeader/>
                                     <div className="col-12 empty_border mt-5"></div>
                                     <div className='col-12'>
                                       <h1 className='text-center'>End Of Service</h1>
                                     </div>
                                     <div className="col-12 empty_border"></div>
                                 
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
<div class="row dark-border">
    <div class="col col-padding">
    <h3 className='key'> To : <span className='value'>Accounting & Finance</span> </h3> 
    </div>
   
  </div>
  <div class="row dark-border">
    <div class="col col-padding">
    <h3 className='key'> From : <span className='value'>HR Department</span> </h3> 
    </div>
   
  </div>
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
    <h3 className='key'> Employee Number : <span className='value'> {employeeData?.employeeNumber}</span> </h3> 
    </div>
   
  </div>

  <div class="row dark-border">

<div class="col col-padding dark-border  border-top-0  border-bottom-0 ">
<h3 className='key'>Joining Date: <span className='value'>{moment.parseZone(employeeData?.dateOfJoining).local().format("DD/MM/YYYY") }</span> </h3> 
</div>

</div>
  <div class="row dark-border">
    <div class="col col-padding">
    <h3 className='key'> Nationality : <span className='value'>{employeeData?.nationality}</span> </h3> 
    </div>
  </div>


  <div class="row dark-border mt-5">
    <div class="col first-section">
    Exit  Details
    </div>
   
  </div>
  <div class="row dark-border">
    <div class="col col-padding">
    <h3 className='key'> Exit Type : <span className='value'> {formData.exitType}</span> </h3> 
    </div>
   
  </div>

  <div class="row dark-border mt-5">
    <div class="col first-section">
    Employee Work Info
    </div>
   
  </div>

  <div class="row dark-border">

    <div class="col col-padding dark-border  border-top-0  border-bottom-0 ">
    <h3 className='key'>Resuming of Last vocation: <span className='value'>{moment.parseZone(formData.resumingofLastVacation).local().format("DD/MM/YYYY")}</span> </h3> 
    </div>
  
  </div>

  <div class="row dark-border">
    <div class="col col-padding">
    <h3 className='key'>Last Working date : <span className='value'>{formData.lastWorkingDate ? moment.parseZone(formData.lastWorkingDate).local().format("DD/MM/YYYY") : null}</span> </h3> 
    </div>  
  </div>
  <div class="row dark-border">

    <div class="col col-padding dark-border  border-top-0  border-bottom-0 ">
    <h3 className='key'>Other: <span className='value'>{formData.other}</span> </h3> 
    </div>
  
  </div>
  <div class="row dark-border">

    <div class="col col-padding dark-border  border-top-0  border-bottom-0 ">
    <h3 className='key'>Subject: <span className='value'>{formData.subject}</span> </h3> 
    </div>
  
  </div>

{/*------------------------------------------------ For Hr Purpose only ----------------------------------------*/}

  <div class="row  sign">
    <div class="col">
    <h3 className='key'>HR Department </h3> 
    </div>
    <div class="col">
    <h3 className='key'> Manager </h3> 
    </div>
  </div>


</div>
    </div>
  )
}

export default EndofServicepdf
