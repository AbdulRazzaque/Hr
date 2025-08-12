

import React, { useState } from 'react'

import logo from '../../images/Tharblogo.png'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import moment from 'moment';
import axios from 'axios';
import config from '../auth/Config';
import solution1 from '../../images/solution1.png'
function ExportPdf() {
  const [data, setData] = useState([])
  const location = useLocation();
  const formData = location?.state?.data;
  
  console.log(formData,'formData'); // Use this data for rendering the PDF
  React.useEffect(() => {
    // ExportPdf()

    setTimeout(() => {
      window.print()
    }, 500)
  }, [])



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

     
        {/*------------------------------------------ first row start here---------------------------------------  */}
       

        {/*------------------------------------------ Second section Start Here---------------------------------------  */}



        <div className="leave-details-container">

          <div className="row   mt-4">
            <div className="col col-padding ">
              <h3 className='key'>EMPLOYEE DETAILS</h3>
            </div>

          </div>
          <div className="row dark-border ">
            <div className="col col-padding ">
              <h3 className='key text-center'>Employee Name</h3>
            </div>
            <div className="col col-padding  dark-border border-top-0 border-bottom-0 border-right-0">
              <h3 className='key text-center'>Arabic Name</h3>
            </div>
            <div className="col col-padding  dark-border border-top-0 border-bottom-0 border-right-0">
              <h3 className='key text-center'>Nationality</h3>
            </div>
            <div className="col col-padding dark-border border-top-0 border-bottom-0 border-right-0">
              <h3 className='key text-center'>Department</h3>
            </div>
            <div className="col col-padding  border-top-0 dark-border border-bottom-0 border-right-0">
              <h3 className='key text-center'> Joining date</h3>
            </div>

          </div>
          {/* {formData?.map((item, index) => ( */}
          {Array.isArray(formData) && formData.length > 0 && formData.map((item, index) => (
            <div className="leave-entry" key={index}>
              <div className="row dark-border border-top-0 border-right-0">
                <div className="col col-padding">
                  <h3 className='key text-center'><span className='value'>{item?.name}</span></h3>
                </div>
                <div className="col col-padding dark-border border-top-0 border-bottom-0">
                  <h3 className='key text-center'> <span className='value'>{item?.arabicName}</span></h3>
                </div>
                <div className="col col-padding border-top-0 border-bottom-0">
                  <h3 className='key text-center'> <span className='value'>
                    {item?.nationality}
                  </span></h3>
                </div>
                <div className="col col-padding dark-border border-right-0  border-top-0 border-bottom-0">
                  <h3 className='key text-center'> <span className='value'>
                    {item?.department}
                  </span></h3>
                </div>
                <div className="col col-padding dark-border border-top-0 border-bottom-0">
                  <h3 className='key text-center'> <span className='value'>
                    {item?.dateOfJoining?moment.parseZone(item?.dateOfJoining).local().format("DD/MM/YYYY"):""}
                  </span></h3>
                </div>
              </div>

            </div>
          ))}
        </div>

     
      </div>
    </div>
  )
}

export default ExportPdf

