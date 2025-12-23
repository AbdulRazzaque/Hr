
import React, { useEffect, useState } from "react";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead";
import './absenceLeavereport.scss';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Avatar, Box, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import config from "../auth/Config";
import axios from 'axios'
import moment from "moment";
import dayjs from "dayjs";

const AbsenceLeavereport = () => {
  const [display, setDisplay] = React.useState(false);
  const [data,setData]=useState([])
 const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const columns = [
    {field:'id',headerName:'SR NO',width:50},
    {field: 'image',headerName: 'Profile',width: 70,renderCell: (params) => <Avatar alt="Employee" src={params?.row?.employeeId?.employeeImage} />, },
    {field:'EmployeeName',headerName:'Employee Name',width:190, renderCell:(params)=>params?.row?.employeeDetails?.name},
    {field:'Date',headerName:'Date',width:100,renderCell:(params)=>moment.parseZone(params?.row?.date).local().format("DD/MM/YYYY")},
    {field:'Leavetype',headerName:'Leave type',width:90,renderCell:(params)=>(params?.row?.leaveType)},
    {field:'leaveStartDate',headerName:'Leave Start Date',width:140,renderCell:(params)=>params?.row?.leaveType === 'sick' && params?.row?.leaveStartDate ? moment.parseZone(params?.row?.leaveStartDate).local().format("DD/MM/YYYY") : params?.row?.leaveType === 'Absent' && params?.row?.AbsenceLeaveStartDate ? moment.parseZone(params?.row?.AbsenceLeaveStartDate).local().format("DD/MM/YYYY") : ''},
    {field:'leaveEndDate',headerName:'Leave End Date',width:140,renderCell:(params)=>params?.row?.leaveType === 'sick' && params?.row?.leaveEndDate ? moment.parseZone(params?.row?.leaveEndDate).local().format("DD/MM/YYYY") : params?.row?.leaveType === 'Absent' && params?.row?.AbsenceLeaveEndDate ? moment.parseZone(params?.row?.AbsenceLeaveEndDate).local().format("DD/MM/YYYY") : ''},
    {field:'numberOfDayLeave',headerName:'Leave Days',width:120,renderCell:(params)=>params?.row?.leaveType === 'sick' ? params?.row?.totalSickLeaveDays : params?.row?.leaveType === 'Absent' ? params?.row?.totalAbsenceLeaveDays : 0},
    {field:'comment',headerName:'Comment',width:200,renderCell:(params)=>params?.row?.comment || ''},

  ]



const getLatestAbsenceLeave = async () => {
  try {
    await axios.get(`${config.baseUrl}/api/getEmployeeLatestAbsenceLeave`)
      .then(res => {
        console.log(res)
        let arr = res.data.lastAbsenceLeave.map((item, index) => {
          return { ...item, id: index + 1 };
        });
        setData(arr);
      })
      .catch(err => console.log(err));
  } catch (error) {
    console.log(error);
  }
}

console.log(data,'check Data')


const getAbsenceLeaveByDate = async()=>{
  if(!startDate || !endDate){
    console.log('❌ Start Date and End Date are required!');
    return;
  }
  try {
    const formattedStartDate = dayjs(startDate).format('YYYY-MM-DD');
    const formattedEndDate = dayjs(endDate).format('YYYY-MM-DD');

    await axios.get(
       `${config.baseUrl}/api/AllAbsenceLeave`
    )
    .then(response=>{
      // Filter data by date range
      let filteredData = response.data.allAbsence.filter((item) => {
        const itemDate = dayjs(item.date);
        return itemDate.isAfter(dayjs(formattedStartDate).subtract(1, 'day')) && 
               itemDate.isBefore(dayjs(formattedEndDate).add(1, 'day'));
      });
      
      let arr = filteredData.map((item,index)=>{
        return {...item,id:index+1}
      })
      setData(arr)
    }).catch(error=>{
      console.log(error)
    })
  } catch (error) {
    console.log(error)
  }

}


useEffect(() => {
  getLatestAbsenceLeave();
}, []);

const history = useHistory();
 const handleRowClick = (params) =>{

  history.push(`/EmployeeAbsenceLeaveReport`,{data:params.row})
  console.log(params.row,'check row data')
 }

  return (
    <div className="row">
      <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
        <Dashhead id={7} display={display} />
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
  <h1 className="title text-center my-3">AbsenceLeave Report</h1>
      {/* ---------------------------Second Row Start Here----------------------------------------- */}
      {/* <div className=" row my-4">
              <div className="col-4 ml-3">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: 300 }}
                    label="From"
                    format="DD/MM/YYYY"
                    views={["year", "month", "day"]}
                    onChange={(newValue) => setStartDate(newValue)}
                    renderInput={(params) => (
                      <TextField name="date" {...params} />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div className="col-4">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: 300 }}
                    label="To"
                    format="DD/MM/YYYY"
                    views={["year", "month", "day"]}
                    onChange={(newValue) => setEndDate(newValue)}
                    renderInput={(params) => (
                      <TextField name="date" {...params} />
                    )}
                  />
                </LocalizationProvider>
             
              </div>
              <div className="col-1 mt-2 mr-1">
              <button type="submit" className="rounded btn btn-dark" onClick={getAbsenceLeaveByDate}>Submit</button>
              </div>
              <div className="col-1 mt-2 mr-1">
              <button type="submit" className="rounded btn btn-primary" onClick={getLatestAbsenceLeave}>Clear</button>
              </div>
            </div> */}
            </div>
            <Box sx={{ height: 900, width: '100%' }}>
      <div className="datagrid-container">
      <DataGrid 
      allowFiltering={true}
        rows={data}
        columns={columns}
        autoHeight
        pageSizeOptions={[10]}
        onRowClick={handleRowClick}

      />
      </div>
    </Box>

      </div>
    </div>
  );
};

export default AbsenceLeavereport;
