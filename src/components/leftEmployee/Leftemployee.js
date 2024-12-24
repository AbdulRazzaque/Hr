import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead"; 
import { Autocomplete, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import './lefemployeeStyel.scss';
import { Avatar } from '@mui/material';
import { Fragment } from 'react';
import {Button,} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";

import { useHistory } from "react-router-dom/cjs/react-router-dom";
import config from "../auth/Config";
import axios from "axios";
import moment from "moment";
function Leftemployee(props) {
  const [display, setDisplay] = React.useState(false);
  const [alert, setAlert] = useState(false);
  const [data,setData] = useState([])
  const [update,setUpdate]= useState([])


const history = useHistory();
const Leftemployeecolumns = (history) => [
  {field:'id',headerName:'SR NO',width:50},
  {field: 'image',headerName: 'Profile',width: 70,renderCell: (params) => <Avatar alt="Remy Sharp" src={params.row.employeeId?.employeeImage} />, },

  {field:'EmployeeName',headerName:'Employee Name',width:120,renderCell: (params) =>params.row.employeeId?.name},
  {field:'Position',headerName:'Position',width:120,renderCell: (params) =>params.row.employeeId?.position},
  {field:'Date',headerName:'Date',width:120,renderCell:(params)=>moment.parseZone(params.row.date).format("DD/MM/YYYY") },,
  {field:'JoiningDate',headerName:'JoiningDate',width:120,renderCell:(params)=>moment.parseZone(params.row?.employeeId?.dateOfJoining).format("DD/MM/YYYY")},

  {field:'Resume Date',headerName:'Resume Date',width:120,renderCell:(params)=>moment.parseZone(params?.row?.resumingofLastVacation).local().format("DD/MM/YYYY")||null},
  {field:'LastworkingDate',headerName:'LastworkingDate',width:120,renderCell:(params)=>moment.parseZone(params.row?.lastWorkingDate).format("DD/MM/YYYY")||null},
  {field:'subject',headerName:'Subject',width:200},
  {field:'other',headerName:'200',width:90},
  {
    title: "Action",
    field: "Action",
    width: 100,
    renderCell: (params) => (
      <Button onClick={() => history.push('Endofservicesinfo',{data:params.row})}>
        <EditIcon />
      </Button>
    )
  },
  {
    title: "Delete",
    field: "Delete",
    width: 100,
    renderCell: () => (
      <Fragment>
        <Button color="error" onClick={() => setAlert(true)}>
          <DeleteIcon />
        </Button>
      </Fragment>
    ),
  },
]

const allEndofservice =()=>{
  axios.get(`${config.baseUrl}/api/allEndofservice`)
  .then(res=>{
   
    let arr = res.data.allEndofservice.map((item,index)=>{
      return {...item,id:index+1}
    })
    setData(arr)
  }).catch(err=>console.log(err))
}

const deleteRow = async(update)=>{
  console.log(update,'update')

try {
  axios.delete(`${config.baseUrl}/api/deleteEndofservice/${update._id}`,
    { headers: { Authorization: `Bearer ${config.accessToken}` } } )
    .then(response=>{
      console.log(response)
      
      allEndofservice()
    }).catch(error =>console.log(error))
    setAlert(false)
  } catch (error) {
 console.log(error) 
}



}
useEffect(()=>{
  allEndofservice()
},[])
console.log(data)
const columns = Leftemployeecolumns(history); // Pass history as parameter
  return (
    
    <div className="row">
          {alert && (
          <Dialog open={alert} style={{ height: 600 }}>
            <DialogTitle>Delete Row</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are You sure You want to delete this.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={() => deleteRow(update)}>
                Yes
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  setAlert(false);
                }}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        )}
      <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
        <Dashhead id={5} display={display} />
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

        <h1 className="title text-center">Left Employee Information</h1>
        <div className='container'>
                <Autocomplete
     className="my-4"
        options={data}
        id="flat-demo"
        getOptionLabel={(row) => row.EmployeeName }
        // getOptionLabel={(rows)=>rows.EmployeeName && rows.Nationality || ""}
        renderInput={(params) => (
          <TextField {...params} label="Search By Name" variant="standard" />
        )}
      />
                </div>

     <Box sx={{ height: 900, width: '100%' }}>
      <div className="datagrid-container">
      <DataGrid 
      allowFiltering={true}
        rows={data}
        columns={columns}
        autoHeight
        pageSizeOptions={[10]}
        onRowClick={(params)=>setUpdate(params.row)}

      />
      </div>
    </Box>
     
      </div>
    </div>
  );
}

export default Leftemployee;
