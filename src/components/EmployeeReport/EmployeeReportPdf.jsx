

import React, { useState } from 'react'

import logo from '../../images/Tharblogo.png'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import moment from 'moment';
import axios from 'axios';
import config from '../auth/Config';
function EmployeeReportPdf() {
  const [data,setData]= useState([])
    const location = useLocation();
    const formData = location?.state?.data;
    const handleEmployeeData = async()=>{

      try {
        const [response1] = await Promise.allSettled([
          axios.get(`${config.baseUrl}/api/oneEmployee/${formData._id}`,{
            headers:{Authorization: `Bearer ${config.accessToken}`},
          }),
        ])

        const employeeData = response1.status === "fulfilled" ?response1?.value?.data?.employee:null
        setData(
          {employeeData}
        )
      } catch (error) {
        console.log(error)
      }
  
    }
    // console.log(data); // Use this data for rendering the PDF
    React.useEffect(()=>{
      handleEmployeeData()
        // window.print();
    },[])
    // console.log(data,'Here i am Check Employee Response Data')
    const {employeeData} =data
    console.log(employeeData,'Here i am check employee Data')
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
                                <h1 className='text-center'>EMPLOYEE REPORT</h1>
                              </div>
                              <div className="col-12 empty_border"></div>
                          
                            </div>
                            <div className="row my-5 sideTitle">
                       
                         <div className="col text-right mr-5">
                           <h2>
                             <b >Date:</b> <span >{moment.parseZone().local().format("DD/MM/YYYY")}</span>
                   
                           </h2>
                         </div>
                       </div>
        <div className="container">
  <div className="row dark-border">
    <div className="col first-section">
    EMPLOYEE DETAILS
    </div>
   
  </div>
{/*------------------------------------------ first row start here---------------------------------------  */}
  <div className="row dark-border">
    <div className="col col-padding">
    <h3 className='key'> Name : <span className='value'>{employeeData?.name}</span> </h3> 
    </div>
  </div>

  <div className="row dark-border border-top-0">
    <div className="col col-padding">
    <h3 className='key'>Date of Birth : <span className='value'> {moment.parseZone(employeeData?.dateOfBirth).local().format("DD/MM/YYYY") }</span> </h3> 
    </div>
    <div className="col col-padding dark-border  border-top-0  border-bottom-0 ">
    <h3 className='key'>Date of Joining : <span className='value'> {moment.parseZone(employeeData?.dateOfJoining).local().format("DD/MM/YYYY") }</span> </h3> 
    </div>
  </div>
  <div className="row dark-border border-top-0">
    <div className="col col-padding">
    <h3 className='key'>Mobile Number : <span className='value'>{employeeData?.mobileNumber}</span> </h3> 
    </div>
    <div className="col col-padding dark-border  border-top-0  border-bottom-0">
    <h3 className='key'>Marital Status: <span className='value'>{employeeData?.maritalStatus}</span> </h3> 
    </div>
    
  </div>
  <div className="row dark-border border-top-0">
    <div className="col col-padding">
    <h3 className='key'> Nationality : <span className='value'>{employeeData?.nationality}</span> </h3> 
    </div>
    <div className="col col-padding dark-border  border-top-0  border-bottom-0">
    <h3 className='key'>Employee Number : <span className='value'>{employeeData?.employeeNumber}</span> </h3> 
    </div>
  </div>

{/*------------------------------------------ Second section Start Here---------------------------------------  */}

  
  <div className="row dark-border border-top-0">
    <div className="col col-padding">
    <h3 className='key'> Department : <span className='value'>{employeeData?.department}</span> </h3> 
    </div>
    <div className="col col-padding dark-border  border-top-0  border-bottom-0">
    <h3 className='key'>Position: <span className='value'>{employeeData?.position}</span> </h3> 
    </div>
  </div>

 
  
  <div className="row dark-border border-top-0">
    <div className="col col-padding">
    <h3 className='key'> Visa Type : <span className='value'>{employeeData?.visaType}</span> </h3> 
    </div>
  </div>

  
  <div className="row   dark-border  border-top-0  border-bottom-0">
    <div className="col col-padding">
    <h3 className='key'> Probation Month : <span className='value'>{employeeData?.probationMonthofNumber}</span> </h3> 
    </div>
    <div className="col  col-padding dark-border  border-top-0  border-bottom-0">
    <h3 className='key'>Probation Amount: <span className='value'>{employeeData?.probationAmount}</span> </h3> 
    </div>
  </div>
  <div className="row dark-border">
    <div className="col col-padding">
    <h3 className='key'>Probation Date : <span className='value'>{moment.parseZone(employeeData?.probationDate).local().format("DD/MM/YYYY") }</span> </h3> 
    </div>
    
  </div>
  
{/*---------------------------------- Passport Section start Here --------------------------------------*/}

  <div className="row dark-border border-top-0  border-bottom-0">
    <div className="col col-padding">
    <h3 className='key'>Basic Salary : <span className='value'>{employeeData?.BasicSalary}</span> </h3> 
    </div>
    <div className="col col-padding dark-border border-top-0  border-bottom-0">
    <h3 className='key'>Housing Amount : <span className='value'> {employeeData?.HousingAmount}</span> </h3> 
    </div>
  </div>
  <div className="row dark-border">
    <div className="col col-padding">
    <h3 className='key'>Transportation Amount : <span className='value'>{employeeData?.transportationAmount}</span> </h3> 
    </div>
    <div className="col col-padding dark-border border-top-0  border-bottom-0">
    <h3 className='key'>other Amount : <span className='value'> {employeeData?.otherAmount }</span> </h3> 
    </div>
  </div>
  <div className="row dark-border border-top-0 ">
    <div className="col col-padding">
    <h3 className='key'>Passport Number : <span className='value'>{employeeData?.passportNumber}</span> </h3> 
    </div>
    <div className="col col-padding dark-border border-top-0  border-bottom-0 ">
    <h3 className='key'>Passport Expiry : <span className='value'> {moment.parseZone(employeeData?.passportDateOfExpiry).local().format("DD/MM/YYYY") }</span> </h3> 
    </div>
  </div>
  <div className="row dark-border border-top-0 ">
    <div className="col col-padding">
    <h3 className='key'>Qatar ID : <span className='value'>{employeeData?.qatarID}</span> </h3> 
    </div>
    <div className="col col-padding dark-border border-top-0  border-bottom-0 ">
    <h3 className='key'>Qatar Expiry : <span className='value'> {moment.parseZone(employeeData?.qatarIdExpiry).local().format("DD/MM/YYYY") }</span> </h3> 
    </div>
  </div>
 
{/*------------------------------------------------ For Hr Purpose only ----------------------------------------*/}
 




</div>
    </div>
  )
}

export default EmployeeReportPdf
