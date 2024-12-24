import React, { useEffect, useState } from "react";
import "./forms.scss";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead";
import { Link } from "react-router-dom";
import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PrintIcon from "@mui/icons-material/Print";
import settlement from '../../images/settlement.svg'
import SaveIcon from '@mui/icons-material/Save';
import { useForm } from "react-hook-form";
import axios from "axios";
import config from "../auth/Config";
import dayjs from "dayjs";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
const Annualsettelment = () => {
  const [display, setDisplay] = React.useState(false);
  const [data,setData] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [leaveInfo, setLeaveInfo] = useState(null)
  const [date, setDate] = React.useState(dayjs());
  const [value, setValue] = React.useState(null);
  const [leaveStartDate, setLeaveStartDate] = useState(null);
  const [resumeDate, setResumeDate] = useState(null);
  const {register,handleSubmit,reset,formState:{errors}} = useForm()
 

const getAllEmployeeData =()=>{
  axios.get(`${config.baseUrl}/api/allEmployee`)
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


  
// post api
const onSubmit = async(data,event)=>{
  const formData = new FormData();
  Object.keys(data).forEach((key)=>{
    formData.append(key,data[key])

  })
  try{
    formData.append("employeeId",selectedEmployee._id)
    formData.append("date",date)

      formData.append("leaveStartDate",leaveInfo?.leaveData?.leaveStartDate ||leaveStartDate)
      formData.append("resumingVacation",leaveInfo?.employeeResume?.resumeOfWorkDate ||resumeDate )

    // if(leaveInfo){
    //   formData.append("leaveStartDate",leaveInfo?.leaveData?.leaveStartDate)
    //   formData.append("resumingVacation",leaveInfo?.employeeResume?.resumeOfWorkDate)

    // }else{
    //   formData.append("leaveStartDate",leaveStartDate)
    //   formData.append("resumingVacation",resumeDate)
    // }
     
    
    const response = await axios.post(
      `${config.baseUrl}/api/Annualsettelment`,formData,
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

      setSelectedEmployee(null)
      setLeaveInfo(null)
      reset()
    
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




  // handel employee value eg.set automatic QID and other 
const handleEmployee =async(event,value)=>{
  setSelectedEmployee(value); // Set selected employee
  if (!value || !value._id) {
    // Ensure the selected value has a valid ID before making the API call
    setLeaveInfo(null); // Reset leave info if no employee is selected
    return;
  }
try{
  const [response1,response2] =  await Promise.allSettled([

    axios.get(`${config.baseUrl}/api/getEmployeeLeave/${value._id}`,{
      headers:{Authorization: `Bearer ${config.accessToken}`},
    }),
    axios.get(`${config.baseUrl}/api/getEmployeeResume/${value._id}`,{
      headers:{Authorization: `Bearer ${config.accessToken}` },
    })
  ]) ;
  const leaveData = response1.status === "fulfilled" ? response1.value.data : null;
  const employeeResume = response2.status === "fulfilled" ? response2.value.data : null;

  // console.log(leave)
  setLeaveInfo(
  {
    leaveData,
    employeeResume,
  }
  )
}catch(error){
  console.error('Error fetching leave information:', error.message || error);
  setLeaveInfo(null)
}

}
console.log(leaveInfo,"leave info")
  return (
    <div className="row">
    <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
    <Dashhead id={3} display={display} />
    </div>

    <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container" onClick={()=>display&&setDisplay(false)}>
    <span className="iconbutton display-mobile">
    <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
    <MenuIcon fontSize="inherit" />
     </IconButton>
     </span>
     <form onSubmit={handleSubmit(onSubmit)}>
      
     <ToastContainer />
     <div className="container">
     <h1 className="mt-3 title">Annual Settlement Request</h1>
            <div className="icon-container">
                <img src={settlement}  alt="File icon" className="center headingimage mt-3" draggable="false"/>
            </div>
            <p className="subTitle">Employee info</p>
                        {/* ---------------------------First Row Strart Here----------------------------------------- */}

                        <div className="row my-3">
              <div className="col-4">
              <Autocomplete
              disablePortal
              sx={{ width: 300 }}
              id="combo-box-demo"
              options={data}
              value={selectedEmployee}
              getOptionLabel={(option) => option.name || ""} // Display employee name
              onChange={(event,value)=>handleEmployee(event,value)}
              renderInput={(params) => <TextField {...params} label="Name" />}
            />
              </div>
              <div className="col-4">
              <TextField

            value= {selectedEmployee?.position || ""}
                  id="outlined-basic"
                  sx={{ width: 300 }}
                  label="Position"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,  // Ensures the label always shrinks, even when there is a value
                  }}
                />
              </div>
              <div className="col">
              <TextField

                  id="outlined-basic"
                  sx={{ width: 300 }}
                  label="Employee Number"
                  value= {selectedEmployee?.employeeNumber || ""}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,  // Ensures the label always shrinks, even when there is a value
                  }}
                />
              </div>
            </div>
                        <div className="row">
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
              <div className="col-6">
                <TextField
                  id="filled-basic"
                  fullWidth
                  label="Subject"
                  variant="filled"
                  sx={{ width: 650 }}
                  {...register('subject')}
                />
              </div>
            </div>

  
  {/* ---------------------------Third Row Strart Here----------------------------------------- */}
                        <div className="row mt-3">

              <div className="col-4">
              <TextField

                  id="outlined-read-only-input"
                  label="To"
                  sx={{ width: 300 }}
                defaultValue="Accounting & Finance"
                  variant="outlined"
                  {...register("to")}
                 inputProps={{
                  readOnly:true,
                 }}
                />
              </div>
              <div className="col">
              <TextField
            id="outlined-read-only-input"
            label="From"
            sx={{ width: 300 }}
            defaultValue="HR Department"
            {...register("from")}
            InputProps={{
              readOnly: true,
            }}
            />
              </div>
            </div>
  {/* ---------------------------Third Row Start Here----------------------------------------- */}
                        <div className="row mt-3">

              <div className="col-4">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                     value={leaveInfo?.leaveData? dayjs(leaveInfo?.leaveData?.leaveStartDate) : null} // Ensure compatibility with

                  sx={{ width: 300 }}
                  label="Leave Start  Date"
                  onChange={(newValue) => setLeaveStartDate(newValue)}
                  format="DD/MM/YYYY"
                  renderInput={(params) => (
                    <TextField name="date" {...params} />
                  )}
                />
              </LocalizationProvider>
              </div>
              <div className="col">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                  value={selectedEmployee?.dateOfJoining? dayjs(selectedEmployee?.dateOfJoining):null}
                    sx={{ width: 300 }}
                    label="Joining Date"
                    readOnly
                    // onChange={(newValue) => setSelectedJoiningDate(newValue)}
                    renderInput={(params) => (
                      <TextField name="date" {...params} required />
                      
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div className="col">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                  value={leaveInfo?.employeeResume?dayjs(leaveInfo?.employeeResume?.resumeOfWorkDate):null}
                    sx={{ width: 300 }}
                    label="Resuming of Last Vacation"
                    onChange={(newValue) => setResumeDate(newValue)}
                    renderInput={(params) => (
                      <TextField name="date" {...params} />
                    )}
                  />
                </LocalizationProvider>
              </div>
          
            </div>
       
{/* --------------------------------Print Button---------------------------------------------------------- */}
<Stack spacing={2} direction="row" marginBottom={2} className="my-5"  justifyContent="center">

            {/* <Link to="/Annualsettelmentpdf"><Button variant="contained"><PrintIcon className="mr-1" /> Print Form</Button> </Link> */}
            <Button variant="contained" color="success" type="submit"> <SaveIcon className="mr-1"/> Save Form</Button>
            </Stack>
     </div>
     </form>
     </div>
     </div>
  )
}

export default Annualsettelment