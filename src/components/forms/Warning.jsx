import React from "react";
import "./forms.scss";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead";
import { Link } from "react-router-dom";
import PrintIcon from '@mui/icons-material/Print';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Autocomplete, Button, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField } from "@mui/material";
import endofservices from '../../images/endofservices.svg'
import SaveIcon from '@mui/icons-material/Save';
import employeWarning from '../../images/EmployeeWarning.jpg'
const Warning = () => {
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
            <div className="row my-4">
            <div className="col-4">
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
              <div className="col-6 ">
              <Autocomplete
              disablePortal
              // sx={{ width: 500 }}
              fullWidth
              id="combo-box-demo"
              options={top100Films}
 
              renderInput={(params) => <TextField {...params} label="Select Employee Name" />}
            />
              </div>
              <div className="col-6 mt-3 ">
              <Autocomplete
              disablePortal
              sx={{ width: 300 }}
              
              id="combo-box-demo"
              options={top100Films}
 
              renderInput={(params) => <TextField {...params} label="Position" />}
            />
              </div>
            </div>
        
            {/* ---------------------------Second Row Strart Here----------------------------------------- */}
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
        <div className="row my-3 ">
              <div className="col Box">
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
              <div className="col Box mx-3">
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
              <div className="col Box mx-3">
              <h1>Director</h1>
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
          <Link to ="/EndofServicepdf">  <Button variant="contained"> <PrintIcon className="mr-1"/> Print Form</Button> </Link>
            <Button variant="contained" color="success"> <SaveIcon className="mr-1"/> Save Form</Button>
            </Stack>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Warning;
