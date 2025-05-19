import React from 'react'
import logo from '../../images/Tharblogo.png'
import solution1 from '../../images/solution1.png'
const PdfHeader = () => {
  return (
       <div className="row align-items-center">
  
  {/* Left Image */}
  <div className="col-2">
    <img src={solution1} alt="Thabr" className="pdfLogo" />
  </div>

  {/* Center Heading */}
  <div className="col-8 text-center text-uppercase pdfHeading">
    <h1 >    <div className="mb-2">Solution for Health Care</div>
    <div>and medical services</div></h1>
  </div>

  {/* Right Image */}
  <div className="col-2 text-end">
    <img src={logo} alt="Thabr" className="pdfLogo" />
  </div>
</div>
  )
}

export default PdfHeader