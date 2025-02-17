import React, { Fragment, useEffect, useState } from "react";
import "./forms.scss";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead";
import { Alert, Autocomplete, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, Stack, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PrintIcon from '@mui/icons-material/Print';
import leaverequest from '../../images/leaverequest.png' 
import { FormControl } from "@mui/base";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Bounce, toast,ToastContainer } from "react-toastify";
import config from "../auth/Config";
import SaveIcon from '@mui/icons-material/Save';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Backicon from "../header/Backicon";
import { DataGrid } from "@mui/x-data-grid";
import moment from 'moment'

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateAbsenceLeave from "../updateEmployee/UpdateAbsenceLeave";
const AbsenceLeave = () => {
  const [display, setDisplay] = React.useState(false);
  const [data,setData] = useState([])

  const [leaveType, setLeaveType] = React.useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [alert, setAlert] = useState(false);
  const [date, setDate] = useState(dayjs());
  const [leaveStartDate, setLeaveStartDate] = useState(null);
  const [LeaveEndDate, setLeaveEndDate] = useState(null);
  const [totalLeaveDays, setTotalLeaveDays] = useState(null);
  const [leaveInfo, setLeaveInfo] = useState(null)
  const [update,setUpdate]= useState([])
  const [showDialog,setShowDialog]=useState(false)
  const {register,handleSubmit,reset,formState:{errors}} = useForm()
  const history = useHistory()
const getAllEmployeeData =()=>{
  axios.get(`${config.baseUrl}/api/allEmployee`)
  .then(res=>{
   
    let arr = res.data.employees.map((item,index)=>{
      return {...item,id:index+1}
    })
    setData(arr)
  }).catch(err=>console.log(err))
}

console.log(leaveType === "sick")


  // console.log(data,"EmployeeData")
// =========================================Ues Effect===============================================================================================

   useEffect(()=>{
    getAllEmployeeData()

  
  },[])


//  =========================================Post api=========================================================
console.log(totalLeaveDays,'totalLeaveDays') 
const onSubmit = async(data,{action})=>{
  // Check if leaveType is selected
  if (!leaveType) {
    toast.error("Please select a leave type.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
    return;
  }
  const formData = new FormData();
  if(leaveStartDate && LeaveEndDate && totalLeaveDays){
    formData.append("leaveStartDate",leaveStartDate)
    formData.append("leaveEndDate",LeaveEndDate)
    formData.append("totalSickLeaveDays",parseInt(totalLeaveDays))
  }
  Object.keys(data).forEach((key)=>{
    formData.append(key,data[key])

  })
  
  try{
    formData.append("employeeId",selectedEmployee._id)
    formData.append("date",date)
 
    formData.append("leaveType",leaveType)
    
    
    const response = await axios.post(
      `${config.baseUrl}/api/AbsenceLeave`,formData,
     { headers: { Authorization: `Bearer ${config.accessToken}` 

     }
    }
    )
    

    toast.success(response.data.message|| "success", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      });

         // Clear all form data and reset state
         reset();  // If using React Hook Form, reset the form fields
         setSelectedEmployee(null);  // Reset selected employee state
   
         // Reset other states
         setLeaveType('');  // Reset leave type
         setLeaveStartDate(null);  // Reset leave start date
         setLeaveEndDate(null);  // Reset leave end date
         setTotalLeaveDays(null);  // Reset total leave days
         setLeaveInfo(null)

         if (action === "print") {
          history.push('/AbsenceLeavepdf', { data: Object.fromEntries(formData) });
        }
    }
    catch(error){
      toast.error(error.response?.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
    }
}
// ==============================================logic Code==================================================



// handel employee value eg.set automatic QID and other 
const handleEmployee =async(event,value)=>{
  setSelectedEmployee(value); // Set selected employee
  if (!value || !value._id) {
    // Ensure the selected value has a valid ID before making the API call
    setLeaveInfo(null); // Reset leave info if no employee is selected
    return;
  }
  getTotalSickLeave(value)
}


const getTotalSickLeave  =async(value)=>{
  try{
    const response =  await axios.get(`${config.baseUrl}/api/getTotalSickLeave/${value._id}`,
      { 
        headers: { Authorization: `Bearer ${config.accessToken}`} 
        }
    )
      
    // console.log(leave)
    setLeaveInfo(response.data)
  }catch(error){
    console.error('Error fetching leave information:', error.message || error);
    setLeaveInfo(null)
  }
}

// Leave Type
const handleLeaveTypeChange = (event) => {
  setLeaveType(event.target.value); // Update state with selected value
  console.log("Selected Exit Type:", event.target.value); // For debugging

};

const deleteRow = async(update)=>{
  console.log(update,'update')

try {
  axios.delete(`${config.baseUrl}/api/deleteAbsence/${update._id}`,
    { headers: { Authorization: `Bearer ${config.accessToken}` } } )
    .then(response=>{
      console.log(response)
      
      getTotalSickLeave()
      setSelectedEmployee(null)
    }).catch(error =>console.log(error))
    setAlert(false)
  } catch (error) {
 console.log(error) 
}



}
// Calculate Day starDate and endDate
useEffect(()=>{
  if(leaveStartDate && LeaveEndDate){
    const start = dayjs(leaveStartDate);
    const end = dayjs(LeaveEndDate);
    const diff = end.diff(start,"day")+1
    setTotalLeaveDays(diff)
  }
},[leaveStartDate,LeaveEndDate])


console.log(leaveInfo,'leaveInfo')

 // Filter rows based on selected leave type
 const filteredRows = leaveInfo
 ? leaveInfo.allLeaveRecords.filter(
     (row) => !leaveType || row.leaveType.toLowerCase() === leaveType.toLowerCase()
   )
 : [];

// Conditionally render columns based on leaveType
const columns = [
  {
    field: 'leaveType',
    headerName: 'Leave Type',
    width: 150,
    renderCell: (params) => (
      leaveType === 'sick' && params.row.leaveType === 'sick' ? (
        <span style={{ color: 'green' }}>{params.row.leaveType}</span>
      ) : leaveType === 'absent' && params.row.leaveType === 'absent' ? (
        <span style={{ color: 'red' }}>{params.row.leaveType}</span>
      ) : null
    ),
  },
  // Conditionally hide Leave Start Date and Leave End Date columns for "Absent"
  leaveType !== 'absent' && {
    field: 'leaveStartDate',
    headerName: 'Leave Start Date',
    width: 150,
    renderCell: (params) =>
      leaveType === 'sick' && params.row.leaveType === 'sick'
        ? moment.parseZone(params.row.leaveStartDate).local().format('DD/MM/YYYY')
        : '',
  },
  leaveType !== 'absent' && {
    field: 'leaveEndDate',
    headerName: 'Leave End Date',
    width: 150,
    renderCell: (params) =>
      leaveType === 'sick' && params.row.leaveType === 'sick'
        ? moment.parseZone(params.row.leaveEndDate).local().format('DD/MM/YYYY')
        : '',
  },
  {
    field: 'totalSickLeaveDays',
    headerName: 'Sick Leave Days',
    width: 150,
    renderCell: (params) =>
      leaveType === 'sick' && params.row.leaveType === 'sick'
        ? params.row.totalSickLeaveDays
        : '',
  },
  {
    field: 'totalAbsenceLeaveDays',
    headerName: 'Absence Leave Days',
    width: 150,
    renderCell: (params) =>
      leaveType === 'Absent' && params.row.leaveType === 'Absent'
        ? params.row.totalAbsenceLeaveDays
        : '',
  },
  {
    field: 'createdAt',
    headerName: 'Leave Application Date',
    width: 150,
    renderCell: (params) =>
      leaveType && params.row.leaveType === "Absent"
        ? moment.parseZone(params.row.createdAt).local().format('DD/MM/YYYY')
        : '',
  },
  {
    title: "Action",
    field: "Action",
    width: 100,
    renderCell: (params) => (
      <Fragment>
     <Button   onClick={() => updateRowData(params.row)}>
          <EditIcon />
        </Button>
      </Fragment>
    ),
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
];

const ChangeRowData=(e)=>{
  setUpdate({...update,[e.target.name]:e.target.value})
}
const updateRowData= async(params)=>{
  // console.log(params,'cheack in update data in Add Product')
 setUpdate(params)
   setShowDialog(true)
}
// console.log(update,'update')


  return (
 
<div className="row">
  {/* Sidebar Section */}
  <div className="col-md-2 dashboard-sidebar">
    <Dashhead id={3} display={display} />
  </div>

  {/* Main Content Section */}
  <div
    className="col-md-10 dashboard-container"
    onClick={() => display && setDisplay(false)}
  >
    <span className="iconbutton display-mobile">
      <IconButton size="large" aria-label="Menu" onClick={() => setDisplay(true)}>
        <MenuIcon fontSize="inherit" />
      </IconButton>
    </span>
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
    {/* Form Section */}
    <form onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer />
      <div className="container ">
        <h1 className="mt-3 title text-center">
          <Backicon /> leave request
        </h1>
        <div className="icon-container text-center mb-5">
          <img src={leaverequest} alt="File icon" className="headingimage mt-3" draggable="false" />
        </div>


        {/* Row 1: Date and Employee Selection */}
        <div className="row my-3">
          <div className="col-md-4">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: '100%' }}
                label="Date"
                value={date}
                format="DD/MM/YYYY"
                onChange={(newValue) => setDate(newValue)}
              />
            </LocalizationProvider>
          </div>
          <div className="col-md-8">
            <Autocomplete
              disablePortal
              fullWidth
              id="combo-box-demo"
              options={data}
              value={selectedEmployee}
              getOptionLabel={(option) => option.name || ""}
              onChange={(event, value) => handleEmployee(event, value)}
              renderInput={(params) => (
                <TextField {...params} label="Select Employee Name" required />
              )}
            />
          </div>
        </div>

        {/* Row 2: Employee Details */}
        <div className="row my-3">
          <div className="col-md-4">
            <TextField
              fullWidth
              label="Employee Number"
              value={selectedEmployee?.employeeNumber || ""}
              InputProps={{ readOnly: true }}
            />
          </div>
          <div className="col-md-4">
            <TextField
              fullWidth
              label="Qatar ID"
              value={selectedEmployee?.qatarID || ""}
              InputProps={{ readOnly: true }}
            />
          </div>
          <div className="col-md-4">
            <TextField
              fullWidth
              label="Passport Number"
              value={selectedEmployee?.passportNumber || ""}
              InputProps={{ readOnly: true }}
            />
          </div>
        </div>

        {/* Row 3: Leave Details */}
        <div className="row my-4 align-items-center">
          <div className="col-md-3">
            <FormControl required>
              <FormLabel>Leave Type:</FormLabel>
              <RadioGroup
                row
                value={leaveType}
                onChange={handleLeaveTypeChange}
              >
                <FormControlLabel value="sick" control={<Radio />} label="Sick" />
              
              </RadioGroup>
            </FormControl>
          </div>
          <div className="col-md-3">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Leave Start Date"
                // value={leaveStartDate}
                value={leaveType ==="Absent" ? null : leaveStartDate}
                format="DD/MM/YYYY"
                disabled={leaveType ==="Absent"}
                onChange={(newValue) => setLeaveStartDate(newValue)}
              />
            </LocalizationProvider>
          </div>
          <div className="col-md-3">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Leave End Date"
                value={leaveType ==="Absent" ? null : LeaveEndDate}
                format="DD/MM/YYYY"
                disabled={leaveType ==="Absent"}
                onChange={(newValue) => setLeaveEndDate(newValue)}
              />
            </LocalizationProvider>
          </div>
          <div className="col-md-3">
            <TextField
              fullWidth
              type="number"
              label="Total Leave Days"
              // value={totalLeaveDays}
              value={leaveType ==="Absent" ? null : totalLeaveDays}
              InputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }} // Force label to shrink
            />
          </div>
        </div>
        {
  leaveInfo && (
    <Alert severity="info">
      <span>
        <strong>{selectedEmployee?.name}</strong> has taken a total of 
        <strong> {leaveInfo?.totalSickLeave || "0"} </strong> sick leaves this year.
      </span>
    </Alert>
  )
}

     
        {/* Row 3: Leave Details */}
        <div className="row my-4 align-items-center">
          <div className="col-md-3">
            <FormControl required>
            
              <RadioGroup
                row
                value={leaveType}
                onChange={handleLeaveTypeChange}
              >
                <FormControlLabel value="Absent" control={<Radio />} label="Absent" />
               
              </RadioGroup>
            </FormControl>
          </div>
          <div className="col-md-6">
          <TextField
              fullWidth
              label="Total Leave Days"
              value={leaveType === "sick" ? "" : undefined}
              disabled={leaveType ==="sick"}
          {...register("totalAbsenceLeaveDays")}
          type="number"
            />
          </div>
          
        </div>
      {
        leaveInfo && (
          <Alert severity="info">
          <span>
            <strong>{selectedEmployee?.name}</strong> has taken a total of 
            <strong> {leaveInfo?.totalAbsenceLeave || "0"} </strong> Absent leaves this year.
          </span>
        </Alert>
        )
      }




        {/* Row 4: Comments */}
        <div className="row my-4">
          <div className="col-md-12">
            <TextField
              rows={3}
              multiline
              fullWidth
             
              label="Comment"
              {...register("comment")}
            />
          </div>
        </div>
        {/* Row 6: Action Buttons */}
        <div className="row my-4 text-center">
          <div className="col">
          <Stack spacing={2} direction="row"  className ="my-5" marginBottom={2} justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSubmit(onSubmit)({ action: "print" })}
          >
            <PrintIcon className="mr-1" /> Print Form
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleSubmit(onSubmit)({ action: "save" })}
          >
            <SaveIcon className="mr-1" /> Save Form
          </Button>
        </Stack>
          </div>
                  
                </div>


                <UpdateAbsenceLeave
      showDialog={showDialog}
      update={update}
      setShowDialog={setShowDialog}
      ChangeRowData={ChangeRowData}
      getTotalSickLeave={getTotalSickLeave}
     />
        {/* Row 5: Data Table */}
        <div className="row my-4">
          <div className="col-md-12">
            <Paper sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={filteredRows }
               
                columns={columns}
                sx={{ border: 0 }}
                onRowClick={(params)=>setUpdate(params.row)}
              />
            </Paper>
          </div>
        </div>

        
      </div>
    </form>
  </div>
</div>


  );
};

export default AbsenceLeave;
