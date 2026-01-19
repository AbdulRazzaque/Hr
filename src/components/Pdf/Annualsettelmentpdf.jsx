import React, { useState } from 'react'
import "./PDFGenerator.scss"
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import config from '../auth/Config';
import moment from 'moment';
import PdfHeader from './PdfHeader';
function Annualsettelmentpdf() {
 
  const [employeeData, setEmployeeData] = useState(null);
 
    const location = useLocation();
    const formData = location.state?.data;
      console.log(formData,'Annual Settle')


    React.useEffect(()=>{
   if(formData?.employeeId){
    // Fetch data from backend

    const fetchEmployeeData = async()=>{
      try {
        const response = await axios.get(`${config.baseUrl}/api/oneEmployee/${formData?.employeeId}`)
       
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
      },800)
    },[])

    console.log(employeeData,'employeeData')
  return (
    <div className="report-pdf-2">
      <PdfHeader/>
                     <div className="col-12 empty_border mt-5"></div>
                     <div className='col-12'>
                       <h1 className='text-center'>Annual settlement</h1>
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
    Leave Details
    </div>
   
  </div>
{/*------------------------------------------ first row start here---------------------------------------  */}
<div class="row dark-border">
    <div class="col col-padding">
    <h3 className='key'> To : <span className='value'>{formData?.to}</span> </h3> 
    </div>
   
  </div>
  <div class="row dark-border">
    <div class="col col-padding">
    <h3 className='key'> From : <span className='value'>{formData?.from}</span> </h3> 
    </div>
   
  </div>
  <div class="row dark-border">
    <div class="col col-padding">
    <h3 className='key'> Name : <span className='value'>{employeeData?.name}</span> </h3> 
    </div>
  </div>
  <div class="row dark-border">
    <div class="col col-padding">
    <h3 className='key'> Position : <span className='value'>{employeeData?.position}</span> </h3> 
    </div>
  </div>
  <div class="row dark-border">
    <div class="col-5 col-padding">
    <h3 className='key'>Joining Date : <span className='value'>{employeeData?.dateOfJoining ? moment(employeeData?.dateOfJoining).local().format("DD/MM/YYYY"):""}</span> </h3> 
    </div>
  </div>
  <div class="row dark-border">
    <div class="col col-padding">
    <h3 className='key'> Subject : <span className='value'>{formData?.subject}</span> </h3> 
    </div>
   
  </div>
 

  <div class="row dark-border">
    <div class="col-5 col-padding">
    <h3 className='key'>Start Leave Date: <span className='value'>{formData?.leaveStartDate ?new Date(formData.leaveStartDate).toLocaleDateString('en-GB'):"N/A"}</span> </h3> 
    </div>
  </div>
  
  <div class="row dark-border">
    <div class="col-5 col-padding">
    <h3 className='key'>Resuming of Last Vacation : <span className='value'>{formData?.resumingVacation? new Date(formData.resumingVacation).toLocaleDateString("en-GB"):"N/A"}</span> </h3> 
    </div>
  </div>
{/*------------------------------------------------ For Hr Purpose only ----------------------------------------*/}
  <div class="row  sign">
    <div class="col-8">
    <h3 className='key'>HR Department  </h3> 
    </div>
    <div class="col-4">
    <h3 className='key'>Director </h3> 
    </div>
  </div>
  {/* <div class="row sign1">
    <div class="col">
    <h3 className='key'> </h3> 
    </div>
    <div class="col">
    <h3 className='key'>Employee signature  </h3> 
    </div>
  </div> */}

</div>
    </div>
  )
}

export default Annualsettelmentpdf
