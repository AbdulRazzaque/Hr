

import React, { Fragment, useEffect, useState } from 'react'

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from '../Dashhead';
import { DataGrid } from '@mui/x-data-grid';

import placeholderEmployee from '../../images/placeholderEmployee.jpg'
import 'react-toastify/dist/ReactToastify.css';
import { fetchRejoinedEmployees } from './RejoinApi';
import moment from 'moment';

const AllRejoinEmployee = () => {
  const [display, setDisplay] = React.useState(false);
  const [data,setData]=useState([])
  // ============================================================================================================================================
  const formatDate = (isoString) =>isoString ?moment.parseZone(isoString).local().format("DD/MM/YYYY"):null

       const getAllRejoinEmployee = async () => {
       try {
         const result = await fetchRejoinedEmployees();
         setData(result.employees);
   
       } catch (error) {
   
         console.error("Failed to rejoin employee:", error);
       }
     };
  // ============================================================================================================================================
const columns = [
//   { field: "id", headerName: "SR NO", width: 90 },

  {
    field: "employeeImage",
    headerName: "Profile",
    width: 80,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <img
        src={params.value || placeholderEmployee}
        alt="Profile"
        style={{ width: 40, borderRadius: "50%" }}
      />
    ),
  },

  { field: "name", headerName: "Employee Name", width: 180 },
  { field: "arabicName", headerName: "Arabic Name", width: 180 },
  { field: "nationality", headerName: "Nationality", width: 150 },
  { field: "employeeNumber", headerName: "Employee Number", width: 150 },
  { field: "department", headerName: "Department", width: 150 },

  {
    field: "dateOfJoining",
    headerName: "Joining Date",
    width: 150,
    valueGetter: (params) => params.row.dateOfJoining,
    renderCell: (params) => formatDate(params.value),
  },

  { field: "qatarID", headerName: "Qatar ID", width: 130 },

  {
    field: "qatarIdExpiry",
    headerName: "Qatar ID Expiry",
    width: 150,
    valueGetter: (params) => params.row.qatarIdExpiry,
    renderCell: (params) => formatDate(params.value),
  },

  { field: "passportNumber", headerName: "Passport Number", width: 150 },

  {
    field: "passportDateOfExpiry",
    headerName: "Passport Expiry Date",
    width: 150,
    valueGetter: (params) => params.row.passportDateOfExpiry,
    renderCell: (params) => formatDate(params.value),
  },
];


// =========================================By Default api cal===============================================================================================
useEffect(()=>{

getAllRejoinEmployee()
},[])

  return (
    <div className="row">
    <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
      <Dashhead id={11} display={display} />
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
      <h1 className="my-5 title text-center">
          Rejoin Employee
        
        </h1>


        
        <div style={{ height: '80%', width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { psku: 0, pskuSize: 5 },
          },
        }}
        pskuSizeOptions={[5, 10]}
     
        
      />
    </div>

        </div>
    
        </div>
  )
}

export default AllRejoinEmployee