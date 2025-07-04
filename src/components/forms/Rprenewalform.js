import React,{useEffect, useState} from "react";
import "./forms.scss";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead";
import { Autocomplete, Button, Checkbox, FormControlLabel, FormGroup, Stack, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PrintIcon from "@mui/icons-material/Print";
import SaveIcon from '@mui/icons-material/Save';
import rp from '../../images/rp.svg' 
import axios from "axios";
import config from "../auth/Config";
import dayjs from "dayjs";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import BackIcon from "../header/BackIcon";



const Rprenewalform = () => {
    const [display, setDisplay] = React.useState(false);
    const [data,setData] = useState([])
    const [date, setDate] = React.useState(dayjs());
    const [selectedEmployee, setSelectedEmployee] = useState(null);
   // Separate state variables for each checkbox, initialized to "No"
  const [newVisa, setNewVisa] = useState("No");
  const [businessVisa, setBusinessVisa] = useState("No");
  const [visaTransfer, setVisaTransfer] = useState("No");
  const [newRP, setNewRP] = useState("No");
  const [rpRenewal, setRpRenewal] = useState("No");
  const [exitPermit, setExitPermit] = useState("No");
  const [others, setOthers] = useState("No");
  const history = useHistory();
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
      const onSubmit = async(data,{action})=>{
        const formData = new FormData();
        Object.keys(data).forEach((key)=>{
          formData.append(key,data[key])
      
        })
        try{
          formData.append("employeeId",selectedEmployee._id)
          formData.append("date",date)
          formData.append("newVisaRequested",newVisa)
          formData.append("BusinessVisaRequested",businessVisa)
          formData.append("TransferVisaRequested",visaTransfer)
          formData.append("NewRPRequested",newRP)
          formData.append("RPRenewalRequested",rpRenewal)
          formData.append("exitPermitRequested",exitPermit)
          formData.append("OthersRequested",others)
      
          
           
          
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
            setNewVisa("No");
            setBusinessVisa("No");
            setVisaTransfer("No");
            setNewRP("No");
            setRpRenewal("No");
            setExitPermit("No");
            setOthers("No");
            reset()
            if (action === "print") {
              history.push('/Rprenewalformpdf', { data: Object.fromEntries(formData) });
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
      
      

      // Helper function to toggle Yes/No
  const handleToggle = (currentValue, setter) => {
    setter(currentValue === "Yes" ? "No" : "Yes");
  };

    const handleEmployee =async(event,value)=>{
      setSelectedEmployee(value); // Set selected employee
  
    }
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
         <h1 className="mt-3 title text-center">
         <BackIcon/>
          RP Renewal Form</h1>
         <div className="icon-container">
                <img src={rp}  alt="File icon" className="center headingimage mt-3" draggable="false"/>
            </div>
          <p className="subTitle">Employee Info</p>
           {/* ---------------------------------------------------First Row Start Here------------------------------------------- */}
           <div className="row my-4">
            <div className="col">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: 300 }}
                  label="Date"
                  value={date}
                  onChange={(newValue) => setDate(newValue)}
                  renderInput={(params) => (
                    <TextField name="date" {...params} />
                  )}
                />
              </LocalizationProvider>
            </div>
           
          </div>
           {/* ---------------------------------------------------Second Row Start Here------------------------------------------- */}
           <div className="row my-4">
            <div className="col-4">
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
            <div className="col-4">
              <TextField
                id="outlined-basic"
                sx={{ width: 300 }}
                label="Employee Number"
                type="text"
                value={selectedEmployee?.employeeNumber || ""}
                variant="outlined"
              />
            </div>          
              <div className="col-4">
              <TextField
                id="outlined-basic"
                sx={{ width: 300 }}
                label="Passport No"
                type="text"
                value={selectedEmployee?.passportNumber || ""}
                variant="outlined"
              />
            </div>
              <div className="col-4 my-3">
              <TextField
                id="outlined-basic"
                sx={{ width: 300 }}
                label="Qatar ID"
                type="text"
                value={selectedEmployee?.qatarID || ""}
                InputProps={{
                  shrink: true, // Ensures the label stays above the input when there's a value
                  
                }}
                variant="outlined"
              />
            </div>
              <div className="col-4 my-3">
              <TextField
                id="outlined-basic"
                sx={{ width: 300 }}
                label="Nationality"
                value={selectedEmployee?.nationality || ""}
                variant="outlined"
                InputProps = {{
                  shrink :true
                }}
              />
            </div>
              <div className="col-4 my-3">
              <TextField
                id="outlined-basic"
                sx={{ width: 300 }}
                label="Passport No"
                value={selectedEmployee?.passportNumber || ""}
                variant="outlined"
                InputProps = {{
                  shrink :true
                }}
              />
            </div>
          </div>
           {/* ---------------------------------------------------Therd Row Start Here------------------------------------------- */}
          <p className="subTitle">Request Details</p>
          <div>
      {/* New Visa */}
      <div className="row my-4">
        <div className="col-2">
          <h3>New Visa</h3>
        </div>
        <div className="col">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={newVisa === "Yes"}
                  onChange={() => handleToggle(newVisa, setNewVisa)}
                />
              }
              label="Ok"
            />
          </FormGroup>
        </div>
      </div>

      {/* Business Visa */}
      <div className="row my-4">
        <div className="col-2">
          <h3>Business Visa</h3>
        </div>
        <div className="col">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={businessVisa === "Yes"}
                  onChange={() => handleToggle(businessVisa, setBusinessVisa)}
                />
              }
              label="Ok"
            />
          </FormGroup>
        </div>
      </div>

      {/* Visa Transfer */}
      <div className="row my-4">
        <div className="col-2">
          <h3>Visa Transfer</h3>
        </div>
        <div className="col">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={visaTransfer === "Yes"}
                  onChange={() => handleToggle(visaTransfer, setVisaTransfer)}
                />
              }
              label="Ok"
            />
          </FormGroup>
        </div>
      </div>

      {/* New RP */}
      <div className="row my-4">
        <div className="col-2">
          <h3>New RP</h3>
        </div>
        <div className="col">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={newRP === "Yes"}
                  onChange={() => handleToggle(newRP, setNewRP)}
                />
              }
              label="Ok"
            />
          </FormGroup>
        </div>
      </div>

      {/* R.P Renewal */}
      <div className="row my-4">
        <div className="col-2">
          <h3>R.P Renewal</h3>
        </div>
        <div className="col">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rpRenewal === "Yes"}
                  onChange={() => handleToggle(rpRenewal, setRpRenewal)}
                />
              }
              label="Ok"
            />
          </FormGroup>
        </div>
      </div>

      {/* Exit Permit */}
      <div className="row my-4">
        <div className="col-2">
          <h3>Exit Permit</h3>
        </div>
        <div className="col">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={exitPermit === "Yes"}
                  onChange={() => handleToggle(exitPermit, setExitPermit)}
                />
              }
              label="Ok"
            />
          </FormGroup>
        </div>
      </div>

      {/* Others */}
      <div className="row my-4">
        <div className="col-2">
          <h3>Others</h3>
        </div>
        <div className="col">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={others === "Yes"}
                  onChange={() => handleToggle(others, setOthers)}
                />
              }
              label="Ok"
            />
          </FormGroup>
        </div>
      </div>

      {/* Debug Section */}
      <div>
        <h4>Selected Values:</h4>
        <p>New Visa: {newVisa}</p>
        <p>Business Visa: {businessVisa}</p>
        <p>Visa Transfer: {visaTransfer}</p>
        <p>New RP: {newRP}</p>
        <p>R.P Renewal: {rpRenewal}</p>
        <p>Exit Permit: {exitPermit}</p>
        <p>Others: {others}</p>
      </div>
    </div>

{/* --------------------------------------------------Eight Row Start Here ----------------------------------------- */}
<div className="row my-4">
            <div className="col-12">
           
              <div className="form-group">
                <label htmlFor="user-message" className=" control-label"></label>
                <div className="">
                  <textarea
                    name="user-message"
                    id="user-message"
                    className="form-control"
                    rows="3"
                    placeholder="Enter your Comment"
                    {...register("comment")}
                  ></textarea>
                </div>
              </div>
           
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
         </form>
         </div>
         </div>
      )
}

export default Rprenewalform