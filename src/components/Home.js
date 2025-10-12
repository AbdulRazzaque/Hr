import React, { Fragment, useEffect, useState } from 'react'
import "./Home.scss"
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Dashhead from './Dashhead';
import { Autocomplete, Avatar,  Button,  Fab, Stack, TextField, Tooltip } from '@mui/material';
import { useHistory } from 'react-router-dom';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios'
import moment from 'moment'
import { employeeData } from './redux/socket/socketActions';
import { useDispatch } from 'react-redux';
import MaterialTable from 'material-table';
import placeholderEmployee from '../images/placeholderEmployee.jpg'
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx'
import DeleteIcon from '@mui/icons-material/Delete';
import TerminateEmployeeModal from './forms/TerminateEmployeeModal';
function Home(props) {

  const formatDate = (isoString) =>isoString ?moment.parseZone(isoString).local().format("DD/MM/YYYY"):null
    // =========================================All Varbel and state===============================================================================================
  const dispatch = useDispatch();
  const [data,setData]= useState([])
  const [selectedEmployee,setSelectedEmployee] = useState(null)
  const [openModal,setOpenModal] = useState(false)
  const [update,setUpdate] = useState(null)
  // console.log(data)
const url = process.env.REACT_APP_DEVELOPMENT
  const columns = [
    { field: 'id', title: 'SR NO', width: 'auto', },
    {
      field: 'employeeImage',
      title: 'Profile',
      width: 'auto',
      export: false,
      render: rowData => (
        <img
          src={rowData.employeeImage || placeholderEmployee}
          style={{ width: 40, borderRadius: '50%' }}
          alt="Profile"
        />
      ),
    },
    { field: 'name', title: 'Employee Name' ,width: 'auto' },
    { field: 'arabicName', title: 'Arabic Name', width: 'auto' },
    { field: 'nationality', title: 'Nationality', width: 'auto' },
    { field: 'employeeNumber', title: 'Employee Number', width: 'auto' },
    { field: 'department', title: 'Department', width: 'auto' },
    {
      field: 'dateOfJoining',
      title: 'Joining Date',
      width: 'auto',
     render: (rowData) => formatDate(rowData.dateOfJoining),
    },
    // {
    //   field: 'probationDate',
    //   title: 'Probation',
    //   width: 'auto',
    //   render: (rowData) => formatDate(rowData.probationDate),
    // },
  
  
    { field: 'qatarID', title: 'Qatar ID', width: 'auto' },
   
    {
      field: 'qatarIdExpiry',
      title: 'Qatar ID Expiry',
      width: 'auto',
          render: (rowData) => formatDate(rowData.qatarIdExpiry),
    },
    { field: 'passportNumber', title: 'Passport Number', width: 'auto' },
  
    {
      field: 'passportDateOfExpiry',
      title: 'Passport Expiry Date',
      width: 'auto',
       render: (rowData) => formatDate(rowData.passportDateOfExpiry),
    },
  
    { field: 'status', title: 'Status', width: 'auto' },
       {
      title: "Action",
      field: "Action",
      width: '30px',
      render: rowData => (
        <Fragment>

            <InfoIcon onClick={()=>handelSendData(rowData)} color='primary' sx={{cursor:'pointer'}}/>
        </Fragment>
      ),
    },
       {
      title: "Action",
      field: "Action",
      width: '30px',
      render: rowData => (
        <Fragment>

            <DeleteIcon onClick={()=>handleOpenModel(rowData)} color='error' sx={{cursor:'pointer'}}/>
      
            
        </Fragment>
      ),
    },
  ];

// =========================================Get Api===============================================================================================
  
const getAllEmployeeData =()=>{
  axios.get(`${url}/api/allEmployee`)
  .then(res=>{
   
    let arr = res.data.employees.map((item,index)=>{
      return {...item,id:index+1}
    })
    setData(arr)
  }).catch(err=>console.log(err))
}

// =========================================Ues Effect===============================================================================================

   useEffect(()=>{
    getAllEmployeeData()
  },[])
 
    const [display,setDisplay]=React.useState(false)


  

const history = useHistory();

// ===================================================Get Data=============================================================

  const handelSendData =(row)=>{
    console.log(row)
    dispatch(employeeData(row))
    history.push(`/Updateemployee`)

  }
  const handleOpenModel =(row)=>{
    // console.log(row)
    setUpdate(row)
    setOpenModal(true)
  }

  const handleSelectionModelChange =(evt,selectedRows)=>{


  const filteredData = selectedRows.map(item => ({
    "Employee Name": item.name,
    "Arabic Name": item.arabicName,
    "Nationality": item.nationality,
    "Employee Number": item.employeeNumber,
    "Department": item.department,
    "Date Of Joining":item.dateOfJoining? moment.parseZone(item.dateOfJoining).local().format("DD/MM/YYYY"):null,         // always format
    "Probation Date":item.probationDate? moment.parseZone(item.probationDate).local().format("DD/MM/YYYY"):null,           // always format
    "Qatar ID": item.qatarID,
    "Qatar ID Expiry":item.qatarIdExpiry?moment.parseZone(item.qatarIdExpiry).local().format("DD/MM/YYYY"):null,          // always format
    "Passport Number": item.passportNumber,
    "Passport Date Of Expiry":item.passportDateOfExpiry? moment.parseZone(item.passportDateOfExpiry).local().format("DD/MM/YYYY"):null,  // always format
    "Status": item.status,
  }));

  // export filteredData as excel here ...


  const worksheet = XLSX.utils.json_to_sheet(filteredData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  const excelBuffer = XLSX.write(workbook, {
     bookType: 'xlsx',
      type: 'array' 
    });
  saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), 'Employees.xlsx');

  }
const counts = {};
data.forEach(item => {
  if (item.qatarID) {
    counts[item.qatarID] = (counts[item.qatarID] || 0) + 1;
  }
});

// Step 2: Filter only duplicates
const duplicatePassportNumbers = Object.keys(counts).filter(
  key => counts[key] > 1
);

console.log(duplicatePassportNumbers);
    return (
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
            <Dashhead id={2} display={display} />
            </div>

            <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container" onClick={()=>display&&setDisplay(false)}>
            <span className="iconbutton display-mobile">
            <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
            <MenuIcon fontSize="inherit" />
             </IconButton>
             </span>

                <h1 className='title text-center'>Employee Data</h1>
                <div className='container'>
                <Autocomplete
      className="my-4"
      options={data}
      id="avatar-autocomplete"
      getOptionLabel={(option) => option.name || ""}
      onChange={(event,value)=>setSelectedEmployee(value)}
      renderOption={(props, option) => (
        <li {...props}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar alt={option.name} src={option.employeeImage} />
            <div>
              {option.name} - {option.nationality}
            </div>
          </Stack>
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} label="Search By Name" variant="standard" />
      )}
    />
                </div>
 <div
  // style={{
  //   width: "100%",
  //   maxHeight: "70vh", // vertical limit
  //   overflowY: "auto", // enable vertical scroll
  //   overflowX: "auto", // enable vertical scroll
  //   border: "1px solid #ddd", // optional: nice boundary
  // }}
  className="custom-scroll"
>
  <MaterialTable
    title={"Employee Data"}
    columns={columns}
    data={selectedEmployee ? [selectedEmployee] : data}
    options={{
      selection: true,
      paging: false,
      exportButton: false,
      tableLayout: "auto",
      //  tableLayout: "fixed", // fix layout so wrapping works
      search: true,
    }}
    actions={[
      {
        tooltip: 'Export Selected Rows',
        icon: 'save_alt',
        onClick: (evt, selectedRows) =>
          handleSelectionModelChange(evt, selectedRows),
      },
    ]}
    style={{ width: "100%", minWidth: "100%" }}
  />
</div>

            <div style={{position:"fixed",bottom:"5%",right:"5%"}}>
              <Tooltip title="Add New Employee">
              <Fab onClick={()=>props.history.push('NewEmployee')}
               variant="extended" className='bg-primary rounded-circle' aria-label="add">
                 <PersonAddAlt1Icon className='text-white'/> 
              </Fab>
              </Tooltip>
            
        </div>

             </div>
         <TerminateEmployeeModal
  openModal={openModal}          // ✅ sahi prop name
  setShowDialog={setOpenModal}   // ✅ close control
  update={update}
  getAllEmployeeData={getAllEmployeeData}
/>

    </div>
    )
}

export default Home
