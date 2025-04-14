import { Autocomplete, Button, Dialog, DialogContent, DialogTitle, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import settlement from '../../images/settlement.svg'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import dayjs from 'dayjs'
import axios from 'axios'
import config from '../auth/Config'
import PrintIcon from '@mui/icons-material/Print';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const UpdateAnnualSettlement = ({update,showDialog,setShowDialog,ChangeRowData,getEmployeeAnnualSettlements}) => {
 
  const [selectedEmployee, setSelectedEmployee] = useState(null);
 const [date,setDate]=useState(dayjs())
 const [leaveInfo, setLeaveInfo] = useState(null)
 const [leaveStartDate, setLeaveStartDate] = useState(null);
 const [resumeDate, setResumeDate] = useState(null);
 const history = useHistory()
  useEffect(() => {
    // Pre-select employee if `update` prop is available
    if (update  && update.employeeId && Object.keys(update).length>0) {
      setSelectedEmployee(update.employeeId);  // assuming `employeeId` contains the full employee object
    }

    
  }, [update?.id]);

  // console.log(update,'update')
  // console.log(selectedEmployee._id)

  const handleEmployee =async(event,value)=>{

    setSelectedEmployee(value); // Set selected employee
    if (!value || !value._id) {
      // Ensure the selected value has a valid ID before making the API call
      setLeaveInfo(null); // Reset leave info if no employee is selected
      return;
    }

  try{
    const [response1,response2] =  await Promise.all([
  
      axios.get(`${config.baseUrl}/api/getEmployeeLeave/${value._id}`,{
        headers:{Authorization: `Bearer ${config.accessToken}`},
      }),
      axios.get(`${config.baseUrl}/api/getEmployeeResume/${value._id}`,{
        headers:{Authorization: `Bearer ${config.accessToken}` },
      })
    ]) ;
  
    // console.log(leave)
    setLeaveInfo(
    {
      leaveData: response1.data,
      employeeResume: response2.data,
    }
    )
  }catch(error){
    console.error('Error fetching leave information:', error.message || error);
    setLeaveInfo(null)
  }
  
  }
    const updateRow = async({action})=>{
     var obj ={
      employeeId:update.employeeId._id,
      date:date,
      leaveStartDate:leaveStartDate || update.leaveStartDate,
      resumingVacation:resumeDate || update.resumingVacation,
      subject:update.subject,
      to:update.to,
      from:update.from
     }
    try {
      await axios.put(`${config.baseUrl}/api/UpdateAnnualsettelment/${update?._id}`,obj,
        {headers: { Authorization: `Bearer ${config.accessToken}` },}
    )
      getEmployeeAnnualSettlements()
      if (action === "print") {
        // Convert FormData to a plain object
        // const formDataObject = Object.fromEntries(formData.entries());
      
        // history.push('/Annualsettelmentpdf', {data: {formData: obj, }});
        history.push('/Annualsettelmentpdf', { data: obj });
      }
    setShowDialog(false)

    } catch (error) {
    console.log(error)
    }
    }
  // console.log(leaveInfo,'leaveinfo')
  useEffect(()=>{
    getEmployeeAnnualSettlements()
  },[])

  console.log(update,"This update information AnnualSettlement")
  return (
    <div>
   
        {
        update && (
          <Dialog open={showDialog} fullWidth maxWidth="lg">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', }}>
        <IconButton onClick={()=>setShowDialog(false)} sx={{ color: 'grey.800' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
            <DialogContent>
            <div className="container">
     <h1 className=" title text-center">Update Annual Settlement Request</h1>
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
                    options={[update.employeeId]}  // wrap the employeeId in an array
                    getOptionLabel={(option) => option.name || ""}  // Display employee name
                    value={selectedEmployee}  // Set the pre-selected employee here
                    onChange={handleEmployee}  // Handle selection
                    renderInput={(params) => <TextField {...params} label="Employee Name" />}
                  />
              </div>
              <div className="col-4">
              <TextField

                value={selectedEmployee?.position || ""}
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
                  name='subject'
                  id="filled-basic"
                  fullWidth
                  value={update?.subject}
                  label="Subject"
                  variant="filled"
                onChange={ChangeRowData}
                  sx={{ width: 650 }}
                 
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
                  // {...register("to")}
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
            // {...register("from")}
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
                    //  value={leaveInfo?.leaveData? dayjs(leaveInfo?.leaveData?.leaveStartDate) : null} // Ensure compatibility with
                    value={dayjs( update.leaveStartDate)}
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
                      format='DD/MM/YYYY'
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
                  // value={leaveInfo?.employeeResume?dayjs(leaveInfo?.employeeResume?.resumeOfWorkDate):null}
                  value={update? dayjs(update.resumingVacation):null}
                    sx={{ width: 300 }}
                    format='DD/MM/YYYY'
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
<Stack spacing={2} direction="row" className='my-4' justifyContent="center">
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => updateRow({ action: "print" })}
                            >
                              <PrintIcon className="mr-1" /> Print Form
                            </Button>
                            <Button
                              variant="contained"
                              color="success"
                              onClick={() => updateRow({ action: "save" })}
                            >
                              <SaveIcon className="mr-1" /> Save Form
                            </Button>
                          </Stack>
     </div>
            </DialogContent>
            </Dialog>
        )
        }
    </div>
  )
}

export default UpdateAnnualSettlement