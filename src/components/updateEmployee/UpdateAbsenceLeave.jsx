


import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import { Alert, Autocomplete, Button, Dialog, DialogContent, DialogTitle, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PrintIcon from '@mui/icons-material/Print';
import leaverequest from '../../images/leaverequest.png'
import { FormControl } from "@mui/base";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";
import config from "../auth/Config";
import SaveIcon from '@mui/icons-material/Save';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import BackIcon from "../header/BackIcon";
import CloseIcon from '@mui/icons-material/Close';


const UpdateAbsenceLeave = ({ update, showDialog, setShowDialog, ChangeRowData, getTotalSickLeave }) => {

const [leaveType, setLeaveType] = React.useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [date, setDate] = useState(dayjs());
  const [leaveStartDate, setLeaveStartDate] = useState(null);
  const [leaveEndDate, setLeaveEndDate] = useState(null);
  const [totalLeaveDays, setTotalLeaveDays] = useState(null);
  const [leaveInfo, setLeaveInfo] = useState(null)
    const [absentLeaveStartDate,setAbsentLeaveStartDate]= useState(null)
    const [absentLeaveEndDate,setAbsentLeaveEndDate]= useState(null)
      const [absentLeaveDays, setTotalAbsentLeaveDays] = useState(null);
  console.log(leaveStartDate,'leaveStartDate')


  const { register, handleSubmit } = useForm()
  const history = useHistory()
  

  


  // =========================================Ues Effect===============================================================================================

  useEffect(() => {
    getTotalSickLeave()


  }, [])


  //  =========================================Post api=========================================================
  console.log(totalLeaveDays, 'totalLeaveDays')
  const onSubmit = async (data, { action }) => {
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
    if (leaveStartDate && leaveEndDate && totalLeaveDays) {
      formData.append("leaveStartDate", leaveStartDate || update.leaveStartDate)
      formData.append("leaveEndDate", leaveEndDate || update.leaveEndDate)
      formData.append("totalSickLeaveDays", parseInt(totalLeaveDays))
    }
    if(absentLeaveStartDate && absentLeaveEndDate && absentLeaveDays){
      formData.append("AbsenceLeaveStartDate",absentLeaveStartDate)
      formData.append("AbsenceLeaveEndDate",absentLeaveEndDate)
      formData.append("totalAbsenceLeaveDays",parseInt(absentLeaveDays))
    }
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key])

    })

    try {
      formData.append("employeeId", selectedEmployee._id)
      formData.append("date", date)

      formData.append("leaveType", leaveType || update.leaveType)


      const response = await axios.put(
        `${config.baseUrl}/api/updateAbsenceLeave/${update._id}`, formData,
        {
          headers: {
            Authorization: `Bearer ${config.accessToken}`

          }
        }
      )
      // Clear all form data and reset state
      // reset();  // If using React Hook Form, reset the form fields
      setShowDialog(false)
      getTotalSickLeave()
      if (action === "print") {
        history.push('/AbsenceLeavepdf', { data: Object.fromEntries(formData) });
      }
    }
    catch (error) {
     console.log(error)
    }
  }
  // ==============================================logic Code==================================================
useEffect(() => {
    // Pre-select employee if `update` prop is available
    if (update  && update.employeeId) {
      setSelectedEmployee(update.employeeId);  // assuming `employeeId` contains the full employee object
      setLeaveType(update.leaveType)
      setLeaveStartDate(update.leaveStartDate);
      setLeaveEndDate(update.leaveEndDate)
      setAbsentLeaveStartDate(update.AbsenceLeaveStartDate)
      setAbsentLeaveEndDate(update.AbsenceLeaveEndDate)
      setTotalAbsentLeaveDays( update.totalAbsenceLeaveDays )
    }
    setTotalLeaveDays(update.totalSickLeaveDays)
  }, [update]);


  // handel employee value eg.set automatic QID and other 
  const handleEmployee = async (event, value) => {
    setSelectedEmployee(value); // Set selected employee
    if (!value || !value._id) {
      // Ensure the selected value has a valid ID before making the API call
      setLeaveInfo(null); // Reset leave info if no employee is selected
      return;
    }
    getTotalSickLeave(value)
  }

  // Leave Type
  const handleLeaveTypeChange = (event) => {
    setLeaveType(event.target.value); // Update state with selected value
    console.log("Selected Exit Type:", event.target.value); // For debugging

  };

 
  // Calculate Day starDate and endDate
 // Calculate Day starDate and endDate
  useEffect(()=>{
    if(leaveStartDate && leaveEndDate){
      const start = dayjs(leaveStartDate);
      const end = dayjs(leaveEndDate);
      const diff = end.diff(start,"day")+1
      setTotalLeaveDays(diff)
    }
  },[leaveStartDate,leaveEndDate])

  
  useEffect(()=>{
    if(absentLeaveStartDate && absentLeaveEndDate){
      const start = dayjs(absentLeaveStartDate);
      const end = dayjs(absentLeaveEndDate);
      const diff = end.diff(start,"day")+1
      setTotalAbsentLeaveDays(diff)
    }
  },[absentLeaveStartDate,absentLeaveEndDate])

  console.log(leaveInfo, 'leaveInfo')

  // Filter rows based on selected leave type
  const filteredRows = leaveInfo
    ? leaveInfo.allLeaveRecords.filter(
      (row) => !leaveType || row.leaveType.toLowerCase() === leaveType.toLowerCase()
    )
    : [];

  // Conditionally render columns based on leaveType



  console.log(update, 'update')


  return (

    <div className="row">


      {
        update && (
          <Dialog open={showDialog} fullWidth maxWidth="lg" >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', }}>
              <IconButton onClick={() => setShowDialog(false)} sx={{ color: 'grey.800' }}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>


              {/* Form Section */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <ToastContainer />
                <div className="container ">
                  <h1 className="mt-3 title text-center">
                    <BackIcon /> leave request
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
                        sx={{ width: 700 }}
                        id="combo-box-demo"
                        options={[update.employeeId]}  // wrap the employeeId in an array
                        // options={data}
                        getOptionLabel={(option) => option.name || ""}  // Display employee name
                        value={selectedEmployee}  // Set the pre-selected employee here
                        onChange={handleEmployee}  // Handle selection
                        renderInput={(params) => <TextField {...params} label="Employee Name" />}
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
                          value={leaveType ==="Absent" ? null :dayjs(leaveStartDate) }
                          format="DD/MM/YYYY"
                          disabled={leaveType === "Absent"}
                          onChange={(newValue) => setLeaveStartDate(newValue)}
                        />
                      </LocalizationProvider>
                    </div>
                    <div className="col-md-3">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Leave End Date"
                          value={leaveType ==="Absent" ? null : dayjs(leaveEndDate) }
                          format="DD/MM/YYYY"
                          disabled={leaveType === "Absent"}
                          onChange={(newValue) => setLeaveEndDate(newValue)}
                        />
                      </LocalizationProvider>
                    </div>
                    <div className="col-md-3">
                      <TextField
                        fullWidth
                        type="number"
                       
                        value={totalLeaveDays ?totalLeaveDays:""}
                       label="Total Number of Days of Leave"
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
                      {/* Row 3: Leave Details */}
                        
                            
                             <div className="col-md-3">
                               <LocalizationProvider dateAdapter={AdapterDayjs}>
                                 <DatePicker
                                   label="Leave Absent Start Date"
                                  //  value={absentLeaveStartDate}
                                  value={dayjs(absentLeaveStartDate||null)}
                                   // value={leaveType ==="Absent" ? null : leaveStartDate}
                                   format="DD/MM/YYYY"
                                   views={["year", "month", "day"]}
                                   
                                   onChange={(newValue) => setAbsentLeaveStartDate(newValue)}
                                 />
                               </LocalizationProvider>
                             </div>
                             <div className="col-md-3">
                               <LocalizationProvider dateAdapter={AdapterDayjs}>
                                 <DatePicker
                                   label="Leave Absent End Date"
                                   value={dayjs(absentLeaveEndDate ||null)}
                                   // value={leaveType ==="Absent" ? null : LeaveEndDate}
                                   format="DD/MM/YYYY"
                                   views={["year", "month", "day"]}
                                  
                                   onChange={(newValue) => setAbsentLeaveEndDate(newValue)}
                                 />
                               </LocalizationProvider>
                             </div>
                             <div className="col-md-3">
                               <TextField
                                 fullWidth
                                 type="number"
                                 label="Total Leave Days"
                                 value={absentLeaveDays ?absentLeaveDays:""}
                                 // value={leaveType ==="Absent" ? null : absentLeaveDays}
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
                          <strong> {leaveInfo?.totalAbsenceLeave || "0"} </strong> Absent leaves this year.
                        </span>
                      </Alert>
                    )
                  }




                  {/* Row 4: Comments */}
                  <div className="row my-4">
                    <div className="col-md-12">
                      <TextField
                        {...register("comment")}
                        rows={3}
                        name="comment"
                        multiline
                        fullWidth
                        onChange={ChangeRowData}
                        value={update.comment}
                        label="Comment"
                      />
                    </div>
                  </div>
                  {/* Row 6: Action Buttons */}
                  <div className="row my-4 text-center">
                    <div className="col">
                      <Stack spacing={2} direction="row" className="my-5" marginBottom={2} justifyContent="center">
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

            </DialogContent>
          </Dialog>
        )
      }
    </div>



  );
};

export default UpdateAbsenceLeave;
