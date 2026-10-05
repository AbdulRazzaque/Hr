


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
  const [maternityLeaveStartDate,setMaternityLeaveStartDate]= useState(null)
  const [maternityLeaveEndDate,setMaternityLeaveEndDate]= useState(null)
  const [maternityLeaveDays, setTotalMaternityLeaveDays] = useState(null);
  const [dateErrors, setDateErrors] = useState({ startDate: "", endDate: "" });

  const { register, handleSubmit } = useForm()
  const history = useHistory()

  const isSick = leaveType?.trim().toLowerCase() === "sick";
  const isAbsent = leaveType?.trim().toLowerCase() === "absent";
  const isMaternity = leaveType?.trim().toLowerCase() === "maternity";

  const notifyError = (message) => {
    toast.error(message, {
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
  };

  // =========================================Use Effect===============================================================================================

  useEffect(() => {
    getTotalSickLeave()
  }, [])

  //  =========================================Put api=========================================================
  const onSubmit = async (data, { action }) => {
    // Check if leaveType is selected
    if (!leaveType || (!isSick && !isAbsent && !isMaternity)) {
      notifyError("Please select a leave type.");
      return;
    }

    if (!selectedEmployee || !selectedEmployee._id) {
      notifyError("Please select an employee.");
      return;
    }

    // Validate required dates and ensure End Date >= Start Date
    if (isSick) {
      if (!leaveStartDate) {
        setDateErrors({ startDate: "Leave Start Date is required.", endDate: "" });
        notifyError("Leave Start Date is required.");
        return;
      }
      if (!leaveEndDate) {
        setDateErrors({ startDate: "", endDate: "Leave End Date is required." });
        notifyError("Leave End Date is required.");
        return;
      }
      const start = dayjs(leaveStartDate).startOf("day");
      const end = dayjs(leaveEndDate).startOf("day");
      if (!start.isValid()) {
        setDateErrors({ startDate: "Leave Start Date is invalid.", endDate: "" });
        notifyError("Leave Start Date is invalid.");
        return;
      }
      if (!end.isValid()) {
        setDateErrors({ startDate: "", endDate: "Leave End Date is invalid." });
        notifyError("Leave End Date is invalid.");
        return;
      }
      if (end.isBefore(start)) {
        setDateErrors({ startDate: "", endDate: "End Date must never be earlier than Start Date." });
        notifyError("End Date must never be earlier than Start Date.");
        return;
      }
    } else if (isAbsent) {
      if (!absentLeaveStartDate) {
        setDateErrors({ startDate: "Leave Absent Start Date is required.", endDate: "" });
        notifyError("Leave Absent Start Date is required.");
        return;
      }
      if (!absentLeaveEndDate) {
        setDateErrors({ startDate: "", endDate: "Leave Absent End Date is required." });
        notifyError("Leave Absent End Date is required.");
        return;
      }
      const start = dayjs(absentLeaveStartDate).startOf("day");
      const end = dayjs(absentLeaveEndDate).startOf("day");
      if (!start.isValid()) {
        setDateErrors({ startDate: "Leave Absent Start Date is invalid.", endDate: "" });
        notifyError("Leave Absent Start Date is invalid.");
        return;
      }
      if (!end.isValid()) {
        setDateErrors({ startDate: "", endDate: "Leave Absent End Date is invalid." });
        notifyError("Leave Absent End Date is invalid.");
        return;
      }
      if (end.isBefore(start)) {
        setDateErrors({ startDate: "", endDate: "End Date must never be earlier than Start Date." });
        notifyError("End Date must never be earlier than Start Date.");
        return;
      }
    } else if (isMaternity) {
      if (!maternityLeaveStartDate) {
        setDateErrors({ startDate: "Leave Maternity Start Date is required.", endDate: "" });
        notifyError("Leave Maternity Start Date is required.");
        return;
      }
      if (!maternityLeaveEndDate) {
        setDateErrors({ startDate: "", endDate: "Leave Maternity End Date is required." });
        notifyError("Leave Maternity End Date is required.");
        return;
      }
      const start = dayjs(maternityLeaveStartDate).startOf("day");
      const end = dayjs(maternityLeaveEndDate).startOf("day");
      if (!start.isValid()) {
        setDateErrors({ startDate: "Leave Maternity Start Date is invalid.", endDate: "" });
        notifyError("Leave Maternity Start Date is invalid.");
        return;
      }
      if (!end.isValid()) {
        setDateErrors({ startDate: "", endDate: "Leave Maternity End Date is invalid." });
        notifyError("Leave Maternity End Date is invalid.");
        return;
      }
      if (end.isBefore(start)) {
        setDateErrors({ startDate: "", endDate: "End Date must never be earlier than Start Date." });
        notifyError("End Date must never be earlier than Start Date.");
        return;
      }
    }

    setDateErrors({ startDate: "", endDate: "" });

    const formData = new FormData();
    if (isSick) {
      const start = dayjs(leaveStartDate).startOf("day");
      const end = dayjs(leaveEndDate).startOf("day");
      const days = totalLeaveDays || (end.diff(start, "day") + 1);
      formData.append("leaveStartDate", start.toISOString());
      formData.append("leaveEndDate", end.toISOString());
      formData.append("totalSickLeaveDays", parseInt(days));
    } else if (isAbsent) {
      const start = dayjs(absentLeaveStartDate).startOf("day");
      const end = dayjs(absentLeaveEndDate).startOf("day");
      const days = absentLeaveDays || (end.diff(start, "day") + 1);
      formData.append("AbsenceLeaveStartDate", start.toISOString());
      formData.append("AbsenceLeaveEndDate", end.toISOString());
      formData.append("totalAbsenceLeaveDays", parseInt(days));
    } else if (isMaternity) {
      const start = dayjs(maternityLeaveStartDate).startOf("day");
      const end = dayjs(maternityLeaveEndDate).startOf("day");
      const days = maternityLeaveDays || (end.diff(start, "day") + 1);
      formData.append("maternityLeaveStartDate", start.toISOString());
      formData.append("maternityLeaveEndDate", end.toISOString());
      formData.append("totalMaternityLeaveDays", parseInt(days));
    }

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    try {
      formData.append("employeeId", selectedEmployee._id);
      formData.append("date", date ? dayjs(date).toISOString() : dayjs().toISOString());
      formData.append("leaveType", leaveType || update.leaveType);

      await axios.put(
        `${config.baseUrl}/api/updateAbsenceLeave/${update._id}`, formData,
        {
          headers: {
            Authorization: `Bearer ${config.accessToken}`
          }
        }
      );

      toast.success("Leave updated successfully", {
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

      setShowDialog(false);
      getTotalSickLeave();
      if (action === "print") {
        history.push('/AbsenceLeavepdf', { data: Object.fromEntries(formData) });
      }
    }
    catch (error) {
      notifyError(error.response?.data?.message || "Failed to update leave request.");
    }
  }

  // ==============================================logic Code==================================================
  useEffect(() => {
    // Pre-select employee if `update` prop is available
    if (update && update.employeeId) {
      setSelectedEmployee(update.employeeId);
      setLeaveType(update.leaveType);
      setDate(update.date ? dayjs(update.date) : dayjs());
      setLeaveStartDate(update.leaveStartDate ? dayjs(update.leaveStartDate) : null);
      setLeaveEndDate(update.leaveEndDate ? dayjs(update.leaveEndDate) : null);
      setAbsentLeaveStartDate(update.AbsenceLeaveStartDate ? dayjs(update.AbsenceLeaveStartDate) : null);
      setAbsentLeaveEndDate(update.AbsenceLeaveEndDate ? dayjs(update.AbsenceLeaveEndDate) : null);
      setTotalAbsentLeaveDays(update.totalAbsenceLeaveDays || null);
      setMaternityLeaveStartDate(update.maternityLeaveStartDate ? dayjs(update.maternityLeaveStartDate) : null);
      setMaternityLeaveEndDate(update.maternityLeaveEndDate ? dayjs(update.maternityLeaveEndDate) : null);
      setTotalMaternityLeaveDays(update.totalMaternityLeaveDays || null);
      setTotalLeaveDays(update.totalSickLeaveDays || null);
      setDateErrors({ startDate: "", endDate: "" });
    }
  }, [update]);

  // handle employee value eg. set automatic QID and other 
  const handleEmployee = async (event, value) => {
    setSelectedEmployee(value);
    if (!value || !value._id) {
      setLeaveInfo(null);
      return;
    }
    getTotalSickLeave(value);
  }

  // Leave Type
  const handleLeaveTypeChange = (event) => {
    const selected = event.target.value;
    setLeaveType(selected);
    const normalized = selected?.trim().toLowerCase();
    setDateErrors({ startDate: "", endDate: "" });

    // Only the selected leave type's dates should be active and required; clear others
    if (normalized !== "sick") {
      setLeaveStartDate(null);
      setLeaveEndDate(null);
      setTotalLeaveDays(null);
    }
    if (normalized !== "absent") {
      setAbsentLeaveStartDate(null);
      setAbsentLeaveEndDate(null);
      setTotalAbsentLeaveDays(null);
    }
    if (normalized !== "maternity") {
      setMaternityLeaveStartDate(null);
      setMaternityLeaveEndDate(null);
      setTotalMaternityLeaveDays(null);
    }
  };

  // Automatically calculate Total Sick Leave Days
  useEffect(()=>{
    if(leaveStartDate && leaveEndDate){
      const start = dayjs(leaveStartDate).startOf("day");
      const end = dayjs(leaveEndDate).startOf("day");
      if (end.isBefore(start)) {
        setTotalLeaveDays(null);
        setDateErrors(prev => ({ ...prev, endDate: "End Date must never be earlier than Start Date." }));
      } else {
        const diff = end.diff(start, "day") + 1;
        setTotalLeaveDays(diff);
        setDateErrors(prev => ({ ...prev, endDate: "" }));
      }
    } else {
      setTotalLeaveDays(null);
    }
  },[leaveStartDate, leaveEndDate]);

  // Automatically calculate Total Absent Days
  useEffect(()=>{
    if(absentLeaveStartDate && absentLeaveEndDate){
      const start = dayjs(absentLeaveStartDate).startOf("day");
      const end = dayjs(absentLeaveEndDate).startOf("day");
      if (end.isBefore(start)) {
        setTotalAbsentLeaveDays(null);
        setDateErrors(prev => ({ ...prev, endDate: "End Date must never be earlier than Start Date." }));
      } else {
        const diff = end.diff(start, "day") + 1;
        setTotalAbsentLeaveDays(diff);
        setDateErrors(prev => ({ ...prev, endDate: "" }));
      }
    } else {
      setTotalAbsentLeaveDays(null);
    }
  },[absentLeaveStartDate, absentLeaveEndDate]);

  // Automatically calculate Total Maternity Days
  useEffect(()=>{
    if(maternityLeaveStartDate && maternityLeaveEndDate){
      const start = dayjs(maternityLeaveStartDate).startOf("day");
      const end = dayjs(maternityLeaveEndDate).startOf("day");
      if (end.isBefore(start)) {
        setTotalMaternityLeaveDays(null);
        setDateErrors(prev => ({ ...prev, endDate: "End Date must never be earlier than Start Date." }));
      } else {
        const diff = end.diff(start, "day") + 1;
        setTotalMaternityLeaveDays(diff);
        setDateErrors(prev => ({ ...prev, endDate: "" }));
      }
    } else {
      setTotalMaternityLeaveDays(null);
    }
  },[maternityLeaveStartDate, maternityLeaveEndDate]);
  

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

                  {/* Row 3: Sick Leave Details */}
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
                          value={isSick ? (leaveStartDate ? dayjs(leaveStartDate) : null) : null}
                          format="DD/MM/YYYY"
                          views={["year", "month", "day"]}
                          disabled={!isSick}
                          slotProps={{
                            textField: {
                              required: isSick,
                              error: isSick && !!dateErrors.startDate,
                              helperText: isSick ? dateErrors.startDate : "",
                            }
                          }}
                          onChange={(newValue) => {
                            setLeaveStartDate(newValue);
                            if (dateErrors.startDate) {
                              setDateErrors(prev => ({ ...prev, startDate: "" }));
                            }
                          }}
                        />
                      </LocalizationProvider>
                    </div>
                    <div className="col-md-3">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Leave End Date"
                          value={isSick ? (leaveEndDate ? dayjs(leaveEndDate) : null) : null}
                          format="DD/MM/YYYY"
                          views={["year", "month", "day"]}
                          disabled={!isSick}
                          minDate={isSick && leaveStartDate && dayjs(leaveStartDate).isValid() ? dayjs(leaveStartDate) : undefined}
                          slotProps={{
                            textField: {
                              required: isSick,
                              error: isSick && !!dateErrors.endDate,
                              helperText: isSick ? dateErrors.endDate : "",
                            }
                          }}
                          onChange={(newValue) => {
                            setLeaveEndDate(newValue);
                            if (dateErrors.endDate) {
                              setDateErrors(prev => ({ ...prev, endDate: "" }));
                            }
                          }}
                        />
                      </LocalizationProvider>
                    </div>
                    <div className="col-md-3">
                      <TextField
                        fullWidth
                        type="number"
                        value={isSick && totalLeaveDays ? totalLeaveDays : ""}
                        label="Total Leave Days"
                        disabled={!isSick}
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

                  {/* Row 4: Absent Leave Details */}
                  <div className="row my-4 align-items-center">
                    <div className="col-md-3">
                      <FormControl required>
                        <FormLabel>Leave Type:</FormLabel>
                        <RadioGroup
                          row
                          value={leaveType}
                          onChange={handleLeaveTypeChange}
                        >
                          <FormControlLabel value="Absent" control={<Radio />} label="Absent" />
                        </RadioGroup>
                      </FormControl>
                    </div>
                    <div className="col-md-3">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Leave Absent Start Date"
                          value={isAbsent ? (absentLeaveStartDate ? dayjs(absentLeaveStartDate) : null) : null}
                          format="DD/MM/YYYY"
                          views={["year", "month", "day"]}
                          disabled={!isAbsent}
                          slotProps={{
                            textField: {
                              required: isAbsent,
                              error: isAbsent && !!dateErrors.startDate,
                              helperText: isAbsent ? dateErrors.startDate : "",
                            }
                          }}
                          onChange={(newValue) => {
                            setAbsentLeaveStartDate(newValue);
                            if (dateErrors.startDate) {
                              setDateErrors(prev => ({ ...prev, startDate: "" }));
                            }
                          }}
                        />
                      </LocalizationProvider>
                    </div>
                    <div className="col-md-3">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Leave Absent End Date"
                          value={isAbsent ? (absentLeaveEndDate ? dayjs(absentLeaveEndDate) : null) : null}
                          format="DD/MM/YYYY"
                          views={["year", "month", "day"]}
                          disabled={!isAbsent}
                          minDate={isAbsent && absentLeaveStartDate && dayjs(absentLeaveStartDate).isValid() ? dayjs(absentLeaveStartDate) : undefined}
                          slotProps={{
                            textField: {
                              required: isAbsent,
                              error: isAbsent && !!dateErrors.endDate,
                              helperText: isAbsent ? dateErrors.endDate : "",
                            }
                          }}
                          onChange={(newValue) => {
                            setAbsentLeaveEndDate(newValue);
                            if (dateErrors.endDate) {
                              setDateErrors(prev => ({ ...prev, endDate: "" }));
                            }
                          }}
                        />
                      </LocalizationProvider>
                    </div>
                    <div className="col-md-3">
                      <TextField
                        fullWidth
                        type="number"
                        label="Total Absent Days"
                        value={isAbsent && absentLeaveDays ? absentLeaveDays : ""}
                        disabled={!isAbsent}
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

                  {/* Row 5: Maternity Leave Details */}
                  <div className="row my-4 align-items-center">
                    <div className="col-md-3">
                      <FormControl required>
                        <FormLabel>Leave Type:</FormLabel>
                        <RadioGroup
                          row
                          value={leaveType}
                          onChange={handleLeaveTypeChange}
                        >
                          <FormControlLabel value="Maternity" control={<Radio />} label="Maternity" />
                        </RadioGroup>
                      </FormControl>
                    </div>
                    <div className="col-md-3">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Leave Maternity Start Date"
                          value={isMaternity ? (maternityLeaveStartDate ? dayjs(maternityLeaveStartDate) : null) : null}
                          format="DD/MM/YYYY"
                          views={["year", "month", "day"]}
                          disabled={!isMaternity}
                          slotProps={{
                            textField: {
                              required: isMaternity,
                              error: isMaternity && !!dateErrors.startDate,
                              helperText: isMaternity ? dateErrors.startDate : "",
                            }
                          }}
                          onChange={(newValue) => {
                            setMaternityLeaveStartDate(newValue);
                            if (dateErrors.startDate) {
                              setDateErrors(prev => ({ ...prev, startDate: "" }));
                            }
                          }}
                        />
                      </LocalizationProvider>
                    </div>
                    <div className="col-md-3">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Leave Maternity End Date"
                          value={isMaternity ? (maternityLeaveEndDate ? dayjs(maternityLeaveEndDate) : null) : null}
                          format="DD/MM/YYYY"
                          views={["year", "month", "day"]}
                          disabled={!isMaternity}
                          minDate={isMaternity && maternityLeaveStartDate && dayjs(maternityLeaveStartDate).isValid() ? dayjs(maternityLeaveStartDate) : undefined}
                          slotProps={{
                            textField: {
                              required: isMaternity,
                              error: isMaternity && !!dateErrors.endDate,
                              helperText: isMaternity ? dateErrors.endDate : "",
                            }
                          }}
                          onChange={(newValue) => {
                            setMaternityLeaveEndDate(newValue);
                            if (dateErrors.endDate) {
                              setDateErrors(prev => ({ ...prev, endDate: "" }));
                            }
                          }}
                        />
                      </LocalizationProvider>
                    </div>
                    <div className="col-md-3">
                      <TextField
                        fullWidth
                        type="number"
                        label="Total Maternity Days"
                        value={isMaternity && maternityLeaveDays ? maternityLeaveDays : ""}
                        disabled={!isMaternity}
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
                          <strong> {leaveInfo?.totalMaternityLeaveDays || "0"} </strong> Maternity leaves this year.
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
