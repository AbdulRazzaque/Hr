import React, { useEffect, useState } from "react";
import "./forms.scss";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead";
import { Alert, Autocomplete, Button, Checkbox, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField } from "@mui/material";
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
import moment from 'moment'

import utc from 'dayjs/plugin/utc';      // Import the UTC plugin
import timezone from 'dayjs/plugin/timezone';  // Import the timezone plugin



const Exitforleave = () => {
  const [display, setDisplay] = React.useState(false);
  const [data,setData] = useState([])

  const [leaveType, setLeaveType] = React.useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [date, setDate] = useState(dayjs());
  const [leaveStartDate, setleaveStartDate] = useState(null);
  const [LeaveEndDate, setLeaveEndDate] = useState(null);
  const [totalLeaveDays, setTotalLeaveDays] = useState(null);
  const [lastNumberOfLeave,setLastNumberOfLeave]= useState("")

  const [bankLoan, setBankLoan] = useState("No");
  const [personalLoan, setPersonalLoan] = useState("No");
  const [creditCard, setCreditCard] = useState("No");
  const [companyLoan, setCompanyLoan] = useState("No");
  const [companyAssets, setCompanyAssets] = useState("No");
  const [mobileSimCard, setMobileSimCard] = useState("No");
  const [laptop, setLaptop] = useState("No");
  const [tools, setTools] = useState("No");
  const [lastLeaveStartDate, setLastLeaveStartDate] = useState(null);
  const [lastLeaveEndDate, setLastLeaveEndDate] = useState(null)
  const [leaveInfo, setLeaveInfo] = useState(null)
  const [eligible,setEligible] = useState(null)
  dayjs.extend(utc);
  dayjs.extend(timezone);
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

console.log(lastNumberOfLeave)
//  =========================================Post api=========================================================
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
  Object.keys(data).forEach((key)=>{
    formData.append(key,data[key])

  })
  
  try{
    formData.append("employeeId",selectedEmployee._id)
    formData.append("date",date)
 
    formData.append("leaveType",leaveType)
    formData.append("leaveStartDate",leaveStartDate)
    formData.append("leaveEndDate",LeaveEndDate)
    formData.append("numberOfDayLeave",totalLeaveDays)
    if(leaveInfo){
      formData.append("lastLeaveStartDate",leaveInfo.leaveStartDate|| lastLeaveStartDate)
      formData.append("lastLeaveEndDate", leaveInfo.leaveEndDate ||lastLeaveEndDate)
      formData.append("lastNumberOfDayLeave", leaveInfo?.numberOfDayLeave||lastNumberOfLeave)
    }else{
      formData.append("lastLeaveStartDate", lastLeaveStartDate)
      formData.append("lastLeaveEndDate", lastLeaveEndDate)
      formData.append("lastNumberOfDayLeave",lastNumberOfLeave)
    }

 

    formData.append("bankLoan",bankLoan)
    formData.append("personalLoan",personalLoan)
    formData.append("CreditCard",creditCard)
    formData.append("companyAssets",companyAssets)
    formData.append("companyAssetsLoan",companyLoan)
    formData.append("companySimCard",mobileSimCard)
    formData.append("companyLaptop",laptop)
    formData.append("tools",tools)

  
 
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
        
   
         if (action === "print") {
          // Convert FormData to a plain object
          const formDataObject = Object.fromEntries(formData.entries());
        
          history.push('/Exitforleavepdf', {
            data: {
              formData: formDataObject, 
              eligibilityMessage: eligible
            }
          });
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
try{
  const [response1,response2] = await Promise.allSettled([
      await axios.get(`${config.baseUrl}/api/getEmployeeLeave/${value._id}`,
      { 
        headers: { Authorization: `Bearer ${config.accessToken}`} 
        }
    ),
    axios.get(`${config.baseUrl}/api/CheckEligibleEmployee/${value._id}`,
      { 
        headers: { Authorization: `Bearer ${config.accessToken}`} 
        }
    )
      
    // console.log(leave)
  ])
  const leaveData  = response1.status === "fulfilled" ? response1.value.data : null;

  const CheckEligible = response2.status === "fulfilled" ? response2.value.data : null;

  setLeaveInfo(leaveData)
  setEligible(CheckEligible)
}

catch(error){
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
// console.log(selectedEmployee)
  return (
    <div className="row">
      <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
        <Dashhead id={3} display={display} />
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
        <form onSubmit={handleSubmit(onSubmit)}>

    <ToastContainer />
        <div className="container">
          <h1 className="mt-3 title text-center">
          <Backicon/>
            Exit For Leave
          </h1>
          <div className="icon-container">
                <img src={exit}  alt="File icon" className="center headingimage mt-3" draggable="false"/>
            </div>
          <p className="subTitle">Exit Permit Request</p>
          {/* ---------------------------------------------------First Row Start Here------------------------------------------- */}
          <div className="row my-2">
            <div className="col-4">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: 300 }}
                  label="Date"
                  value={date}
                     format="DD/MM/YYYY"
                  onChange={(newValue) => setDate(newValue)}
                  renderInput={(params) => (
                    <TextField name="date" {...params} />
                  )}
                />
              </LocalizationProvider>
            </div>
            <div className="col-8">
            <Autocomplete
              disablePortal
              // sx={{ width: 500 }}
                 format="DD/MM/YYYY"
              fullWidth
              id="combo-box-demo"
              options={data}
              value={selectedEmployee}
              getOptionLabel={(option) => option.name || ""} // Display employee name
              // onChange={(event, value) => {
            
              // }}
              onChange={(event,value)=>handleEmployee(event,value)}
              renderInput={(params) => <TextField {...params} label="Select Employee Name" required/>}
            />
            </div>
          </div> 
          {/* ---------------------------------------------------Second Row Start Here------------------------------------------- */}
          <div className="row my-5">
            <div className="col">
                  <TextField
                fullWidth
                id="Position"
                readOnly
                variant="outlined" // Use "outlined" or "filled" variant to prevent label overlap
                value={selectedEmployee?.employeeNumber ||""} // Dynamically update position
                placeholder="Employee Number"
                label= "Employee Number"
                InputProps={{
                  readOnly: true, // Make position field read-only
                }}
              />  
            </div>
            <div className="col">
            <TextField
                fullWidth
                id="Position"
                readOnly
                variant="outlined" // Use "outlined" or "filled" variant to prevent label overlap
               label="Qatar ID"
                placeholder="Qatar ID"
                value={selectedEmployee?.qatarID||""} // Dynamically update position

                InputProps={{
                  readOnly: true, // Make position field read-only
                }}
              /> 
            </div>
            <div className="col-4">
            <TextField
                fullWidth
                id="Position"
                readOnly
                variant="outlined" // Use "outlined" or "filled" variant to prevent label overlap
               label="Passport Number"
                placeholder="Employee Number"
                value={selectedEmployee?.passportNumber||""} // Dynamically update position
                InputProps={{
                  readOnly: true, // Make position field read-only
                }}
              /> 
            </div>
          </div> 
          <div className="row my-5">
            <div className="col-4">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  
                  sx={{ width: 300 }}
                  label="date Of Joining"
                  value={dayjs(selectedEmployee?selectedEmployee.dateOfJoining:null)}
                  disabled
                     format="DD/MM/YYYY"
                 
                  renderInput={(params) => (
                    <TextField name="date" {...params}  />
                  )}
                />
              </LocalizationProvider>
            </div>
            <div className="col">
            <TextField
                fullWidth
                id="Position"
                readOnly
                variant="outlined" // Use "outlined" or "filled" variant to prevent label overlap
               label="Nationality"
                placeholder="Nationality"
                value={selectedEmployee?.nationality||""} // Dynamically update position

                InputProps={{
                  readOnly: true, // Make position field read-only
                }}
              /> 
            </div>
          
          </div> 
          {/* ------------------------------------------------------Third Row Start Here-------------------------------------------------------------------------- */}
          <div>
          
          {eligible && (
  <Alert severity="info">
     {selectedEmployee?.name}  {eligible} 
  </Alert>
)}
          </div>
          <div className="row mt-4">

              <div className="col-4">
                      <FormControl required error={!leaveType}>
          <FormLabel id="demo-radio-buttons-group-label" className="font-weight-bold">Leave Type:</FormLabel>
          <RadioGroup row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            value={leaveType} // Bind to state
            onChange={handleLeaveTypeChange} // Handle change event
          >
          <FormControlLabel value="Business" control={<Radio />} label="Business" />
          <FormControlLabel value="Annual" control={<Radio />} label="Annual" />
          <FormControlLabel value="Emergency" control={<Radio />} label="Emergency" />
          <FormControlLabel value="Casual" control={<Radio />} label="Casual" />
        </RadioGroup>
      </FormControl>
              </div>
        

            </div>

          {/* ---------------------------------------------Forth row Start Here--------------------------------------------------- */}
          <div className="row my-5">
            <div className="col-4">

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="mt-4"
                  sx={{ width: 300 }}
                  label="Leave Start  Date"
                  value={leaveStartDate}
                     format="DD/MM/YYYY"
                  onChange={(newValue) => setleaveStartDate(newValue)}
                  renderInput={(params) => (
                    <TextField name="date" {...params} />
                  )}
                />
              </LocalizationProvider>
              </div>
            <div className="col">

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="mt-4"
                  sx={{ width: 300 }}
                  label="Leave End  Date"
                  value={LeaveEndDate}
                  onChange={(newValue) => setLeaveEndDate(newValue)}
                  format="DD/MM/YYYY"
                  renderInput={(params) => (
                    <TextField name="date" {...params} />
                  )}
                />
              </LocalizationProvider>
              </div>
            <div className="col mt-4">
          
                          <TextField
                variant="outlined"
                sx={{ width: 300 }}
                value={totalLeaveDays}
                
                label="Total Number of Days of Leave"
                InputLabelProps={{
                  shrink: true,  // Ensures the label stays above the input field
                }}
                InputProps={{
                  readOnly: true, // Make the field read-only since it's auto-calculated
                }}
              />
              </div>
                    </div>
          {/* ---------------------------------------------Fifth row Start Here--------------------------------------------------- */}
          <div className="row my-5">
            <div className="col-4">

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
              value={leaveInfo?.leaveStartDate ? 
                dayjs.utc(leaveInfo.leaveStartDate)  // Convert the UTC date from backend to a Day.js object
                  .local()                           // Convert it to local time zone
                  .startOf('day')                    // Set the time to the start of the day (00:00)
                             // Format the date to the desired format
                : null}
              
                  className="mt-4"
                  sx={{ width: 300 }}
                     format="DD/MM/YYYY"
                  label="Last Leave Start  Date"
                  onChange={(newValue) => setLastLeaveStartDate(newValue)}
                  renderInput={(params) => (
                    <TextField name="date" {...params} />
                  )}
                />
              </LocalizationProvider>
              </div>
            <div className="col">

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
               value={ leaveInfo?.leaveEndDate ? dayjs(leaveInfo.leaveEndDate) : null} // Ensure compatibility with dayjs
                  className="mt-4"
                  sx={{ width: 300 }}
                  format="DD/MM/YYYY"
                  label="Last Leave End  Date"
                  onChange={(newValue) => setLastLeaveEndDate(newValue)}
                  renderInput={(params) => (
                    <TextField name="date" {...params} />
                  )}
                />
              </LocalizationProvider>
              </div>
            <div className="col mt-4">
            
              <TextField
               variant="outlined"
               
                sx={{ width: 300 }}
                value={lastNumberOfLeave||leaveInfo?.numberOfDayLeave || ""}
                
                label="Total Number of Days of Leave"
                  onChange={(e)=>setLastNumberOfLeave(e.target.value)}
             

              />
             
              </div>
                    </div>
                    <div className="my-3">
                    <TextField
                    rows={3}  // Sets the number of visible lines
                    multiline={true} // Makes the field multiline
                    fullWidth
                    label="Comment"
                id="outlined-basic"
                // sx={{ width: 800 }}    label="Comment"
                {...register("comment")}
                variant="outlined"

              />
                    </div>

          {/* -----------------------------------------Second Row Start Here----------------------- */}
          <p className="subTitle">Asset and Loan Info</p>
          <div>
      {/* Bank Loan */}
      <div className="row my-4">
        <div className="col-2">
          <h3>Bank Loan</h3>
        </div>
        <div className="col">
          <FormControl>
            <RadioGroup
              row
              value={bankLoan}
              onChange={(e) => setBankLoan(e.target.value)}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      {/* Personal Loan */}
      <div className="row my-4">
        <div className="col-2">
          <h3>Personal Loan</h3>
        </div>
        <div className="col">
          <FormControl>
            <RadioGroup
              row
              value={personalLoan}
              onChange={(e) => setPersonalLoan(e.target.value)}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      {/* Credit Card */}
      <div className="row my-4">
        <div className="col-2">
          <h3>Credit Card</h3>
        </div>
        <div className="col">
          <FormControl>
            <RadioGroup
              row
              value={creditCard}
              onChange={(e) => setCreditCard(e.target.value)}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      {/* Company Loan */}
      <div className="row my-4">
        <div className="col-2">
          <h3>Company Loan</h3>
        </div>
        <div className="col">
          <FormControl>
            <RadioGroup
              row
              value={companyLoan}
              onChange={(e) => setCompanyLoan(e.target.value)}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      {/* Company Assets */}
      <div className="row my-4">
        <div className="col-2">
          <h3>Company Assets</h3>
        </div>
        <div className="col">
          <FormControl>
            <RadioGroup
              row
              value={companyAssets}
              onChange={(e) => setCompanyAssets(e.target.value)}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      {/* Mobile / Company sim card */}
      <div className="row my-4">
        <div className="col-2">
          <h3>Mobile / Company sim card</h3>
        </div>
        <div className="col">
          <FormControl>
            <RadioGroup
              row
              value={mobileSimCard}
              onChange={(e) => setMobileSimCard(e.target.value)}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      {/* Laptop */}
      <div className="row my-4">
        <div className="col-2">
          <h3>Laptop</h3>
        </div>
        <div className="col">
          <FormControl>
            <RadioGroup
              row
              value={laptop}
              onChange={(e) => setLaptop(e.target.value)}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      {/* Tools */}
      <div className="row my-4">
        <div className="col-2">
          <h3>Tools</h3>
        </div>
        <div className="col">
          <FormControl>
            <RadioGroup
              row
              value={tools}
              onChange={(e) => setTools(e.target.value)}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    </div>
                     {/* --------------------------------Print Button---------------------------------------------------------- */}
                     
            <Stack spacing={2} direction="row" marginBottom={2} justifyContent="center">
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
        </form>
      </div>
    </div>
  );
};

export default Exitforleave;
