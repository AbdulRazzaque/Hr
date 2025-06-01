

import React, { useState } from 'react'

import logo from '../../images/Tharblogo.png'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import moment from 'moment';
import axios from 'axios';
import config from '../auth/Config';
import solution1 from '../../images/solution1.png'
function EmployeeReportPdf() {
  const [data, setData] = useState([])
  const location = useLocation();
  const formData = location?.state?.data;
  const handleEmployeeData = async () => {

    try {
      const [response1, response2, response3, response4] = await Promise.allSettled([
        axios.get(`${config.baseUrl}/api/oneEmployee/${formData._id}`, {
          headers: { Authorization: `Bearer ${config.accessToken}` },
        }),
        axios.get(`${config.baseUrl}/api/getEmployeeByIdExitLeave/${formData._id}`, {
          headers: { Authorization: `Bearer ${config.accessToken}` },
        }),
        axios.get(`${config.baseUrl}/api/getTotalSickLeave/${formData._id}`, {
          headers: { Authorization: `Bearer ${config.accessToken}` },
        }),
        axios.get(`${config.baseUrl}/api/getEmployeeByIdWarning/${formData._id}`, {
          headers: { Authorization: `Bearer ${config.accessToken}` },
        }),
      ])

      const employeeData = response1.status === "fulfilled" ? response1?.value?.data?.employee : null
      const LeaveData = response2.status === "fulfilled" ? response2?.value?.data.allExitOfLeave : null
      const absentLeave = response3.status === "fulfilled" ? response3?.value?.data.allLeaveRecords : null
      const warning = response4.status === "fulfilled" ? response4?.value?.data.getWarning : null

      setData(
        {
          employeeData,
          LeaveData,
          absentLeave,
          warning
        }
      )
    } catch (error) {
      console.log(error)
    }

  }
  // console.log(data); // Use this data for rendering the PDF
  React.useEffect(() => {
    handleEmployeeData()

    setTimeout(() => {
      window.print()
    }, 500)
  }, [])
  console.log(data, 'Here i am Check Employee Response Data')

  const { employeeData, LeaveData, absentLeave, warning } = data

  const totalSickLeave = absentLeave?.filter((item) => item?.leaveType === "sick")
  const totalAbsentLeave = absentLeave?.filter((item) => item?.leaveType === "Absent")
  console.log(totalAbsentLeave,'totalAbsentLeave')
  const totalWarning = warning?.filter((item) => item?.warningType === "Warning")
  const totalPenalty = warning?.filter((item) => item?.warningType === "Penalty")
  // console.log(LeaveData.map((item)=>item),'leavDat')
  return (
    <div className="report-pdf-2">

      <div className="row">
        <div className="col-2 text-left">
          <div className="">
            <img src={solution1} alt="Thabr" className="pdfLogo" />

          </div>

        </div>
        

          <div className="col-8 text-center text-uppercase pdfHeading">
            <h1 >    <div className="mb-2">Solution for Health Care</div>
              <div>and medical services</div></h1>
          </div>


        <div className="col-2">

          <img src={logo} alt="Thabr" className="pdfLogo" />


        </div>
        <div className="col-12 empty_border "></div>
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
      <div className="container ">

        <div className="row  mt-4">
          <div className="col col-padding ">
            <h3 className='key'> EMPLOYEE DETAILS</h3>
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
            <h3 className='key'>Date of Birth : <span className='value'> {employeeData?.dateOfBirth?moment.parseZone(employeeData?.dateOfBirth).local().format("DD/MM/YYYY"):""}</span> </h3>
          </div>
          <div className="col col-padding dark-border  border-top-0  border-bottom-0 ">
            <h3 className='key'>Date of Joining : <span className='value'> {employeeData?.dateOfJoining?moment.parseZone(employeeData?.dateOfJoining).local().format("DD/MM/YYYY"):""}</span> </h3>
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

        <div className="row dark-border border-top-0 ">
          <div className="col col-padding">
            <h3 className='key'>Passport Number : <span className='value'>{employeeData?.passportNumber}</span> </h3>
          </div>
          <div className="col col-padding dark-border border-top-0  border-bottom-0 ">
            <h3 className='key'>Passport Expiry : <span className='value'> {employeeData?.passportDateOfExpiry? moment.parseZone(employeeData?.passportDateOfExpiry).local().format("DD/MM/YYYY"):""}</span> </h3>
          </div>
        </div>
        <div className="row dark-border border-top-0 ">
          <div className="col col-padding">
            <h3 className='key'>Qatar ID : <span className='value'>{employeeData?.qatarID}</span> </h3>
          </div>
          <div className="col col-padding dark-border border-top-0  border-bottom-0 ">
            <h3 className='key'>Qatar Expiry : <span className='value'> {employeeData?.qatarIdExpiry?moment.parseZone(employeeData?.qatarIdExpiry).local().format("DD/MM/YYYY"):""}</span> </h3>
          </div>
        </div>
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
            <h3 className='key'>Probation Date : <span className='value'>{employeeData?.probationDate?moment.parseZone(employeeData?.probationDate).local().format("DD/MM/YYYY"):""}</span> </h3>
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
            <h3 className='key'>other Amount : <span className='value'> {employeeData?.otherAmount}</span> </h3>
          </div>
        </div>
        <div className="row dark-border border-top-0">
          <div className="col col-padding">
            <h3 className='key'>Total Amount : <span className='value'>{employeeData?.BasicSalary + employeeData?.HousingAmount + employeeData?.transportationAmount + employeeData?.otherAmount}</span> </h3>
          </div>

        </div>

        <div className="leave-details-container">

          <div className="row   mt-4">
            <div className="col col-padding ">
              <h3 className='key'>LEAVE DETAILS</h3>
            </div>

          </div>
          <div className="row dark-border ">
            <div className="col col-padding ">
              <h3 className='key text-center'>Leave Type</h3>
            </div>
            <div className="col col-padding  dark-border border-top-0 border-bottom-0 border-right-0">
              <h3 className='key text-center'>Day Of Leave</h3>
            </div>
            <div className="col col-padding  dark-border border-top-0 border-bottom-0 border-right-0">
              <h3 className='key text-center'>Leave Start Date</h3>
            </div>
            <div className="col col-padding dark-border border-top-0 border-bottom-0 border-right-0">
              <h3 className='key text-center'>Leave End Date</h3>
            </div>

          </div>
          {LeaveData?.map((item, index) => (
            <div className="leave-entry" key={index}>
              <div className="row dark-border border-top-0 border-right-0">
                <div className="col col-padding">
                  <h3 className='key text-center'><span className='value'>{item?.leaveType}</span></h3>
                </div>
                <div className="col col-padding dark-border border-top-0 border-bottom-0">
                  <h3 className='key text-center'> <span className='value'>{item?.numberOfDayLeave}</span></h3>
                </div>
                <div className="col col-padding border-top-0 border-bottom-0">
                  <h3 className='key text-center'> <span className='value'>
                    {item?.leaveStartDate?moment.parseZone(item?.leaveStartDate).local().format("DD/MM/YYYY"):""}
                  </span></h3>
                </div>
                <div className="col col-padding dark-border border-top-0 border-bottom-0">
                  <h3 className='key text-center'> <span className='value'>
                    {item?.leaveEndDate?moment.parseZone(item?.leaveEndDate).local().format("DD/MM/YYYY"):""}
                  </span></h3>
                </div>
              </div>

            </div>
          ))}
        </div>

        <div className="row   mt-4">
          <div className="col col-padding ">
            <h3 className='key'>  SICK & ABSENT LEAVE DETAILS</h3>
          </div>


        </div>
        <div className="row dark-border ">
          <div className="col col-padding ">
            <h3 className='key text-center'>Leave Type</h3>
          </div>
          <div className="col col-padding  dark-border border-top-0 border-bottom-0 border-right-0">
            <h3 className='key text-center'>Day Of Leave</h3>
          </div>
          <div className="col col-padding  dark-border border-top-0 border-bottom-0 border-right-0">
            <h3 className='key text-center'>Leave Start Date</h3>
          </div>
          <div className="col col-padding dark-border border-top-0 border-bottom-0 border-right-0">
            <h3 className='key text-center'>Leave Start Date</h3>
          </div>

        </div>
        {totalSickLeave?.map((item, index) => (

          <>
            <div className="row dark-border border-top-0  border-right-0" key={index}>
              <div className="col col-padding">

                <h3 className='key text-center'><span className='value'>{item?.leaveType}</span> </h3>
              </div>
              <div className="col col-padding dark-border border-top-0  border-bottom-0 ">
                <h3 className='key text-center'> <span className='value'> {item?.totalSickLeaveDays}</span> </h3>
              </div>
              <div className="col col-padding  border-top-0  border-bottom-0  ">
                <h3 className='key text-center'> <span className='value'> {moment.parseZone(item?.leaveStartDate).local().format("DD/MM/YYYY")}</span> </h3>
              </div>
              <div className="col col-padding dark-border border-top-0  border-bottom-0 ">
                <h3 className='key text-center'> <span className='value'> {moment.parseZone(item?.leaveEndDate).local().format("DD/MM/YYYY")}</span> </h3>
              </div>
            </div>

          </>
        ))}
        {totalAbsentLeave?.map((item, index) => (

          <>
            <div className="row dark-border border-top-0  border-right-0" key={index}>
              <div className="col col-padding">

                <h3 className='key text-center'> <span className='value'>{item?.leaveType}</span> </h3>
              </div>
              <div className="col col-padding dark-border border-top-0 border-right-0 border-bottom-0 ">
                <h3 className='key text-center'> <span className='value'> {item?.totalAbsenceLeaveDays}</span> </h3>
              </div>
              <div className="col col-padding dark-border border-top-0 border-right-0 border-bottom-0 ">
                <h3 className='key text-center'> <span className='value'>  {moment.parseZone(item?.AbsenceLeaveStartDate).local().format("DD/MM/YYYY")}</span> </h3>
              </div>
              <div className="col col-padding dark-border border-top-0  border-bottom-0 ">
                <h3 className='key text-center'><span className='value'> {moment.parseZone(item?.AbsenceLeaveEndDate).local().format("DD/MM/YYYY")} </span> </h3>
              </div>
            </div>

          </>
        ))}

        <div className="row   mt-4">
          <div className="col col-padding ">
            <h3 className='key'>  WARNING & PENALTY</h3>
          </div>

        </div>

        <div className="row dark-border ">
          <div className="col col-padding ">
            <h3 className='key text-center'>Type</h3>
          </div>
          <div className="col col-padding  dark-border border-top-0 border-bottom-0 border-right-0">
            <h3 className='key text-center'>Penalty Amount</h3>
          </div>
          <div className="col col-padding  dark-border border-top-0 border-bottom-0 border-right-0">
            <h3 className='key text-center'>Date</h3>
          </div>
          <div className="col col-padding dark-border border-top-0 border-bottom-0 border-right-0">
            <h3 className='key text-center'>Subject</h3>
          </div>

        </div>
        {totalWarning?.map((item, index) => (

          <>
            <div className="row dark-border border-top-0  border-right-0" key={index}>
              <div className="col col-padding">

                <h3 className='key text-center'> <span className='value'>{item?.warningType}</span> </h3>
              </div>
              <div className="col col-padding dark-border border-top-0  border-bottom-0 ">
                <h3 className='key text-center'> <span className='value'> {item?.penaltyAmount}</span> </h3>
              </div>
              <div className="col col-padding dark-border border-right-0 border-top-0 border-left-0  border-bottom-0 ">
                <h3 className='key text-center'> <span className='value'>{moment.parseZone(item?.date).local().format("DD/MM/YYYY")}</span> </h3>
              </div>
              <div className="col col-padding dark-border border-top-0  border-bottom-0 ">
                <h3 className='key text-center'><span className='value'> {item.subject}</span> </h3>
              </div>
            </div>
            {/* <div className="row dark-border border-top-0 border-right-0 border-left-0">
    
    
   
  </div> */}
          </>
        ))}
        {totalPenalty?.map((item, index) => (

          <>
            <div className="row dark-border border-top-0  border-right-0" key={index}>
              <div className="col col-padding">

                <h3 className='key text-center'><span className='value'>{item?.warningType}</span> </h3>
              </div>
              <div className="col col-padding dark-border border-top-0 border-right-0 border-bottom-0 ">
                <h3 className='key text-center'> <span className='value'> {item?.penaltyAmount}</span> </h3>
              </div>
              <div className="col col-padding dark-border  border-top-0 border-right-0 border-bottom-0 ">
                <h3 className='key text-center'> <span className='value'>{moment.parseZone(item?.date).local().format("DD/MM/YYYY")}</span> </h3>
              </div>
              <div className="col col-padding dark-border border-top-0  border-bottom-0 ">
                <h3 className='key text-center'> <span className='value'> {item.subject}</span> </h3>
              </div>
            </div>

          </>
        ))}


        {/*------------------------------------------------ For Hr Purpose only ----------------------------------------*/}





      </div>
    </div>
  )
}

export default EmployeeReportPdf
