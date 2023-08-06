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
function Updateemployee() {
  const [display, setDisplay] = React.useState(false);

  return (
    <div className="row">
      <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
        <Dashhead id={1} display={display} />
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

        <h1 className="title text-center">Update Employee Information</h1>
        <div className="container">
 {/*------------------------------------------------------ First Row Start Here ----------------------------------------- */}
 <div class="row mt-3">
  <div class="col">
   <Link to="Employeeinfo"> 
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Update Employee Information</h5>
        <img class="card-img-top" src={updateEmployee} alt="Card image cap"></img>
      </div>
    </div>
    </Link>
  </div>
  <div class="col">
  <Link to="Endofservicesinfo"> 
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">update End of Sevices</h5>
        <img class="card-img-top" src={Endofservicesinfo} alt="Card image cap"></img>
       
      </div>
    </div>
   </Link>
  </div>
  <div class="col">
    <Link to= "Exitforleaveinfo">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">update Exit for leave</h5>
        <img class="card-img-top" src={ExitForLeave} alt="Card image cap"></img>
       
      </div>
    </div>
    </Link>
  </div>

</div>
 <div class="row mt-3">
  <div class="col">
  <Link to= "Annualsettelmentinfo">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">update Annual Settlement</h5>
        <img class="card-img-top" src={AnnualSettlement} alt="Card image cap"></img>
      </div>
    </div>
   </Link>
  </div>
  <div class="col">
    <Link to="Resumeofworkinfo">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">update Resume of work</h5>
        <img class="card-img-top" src={ResumeOfWork} alt="Card image cap"></img>
       
      </div>
    </div>
    </Link>

   
  </div>
  <div class="col">
  <Link to="Rprenewalforminfo">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Update Rp renewal</h5>
        <img class="card-img-top" src={RpREnewal} alt="Card image cap"></img>
       
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
