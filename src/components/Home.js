import React, { Fragment, useEffect, useState } from 'react'
import "./Home.scss"
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Dashhead from './Dashhead';
import { Autocomplete, Avatar, Box, Fab, Stack, TextField, Tooltip } from '@mui/material';
import {DataGrid} from '@mui/x-data-grid'
import { useHistory } from 'react-router-dom';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios'
import moment from 'moment'
import { employeeData } from './redux/socket/socketActions';
import { useDispatch } from 'react-redux';
function Home(props) {


  const columns =[ 
    {field:'id',headerName:'SR NO',width:50},
    {field: 'image',headerName: 'Profile',width: 70,renderCell: (params) => <Avatar alt="Remy Sharp" src={params.row.employeeImage} />, },
    {field:'name',headerName:'Employee Name',width:210,},
    {field:'arabicName',headerName:'Arbic Name',width:130},
    {field:'nationality',headerName:'Nationality',width:90},
    {field:'employeeNumber',headerName:'Employee Number',width:90},
    {field:'department',headerName:'Department',width:90},
    // {field:'Position',headerName:'Position',width:90},
    {field:'dateOfJoining',headerName:'Hiring Date',width:100,valueGetter:(params)=>params.row.dateOfJoining? moment.parseZone(params.row.dateOfJoining).local().format("DD/MM/YYYY"):null},
    {field:'probationDate',headerName:'probation',width:100,valueGetter:(params)=>params.row.probationDate? moment.parseZone(params.row.probationDate).local().format("DD/MM/YYYY"):null},
    {field:'qatarID',headerName:'Qatart ID',width:130},
    {field:'qatarIdExpiry',headerName:'Expiry QID Date',width:100,valueGetter:(params)=>params.row.qatarIdExpiry? moment.parseZone(params.row.qatarIdExpiry).local().format("DD/MM/YYYY"):null},
    {field:'passportNumber',headerName:'Passport No',width:100},
    {field:'PassportExpiry',headerName:'PassportExpiry',width:120,valueGetter:(params)=> params.row.passportDateOfExpiry? moment.parseZone(params.row.passportDateOfExpiry).local().format("DD/MM/YYYY"):null},
    {field:'status',headerName:'Status',width:120},
  
  
    {
      title: "Action",
      field: "Action",
      width: 180,
      renderCell: (params) => (
        <Fragment>

            <InfoIcon onClick={()=>handelSendData(params.row)} color='primary' sx={{cursor:'pointer'}}/>
 
  
  
        </Fragment>
      ),
    },
    
  ]
  // =========================================All Varbel and state===============================================================================================
  const dispatch = useDispatch();
  const [data,setData]= useState([])
  const [selectedEmployee,setSelectedEmployee] = useState(null)
  console.log(data)
const url = process.env.REACT_APP_DEVELOPMENT
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
    // history.push('/Updateemployee',{data:row});
  }

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
       <Box sx={{ height: 900, width: '100%' }}>
      <DataGrid
      allowFiltering={true}
        rows={selectedEmployee ?[selectedEmployee]:data}
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
                 <PersonAddAlt1Icon/> 
              </Fab>
              </Tooltip>
        </div>

             </div>
    </div>
    )
}

export default Home
