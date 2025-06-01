


import { Autocomplete, Button, Dialog, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import  { useEffect, useState } from 'react'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import dayjs from 'dayjs'
import axios from 'axios'
import config from '../auth/Config'
import { useForm } from 'react-hook-form'
import work from '../../images/work.svg'
import PrintIcon from "@mui/icons-material/Print";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
const UpdateResumeofWork = ({ update, showDialog, setShowDialog, ChangeRowData, getEmployeeResumeinfo }) => {
  const { register, handleSubmit, reset } = useForm()

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [leaveInfo, setLeaveInfo] = useState(null)
  const [leaveStartDate, setLeaveStartDate] = useState(null);
  const [resumeDate, setResumeDate] = useState(null);
  const [leaveEndDate, setLeaveEndDate] = useState(null);
  const [totalLeaveDays, setTotalLeaveDays] = useState(null);
    const [prevLeaveStartDate, setPrevLeaveStartDate] = useState(null);
  const history = useHistory()
  useEffect(() => {
    // Pre-select employee if `update` prop is available
    if (update && update.employeeId) {
      setSelectedEmployee(update.employeeId);  // assuming `employeeId` contains the full employee object
    }
    if(update?.employeeId?._id){
      const getEmployeeLeave = async () => {
        try {
          const response = await axios.get(
            `${config.baseUrl}/api/getEmployeeLeave/${update?.employeeId?._id}`,
            {
              headers: { Authorization: `Bearer ${config.accessToken}` },
            }
          );
    
    
          setLeaveInfo(response.data);
        } catch (error) {
          console.error(
            "Error fetching leave information:",
            error.message || error
          );
          setLeaveInfo(null);
        }
      }
      getEmployeeLeave()
    }
    

  }, [update?.employeeId?._id]);



  const handleEmployee = async (event, value) => {

    setSelectedEmployee(value); // Set selected employee
    if (!value || !value._id) {
      // Ensure the selected value has a valid ID before making the API call
      setLeaveInfo(null); // Reset leave info if no employee is selected
      return;
    }



  }

  

  console.log(leaveInfo, 'leaveInfo')
  const onSubmit = async (data, { action }) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key])

    })
    try {
      formData.append("employeeId", selectedEmployee._id)
      formData.append("resumeOfWorkDate", resumeDate || update.resumeOfWorkDate)
      formData.append("leaveStartDate", leaveStartDate || update.leaveStartDate)
      formData.append("leaveEndDate", leaveEndDate || update.leaveEndDate)
      const response = await axios.put(
        `${config.baseUrl}/api/UpdateEmployeeResume/${update._id}`, formData,
        {
          headers: {
            Authorization: `Bearer ${config.accessToken}`

          }
        }
      )


      getEmployeeResumeinfo()
      setShowDialog(false)
      if (action === "print") {
        history.push('/Resumeofworkpdf', { data: Object.fromEntries(formData) });
      }

      reset()

    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getEmployeeResumeinfo()
  }, [])
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
    if(leaveInfo?.leaveStartDate && leaveInfo.leaveEndDate){
      const startDate = dayjs(leaveInfo.leaveStartDate)
      const endDate = dayjs(leaveInfo.leaveEndDate)
      setLeaveStartDate(startDate);
      setPrevLeaveStartDate(startDate)
      setLeaveEndDate(endDate)
    }
  },[leaveInfo])
  return (
    <div>

      {
        update && (
          <Dialog open={showDialog} fullWidth maxWidth="lg" >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', }}>
              <IconButton onClick={() => setShowDialog(false)} sx={{ color: 'grey.800' }}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit(onSubmit)}>




                <h1 className="mt-3 title text-center">Resume of work application form</h1>
                <div className="icon-container">
                  <img src={work} alt="File icon" className="center headingimage mt-3" draggable="false" />
                </div>
                <p className="subTitle">Employee Info</p>
                {/* ---------------------------------------------------First Row Start Here------------------------------------------- */}
                <div className="row my-4">
                  <div className="col">
                    <Autocomplete
                      disablePortal
                      sx={{ width: 300 }}
                      id="combo-box-demo"
                      options={[update.employeeId]}  // wrap the employeeId in an array
                      getOptionLabel={(option) => option.name || ""}  // Display employee name
                      value={selectedEmployee}  // Set the pre-selected employee here
                      onChange={handleEmployee}  // Handle selection
                      renderInput={(params) => <TextField {...params} label="Employee Name" />}
                    />
                  </div>
                  <div className="col">
                    <TextField
                      label="Employee No"
                      variant="outlined"
                      id="outlined-basic"
                      sx={{ width: 300 }}
                      value={selectedEmployee?.employeeNumber || ''}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </div>
                  <div className="col">
                    <TextField

                      sx={{ width: 300 }}

                      label="Nationality"
                      variant="outlined"
                      value={selectedEmployee?.nationality || ""}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </div>
                </div>
                {/* ---------------------------------------------------Second Row Start Here------------------------------------------- */}
                <div className="row my-4">
                  <div className="col-4">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={update?.leaveStartDate ? dayjs(update.leaveStartDate) : null} // Ensure compatibility with

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
                        value={update?.leaveEndDate ? dayjs(update.leaveEndDate) : null} // Ensure compatibility with

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
                  <div className="col">
                    <TextField
                      variant="outlined"
                      sx={{ width: 300 }}
                      value={totalLeaveDays}
                      label="Total Number of Days of Leave"
                      InputLabelProps={{
                        shrink: true, // Ensures the label stays above the input field
                      }}
                      InputProps={{
                        readOnly: true, // Make the field read-only since it's auto-calculated
                      }}
                    />
                  </div>
                </div>
                {/* ---------------------------------------------------second Row Start Here------------------------------------------- */}
                <div className="row my-4">
                  <div className="col-4">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        sx={{ width: 300 }}
                        value={dayjs(update?.resumeOfWorkDate)}
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

                          className="form-control"
                          rows="3"
                          id="comment"
                          value={update.comment}
                          {...register("comment")}
                          onChange={ChangeRowData}
                          placeholder="Enter your Comment"
                        ></textarea>
                      </div>
                    </div>

                  </div>
                </div>
                {/* --------------------------------Print Button---------------------------------------------------------- */}

                <Stack spacing={2} direction="row" className="my-5 " marginBottom={2} justifyContent="center">
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
            </DialogContent>
          </Dialog>
        )
      }
    </div>
  )
}

export default UpdateResumeofWork