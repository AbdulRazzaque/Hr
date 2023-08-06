import React, { useState } from 'react'
import "./Home.scss"
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import Dashhead from './Dashhead';
import { Autocomplete, Box, Fab, TextField, Tooltip } from '@mui/material';
import {DataGrid,Filter} from '@mui/x-data-grid'
import value from '../images/leave.svg'
import {columns,EmplyeeData} from './EmplyeeData'
import { useHistory } from 'react-router-dom';
function Home(props) {
    const [display,setDisplay]=React.useState(false)

     EmplyeeData.forEach((employee)=>{
    employee.Total=  employee.BasicSalary + employee.HousingAmount + employee.TransportAmount + employee.OtherAmount;
    })

    const parseDateFromString = (dateString) => {
      const parts = dateString.split('/');
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Months are 0-based in JavaScript
      const year = parseInt(parts[2], 10) + 2000; // Adding 2000 to handle YY format
      return new Date(year, month, day);
    };
   // Function to apply conditional row styling based on the "Expiry ID"

const getRowClassName = (params) => {
  const expiryDate = parseDateFromString(params.row['Expiry ID']);
  const passportExpiryDate = parseDateFromString(params.row['PassportExpiry']);
  const currentDate = new Date();

  // Calculate the difference in months between the expiry date and the current date
  const idMonthsDifference =
    (expiryDate.getFullYear() - currentDate.getFullYear()) * 12 +
    expiryDate.getMonth() - currentDate.getMonth();

  const passportMonthsDifference =
    (passportExpiryDate.getFullYear() - currentDate.getFullYear()) * 12 +
    passportExpiryDate.getMonth() - currentDate.getMonth();

  if (idMonthsDifference <= 2 && idMonthsDifference >= 0) {
      return 'expiry-id-row'; // Apply class name for rows with close-to-expiring Expiry ID
  }

  if (passportMonthsDifference <= 2 && passportMonthsDifference >= 0) {
    return 'passport-id-row'; // Apply class name for rows with close-to-expiring PassportExpiry
  }

  return '';
};
const history = useHistory();
 const handleRowClick = () =>{
  history.push(`/Updateemployee`)
 }
    return (
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
            <Dashhead id={1} display={display} />
            </div>

            <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container" onClick={()=>display&&setDisplay(false)}>
            <span className="iconbutton display-mobile">
            <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
            <MenuIcon fontSize="inherit" />
             </IconButton>
             </span>

                <h1 className='title text-center'>Employee Info</h1>
                <div className='container'>
                <Autocomplete
     className="my-4"
        options={EmplyeeData}
        id="flat-demo"
        getOptionLabel={(row) => row.EmployeeName && row.Nationality ? `${row.EmployeeName} (${row.Nationality})` : ""}
        // getOptionLabel={(rows)=>rows.EmployeeName && rows.Nationality || ""}
        renderInput={(params) => (
          <TextField {...params} label="Search By Name" variant="standard" />
        )}
      />
                </div>
       <Box sx={{ height: 900, width: '100%' }}>
      <DataGrid
      allowFiltering={true}
        rows={EmplyeeData}
        columns={columns}
        autoHeight
     
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        getRowClassName={getRowClassName}
        onRowClick={handleRowClick}

      />
      <style>
        {`
          .bold-row {
            font-weight: bold;
          }
        `}
      </style>
    </Box>
            <div style={{position:"fixed",bottom:"5%",right:"5%"}}>
              <Tooltip title="Add New Employee">
              <Fab onClick={()=>props.history.push('NewEmployee')}
               variant="extended" color="primary" aria-label="add">
                <AddIcon  />  
              </Fab>
              </Tooltip>
        </div>

             </div>
    </div>
    )
}

export default Home
