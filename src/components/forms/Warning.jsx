import React, { useEffect, useState } from "react";
import "./forms.scss";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead";
import { Link } from "react-router-dom";
import PrintIcon from '@mui/icons-material/Print';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Autocomplete, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField } from "@mui/material";
import endofservices from '../../images/endofservices.svg'
import SaveIcon from '@mui/icons-material/Save';
import employeWarning from '../../images/EmployeeWarning.jpg'
import { useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import config from "../auth/Config";
import axios from "axios";
import dayjs from "dayjs";
const Warning = () => {
  const [display, setDisplay] = React.useState(false);
  const [date, setDate] = React.useState(dayjs());
  const [data,setData]= useState([])
  const [warningType,setWarningType] = useState(null)
  const [selectedEmployee, setSelectedEmployee] = useState(null);
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
      // console.log(data,"EmployeeData")
    // =========================================Ues Effect===============================================================================================
    
       useEffect(()=>{
        getAllEmployeeData()
      
      },[])
      const onSubmit = async(data,event)=>{
        const formData = new FormData();
        Object.keys(data).forEach((key)=>{
          formData.append(key,data[key])
      
        })
        try{
          formData.append("employeeId",selectedEmployee._id)
          formData.append("employeeId",selectedEmployee._id)
          // formData.append("date",date)
          // formData.append("newVisaRequested",newVisa)
          // formData.append("BusinessVisaRequested",businessVisa)
          // formData.append("TransferVisaRequested",visaTransfer)
          // formData.append("NewRPRequested",newRP)
          // formData.append("RPRenewalRequested",rpRenewal)
          // formData.append("exitPermitRequested",exitPermit)
          // formData.append("OthersRequested",others)
      
          
           
          
          const response = await axios.post(
            `${config.baseUrl}/api/Rprenewalform`,formData,
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
      
      


  const handleWarningTypeChange = (event) => {
    setWarningType(event.target.value); // Update state with selected value
    console.log("Selected Exit Type:", event.target.value); // For debugging
  };
  const handleEmployee =async(event,value)=>{
    setSelectedEmployee(value); // Set selected employee

  }
  return (
    <div>
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
           <Dashhead id={2} display={display} />
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
            <h1 className="mt-3 title">Employee Warning</h1>
            <div className="icon-container">
                <img src={employeWarning}  alt="File icon" className="center headingimage mt-3" draggable="false"/>
            </div>
            <p className="subTitle">Employee info</p>
            {/* ---------------------------First Row Strart Here----------------------------------------- */}
            <div className="row">
            
              <div className="col-4">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                  value={date}
                    sx={{ width: 300 }}
                    label="Date"
                    onChange={(newValue) => setDate(newValue)}
                    renderInput={(params) => (
                      <TextField name="date" {...params} />
                    )}
                  />
                </LocalizationProvider>
              </div>
       
            </div>
            <div className="row my-4">
          
              <div className="col-4 ">
              <Autocomplete
              disablePortal
              sx={{ width: 300 }}
              id="combo-box-demo"
              options={data}
              value={selectedEmployee}
              getOptionLabel={(option) => option.name || ""} // Display employee name
              onChange={(event,value)=>handleEmployee(event,value)}
              renderInput={(params) => <TextField {...params} label="Name" required/>}
            />
              </div>
              <div className="col-4  ">
              <TextField
                fullWidth
                id="Position"
                readOnly
                sx={{width:300}}
                variant="outlined" // Use "outlined" or "filled" variant to prevent label overlap
                value={selectedEmployee?.position ||""} // Dynamically update position
                placeholder="Employee Number"
                label= "Employee Number"
                InputProps={{
                  readOnly: true, // Make position field read-only
                }}
              />
              </div>
              <div className="col-4  ">
              <TextField
                fullWidth
                id="Position"
                readOnly
                sx={{width:300}}
                variant="outlined" // Use "outlined" or "filled" variant to prevent label overlap
                value={selectedEmployee?.employeeNumber ||""} // Dynamically update position
                placeholder="Employee Number"
                label= "Employee Number"
                InputProps={{
                  readOnly: true, // Make position field read-only
                }}
              />
              </div>
            </div>
        
            <div className="row my-5">

          <div className="col-4">
          <FormControl >
          <FormLabel id="demo-radio-buttons-group-label" className="font-weight-bold">Warning Type:</FormLabel>
          <RadioGroup row
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          value={warningType} // Bind to state
          onChange={handleWarningTypeChange} // Handle change event
          >
          <FormControlLabel value="Terminate" control={<Radio />} label="Warning" />
          <FormControlLabel value="Resign" control={<Radio />} label="Penalty" />
          </RadioGroup>
          </FormControl>
          </div>


</div>
            {/* ---------------------------Second Row Start Here----------------------------------------- */}
            <div className="row">
             
              <div className="col-11">
                <TextField
                  id="filled-basic"
                  // fullWidth
                  label="Subject"
                  multiline
                  rows={10}
                  maxRows={5}
                  variant="filled"
                  // sx={{ width: 650 }}
                  fullWidth
                />
              </div>
            </div>
         

            
       
            {/* -----------------------------------Forth row Start Herer---------------------------------------------------- */}
            <div className="row my-4">
              <div className="col-11">
                <TextField
                  id="outlined-basic"
                 fullWidth
            
               
                  label="Other"
                  variant="outlined"
                />
              </div>
            </div>
{/* -------------------------------------- Fifth row Start Here---------------------------------------------------------*/}
 
{/* --------------------------------Print Button---------------------------------------------------------- */}
<Stack spacing={2} direction="row" marginBottom={2}  justifyContent="center">
          {/* <Link to ="/EndofServicepdf">  <Button variant="contained"> <PrintIcon className="mr-1"/> Print Form</Button> </Link> */}
            <Button variant="contained" color="success"> <SaveIcon className="mr-1"/> Save Form</Button>
            </Stack>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Warning;
