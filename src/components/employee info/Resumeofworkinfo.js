
import React from "react";
import '../forms/forms.scss';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead";
import employee from '../../images/employee.jpeg'
// import './employee.scss';
import { Link } from "react-router-dom";
import { Autocomplete, Button, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PrintIcon from "@mui/icons-material/Print";
const Resumeofworkinfo = () => {
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
  const flatProps = {
    options: top100Films.map((option) => option.label),
  };
  return (
    <div className="row">
    <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
    <Dashhead id={4} display={display} />
    </div>

    <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container" onClick={()=>display&&setDisplay(false)}>
    <span className="iconbutton display-mobile">
    <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
    <MenuIcon fontSize="inherit" />
     </IconButton>
     </span>
     <div className="container">
        <h1 className="text-center" >Resume Of Work Info</h1>
     <Autocomplete
     className="mt-4"
        {...flatProps}
        id="flat-demo"
        renderInput={(params) => (
          <TextField {...params} label="Search By Name" variant="standard" />
        )}
      />
     </div>

     <div class="row mt-5">

    <div class="col-3 py-5 px-5">
    <div class="d-flex flex-column align-items-center text-center">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150"/>
                    </div>
                    <div class="mt-3">
                      <h4 className="text-center">Abdur Razzaque Abdul Jaill Shaikh</h4>
                      <p class="text-secondary mb-1 text-center">Full Stack Developer</p>
                      <p class="text-muted font-size-sm text-center">76678678678</p>
                      <p class="text-muted font-size-sm text-center">346</p>
                      <p class="text-muted font-size-sm text-center">W-7123</p>
                    </div>
                            <div class="row d-flex flex-column align-items-center text-center mt-2">
                    <div class="col-sm-12 ">
                      <Link to="Resumeofwork" class="btn btn-info mx-2 text-white">Update</Link>
                      <a class="btn btn-danger " target="__blank" href="#">Delete</a>
                    </div>
                  </div>
               
    </div>
    <div class="col-9 py-5 px-5">
    <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Date</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                     1/1/2023
                    </div>
                  </div>
          
                  <hr/>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Leave Start Date</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                    1/1/2023
                    </div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Leave End Date</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                    1/1/2023
                    </div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Resume Of Work Date</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                    1/1/2023
                    </div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Company</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                     Tharb Camel
                    </div>
                  </div>
                  <hr/>
                
    </div>
  
 
  </div>
  <hr/>
     <div class="row mt-5">

    <div class="col-3 py-5 px-5">
    <div class="d-flex flex-column align-items-center text-center">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150"/>
                    </div>
                    <div class="mt-3">
                      <h4 className="text-center">Abdur Razzaque Abdul Jaill Shaikh</h4>
                      <p class="text-secondary mb-1 text-center">Full Stack Developer</p>
                      <p class="text-muted font-size-sm text-center">76678678678</p>
                      <p class="text-muted font-size-sm text-center">346</p>
                      <p class="text-muted font-size-sm text-center">W-7123</p>
                    </div>
                            <div class="row d-flex flex-column align-items-center text-center mt-2">
                    <div class="col-sm-12 ">
                      <a class="btn btn-info mx-2" target="__blank" href="#">Edit</a>
                      <a class="btn btn-danger " target="__blank" href="#">Delete</a>
                    </div>
                  </div>
               
    </div>
    <div class="col-9 py-5 px-5">
    <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Date</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                     1/1/2023
                    </div>
                  </div>
          
                  <hr/>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Leave Start Date</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                    1/1/2023
                    </div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Leave End Date</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                    1/1/2023
                    </div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Resume Of Work Date</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                    1/1/2023
                    </div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Company</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                     Tharb Camel
                    </div>
                  </div>
                  <hr/>
                
    </div>
  
 
  </div>
  <hr/>


     </div>
     </div>
  )
}

export default Resumeofworkinfo