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
import EventBusyIcon from '@mui/icons-material/EventBusy';
import Header from "../header/Header";
import axios from "axios";
import config from "../auth/Config";
import { fetchRejoinedEmployees } from "../RejoinEmployee/RejoinApi";
import ReplayIcon from "@mui/icons-material/Replay";
function Dashboard() {
  const [display, setDisplay] = React.useState(false);
  const [activeEmployee,setActiveEmployee] = useState([])
  const [exitEmployee,setExitEmployee] = useState([])
   const [rejoinedEmployees, setRejoinedEmployees] = useState([]);

  const getTotalActiveEmployees =()=>{
    try {
      axios.get(`${config.baseUrl}/api/getTotalActiveEmployees`)
      .then((response)=>{
        setActiveEmployee(response.data.totalActiveEmployees)
      }).catch(err=>console.log(err))
    } catch (error) {
      console.log(error)
    }
  }
  const getTotalExitEmployees =()=>{
    try {
      axios.get(`${config.baseUrl}/api/getTotalExitEmployees`)
      .then((response)=>{
        setExitEmployee(response.data.totalExitEmployees)
      }).catch(err=>console.log(err))
    } catch (error) {
      console.log(error)
    }
  }

  const getRejoinedEmployees = async () => {
    try {
      const data = await fetchRejoinedEmployees();
  
      setRejoinedEmployees(data.count || 0); 
    } catch (error) {
      console.error("Failed to fetch rejoined employees:", error);
    }
  };
  useEffect(()=>{
    getTotalActiveEmployees();
    getTotalExitEmployees();
    getRejoinedEmployees();
  },[])
  
  const cards = [
    { title: "Total Employee", count: activeEmployee, icon: <Groups2Icon />, link: "/Home" },
    { title: "Total Left Employee", count: exitEmployee, icon: <TransferWithinAStationIcon />, link: "/Leftemployee" },
    { title: "Rejoin Employee",count:rejoinedEmployees, icon: <ReplayIcon />, link: "/AllRejoinEmployee" },
    { title: "Employee Leave Report", icon: <NextWeekIcon />, link: "/Leavereport" },
    { title: "Employee Report", icon: <ReportIcon />, link: "/EmployeeReport" },
  ];
 return (
    <div className="row">
      <div className="col-2">
        <Dashhead id={1} display={display} />
      </div>

      <div className="col-10 dashboard-container" onClick={() => display && setDisplay(false)}>
        <span className="iconbutton display-mobile">
          <IconButton size="large" aria-label="Menu" onClick={() => setDisplay(true)}>
            <MenuIcon fontSize="inherit" />
          </IconButton>
        </span>

        <h1 className="title text-center">Dashboard</h1>
        <div className="container">
          <Header />
          <div className="row mt-5">
            {cards.map((card, i) => (
              <div className="col-4" key={i}>
                <Link to={card.link}>
                  <div className="dashboard-card">
                    <div className="dashboard-card-header">
                      <h2 className="dashboard-card-title text-capitalize">{card.title}</h2>
                    </div>
                    <div className="dashboard-card-content py-3">
                      <div className="dashboard-card-icon dashboard-icon">{card.icon}</div>
                      {card.count !== undefined && (
                        <div className="dashboard-card-data">
                          <span className="dashboard-card-count">{card.count}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
