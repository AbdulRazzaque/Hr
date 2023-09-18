import React from 'react'
import "./PDFGenerator.scss"
import logo from '../../images/Tharblogo.png'
function Newemployeepdf(props) {
    console.log(props)
    let details = props.location.state;
    React.useEffect(()=>{
        window.print();
    },[])
  return (
    <div className="report-pdf-2">
        <section className="row m-auto container-first align-items-center">
            <div className="col-4 cont-1">
            <img src={logo} alt="tharb" />
            </div>
           <div>
            <h1 className='heading'> Joinnig Form</h1>
           </div>
        
        </section>
        {/* <div class="row">
            <div class="col-md-12">
            <div class="border dark-border mt-5">
            <h3 className='key'>Name: <span className='value'>Abdur Razzaque Abdul Jalil </span></h3>
            </div>
            <div class="borders border dark-border">
            <h3 className='key'>Name: <span className='value'>Abdur Razzaque Abdul Jalil </span></h3>
            </div>
            </div>
        </div> */}
        <div class="container">
  <div class="row dark-border">
    <div class="col first-section">
    PERSONAL DETAILS
    </div>
   
  </div>
{/*------------------------------------------ first row start here---------------------------------------  */}
  <div class="row dark-border">
    <div class="col col-padding">
    <h3 className='key'> Name : <span className='value'>Abdur Razzaque Abdul Jail</span> </h3> 
    </div>
  </div>

  <div class="row dark-border">
    <div class="col col-padding">
    <h3 className='key'>Date of Birth : <span className='value'>19/11/1999</span> </h3> 
    </div>
    <div class="col col-padding dark-border  border-top-0  border-bottom-0 ">
    <h3 className='key'>Date of Joining : <span className='value'>4/11/2022</span> </h3> 
    </div>
  </div>
  <div class="row dark-border">
    <div class="col col-padding">
    <h3 className='key'>Mobile Number : <span className='value'>779982</span> </h3> 
    </div>
    <div class="col col-padding dark-border  border-top-0  border-bottom-0">
    <h3 className='key'>Marital Status: <span className='value'>Single</span> </h3> 
    </div>
    
  </div>
  <div class="row dark-border">
    <div class="col col-padding">
    <h3 className='key'> Nationality : <span className='value'>India</span> </h3> 
    </div>
  </div>
{/*---------------------------------- Passport Section start Here --------------------------------------*/}
<div class="row dark-border mt-5">
    <div class="col first-section">
    PERSONAL DETAILS
    </div>
  </div>
  <div class="row dark-border">
    <div class="col col-padding">
    <h3 className='key'>Passport No : <span className='value'>1234567890</span> </h3> 
    </div>
    <div class="col col-padding dark-border border-top-0  border-bottom-0">
    <h3 className='key'>Date of Issue : <span className='value'>4/11/2022</span> </h3> 
    </div>
  </div>
  <div class="row dark-border">
    <div class="col col-padding border-top-0  border-bottom-0">
    <h3 className='key'>Place Of Issue : <span className='value'>1234567890</span> </h3> 
    </div>
    <div class="col col-padding dark-border border-top-0  border-bottom-0">
    <h3 className='key'>Date Of Expiry : <span className='value'>4/11/2022</span> </h3> 
    </div>
  </div>
{/*------------------------------------------------ For Hr Purpose only ----------------------------------------*/}
  <div class="row dark-border mt-5">
    <div class="col first-section">
        FOR HR PURPOSE ONLYE
    </div>
  </div>
  <div class="row dark-border">
    <div class="col col-padding">
    <h3 className='key'>Employee No : <span className='value'>1234</span> </h3> 
    </div>
    <div class="col col-padding dark-border border-top-0  border-bottom-0">
    <h3 className='key'>Position : <span className='value'>Software Engineer</span> </h3> 
    </div>
  </div>
  <div class="row  sign">
    <div class="col">
    <h3 className='key'>Finance Department </h3> 
    </div>
    <div class="col">
    <h3 className='key'>HR Department  </h3> 
    </div>
  </div>
  <div class="row sign1">
    <div class="col">
    <h3 className='key'>Manager </h3> 
    </div>
    <div class="col">
    <h3 className='key'>Employee signature  </h3> 
    </div>
  </div>

</div>
    </div>
  )
}

export default Newemployeepdf
