import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead"; 
import Groups2Icon from '@mui/icons-material/Groups2';
import './dashboard.scss'
import { Link } from "react-router-dom";
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import ReportIcon from '@mui/icons-material/Report';
import NextWeekIcon from '@mui/icons-material/NextWeek';
import Header from "../header/Header";
import axios from "axios";
function Dashboard() {
  const [display, setDisplay] = React.useState(false);
  const [activeEmployee,setActiveEmployee] = useState([])

  const url = process.env.REACT_APP_DEVELOPMENT;
  const getTotalActiveEmployees =()=>{
    try {
      axios.get(`${url}/api/getTotalActiveEmployees`)
      .then((response)=>{
        setActiveEmployee(response.data.totalActiveEmployees)
      }).catch(err=>console.log(err))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getTotalActiveEmployees()
  },[])

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

        <h1 className="title text-center">Dashboard</h1>
        <div className="container">

    

<Header/>
          
 {/*------------------------------------------------------ First Row Start Here ----------------------------------------- */}
 <div className="row mt-5">
  <div className="col">
  <Link to ="/Home">
  <div className="dashboard-card">
  <div className="dashboard-card-header">
    <h2 className="dashboard-card-title text-capitalize">Total Employee</h2>
  </div>
  <div className="dashboard-card-content py-3">
    <div className="dashboard-card-icon">
      <Groups2Icon className="dashboard-icon"/>
    </div>
    <div className="dashboard-card-data">
      <span className="dashboard-card-count">{activeEmployee}</span>
     
    </div>
  </div>
</div>
</Link>
  </div>
  <div className="col">
    <Link to ="/Leftemployee">
    <div className="dashboard-card">
  <div className="dashboard-card-header">
    <h2 className="dashboard-card-title">Total Left Employee</h2>
  </div>
  <div className="dashboard-card-content py-3">
    <div className="dashboard-card-icon">
      <TransferWithinAStationIcon className="dashboard-icon"/>
    </div>
    <div className="dashboard-card-data">
      <span className="dashboard-card-count">60</span>
     
    </div>
  </div>
</div>
    </Link>
 
  </div>
  <div className="col">
  <div className="dashboard-card">
  <div className="dashboard-card-header">
    <h2 className="dashboard-card-title">Employee Report</h2>
  </div>
  <div className="dashboard-card-content py-3">
    <div className="dashboard-card-icon dashboard-card-icon-position">
  
      <ReportIcon className="dashboard-icon "/>
    </div>
    {/* <div className="dashboard-card-data">
      <span className="dashboard-card-count">500</span>
     
    </div> */}
  </div> 
</div>
  </div>
  <div className="col">
  <Link to ="/Leavereport">
  <div className="dashboard-card">
  <div className="dashboard-card-header">
    <h2 className="dashboard-card-title">Employee leave report</h2>
  </div>
  <div className="dashboard-card-content py-3">
    <div className="dashboard-card-icon dashboard-card-icon-position">
      <NextWeekIcon className="dashboard-icon"/>
    </div>
    {/* <div className="dashboard-card-data">
      <span className="dashboard-card-count">500</span>     
    </div> */}
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

export default Dashboard;
