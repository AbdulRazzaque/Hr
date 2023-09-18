import React from 'react'
import "./PDFGenerator.scss"
import logo from '../../images/Tharblogo.png'
function EndofServicepdf(props) {
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
            <h1 className='heading '>End of services Form</h1>
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
    <h3 className='key'> Name : <span className='value'>Abdur Razzaque Abdul Jail</span> </h3> 
    </div>
  </div>
  <div class="row dark-border">
    <div class="col col-padding">
    <h3 className='key'> Profession : <span className='value'>Software Engineer</span> </h3> 
    </div>
  </div>
  <div class="row dark-border">
    <div class="col col-padding">
    <h3 className='key'> Subject : <span className='value'> Family issues</span> </h3> 
    </div>
   
  </div>
  <div class="row dark-border">

    <div class="col col-padding dark-border  border-top-0  border-bottom-0 ">
    <h3 className='key'>Joining Date: <span className='value'>4/11/2022</span> </h3> 
    </div>
  
  </div>
  <div class="row dark-border">

    <div class="col col-padding dark-border  border-top-0  border-bottom-0 ">
    <h3 className='key'>Resuming of Last  Vaction: <span className='value'>4/11/2022</span> </h3> 
    </div>
  
  </div>

  <div class="row dark-border">
    <div class="col col-padding">
    <h3 className='key'>Last Wroking date : <span className='value'>4/11/2022</span> </h3> 
    </div>  
  </div>
  <div class="row dark-border">

    <div class="col col-padding dark-border  border-top-0  border-bottom-0 ">
    <h3 className='key'>Other: <span className='value'>is simply dummy text of the printing and typesetting industry.</span> </h3> 
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

export default EndofServicepdf
