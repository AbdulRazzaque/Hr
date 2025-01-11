



import React, { useEffect, useState } from "react";
import "./forms.scss";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead";
import { Autocomplete, Button, Checkbox, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, Stack, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PrintIcon from '@mui/icons-material/Print';
import exit from '../../images/exit.svg' 
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

const AbsenceLeave = () => {
  const [display, setDisplay] = React.useState(false);
  const [data,setData] = useState([])

  const [leaveType, setLeaveType] = React.useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [date, setDate] = useState(dayjs());
  const [leaveStartDate, setleaveStartDate] = useState(null);
  const [LeaveEndDate, setLeaveEndDate] = useState(null);
  const [totalLeaveDays, setTotalLeaveDays] = useState(null);
  const [leaveInfo, setLeaveInfo] = useState(null)

  
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




  // console.log(data,"EmployeeData")
// =========================================Ues Effect===============================================================================================

   useEffect(()=>{
    getAllEmployeeData()

  
  },[])


//  =========================================Post api=========================================================
const onSubmit = async(data,event)=>{
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
  Object.keys(data).forEach((key)=>{
    formData.append(key,data[key])

  })
  
  try{
    formData.append("employeeId",selectedEmployee._id)
    formData.append("date",date)
 
    formData.append("leaveType",leaveType)
    formData.append("leaveStartDate",leaveStartDate)
    formData.append("leaveEndDate",LeaveEndDate)
    formData.append("totalSickLeaveDays",totalLeaveDays)

    
 

  
 
    const response = await axios.post(
      `${config.baseUrl}/api/exitofleave`,formData,
     { headers: { Authorization: `Bearer ${config.accessToken}` 

     }
    }
    )
    
 
    toast.success(response.data.message|| "succes", {
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
         setleaveStartDate(null);  // Reset leave start date
         setLeaveEndDate(null);  // Reset leave end date
         setTotalLeaveDays(null);  // Reset total leave days
         setLeaveInfo(null)
        
   
 
    
    
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
try{
  const response =  await axios.get(`${config.baseUrl}/api/getEmployeeLeave/${value._id}`,
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

// Calculate Day starDate and endDate
useEffect(()=>{
  if(leaveStartDate && LeaveEndDate){
    const start = dayjs(leaveStartDate);
    const end = dayjs(LeaveEndDate);
    const diff = end.diff(start,"day")+1
    setTotalLeaveDays(diff)
  }
},[leaveStartDate,LeaveEndDate])


console.log(leaveInfo)


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
 
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

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

    {/* Form Section */}
    <form onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer />
      <div className="container ">
        <h1 className="mt-3 title text-center">
          <Backicon /> Exit For Leave
        </h1>
        <div className="icon-container text-center">
          <img src={exit} alt="File icon" className="headingimage mt-3" draggable="false" />
        </div>
        <p className="subTitle text-center my-5">Leave Request</p>

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
                value={leaveStartDate}
                format="DD/MM/YYYY"
                onChange={(newValue) => setleaveStartDate(newValue)}
              />
            </LocalizationProvider>
          </div>
          <div className="col-md-3">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Leave End Date"
                value={LeaveEndDate}
                format="DD/MM/YYYY"
                onChange={(newValue) => setLeaveEndDate(newValue)}
              />
            </LocalizationProvider>
          </div>
          <div className="col-md-3">
            <TextField
              fullWidth
              label="Total Leave Days"
              value={totalLeaveDays}
              InputProps={{ readOnly: true }}
            />
          </div>
        </div>
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
             
          {...register("totalAbsenceLeaveDays")}
            />
          </div>
          
          
        </div>

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
          <Stack spacing={2} direction="row" justifyContent="center">
                    <Button variant="contained" color="success" type="submit">
                      <SaveIcon className="mr-1" /> Save Form
                    </Button>
                  </Stack>
          </div>
                  
                </div>
        {/* Row 5: Data Table */}
        <div className="row my-4">
          <div className="col-md-12">
            <Paper sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                sx={{ border: 0 }}
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
