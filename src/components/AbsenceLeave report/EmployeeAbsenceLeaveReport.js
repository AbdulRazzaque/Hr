import React from "react";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead";
import './absenceLeavereport.scss';

import MaterialTable from 'material-table';
import { useEffect,useState } from "react";
import { useLocation } from "react-router-dom";
import config from "../auth/Config";
import axios from "axios";
import moment from "moment";

const EmployeeAbsenceLeaveReport = () => {
  const [display, setDisplay] = React.useState(false);
  const [data,setData] = useState([])
  const location = useLocation()
  const absenceLeaveData =  location?.state?.data
  console.log(absenceLeaveData,'absenceLeaveData')



 

  const columns = [
    {field:'id',title:'SR NO', width: 'auto'},
    {field: 'image',title: 'Profile',  width: 'auto', export: false, render: rowData => <img src={rowData.employeeId?.employeeImage} style={{width: 40, borderRadius: '50%'}}/> },
    {field:'employeeId.name',title:'Employee Name', width: 'auto',},
    {field:'date',title:'Date', width: 'auto',render:rowData=> moment.parseZone( rowData.date).local().format("DD/MM/YYYY")},
    {field:'leaveType',title:'Leave Type', width: 'auto'},
    {field:'leaveStartDate',title:'Leave Start Date', width: 'auto',render:rowData=> rowData.leaveType === 'sick' && rowData.leaveStartDate ? moment.parseZone(rowData.leaveStartDate).local().format("DD/MM/YYYY") : rowData.leaveType === 'Absent' && rowData.AbsenceLeaveStartDate ? moment.parseZone(rowData.AbsenceLeaveStartDate).local().format("DD/MM/YYYY") : ''},
    {field:'leaveEndDate',title:'Leave End Date', width: 'auto',render:rowData=> rowData.leaveType === 'sick' && rowData.leaveEndDate ? moment.parseZone(rowData.leaveEndDate).local().format("DD/MM/YYYY") : rowData.leaveType === 'Absent' && rowData.AbsenceLeaveEndDate ? moment.parseZone(rowData.AbsenceLeaveEndDate).local().format("DD/MM/YYYY") : ''},
    {field:'numberOfDayLeave',title:'Leave Days', width: 'auto',render:rowData=> rowData.leaveType === 'sick' ? rowData.totalSickLeaveDays : rowData.leaveType === 'Absent' ? rowData.totalAbsenceLeaveDays : 0},
    {field:'comment',title:'Comment', width: 'auto'},

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
      axios.get(`${config.baseUrl}/api/getEmployeeAbsenceLeave/${absenceLeaveData.employeeId?._id || absenceLeaveData?.employeeId}`)
      .then(res=>{
        console.log(res.data.getEmployeeAbsence)
        let arr = res.data.getEmployeeAbsence.map((item,index)=>{
          return {...item,id:index+1}
        })
        setData(arr)
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
      <div className="container">

      <h2 className=" text-center my-5"> {`${absenceLeaveData?.employeeId?.name || 'Employee'} AbsenceLeave Report`}</h2>
      </div>
        <div>

        <MaterialTable
      title={absenceLeaveData?.employeeId?.name || 'Employee AbsenceLeave Report'}
      columns={columns}
     data= {data}
    options={{
        paging: false, // Disable pagination
        exportButton:true
      }}
    />
        </div>
      
        </div>

    </div>
  );
};

export default EmployeeAbsenceLeaveReport;
