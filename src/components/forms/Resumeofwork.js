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
import work from '../../images/work.svg'
import SaveIcon from '@mui/icons-material/Save';
import Backicon from "../header/Backicon";
import { useForm } from "react-hook-form";
import axios from "axios";
import config from "../auth/Config";
import dayjs from "dayjs";
import { Bounce, toast, ToastContainer } from "react-toastify";
const Resumeofwork = () => {
  const [display, setDisplay] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [data,setData] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [leaveInfo, setLeaveInfo] = useState(null)
  const [resumeDate, setResumeDate] = useState(dayjs())
  const [leaveStartDate, setLeaveStartDate] = useState(null);
  const [LeaveEndDate, setLeaveEndDate] = useState(null);
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
    formData.append("resumeOfWorkDate",resumeDate)

    if(leaveInfo){
      formData.append("leaveStartDate",leaveInfo.leaveStartDate)
      formData.append("leaveEndDate", leaveInfo.leaveEndDate )
    
    }else{
      formData.append("leaveStartDate",leaveStartDate)
      formData.append("leaveEndDate",LeaveEndDate)
    }
     
    
    const response = await axios.post(
      `${config.baseUrl}/api/EmployeeResume`,formData,
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
          <Backicon/>
          <h1 className="mt-3 title text-center">Resume of work application form</h1>
          <div className="icon-container">
                <img src={work}  alt="File icon" className="center headingimage mt-3" draggable="false"/>
            </div>
          <p className="subTitle">Employee Info</p>
          {/* ---------------------------------------------------First Row Start Here------------------------------------------- */}
          <div className="row my-4">
            <div className="col">
            <Autocomplete
              disablePortal
              sx={{ width: 300 }}
              id="combo-box-demo"
              options={data}
              getOptionLabel={(option) => option.name || ""} // Display employee name
              onChange={(event,value)=>handleEmployee(event,value)}
              renderInput={(params) => <TextField {...params} label="Name" />}
            />
            </div>
            <div className="col">
              <TextField
              label="Employee No"
               variant="outlined"
                id="outlined-basic"
                sx={{ width: 300 }}
                value={selectedEmployee?.employeeNumber||''}
                InputLabelProps={{
                  shrink:true
                }}
              />
            </div>
            <div className="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 300 }}
                label="Nationality"
                variant="outlined"
                value={selectedEmployee?.nationality || ""}
                InputLabelProps={{
                  shrink:true
                }}
              />
            </div>
          </div>
          {/* ---------------------------------------------------Second Row Start Here------------------------------------------- */}
          <div className="row my-4">
            <div className="col-4">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                     value={leaveInfo?.leaveStartDate ? dayjs(leaveInfo.leaveStartDate) : null} // Ensure compatibility with

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
            <div className="col-4">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                     value={leaveInfo?.leaveEndDate ? dayjs(leaveInfo.leaveEndDate) : null} // Ensure compatibility with

                  sx={{ width: 300 }}
                  label="Leave End  Date"
                  onChange={(newValue) => setLeaveEndDate(newValue)}
                   format="DD/MM/YYYY"
                  renderInput={(params) => (
                    <TextField name="date" {...params} />
                  )}
                />
              </LocalizationProvider>
            </div>
          </div>
{/* ---------------------------------------------------second Row Start Here------------------------------------------- */}
          <div className="row my-4">
            <div className="col-4">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: 300 }}
                  value={resumeDate}
                  label="Resume of work date"
                  onChange={(newValue) => setResumeDate(newValue)}
                  renderInput={(params) => (
                    <TextField name="date" {...params} />
                  )}
                />
              </LocalizationProvider>
            </div>
            <div className="col-7">
              <div className="form-group">
                <label for="user-message" className=" control-label"></label>
                <div className="">
                  <textarea
                    name="user-message"
                    id="user-message"
                    className="form-control"
                    rows="3"
                    {...register("comment")}
                  
                    placeholder="Enter your Comment"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
{/* --------------------------------Print Button---------------------------------------------------------- */}
            
<Stack spacing={2} direction="row" marginBottom={2}  justifyContent="center">
           
            <Button variant="contained" color="success"  type="submit"> <SaveIcon className="mr-1"/> Save Form</Button>
            {/* <Link to="/Resumeofworkpdf"><Button variant="contained"disabled><PrintIcon className="mr-1" /> Print Form</Button> </Link> */}
            </Stack>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Resumeofwork;
