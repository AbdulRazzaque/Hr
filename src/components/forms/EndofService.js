import React, { useEffect, useRef, useState } from "react";
import "./forms.scss";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead";

import PrintIcon from '@mui/icons-material/Print';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Autocomplete, Button, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField } from "@mui/material";
import endofservices from '../../images/endofservices.svg'
import SaveIcon from '@mui/icons-material/Save';
import { FormControl } from "@mui/base";
import BackIcon from "../header/BackIcon";
import axios from "axios";
import Config from '../auth/Config'
import { Bounce, toast,ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import config from "../auth/Config";
import 'react-toastify/dist/ReactToastify.css';
import dayjs from "dayjs";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const EndofService = () => {
  const [display, setDisplay] = React.useState(false);
  const [selectedLastWorkingDate,setSelectedLastWorkingDate]= useState(null)
  const [date, setDate] = React.useState(dayjs());
  const [data,setData] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [exitType, setExitType] = useState(null); // State to store the selected value
  const [resumingLastVacation, setResumingLastVacation] = useState(null); // State to store the selected value
    const [ResumeInfo, setResumeInfo] = useState(null)
    const history = useHistory();
  // =========================================Get Api===============================================================================================
  
  const {register,handleSubmit,reset} = useForm()

const getAllEmployeeData =()=>{
  axios.get(`${Config.baseUrl}/api/allEmployee`)
  .then(res=>{
   
    let arr = res.data.employees.map((item,index)=>{
      return {...item,id:index+1}
    })
    setData(arr)
  }).catch(err=>console.log(err))
}
  console.log(data,"EmployeeData")
// =========================================Ues Effect===============================================================================================

   useEffect(()=>{
    getAllEmployeeData()
  
  },[])


//  =========================================Post api=========================================================

const onSubmit = async(data,{action})=>{

  if(!exitType){
    alert("Please select exit type")
    return
  }  
  const formData = new FormData();
  Object.keys(data).forEach((key)=>{
    formData.append(key,data[key])
  })

  try{
    formData.append("employeeId",selectedEmployee._id)
    formData.append("date",date)
  
    formData.append("exitType",exitType)
    formData.append("lastWorkingDate",selectedLastWorkingDate)
    formData.append("dateOfJoining",selectedEmployee.dateOfJoining)
    formData.append("resumingofLastVacation",resumingLastVacation|| ResumeInfo?.resumeOfWorkDate)

    const response = await axios.post(
      `${Config.baseUrl}/api/endofservices`,formData,
     { headers: { Authorization: `Bearer ${Config.accessToken}` 

     }
    }
    )
    
 
    toast.success(response.data.message|| "Employee remove successfully", {
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

      reset()
      if (action === "print") {
        history.push('/EndofServicepdf', { data: Object.fromEntries(formData) });
      }
      setSelectedEmployee(null)
      setResumingLastVacation(null)
      setSelectedLastWorkingDate(null)
      getAllEmployeeData()
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
//  =========================================Get End of  api=========================================================

  
const handleEmployee =async(event,value)=>{
  setSelectedEmployee(value); // Set selected employee
  if (!value || !value._id) {
    // Ensure the selected value has a valid ID before making the API call
    setResumeInfo(null); // Reset leave info if no employee is selected
    return;
  }
try{
  const response =  await  axios.get(`${config.baseUrl}/api/getEmployeeResume/${value._id}`,{
      headers:{Authorization: `Bearer ${config.accessToken}` },
    })

  setResumeInfo(response.data,)
}catch(error){
  console.error('Error fetching leave information:', error.message || error);
  setResumeInfo(null)
}

}

console.log(ResumeInfo,"ResumeInfo")
  const handleExitTypeChange = (event) => {
    setExitType(event.target.value); // Update state with selected value
    console.log("Selected Exit Type:", event.target.value); // For debugging
  };
  return (
    <div>
          <form onSubmit={handleSubmit(onSubmit)}>

          <ToastContainer />
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
          <div className="container">
          <BackIcon/>
            <h1 className=" text-center title">End of Services</h1>
            <div className="icon-container">
                <img src={endofservices}  alt="File icon" className="center headingimage mt-3" draggable="false"/>
            </div>
            <p className="subTitle">Employee info</p>
            {/* ---------------------------First Row Strart Here----------------------------------------- */}
           <div className="row my-2">
                       <div className="col-4">
                         <LocalizationProvider dateAdapter={AdapterDayjs}>
                           <DatePicker
                             sx={{ width: 300 }}
                             label="Date"
                             value={date}
                             views={["year", "month", "day"]}
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
                                views={["year", "month", "day"]}
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
            {/* ---------------------------Second Row Strart Here----------------------------------------- */}
            <div className="row">
            
              <div className="col-12">
      
                <TextField
                  id="filled-basic"
                  fullWidth
                  label="subject"
                  variant="filled"
                  // sx={{ width: 650 }}
                  // fullWidth
                  {...register("subject")}
                  
                />
              </div>
            </div>
            {/* ----------------------------------------Second Row Start Here----------------------------------- */}
                            <div className="row my-5">

                <div className="col-4">
                <FormControl required error={!exitType} >
                <FormLabel id="demo-radio-buttons-group-label" className="font-weight-bold">Exit Type:</FormLabel>
                <RadioGroup row
                aria-required
                aria-labelledby="demo-radio-buttons-group-label"
                // name="radio-buttons-group"
               name="radio-buttons-group"
                value={exitType} // Bind to state
                onChange={handleExitTypeChange} // Handle change event
                >
                <FormControlLabel value="Terminate" control={<Radio />} label="Terminate" />
                <FormControlLabel value="Resign" control={<Radio />} label="Resign" />
                </RadioGroup>
                </FormControl>
                </div>


                </div>

            
            {/* ------------------------------Therd Row start Here------------------------------------------------ */}
            <p className="subTitle">Employee Work Info</p>
            <div className="row my-3">

              <div className="col-4">
    
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: 300 }}
                    label="Last working Date"
                    format="DD/MM/YYYY"
                    views={["year", "month", "day"]}
                    value={selectedLastWorkingDate}
                    onChange={(newValue) => setSelectedLastWorkingDate(newValue)}
                    renderInput={(params) => (
                      <TextField name="date" {...params} required/>
                    )}
                  />
                </LocalizationProvider>
              </div>
              
            
              <div className="col">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                     value={ResumeInfo?.resumeOfWorkDate? dayjs(ResumeInfo?.resumeOfWorkDate) : resumingLastVacation} // Ensure compatibility with
                    sx={{ width: 300 }}
                         label="Resuming of last vacation"
                         format="DD/MM/YYYY"
                         views={["year", "month", "day"]}
                    onChange={(newValue) => setResumingLastVacation(newValue)}
                    renderInput={(params) => (
                      <TextField name="date" {...params} required/>
                    )}
                  />
                </LocalizationProvider>
              </div>
          
            </div>
            {/* -----------------------------------Forth row Start Here---------------------------------------------------- */}
            <div className="row my-4">
              <div className="col">
                {/* <TextField
                {...register("other")}
                  id="outlined-basic"
                  sx={{ width: 300 }}
                  label="Other"
                  variant="outlined"
                /> */}
                <TextField
                  id="filled-basic"
                  fullWidth
                  label="subject"
                  variant="filled"
                 
                 {...register("other")}
                  
                />
              </div>
            </div>

{/* --------------------------------Print Button---------------------------------------------------------- */}
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
      </div>
      </form>
    </div>
  );
};

export default EndofService;
