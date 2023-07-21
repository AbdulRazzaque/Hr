import React from "react";
import "./forms.scss";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead";
import { Link } from "react-router-dom";
import { Autocomplete, Button, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PrintIcon from '@mui/icons-material/Print';
import exit from '../../images/exit.svg'
import { FormControl } from "@mui/base";
const Exitforleave = () => {
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
          <h1 className="mt-3 title">
            Exit For Leave
          </h1>
          <div class="icon-container">
                <img src={exit}  alt="File icon" class="center headingimage mt-3" draggable="false"/>
            </div>
          <p className="subTitle">Exit Permit Request</p>
          {/* ---------------------------------------------------First Row Start Here------------------------------------------- */}
          <div class="row my-2">
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
            <div class="col-8">
            <Autocomplete
              disablePortal
              sx={{ width: 700 }}
              id="combo-box-demo"
              options={top100Films}
 
              renderInput={(params) => <TextField {...params} label="Name" />}
            />
            </div>
          </div> 
          {/* ---------------------------------------------------Second Row Start Here------------------------------------------- */}
          <div class="row my-2">
            <div class="col">
            <Autocomplete
              disablePortal
              sx={{ width: 300 }}
              id="combo-box-demo"
              options={top100Films}
 
              renderInput={(params) => <TextField {...params} label="Position" />}
            />
            </div>
            <div class="col">
            <Autocomplete
              disablePortal
              sx={{ width: 300 }}
              id="combo-box-demo"
              options={top100Films}
 
              renderInput={(params) => <TextField {...params} label="QID/Visa" />}
            />
            </div>
            <div class="col">
            <Autocomplete
              disablePortal
              sx={{ width: 300 }}
              id="combo-box-demo"
              options={top100Films}
 
              renderInput={(params) => <TextField {...params} label="Passport Number" />}
            />
            </div>
          </div> 
          {/* ------------------------------------------------------Third Row Start Here-------------------------------------------------------------------------- */}
          <div class="row mt-4">

              <div class="col-4">
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
              <div class="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 300 }}
                label="Number of Days of Leave"
                variant="outlined"
              />
              </div>

            </div>

          {/* ---------------------------------------------Forth row Start Here--------------------------------------------------- */}
          <div class="row my-5">
            <div class="col-4">

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="mt-4"
                  sx={{ width: 300 }}
                  label="Leave Start  Date"
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
                  className="mt-4"
                  sx={{ width: 300 }}
                  label="Leave End  Date"
                  onChange={(newValue) => setValue(newValue)}
                  renderInput={(params) => (
                    <TextField name="date" {...params} />
                  )}
                />
              </LocalizationProvider>
              </div>
                    </div>
          {/* ---------------------------------------------Fifth row Start Here--------------------------------------------------- */}
          <div class="row my-3">
            <div class="col-4">

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  
                  sx={{ width: 300 }}
                  label="Departure Date"
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
                  label="Arrival Date"
                  onChange={(newValue) => setValue(newValue)}
                  renderInput={(params) => (
                    <TextField name="date" {...params} />
                  )}
                />
              </LocalizationProvider>
              </div>
                    </div>
          {/* ---------------------------------------------Sixth row Start Here--------------------------------------------------- */}
          <div class="row my-3">
            <div class="col-4">

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
            <div class="col">
            <TextField
                id="outlined-basic"
                sx={{ width: 300 }}
                label="Number of Days of Last Leave"
                variant="outlined"
              />
              </div>
                    </div>
          {/* -----------------------------------------Second Row Start Here----------------------- */}
          <p className="subTitle">Asset and Loan Info</p>
          <div class="row my-3">
            <div class="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 300 }}
                label="Bank Loan"
                variant="outlined"
              />
              <TextField
                className="mt-4"
                id="outlined-basic"
                sx={{ width: 300 }}
                label="Personal Loan"
                variant="outlined"
              />
              <TextField
                className="mt-4"
                id="outlined-basic"
                sx={{ width: 300 }}
                label="Credit Card"
                variant="outlined"
              />
              <TextField
                className="mt-4"
                id="outlined-basic"
                sx={{ width: 300 }}
                label="Company  Loan"
                variant="outlined"
              />
            </div>
            <div class="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 300 }}
                label="Company Assets"
                variant="outlined"
              />
              <TextField
                className="mt-4"
                id="outlined-basic"
                sx={{ width: 300 }}
                label="Mobile / company Sim Card"
                variant="outlined"
              />
              <TextField
                className="mt-4"
                id="outlined-basic"
                sx={{ width: 300 }}
                label="Laptop / Ipad"
                variant="outlined"
              />
              <TextField
                className="mt-4"
                id="outlined-basic"
                sx={{ width: 300 }}
                label="Tools"
                variant="outlined"
              />
            </div>
            <div class="col">
              <div class="form-group">
                <label for="user-message" class=" control-label"></label>
                <div class="">
                  <textarea
                    name="user-message"
                    id="user-message"
                    class="form-control"
                    rows="13"
                    placeholder="Enter your Comment"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
                     {/* --------------------------------Print Button---------------------------------------------------------- */}
                     <div className="text-center mb-2">
              <Button variant="contained">
                
                <PrintIcon className="mr-1" /> Print Form
              </Button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Exitforleave;
