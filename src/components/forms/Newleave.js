import React from "react";
import "./forms.scss";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead";
import { Link } from "react-router-dom";
import { Button, TextField,InputAdornment, Autocomplete, FormGroup, FormControlLabel, Checkbox, FormLabel, RadioGroup, Radio, Stack } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PrintIcon from "@mui/icons-material/Print";
import AccountCircle from '@mui/icons-material/AccountCircle';
import leave from '../../images/leave.svg'
import { FormControl } from "@mui/base";
import SaveIcon from '@mui/icons-material/Save';

const Newleave = () => {
  const [display, setDisplay] = React.useState(false);
  const [value, setValue] = React.useState("");
  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Abdur', year: 1994 },
  ];
  return (
    <div className="row">
    <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
    <Dashhead id={2} display={display} />
    </div>

    <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container" onClick={()=>display&&setDisplay(false)}>
    <span className="iconbutton display-mobile">
    <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
    <MenuIcon fontSize="inherit" />
     </IconButton>
     </span>
     <div className="container">
     <h1 className="my-3 title">New Leave</h1>
       <div class="icon-container">
                <img src={leave}  alt="File icon" class="center headingimage mt-3" draggable="false"/>
            </div>
          <p className="subTitle">Employee Info</p>
          {/* ---------------------------First Row Strart Here----------------------------------------- */}
          <div class="row mt-4">
              <div class="col-4">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
              
                  sx={{ width: 300 }}
                  label="Date"
                  onChange={(newValue) => setValue(newValue)}
                  renderInput={(params) => (
                    <TextField name="date" {...params} />
                  )}
                />
              </LocalizationProvider>
              </div>
              <div class="col">
              <Autocomplete
              disablePortal
              sx={{ width: 600 }}
              id="combo-box-demo"
              options={top100Films}
 
              renderInput={(params) => <TextField {...params} label="Employee Name" />}
            />
              </div>

            </div>
{/* ------------------------------------------------------Second Row Start Here-------------------------------------------------------------------------- */}
          <div class="row mt-4">
              <div class="col-4">
              <Autocomplete
              disablePortal
              sx={{ width: 300 }}
              id="combo-box-demo"
              options={top100Films}
 
              renderInput={(params) => <TextField {...params} label="Profession" />}
            />
              </div>
              <div class="col ">
              <FormControl >
  <FormLabel id="demo-radio-buttons-group-label" className="font-weight-bold">Leave Type:</FormLabel>
  <RadioGroup row
    aria-labelledby="demo-radio-buttons-group-label"
    defaultValue="female"
    name="radio-buttons-group"
  >
          <FormControlLabel value="Business" control={<Radio />} label="Business" />
          <FormControlLabel value="Anuall" control={<Radio />} label="Anuall" />
          <FormControlLabel value="Emergency" control={<Radio />} label="Emergency" />
          <FormControlLabel value="Casual" control={<Radio />} label="Casual" />
        </RadioGroup>
      </FormControl>
              </div>
              <div class="col-4 mt-3">
              <TextField
                id="outlined-basic"
                sx={{ width: 300}}
                type="number"
                label="Number Of Leave Day"
                variant="outlined"
              />
              </div>

            </div>
 {/*------------------------------------------------- Third Row Start here ------------------------------------------------------------------- */}

           <div class="row mt-4">
              <div class="col-4">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
              
                  sx={{ width: 300 }}
                  label="Joing Date"
                  onChange={(newValue) => setValue(newValue)}
                  renderInput={(params) => (
                    <TextField name="date" {...params} />
                  )}
                />
              </LocalizationProvider>
              </div>
              <div class="col">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
              
                  sx={{ width: 300 }}
                  label="Last Leave Date"
                  onChange={(newValue) => setValue(newValue)}
                  renderInput={(params) => (
                    <TextField name="date" {...params} />
                  )}
                />
              </LocalizationProvider>
              </div>

            </div>
 {/* --------------------------------------------Forth Row start Here-----------------------------------------------  */}
 <div class="row mt-4">

              <div class="col">
              <FormControl >
  <FormLabel id="demo-radio-buttons-group-label" className="font-weight-bold">Location:</FormLabel>
  <RadioGroup row
    aria-labelledby="demo-radio-buttons-group-label"
    defaultValue="female"
    name="radio-buttons-group"
  >
          <FormControlLabel value="Qatar" control={<Radio />} label="Qatar" />
          <FormControlLabel value="Out of Qatar" control={<Radio />} label="Out of Qatar" />

        </RadioGroup>
      </FormControl>
              </div>

            </div>
 {/* --------------------------------------------Forth Row start Here-----------------------------------------------  */}
 <div class="row mt-4">
              <div class="col-12">
              
              <div class="form-group">
                <label for="user-message" class=" control-label"></label>
                <div class="">
                  <textarea
                    name="user-message"
                    id="user-message"
                    class="form-control"
                    rows="4"
                    placeholder="Contact Address During the Assence"
                  ></textarea>
                </div>
   
            </div>
              </div>
              <div class="col-12">
            
              <div class="form-group">
                <label for="user-message" class=" control-label"></label>
                <div class="">
                  <textarea
                    name="user-message"
                    id="user-message"
                    class="form-control"
                    rows="4"
                    placeholder="Organisation During The Absence Of An Employee "
                  ></textarea>
                </div>
              </div>
      
              </div>

            </div>
{/*------------------------------------------ fift Row Start Here-------------------------------------------------------- */}
<div class="row my-3 ">
              <div class="col Box">
            <h1> Prepared By</h1>
              <TextField
               className="my-3"
                  id="outlined-basic"
                  sx={{ width: 300 }}
                  label="Name"
                  variant="outlined"
                />
       <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                  className="my-3"
                    sx={{ width: 300 }}
                    label="Date"
                    onChange={(newValue) => setValue(newValue)}
                    renderInput={(params) => (
                      <TextField name="date" {...params} />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div class="col Box mx-3">
              <h1>HR Officer</h1>
              <TextField
               className="my-3"
                  id="outlined-basic"
                  sx={{ width: 300 }}
                  label="Name"
                  variant="outlined"
                />
       <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                  className="my-3"
                    sx={{ width: 300 }}
                    label=" Date"
                    onChange={(newValue) => setValue(newValue)}
                    renderInput={(params) => (
                      <TextField name="date" {...params} />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div class="col Box mx-3">
              <h1>Diretor</h1>
              <TextField
               className="my-3"
                  id="outlined-basic"
                  sx={{ width: 300 }}
                  label="Name"
                  variant="outlined"
                />
       <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                  className="my-3"
                    sx={{ width: 300 }}
                    label="Date"
                    onChange={(newValue) => setValue(newValue)}
                    renderInput={(params) => (
                      <TextField name="date" {...params} />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </div>
{/* --------------------------------Print Button---------------------------------------------------------- */}
            
            <Stack spacing={2} direction="row" marginBottom={2}  justifyContent="center">
            <Button variant="contained"> <PrintIcon className="mr-1"/> Print Form</Button>
            <Button variant="contained" color="success"> <SaveIcon className="mr-1"/> Save Form</Button>
            </Stack>
          

       
     </div>
     </div>
     </div>
  )
}

export default Newleave