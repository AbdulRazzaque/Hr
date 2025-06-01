
import  { useEffect,  useState } from "react";
import { Autocomplete, Button, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField } from '@mui/material'

import IconButton from "@mui/material/IconButton";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import endofservices from '../../images/endofservices.svg'
import SaveIcon from '@mui/icons-material/Save';
import axios from "axios";
import PrintIcon from '@mui/icons-material/Print';
import CloseIcon from '@mui/icons-material/Close';
import Config from '../auth/Config'
import { useForm } from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';
import dayjs from "dayjs";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const UpdateEndOfServices = ({update,showDialog,setShowDialog,ChangeRowData,getEndOfServices}) => {
     const {register,handleSubmit,reset,formState:{errors}} = useForm()
      const [selectedEmployee, setSelectedEmployee] = useState(null);
       const [selectedLastWorkingDate,setSelectedLastWorkingDate]= useState(null)
        const [exitType, setExitType] = useState(null); // State to store the selected value
        const [date,setDate]= useState(null)
        const [ResumeInfo, setResumeInfo] = useState(null)
          const [resumingLastVacation, setResumingLastVacation] = useState(null); // State to store the selected value
          const history = useHistory()
        // handel Employee
        const handleEmployee =async(event,value)=>{
            setSelectedEmployee(value); // Set selected employee
            if (!value || !value._id) {
              // Ensure the selected value has a valid ID before making the API call
              setResumeInfo(null); // Reset leave info if no employee is selected
              return;
            }
    
          
          }
    // console.log(ResumeInfo)

  const handleExitTypeChange = (event) => {
    setExitType(event.target.value); // Update state with selected value
    console.log("Selected Exit Type:", event.target.value); // For debugging
  };
     useEffect(() => {
        // Pre-select employee if `update` prop is available
        if (update  && update.employeeId && Object.keys(update).length>0) {
          setSelectedEmployee(update.employeeId);  // assuming `employeeId` contains the full employee object
          setExitType(update.exitType)
       
        }
      }, [update?.id]);

      const onSubmit = async(data,{action})=>{
        console.log('Click')
        const formData = new FormData();
        Object.keys(data).forEach((key)=>{
          formData.append(key,data[key])
        })
        try{
          formData.append("employeeId",selectedEmployee._id)
          formData.append("date",date || update.date)
          formData.append("exitType",exitType || update.exitType)
          formData.append("lastWorkingDate",selectedLastWorkingDate || update.lastWorkingDate)
          formData.append("dateOfJoining",selectedEmployee.dateOfJoining || update.dateOfJoining)
          formData.append("resumingofLastVacation",resumingLastVacation|| update.resumingofLastVacation)
      
         await axios.put(
            `${Config.baseUrl}/api/UpdateEndofservices/${update._id}`,formData,
           { headers: { Authorization: `Bearer ${Config.accessToken}` 
           }
          }
          ).then(response=>{
            getEndOfServices()
            if (action === "print") {
              history.push('/EndofServicepdf', { data: Object.fromEntries(formData) });
            }
            setShowDialog(false)
          }).catch(error =>console.log(error))
       
          

        }
          catch(error){
       
          }
      }
  return (
    <div>


         {
           update && (
             <Dialog open={showDialog} fullWidth maxWidth="lg" >
                <DialogTitle sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', }}>
                  <IconButton onClick={()=>setShowDialog(false)} sx={{ color: 'grey.800' }}>
                    <CloseIcon />
                  </IconButton>
                </DialogTitle>
                      <DialogContent>
                      <div className="container">
                  <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className=" text-center title">Update End of Services</h1>
            <div className="icon-container">
                <img src={endofservices}  alt="File icon" className="center headingimage mt-3" draggable="false"/>
            </div>
            <p className="subTitle">Employee info</p>
            {/* ---------------------------First Row Strart Here----------------------------------------- */}
            <div className="row my-4">
              <div className="col-6 ">
                <Autocomplete
                 disablePortal
                 fullWidth
             id="combo-box-demo"
             options={[update.employeeId]}  // wrap the employeeId in an array
              getOptionLabel={(option) => option.name || ""}  // Display employee name
              value={selectedEmployee}  // Set the pre-selected employee here
            onChange={handleEmployee}  // Handle selection
            renderInput={(params) => <TextField {...params} label="Employee Name" />}
                                                            />
              </div>
              <div className="col-6  ">
              <TextField
          fullWidth
          id="position"
          value={selectedEmployee?.position}
         placeholder="position"
          InputProps={{
            readOnly: true, // Make position field read-only
          }}
        />
          </div>
          <div className="col-6 my-3 ">
          <TextField
          fullWidth
          id="Employee Number"
          value={selectedEmployee?.employeeNumber}
          placeholder="Employee Number"
          InputProps={{
            readOnly: true, // Make position field read-only
          }}
        />
              </div>
            </div>
            {/* ---------------------------Second Row Strart Here----------------------------------------- */}
            <div className="row">
              <div className="col-4">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: 300 }}
                    label="Date"
                    name="date"
                    onChange={(newValue) => setDate(newValue)}
                    value={dayjs(update?.date)}
                    renderInput={(params) => (
                      <TextField name="date" {...params}  required/>
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div className="col-6">
      
                <TextField
             
                  fullWidth
                  {...register("subject")}
                  value={update.subject}
                  id="subject"
                  onChange={ChangeRowData}
                  label="subject"
                  variant="filled"
                  sx={{ width: 650 }}
                  
                />
              </div>
            </div>
            {/* ----------------------------------------Second Row Start Here----------------------------------- */}
                            <div className="row my-5">

                <div className="col-4">
                <FormControl >
                <FormLabel id="demo-radio-buttons-group-label" className="font-weight-bold">Exit Type:</FormLabel>
                <RadioGroup row
                aria-labelledby="demo-radio-buttons-group-label"
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

              <div className="col">
    
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: 300 }}
                    label="Last working Date"
                    value={ dayjs(update?.lastWorkingDate)}
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
                   value={selectedEmployee ? dayjs(selectedEmployee?.dateOfJoining) : null} // Ensure null when cleared
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
                    value={dayjs(update.resumingofLastVacation)} 
                     sx={{ width: 300 }}
                    label="Resuming of last vacation"
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
                <TextField
                {...register("other")}
                  id="other"
                  onChange={ChangeRowData}
                  value={update.other}
                  sx={{ width: 300 }}
                  label="Other"
                  variant="outlined"
                />
              </div>
            </div>

{/* --------------------------------Print Button---------------------------------------------------------- */}
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

                      </form>
          </div>
                      </DialogContent>
                      </Dialog>
            )
        }
    </div>
  )
}

export default UpdateEndOfServices