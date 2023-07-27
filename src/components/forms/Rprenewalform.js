import React from "react";
import "./forms.scss";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead";
import { Link } from "react-router-dom";
import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PrintIcon from "@mui/icons-material/Print";
import SaveIcon from '@mui/icons-material/Save';
import rp from '../../images/rp.svg'
const Rprenewalform = () => {
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
         <h1 className="mt-3 title">RP Renewal Form</h1>
         <div class="icon-container">
                <img src={rp}  alt="File icon" class="center headingimage mt-3" draggable="false"/>
            </div>
          <p className="subTitle">Employee Info</p>
           {/* ---------------------------------------------------First Row Start Here------------------------------------------- */}
           <div class="row my-4">
            <div class="col">
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
              <TextField
                id="outlined-basic"
                sx={{ width: 300 }}
                label="Ref No"
                type="number"
                variant="outlined"
              />
            </div>          
              <div class="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 300 }}
                label="To"
                variant="outlined"
              />
            </div>
          </div>
           {/* ---------------------------------------------------Second Row Start Here------------------------------------------- */}
           <div class="row my-4">
            <div class="col">
            <Autocomplete
              disablePortal
              sx={{ width: 300 }}
              id="combo-box-demo"
              options={top100Films}
 
              renderInput={(params) => <TextField {...params} label="Employee Name" />}
            />
            </div>          
            <div class="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 300 }}
                label="Division"
                type="number"
                variant="outlined"
              />
            </div>          
              <div class="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 300 }}
                label="I.D / Passport No"
                variant="outlined"
              />
            </div>
          </div>
           {/* ---------------------------------------------------Therd Row Start Here------------------------------------------- */}
          <p className="subTitle">Employee Details</p>
           <div class="row my-4">
            <div class="col">
                <h3>Details</h3>
            </div>          
            <div class="col">
            <h3>Requested By</h3>
            </div>          
              <div class="col">
              <h3>Approved By</h3>
            </div>
              <div class="col">
              <h3>Accounts Dept</h3>
            </div>
          </div>
{/* --------------------------------------------------Forth Row Start Here ----------------------------------------- */}
<div class="row my-4">
            <div class="col">
            <h3>New Visa</h3>
            </div>          
            <div class="col">
            <TextField
                id="outlined-basic"
                sx={{ width: 250 }}
                label="Requested By"
                variant="outlined"
              />
            </div>          
              <div class="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 250 }}
                label="Approved By"
                variant="outlined"
              />
            </div>
              <div class="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 250 }}
                label="Accounts Dpt"
                variant="outlined"
              />
            </div>
          </div>
{/* --------------------------------------------------Fifth Row Start Here ----------------------------------------- */}
<div class="row my-4">
            <div class="col">
            <h3>Business Visa</h3>
            </div>          
            <div class="col">
            <TextField
                id="outlined-basic"
                sx={{ width: 250 }}
                label="Requested By"
                variant="outlined"
              />
            </div>          
              <div class="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 250 }}
                label="Approved By"
                variant="outlined"
              />
            </div>
              <div class="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 250 }}
                label="Accounts Dpt"
                variant="outlined"
              />
            </div>
          </div>
{/* --------------------------------------------------Fifth Row Start Here ----------------------------------------- */}
<div class="row my-4">
            <div class="col">
            <h3>Visa Transfer</h3>
            </div>          
            <div class="col">
            <TextField
                id="outlined-basic"
                sx={{ width: 250 }}
                label="Requested By"
                variant="outlined"
              />
            </div>          
              <div class="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 250 }}
                label="Approved By"
                variant="outlined"
              />
            </div>
              <div class="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 250 }}
                label="Accounts Dpt"
                variant="outlined"
              />
            </div>
          </div>
{/* --------------------------------------------------Sixth Row Start Here ----------------------------------------- */}
<div class="row my-4">
            <div class="col">
            <h3>New RP</h3>
            </div>          
            <div class="col">
            <TextField
                id="outlined-basic"
                sx={{ width: 250 }}
                label="Requested By"
                variant="outlined"
              />
            </div>          
              <div class="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 250 }}
                label="Approved By"
                variant="outlined"
              />
            </div>
              <div class="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 250 }}
                label="Accounts Dpt"
                variant="outlined"
              />
            </div>
          </div>
{/* --------------------------------------------------Seven Row Start Here ----------------------------------------- */}
<div class="row my-4">
            <div class="col">
            <h3>R.P Renewal</h3>
            </div>          
            <div class="col">
            <TextField
                id="outlined-basic"
                sx={{ width: 250 }}
                label="Requested By"
                variant="outlined"
              />
            </div>          
              <div class="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 250 }}
                label="Approved By"
                variant="outlined"
              />
            </div>
              <div class="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 250 }}
                label="Accounts Dpt"
                variant="outlined"
              />
            </div>
          </div>
{/* --------------------------------------------------Eight Row Start Here ----------------------------------------- */}
<div class="row my-4">
            <div class="col">
            <h3>Exit Permit</h3>
            </div>          
            <div class="col">
            <TextField
                id="outlined-basic"
                sx={{ width: 250 }}
                label="Requested By"
                variant="outlined"
              />
            </div>          
              <div class="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 250 }}
                label="Approved By"
                variant="outlined"
              />
            </div>
              <div class="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 250 }}
                label="Accounts Dpt"
                variant="outlined"
              />
            </div>
          </div>
<div class="row my-4">
            <div class="col">
            <h3>Others</h3>
            </div>          
            <div class="col">
            <TextField
                id="outlined-basic"
                sx={{ width: 250 }}
                label="Requested By"
                variant="outlined"
              />
            </div>          
              <div class="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 250 }}
                label="Approved By"
                variant="outlined"
              />
            </div>
              <div class="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 250 }}
                label="Accounts Dpt"
                variant="outlined"
              />
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

export default Rprenewalform