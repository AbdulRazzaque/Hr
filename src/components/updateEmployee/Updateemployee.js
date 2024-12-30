import React from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead"; 
import updateEmployee from '../../images/updateEmployee.svg';
import Endofservicesinfo from '../../images/Endofservicesinfo.svg';
import ExitForLeave from '../../images/ExitForLeave.svg';
import AnnualSettlement from '../../images/AnnualSettlement.svg';
import ResumeOfWork from '../../images/ResumeOfWork.svg';
import RpREnewal from '../../images/RpREnewal.svg';
import './updateemployee.scss'
import {Link} from 'react-router-dom'
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import Backicon from "../header/Backicon";
function Updateemployee() {
  const [display, setDisplay] = React.useState(false);
  const location = useLocation();
  const infoEmployee =location?.state?.data|| null
  console.log(infoEmployee)
  return (
    <div className="row">
      <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
        <Dashhead id={2} display={display} />
      </div>

      <div
        className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container"
        onClick={() => display && setDisplay(false)}
      >
        <span className="iconbutton display-mobile">
          <IconButton
            size="large"
            aria-label="Menu"
            onClick={() => setDisplay(true)}
          >
            <MenuIcon fontSize="inherit" />
          </IconButton> 
        </span>
      
        <div className="container">
        <div>
      <Backicon/>
        <h1 className="title text-center mb-4">Update Employee Information</h1>
     </div>
          
 {/*------------------------------------------------------ First Row Start Here ----------------------------------------- */}
 <div className="row mt-3">
  <div className="col">
   <Link to="Employeeinfo"> 
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Update Employee Information</h5>
        <img className="card-img-top" src={updateEmployee} alt="Card image cap"></img>
      </div>
    </div>
    </Link>
  </div>
  <div className="col">
  <Link to="Warninginfo"> 
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">update Warning</h5>
        <img className="card-img-top" src={Endofservicesinfo} alt="Card image cap"></img>
       
      </div>
    </div>
   </Link>
  </div>
  <div className="col">
    <Link to= "Exitforleaveinfo">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">update Exit for leave</h5>
        <img className="card-img-top" src={ExitForLeave} alt="Card image cap"></img>
       
      </div>
    </div>
    </Link>
  </div>

</div>
 <div className="row mt-3">
  <div className="col">
  <Link to= "Annualsettelmentinfo">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">update Annual Settlement</h5>
        <img className="card-img-top" src={AnnualSettlement} alt="Card image cap"></img>
      </div>
    </div>
   </Link>
  </div>
  <div className="col">
    <Link to="Resumeofworkinfo">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">update Resume of work</h5>
        <img className="card-img-top" src={ResumeOfWork} alt="Card image cap"></img>
       
      </div>
    </div>
    </Link>

   
  </div>
  <div className="col">
  <Link to="Rprenewalforminfo">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Update Rp renewal</h5>
        <img className="card-img-top" src={RpREnewal} alt="Card image cap"></img>
       
      </div>
    </div>
   </Link>
  </div>

</div>
        </div>
      </div>
    </div>
  );
}

export default Updateemployee;
