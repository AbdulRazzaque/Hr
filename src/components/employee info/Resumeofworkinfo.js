
import React, { useState } from "react";
import '../forms/forms.scss';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead";

import { Link } from "react-router-dom";
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";

const Resumeofworkinfo = () => {
  const [display, setDisplay] = React.useState(false);

  const [alert, setAlert] = useState(false);
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

     <div className="row mt-5">

    <div className="col-3 py-5 px-5">
    <div className="d-flex flex-column align-items-center text-center">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150"/>
                    </div>
                    <div className="mt-3">
                      <h4 className="text-center">Abdur Razzaque Abdul Jaill Shaikh</h4>
                      <p className="text-secondary mb-1 text-center">Full Stack Developer</p>
                      <p className="text-muted font-size-sm text-center">76678678678</p>
                      <p className="text-muted font-size-sm text-center">346</p>
                      <p className="text-muted font-size-sm text-center">W-7123</p>
                    </div>
                            <div className="row d-flex flex-column align-items-center text-center mt-2">
                    <div className="col-sm-12 ">
                      <Link to="Resumeofwork" className="btn btn-info mx-2 text-white">Update</Link>
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
                      <a className="btn btn-danger text-white" onClick={() => setAlert(true)}>Delete</a>

                    </div>
                  </div>
               
    </div>
    <div className="col-9 py-5 px-5">
    <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Date</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                     1/1/2023
                    </div>
                  </div>
          
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Leave Start Date</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    1/1/2023
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Leave End Date</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    1/1/2023
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Resume Of Work Date</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    1/1/2023
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Company</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                     Tharb Camel
                    </div>
                  </div>
                  <hr/>
                
    </div>
  
 
  </div>
  <hr/>
     <div className="row mt-5">

    <div className="col-3 py-5 px-5">
    <div className="d-flex flex-column align-items-center text-center">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150"/>
                    </div>
                    <div className="mt-3">
                      <h4 className="text-center">Abdur Razzaque Abdul Jaill Shaikh</h4>
                      <p className="text-secondary mb-1 text-center">Full Stack Developer</p>
                      <p className="text-muted font-size-sm text-center">76678678678</p>
                      <p className="text-muted font-size-sm text-center">346</p>
                      <p className="text-muted font-size-sm text-center">W-7123</p>
                    </div>
                            <div className="row d-flex flex-column align-items-center text-center mt-2">
                    <div className="col-sm-12 ">
                      <a className="btn btn-info mx-2" target="__blank" href="#">Edit</a>
                      <a className="btn btn-danger " target="__blank" href="#">Delete</a>
                    </div>
                  </div>
               
    </div>
    <div className="col-9 py-5 px-5">
    <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Date</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                     1/1/2023
                    </div>
                  </div>
          
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Leave Start Date</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    1/1/2023
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Leave End Date</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    1/1/2023
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Resume Of Work Date</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    1/1/2023
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Company</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
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