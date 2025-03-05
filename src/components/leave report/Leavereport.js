
import React, { useEffect, useState } from "react";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead";
import './leavereport.scss';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Avatar, Box, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import config from "../auth/Config";
import axios from 'axios'
import moment from "moment";
import dayjs from "dayjs";

const Leavereport = () => {
  const [display, setDisplay] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [data,setData]=useState([])
 const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [leaves, setLeaves] = useState([]);

  const columns = [
    {field:'id',headerName:'SR NO',width:50},
    {field: 'image',headerName: 'Profile',width: 70,renderCell: (params) => <Avatar alt="Remy Sharp" src={params?.row?.employeeDetails?.employeeImage} />, },
    {field:'EmployeeName',headerName:'Employee Name',width:190, renderCell:(params)=>params?.row?.employeeDetails?.name},
    {field:'Date',headerName:'Date',width:100,renderCell:(params)=>moment.parseZone(params?.row?.date).local().format("DD/MM/YYYY")},
    {field:'Leavetype',headerName:'Leave type',width:90,renderCell:(params)=>(params?.row?.leaveType)},
    {field:'leaveStartDate',headerName:'leave Start Date',width:120,renderCell:(params)=>moment.parseZone(params?.row?.leaveStartDate).local().format("DD/MM/YYYY")},
    {field:'leaveEndDate',headerName:'leave End Date',width:120,renderCell:(params)=>moment.parseZone(params?.row?.leaveEndDate).local().format("DD/MM/YYYY")},
    {field:'numberOfDayLeave',headerName:'Leavedays',width:90,renderCell:(params)=>params.row.numberOfDayLeave},
    {field:'lastLeaveStartDate',headerName:'last Leave Start Date',width:140,renderCell:(params)=>moment.parseZone(params?.row?.lastLeaveStartDate).local().format("DD/MM/YYYY")},
    {field:'lastLeaveEndDate',headerName:'last Leave End Date',width:140,renderCell:(params)=>moment.parseZone(params?.row?.lastLeaveEndDate).local().format("DD/MM/YYYY")},
    {field:'lastNumberOfDayLeave',headerName:'Last Number Of Day Leave',width:90,renderCell:(params)=>params.row.lastNumberOfDayLeave},

  ]


const getEmployeeLatestLeave =async()=>{

  try {
   await axios.get(`${config.baseUrl}/api/getEmployeeLatestLeave`)
   .then(res=>{
   
    let arr = res.data.lastLeave.map((item,index)=>{
      return {...item,id:index+1}
    })
    setData(arr)
  }).catch(err=>console.log(err))
  } catch (error) {
    console.log(error)
    
  }
}



const getLeaveByDate = async()=>{
  if(!startDate || !endDate){
    console.log('❌ Start Date and End Date are required!');
    return;
  }
  try {
    const formattedStartDate = dayjs(startDate).format('YYYY-MM-DD');
    const formattedEndDate = dayjs(endDate).format('YYYY-MM-DD');

    await axios.get(
       `${config.baseUrl}/api/getLeaveByDate/?startDate=${formattedStartDate}&endDate=${formattedEndDate}`

    )
    .then(response=>{
          let arr = response.data.data.map((item,index)=>{
      return {...item,id:index+1}
    })
    setData(arr)
      // response?.data,
    //  setData(response.data?.data)
    }).catch(error=>{
      console.log(error)
    })
  } catch (error) {
    console.log(error)
  }

}

useEffect(()=>{
  getEmployeeLatestLeave()
},[])

const history = useHistory();
 const handleRowClick = (params) =>{

  history.push(`/EmployeeLeaveReport`,{data:params.row})
  console.log(data,'chaekc hand')
 }

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
  {/* <div className="container Construction">
    <h1 className="typing-heading">Under Construction</h1>
  </div> */}
  <div className="container">
  <h1 className="title text-center my-3">Employee leave report</h1>
      {/* ---------------------------Second Row Strart Here----------------------------------------- */}
      <div className=" row my-4">
              <div className="col-4 ml-3">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: 300 }}
                    label="To"
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
                    label="From"
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
              <button type="submit" className="rounded btn btn-dark" onClick={getLeaveByDate}>Submit</button>
              </div>
              <div className="col-1 mt-2 mr-1">
              <button type="submit" className="rounded btn btn-primary" onClick={getEmployeeLatestLeave}>Clear</button>
              </div>
            </div>
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

export default Leavereport;
