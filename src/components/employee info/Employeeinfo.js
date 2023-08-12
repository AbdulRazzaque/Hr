import React, { useState } from "react";
import '../forms/forms.scss';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {Button} from "@mui/material";
import Dashhead from "../Dashhead";
import employee from '../../images/employee.jpeg'
import passport from '../../images/file.svg'
import { Link } from "react-router-dom";
import { Autocomplete, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PrintIcon from "@mui/icons-material/Print";
const Employeeinfo = () => {
  const [display, setDisplay] = React.useState(false);
  const [showImage, setShowImage] = React.useState(false);
  const [alert, setAlert] = useState(false);

const toggleImage = ()=>{
  setShowImage(!showImage)
} 
const deleteRow = async(update)=>{

}
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
        <h1 className="text-center" >Employee Info</h1>

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
                      <p class="text-muted font-size-sm text-center">W-7123</p>
                    </div>
                            <div class="row d-flex flex-column align-items-center text-center mt-2">
                     <div class="col-sm-12 ">
                      <Link to="/NewEmployee" class="btn btn-info mx-2" >update</Link>
                      {alert && (
          <Dialog open={alert} style={{ height: 600 }}>
            <DialogTitle>Delete Row</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are You sure You want to delete this.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={() => deleteRow()}>
                Yes
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  setAlert(false);
                }}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        )}
                      <a class="btn btn-danger text-white" onClick={() => setAlert(true)}>Delete</a>
                    </div>
                  </div>
               
    </div>
    <div class="col-4 py-5 px-5">
    <div class="row">
                    <div class="col-sm-5">
                      <h6 class="mb-0">Date of Brith</h6>
                    </div>
                    <div class="col-sm-6 text-secondary">
                     1/1/2023
                    </div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-5">
                      <h6 class="mb-0">Date of Joinig</h6>
                    </div>
                    <div class="col-sm-6 text-secondary">
                    1/1/2023
                    </div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-5">
                      <h6 class="mb-0">Mobile Number</h6>
                    </div>
                    <div class="col-sm-6 text-secondary">
                    7677785
                    </div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-5">
                      <h6 class="mb-0">Marital Status</h6>
                    </div>
                    <div class="col-sm-6 text-secondary">
                    Un Married 
                    </div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-5">
                      <h6 class="mb-0">Nationality</h6>
                    </div>
                   <div class="col-sm-6 text-secondary">
                   Indian
                    </div>
                  </div>
                  <hr/>
                  {/* <div class="row">
                    <div class="col-sm-12">
                      <a class="btn btn-info " target="__blank" href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills">Edit</a>
                    </div>
                  </div> */}
                  <div class="row">
                    <div class="col-sm-5">
                      <h6 class="mb-0">Pasport Number</h6>
                    </div>
                   <div class="col-sm-6 text-secondary">
                    W38809
                    </div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-5">
                      <h6 class="mb-0">Date of Issue</h6>
                    </div>
                   <div class="col-sm-6 text-secondary">
                    1/1/2023
                    </div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-5">
                      <h6 class="mb-0">Date of Expiry</h6>
                    </div>
                   <div class="col-sm-6 text-secondary">
                   1/8/2030
                    </div>
                  </div>
                  <hr/>
    </div>
    <div class="col-4 py-5">
    <div class="row">
                    <div class="col-sm-5">
                      <h6 class="mb-0">Blood Grop</h6>
                    </div>
                   <div class="col-sm-6 text-secondary">
                    O positive
                    </div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-5">
                      <h6 class="mb-0">Employee Number</h6>
                    </div>
                   <div class="col-sm-6 text-secondary">
                   45453
                    </div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-5">
                      <button type="button" class="btn btn-primary" onClick={toggleImage}>Show Signature</button>
                      {
                        showImage && <img className="mt-3 rounded-circle" width="150" src={employee}></img>
                      }
                    </div>
                   <div class="col-sm-5 text-secondary">
                   <button type="button" class="btn btn-primary" onClick={toggleImage}>Show  Passport</button>
                      {
                        showImage && <img className="mt-3 mx-2 rounded-circle" width="120" src={passport}></img>
                      }
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

export default Employeeinfo