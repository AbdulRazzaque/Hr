
import React, { useEffect, useState } from 'react'
import { Alert, Autocomplete, Button, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import dayjs from 'dayjs'
import exit from '../../images/exit.svg'
import axios from 'axios'
import config from '../auth/Config'
import PrintIcon from '@mui/icons-material/Print';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const UpdateExitforleave = ({update,showDialog,setShowDialog,ChangeRowData,getEmployeeByIdExitLeave}) => {

  const [leaveType, setLeaveType] = React.useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [date, setDate] = useState(null);
  const [leaveStartDate, setleaveStartDate] = useState(null);
  const [leaveEndDate, setLeaveEndDate] = useState(null);
  const [totalLeaveDays, setTotalLeaveDays] = useState(null);
  const [lastNumberOfLeave,setLastNumberOfLeave]= useState("")

  const [bankLoan, setBankLoan] = useState("No");
  const [personalLoan, setPersonalLoan] = useState("No");
  const [creditCard, setCreditCard] = useState("No");
  const [companyLoan, setCompanyLoan] = useState("No");
  const [companyAssets, setCompanyAssets] = useState("No");
  const [mobileSimCard, setMobileSimCard] = useState("No");
  const [laptop, setLaptop] = useState("No");
  const [tools, setTools] = useState("No");
  const [lastLeaveStartDate, setLastLeaveStartDate] = useState(null);
  const [lastLeaveEndDate, setLastLeaveEndDate] = useState(null)
  const [leaveInfo, setLeaveInfo] = useState(null)
   const [eligible,setEligible] = useState(null)
  const history = useHistory()
  // handel leave type change
  const handleLeaveTypeChange = (event) => {
    setLeaveType(event.target.value); // Update state with selected value
    // console.log("Selected Exit Type:", event.target.value); // For debugging
    // setLeaveType(update.leaveType)
  };

  // handel Employee
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
  
  }
  }
  useEffect(() => {
    // Pre-select employee if `update` prop is available
    if (update  && update.employeeId && Object.keys(update).length>0) {
      setSelectedEmployee(update.employeeId);  // assuming `employeeId` contains the full employee object
    }
        // Set all the provided state values if available in `update`
        if(update.lastNumberOfDayLeave)setLastNumberOfLeave(update.lastNumberOfDayLeave)
        if(update.numberOfDayLeave)setTotalLeaveDays(update.numberOfDayLeave)
        if (update.leaveType) setLeaveType(update.leaveType);
        if (update.bankLoan) setBankLoan(update.bankLoan);
        if (update.personalLoan) setPersonalLoan(update.personalLoan);
        if (update.CreditCard) setCreditCard(update.CreditCard);
        if (update.companyAssetsLoan) setCompanyLoan(update.companyAssetsLoan);
        if (update.companyAssets) setCompanyAssets(update.companyAssets);
        if (update.companySimCard) setMobileSimCard(update.companySimCard);
        if (update.companyLaptop) setLaptop(update.companyLaptop);
        if (update.tools) setTools(update.tools);
  }, [update?.id]);

  // update api
  const updateRow = async({action})=>{
    var obj ={
     employeeId:update.employeeId._id,
     date:date || update.date,
     leaveType: leaveType || update?.leaveType,
     leaveStartDate: leaveStartDate || update?.leaveStartDate,
     leaveEndDate: leaveEndDate || update?.leaveEndDate,
     numberOfDayLeave: totalLeaveDays || update?.numberOfDayLeave,
     lastLeaveStartDate: lastLeaveStartDate || update?.lastLeaveStartDate,
     lastLeaveEndDate: lastLeaveEndDate || update?.lastLeaveEndDate,
     lastNumberOfDayLeave: lastNumberOfLeave || update?.lastNumberOfDayLeave,
    bankLoan: bankLoan || update?.bankLoan,
    personalLoan: personalLoan || update?.personalLoan,
    CreditCard: creditCard || update?.CreditCard,
    companyAssetsLoan: companyLoan || update?.companyAssetsLoan,
    companyAssets: companyAssets || update?.companyAssets,
    companySimCard: mobileSimCard || update?.companySimCard,
    companyLaptop: laptop || update?.companyLaptop,
    tools: tools || update?.tools,
     comment:update.comment,
    //  to:update.to,
    //  from:update.from
    }
   try {
     await axios.put(`${config.baseUrl}/api/updateExitofleave/${update?._id}`,obj,
       {headers: { Authorization: `Bearer ${config.accessToken}` },}
   )
   getEmployeeByIdExitLeave()
   if (action === "print") {
    // Convert FormData to a plain object
    // const formDataObject = Object.fromEntries(formData.entries());
  
    history.push('/Exitforleavepdf', {
      data: {
        formData: obj, 
        // eligibilityMessage: eligible
      }
    });
  }
   setShowDialog(false)
   } catch (error) {
   console.log(error)
   }
   }

   // Calculate Day starDate and endDate
useEffect(()=>{
    if(update.leaveStartDate && leaveEndDate){
      const start = dayjs(update.leaveStartDate);
      const end = dayjs(leaveEndDate);
      const diff = end.diff(start,"day")+1
      setTotalLeaveDays(diff)
    }
  },[leaveStartDate,leaveEndDate])

const checkEligible = async () => {
  const empId = update?.employeeId?._id;
  if (!empId) {
    console.warn("Employee ID is undefined. Skipping eligibility check.");
    return;
  }

  try {
    const result = await axios.get(`${config.baseUrl}/api/CheckEligibleEmployee/${empId}`, {
      headers: { Authorization: `Bearer ${config.accessToken}` }
    });
    setEligible(result.data);
  } catch (error) {
    console.error('❌ Error checking eligibility:', error);
  }
};


   useEffect(()=>{
getEmployeeByIdExitLeave()
   },[])


useEffect(() => {
  if (update?.employeeId?._id) {
    checkEligible();
  }
}, [update]);


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
          <h1 className="mt-3 title text-center">
           update Exit For Leave
          </h1>
          <div className="icon-container">
                <img src={exit}  alt="File icon" className="center headingimage mt-3" draggable="false"/>
            </div>
          <p className="subTitle">Exit Permit Request</p>
          {/* ---------------------------------------------------First Row Start Here------------------------------------------- */}
          <div className="row my-2">
            <div className="col-4">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: 300 }}
                  label="Date"
                  value={dayjs(update.date)}
                     format="DD/MM/YYYY"
                  onChange={(newValue) => setDate(newValue)}
                  renderInput={(params) => (
                    <TextField name="date" {...params} required />
                  )}
                />
              </LocalizationProvider>
            </div>
            <div className="col-8">
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
            <div className="col">
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
             <div className='bg-dark'>
                    
                    {eligible && (
            <Alert severity="info">
               {selectedEmployee?.name}  {eligible} 
            </Alert>
          )}
                    </div>
          {/* ------------------------------------------------------Third Row Start Here-------------------------------------------------------------------------- */}
          <div className="row mt-4">

              <div className="col-4">
                      <FormControl required error={!leaveType}>
          <FormLabel id="demo-radio-buttons-group-label" className="font-weight-bold">Leave Type:</FormLabel>
          <RadioGroup row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            value={leaveType} // Bind to state
            onChange={handleLeaveTypeChange} // Handle change event
          >
          <FormControlLabel value="Business" control={<Radio />} label="Business" />
          <FormControlLabel value="Annual" control={<Radio />} label="Annual" />
          <FormControlLabel value="Emergency" control={<Radio />} label="Emergency" />
          <FormControlLabel value="Casual" control={<Radio />} label="Casual" />
        </RadioGroup>
      </FormControl>
              </div>
        

            </div>

          {/* ---------------------------------------------Forth row Start Here--------------------------------------------------- */}
          <div className="row my-5">
            <div className="col-4">

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="mt-4"
                  sx={{ width: 300 }}
                  label="Leave Start  Date"
                  value={dayjs(update.leaveStartDate)}
                     format="DD/MM/YYYY"
                  onChange={(newValue) => setleaveStartDate(newValue)}
                  renderInput={(params) => (
                    <TextField name="date" {...params} />
                  )}
                />
              </LocalizationProvider>
              </div>
            <div className="col">

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="mt-4"
                  sx={{ width: 300 }}
                  label="Leave End  Date"
                  value={dayjs(update.leaveEndDate)}
                  onChange={(newValue) => setLeaveEndDate(newValue)}
                  format="DD/MM/YYYY"
                  renderInput={(params) => (
                    <TextField name="date" {...params} />
                  )}
                />
              </LocalizationProvider>
              </div>
            <div className="col mt-4">
          
                          <TextField
                variant="outlined"
                sx={{ width: 300 }}
                value={totalLeaveDays}
                label="Total Number of Days of Leave"
                InputLabelProps={{
                  shrink: true,  // Ensures the label stays above the input field
                }}
                InputProps={{
                  readOnly: true, // Make the field read-only since it's auto-calculated
                }}
              />
              </div>
                    </div>
          {/* ---------------------------------------------Fifth row Start Here--------------------------------------------------- */}
          <div className="row my-5">
            <div className="col-4">

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
               value={dayjs(update.lastLeaveStartDate)}
                  className="mt-4"
                  sx={{ width: 300 }}
                  label="Last Leave Start  Date"
                    format="DD/MM/YYYY"
                  onChange={(newValue) => setLastLeaveStartDate(newValue)}
                  renderInput={(params) => (
                    <TextField name="date" {...params} />
                  )}
                />
              </LocalizationProvider>
              </div>
            <div className="col">

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
              value={dayjs(update.lastLeaveEndDate)}
                  className="mt-4"
                  sx={{ width: 300 }}
                    format="DD/MM/YYYY"
                  label="Last Leave End  Date"
                  onChange={(newValue) => setLastLeaveEndDate(newValue)}
                  renderInput={(params) => (
                    <TextField name="date" {...params} />
                  )}
                />
              </LocalizationProvider>
              </div>
            <div className="col mt-4">
            
              <TextField
               variant="outlined"
               
                sx={{ width: 300 }}
                value={lastNumberOfLeave}
                
                label="Total Number of Days of Leave"
                  onChange={(e)=>setLastNumberOfLeave(e.target.value)}
             

              />
             
              </div>
                    </div>
                    <div className="my-3">
                    <TextField
                    rows={3}  // Sets the number of visible lines
                    multiline={true} // Makes the field multiline
                    fullWidth
                    label="Comment"
                id="outlined-basic"
                name='comment'
                value={update.comment}
                onChange={ChangeRowData}
                // sx={{ width: 800 }}    label="Comment"
        
                variant="outlined"

              />
                    </div>

          {/* -----------------------------------------Second Row Start Here----------------------- */}
          <p className="subTitle">Asset and Loan Info</p>
          <div>
      {/* Bank Loan */}
      <div className="row my-4">
        <div className="col-2">
          <h3>Bank Loan</h3>
        </div>
        <div className="col">
          <FormControl>
            <RadioGroup
              row
              value={bankLoan}
              onChange={(e) => setBankLoan(e.target.value)}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      {/* Personal Loan */}
      <div className="row my-4">
        <div className="col-2">
          <h3>Personal Loan</h3>
        </div>
        <div className="col">
          <FormControl>
            <RadioGroup
              row
              value={personalLoan}
              onChange={(e) => setPersonalLoan(e.target.value)}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      {/* Credit Card */}
      <div className="row my-4">
        <div className="col-2">
          <h3>Credit Card</h3>
        </div>
        <div className="col">
          <FormControl>
            <RadioGroup
              row
              value={creditCard}
              onChange={(e) => setCreditCard(e.target.value)}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      {/* Company Loan */}
      <div className="row my-4">
        <div className="col-2">
          <h3>Company Loan</h3>
        </div>
        <div className="col">
          <FormControl>
            <RadioGroup
              row
              value={companyLoan}
              onChange={(e) => setCompanyLoan(e.target.value)}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      {/* Company Assets */}
      <div className="row my-4">
        <div className="col-2">
          <h3>Company Assets</h3>
        </div>
        <div className="col">
          <FormControl>
            <RadioGroup
              row
              value={companyAssets}
              onChange={(e) => setCompanyAssets(e.target.value)}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      {/* Mobile / Company sim card */}
      <div className="row my-4">
        <div className="col-2">
          <h3>Mobile / Company sim card</h3>
        </div>
        <div className="col">
          <FormControl>
            <RadioGroup
              row
              value={mobileSimCard}
              onChange={(e) => setMobileSimCard(e.target.value)}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      {/* Laptop */}
      <div className="row my-4">
        <div className="col-2">
          <h3>Laptop</h3>
        </div>
        <div className="col">
          <FormControl>
            <RadioGroup
              row
              value={laptop}
              onChange={(e) => setLaptop(e.target.value)}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      {/* Tools */}
      <div className="row my-4">
        <div className="col-2">
          <h3>Tools</h3>
        </div>
        <div className="col">
          <FormControl>
            <RadioGroup
              row
              value={tools}
              onChange={(e) => setTools(e.target.value)}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    </div>
                     {/* --------------------------------Print Button---------------------------------------------------------- */}
                     {/* <Stack spacing={2} direction="row" marginBottom={2}  justifyContent="center">
            <Button variant="contained" color="success" type="submit" onClick={updateRow}> <SaveIcon className="mr-1"/> Update Form</Button>
            </Stack> */}

                  <Stack spacing={2} direction="row" marginBottom={2} justifyContent="center">
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

export default UpdateExitforleave