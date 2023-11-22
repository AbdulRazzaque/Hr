import React from 'react'
import "./PDFGenerator.scss"
import logo from '../../images/Tharblogo.png'
function Rprenewalformpdf(props) {
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
            <h1 className='heading '>Rp Renewal </h1>
           </div>
           <div className="TodayDate">
            <h3>20/3/2023</h3>
            </div>
        </section>

        <div class="container">
  <div class="row dark-border">
    <div class="col first-section">
    Employee Details
    </div>
   
  </div>
{/*------------------------------------------ first row start here---------------------------------------  */}
  <div class="row dark-border">
    <div class="col col-padding">
    <h3 className='key'> REF NO : <span className='value'>123456789</span> </h3> 
    </div>

  </div>
  <div class="row dark-border">
    <div class="col col-padding">
    <h3 className='key'> To : <span className='value'>IMMIGRATON DEPARTMENT</span> </h3> 
    </div>
  </div>
  <div class="row dark-border">
    <div class="col col-padding">
    <h3 className='key'>Name : <span className='value'>Abdur Razzaque Abdul Jalil</span> </h3> 
    </div>
   
  </div>

  <div class="row dark-border">
    <div class="col-5 col-padding">
    <h3 className='key'>ID : <span className='value'>2123444</span> </h3> 
    </div>
  </div>
  <div class="row my-5">
    <div class="col col-padding">
    <h3 className='key'>Note :- <span className='value'>Kindly arrange the attached documents as per mark below</span></h3> 
    </div>
  </div>

  <div class="row mt-5 my-2">
    <div class="col-3 ">
    <h3 className='key'>NEW VISA : </h3> 
    </div>
    <div class="col-1">
     <span className='value dark-border p-2 pr-5 mr-5'>OK</span>
    </div>
  </div>
  <div class="row mt-5 my-2">
    <div class="col-3 ">
    <h3 className='key'>BUSINESS VISA : </h3> 
    </div>
    <div class="col-1">
     <span className='value dark-border p-2 pr-5 mr-5'>OK</span>
    </div>
  </div>
  <div class="row mt-5 my-2">
    <div class="col-3 ">
    <h3 className='key'>VISA TRANSFER : </h3> 
    </div>
    <div class="col-1">
     <span className='value dark-border p-2 pr-5 mr-5'>OK</span>
    </div>
  </div>
  <div class="row mt-5 my-2">
    <div class="col-3 ">
    <h3 className='key'>NEW R.P : </h3> 
    </div>
    <div class="col-1">
     <span className='value dark-border p-2 pr-5 mr-5'>OK</span>
    </div>
  </div>
  <div class="row mt-5 my-2">
    <div class="col-3 ">
    <h3 className='key'>EXIT PERMIT : </h3> 
    </div>
    <div class="col-1">
     <span className='value dark-border p-2 pr-5 mr-5'>OK</span>
    </div>
  </div>
  <div class="row mt-5 my-2">
    <div class="col-3 ">
    <h3 className='key'>OTHER : </h3> 
    </div>
    <div class="col-1">
     <span className='value dark-border p-2 pr-5 mr-5'>OK</span>
    </div>
  </div>

{/*------------------------------------------------ For Hr Purpose only ----------------------------------------*/}

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

export default Rprenewalformpdf
