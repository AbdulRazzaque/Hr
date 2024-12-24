
import React from "react";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead";
import './leavereport.scss';

import MaterialTable from 'material-table';
import { useEffect,useState } from "react";
import { useLocation } from "react-router-dom";
import config from "../auth/Config";
import axios from "axios";
import moment from "moment";
const EmployeeLeaveReport = () => {
  const [display, setDisplay] = React.useState(false);
  const [data,setData] = useState([])
  const location = useLocation()
  const leaveData =  location.state.data
  console.log(leaveData)



 

  const columns = [
    {field:'id',title:'SR NO', width: 'auto'},
    {field: 'image',title: 'Profile',  width: 'auto', export: false, render: rowData => <img src={rowData.employeeId?.employeeImage} style={{width: 40, borderRadius: '50%'}}/> },
    {field:'employeeId.name',title:'Employee Name', width: 'auto',},
    // {field:'EmployeeName',title:'Employee Name', width: 'auto', render:rowData =>rowData.employeeId.name},
    {field:'date',title:'Date', width: 'auto',render:rowData=> moment.parseZone( rowData.date).local().format("DD/MM/YYYY")},
    {field:'leaveType',title:'Leavetype', width: 'auto'},
    {field:'leaveStartDate',title:'leave Start date', width: 'auto',render:rowData=> moment.parseZone( rowData.leaveStartDate).local().format("DD/MM/YYYY")},
    {field:'leaveEndDate',title:'leave End Date', width: 'auto',render:rowData=> moment.parseZone( rowData.leaveEndDate).local().format("DD/MM/YYYY")},
    {field:'numberOfDayLeave',title:'number Of Day Leave', width: 'auto'},
    {field:'lastLeaveStartDate',title:'Last leave Start date', width: 'auto',render:rowData=> moment.parseZone( rowData.lastLeaveStartDate).local().format("DD/MM/YYYY")},
    {field:'lastLeaveEndDate',title:'Last leave End Date', width: 'auto',render:rowData=> moment.parseZone( rowData.lastLeaveEndDate).local().format("DD/MM/YYYY")},
    {field:'lastNumberOfDayLeave',title:'Last number Of Day Leave', width: 'auto'},

  ]


//---------------------------------- Material Table page Size code here----------------------------------------------------------------
const [autoPageSize, setAutoPageSize] = useState(10); // Default page size
useEffect(() => {
    // Calculate and set the auto page size based on some criteria
    const calculatedPageSize = Math.min(10, Math.ceil(data.length / 2));
    setAutoPageSize(calculatedPageSize);
  }, [data]);
  const fetchData =()=>{
    try {
      axios.get(`${config.baseUrl}/api/getEmployeeByIdExitLeave/${leaveData.employeeId}`)
      .then(res=>{
        console.log(res.data.allExitOfLeave)
        let arr = res.data.allExitOfLeave.map((item,index)=>{
          return {...item,id:index+1}
        })
        setData(arr)
        // setData(res.data)
      }).catch((error)=>console.log(error))
    } catch (error) {
      console.log("Something went wrong")
    }

  }

  useEffect(()=>{
  fetchData()
  },[])
  
  return (
    <div className="row">
      <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
        <Dashhead id={6} display={display} />
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
 
        <MaterialTable
      title="Employee Leave"
      columns={columns}
     data= {data}
    //   options={{
    //     pageSize: autoPageSize,
    //     pageSizeOptions: [], // Disable user selection of page size
    //   }
    options={{
        paging: false, // Disable pagination
        exportButton:true
      }}
    />
        </div>

    </div>
  );
};

export default EmployeeLeaveReport;
