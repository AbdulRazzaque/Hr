import React from 'react'
import "./PDFGenerator.scss"
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import moment from 'moment';
import PdfHeader from './PdfHeader';

function Newemployeepdf() {
    const location = useLocation();
    const formData = location.state?.data;
    console.log(formData); // Use this data for rendering the PDF
    React.useEffect(()=>{
      setTimeout(()=>{

        window.print();
      },500)
    },[])
  return (
    <div className="report-pdf-2">
                      <PdfHeader/>
                            
                              <div className="col-12 empty_border mt-5"></div>
                              <div className='col-12'>
                                <h1 className='text-center'>EMPLOYEE JOINING FORM (THARB CAMEL HOSPITAL)</h1>
                              </div>
                              <div className="col-12 empty_border"></div>
                          
                            <div className="row my-5 sideTitle">
                       
                         <div className="col text-right mr-5">
                           <h2>
                             <b >Date:</b> <span >{moment.parseZone(formData?.createdAt).local().format("DD/MM/YYYY")}</span>
                   
                           </h2>
                         </div>
                       </div>
        <div className="container">
  <div className="row dark-border">
    <div className="col first-section">
    PERSONAL DETAILS
    </div>
   
  </div>
{/*------------------------------------------ first row start here---------------------------------------  */}
  <div className="row dark-border">
    <div className="col col-padding">
    <h3 className='key'> Name : <span className='value'>{formData.name}</span> </h3> 
    </div>
  </div>

  <div className="row dark-border">
    <div className="col col-padding">
    <h3 className='key'>Date of Birth : <span className='value'> {formData.dateOfBirth ? moment.parseZone(formData.dateOfBirth).local().format("DD/MM/YYYY"):"" }</span> </h3> 
    </div>
    <div className="col col-padding dark-border  border-top-0  border-bottom-0 ">
    <h3 className='key'>Date of Joining : <span className='value'> {formData.dateOfJoining ? moment.parseZone(formData.dateOfJoining).local().format("DD/MM/YYYY"):"" }</span> </h3> 
    </div>
  </div>
  <div className="row dark-border">
    <div className="col col-padding">
    <h3 className='key'>Mobile Number : <span className='value'>{formData.mobileNumber}</span> </h3> 
    </div>
    <div className="col col-padding dark-border  border-top-0  border-bottom-0">
    <h3 className='key'>Marital Status: <span className='value'>{formData.maritalStatus}</span> </h3> 
    </div>
    
  </div>
  <div className="row dark-border">
    <div className="col col-padding">
    <h3 className='key'> Nationality : <span className='value'>{formData.nationality}</span> </h3> 
    </div>
  </div>
{/*---------------------------------- Passport Section start Here --------------------------------------*/}
<div className="row dark-border mt-5">
    <div className="col first-section">
    PASSPORT DETAILS
    </div>
  </div>
  <div className="row dark-border">
    <div className="col col-padding">
    <h3 className='key'>Passport No : <span className='value'>{formData.passportNumber}</span> </h3> 
    </div>
    <div className="col col-padding dark-border border-top-0  border-bottom-0">
    <h3 className='key'>Date of Issue : <span className='value'> {formData.passportDateOfIssue? moment.parseZone(formData.passportDateOfIssue).local().format("DD/MM/YYYY"):"" }</span> </h3> 
    </div>
  </div>
  <div className="row dark-border">
    {/* <div className="col col-padding border-top-0  border-bottom-0">
    <h3 className='key'>Place Of Issue : <span className='value'>1234567890</span> </h3> 
    </div> */}
    <div className="col col-padding dark-border border-top-0  border-bottom-0">
    <h3 className='key'>Date Of Expiry : <span className='value'> {formData.passportDateOfExpiry ?moment.parseZone(formData.passportDateOfExpiry).local().format("DD/MM/YYYY") :""}</span> </h3> 
    </div>
  </div>
{/*------------------------------------------------ For Hr Purpose only ----------------------------------------*/}
  <div className="row dark-border mt-5">
    <div className="col first-section">
        FOR HR PURPOSE ONLY
    </div>
  </div>
  <div className="row dark-border">
    <div className="col col-padding">
    <h3 className='key'>Employee No : <span className='value'>{formData.employeeNumber}</span> </h3> 
    </div>
    <div className="col col-padding dark-border border-top-0  border-bottom-0">
    <h3 className='key'>Position : <span className='value'>{formData.position}</span> </h3> 
    </div>
  </div>
  <div className="row  sign">
    <div className="col">
    <h3 className='key'>Employee signature </h3> 
    </div>
    <div className="col">
    <h3 className='key'> Finance Department </h3> 
    </div>
  </div>
  <div className="row sign1">
    <div className="col">
    <h3 className='key'> HR Department</h3> 
    </div>
    <div className="col">
    <h3 className='key'>Director </h3> 
    </div>
  </div>

</div>
    </div>
  )
}

export default Newemployeepdf
