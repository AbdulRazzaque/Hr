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
import work from '../../images/work.svg'
import SaveIcon from '@mui/icons-material/Save';
const Resumeofwork = () => {
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
          <h1 className="mt-3 title">Resume of work application form</h1>
          <div className="icon-container">
                <img src={work}  alt="File icon" className="center headingimage mt-3" draggable="false"/>
            </div>
          <p className="subTitle">Employee Info</p>
          {/* ---------------------------------------------------First Row Start Here------------------------------------------- */}
          <div className="row my-4">
            <div className="col">
            <Autocomplete
              disablePortal
              sx={{ width: 300 }}
              id="combo-box-demo"
              options={top100Films}
 
              renderInput={(params) => <TextField {...params} label="Name" />}
            />
            </div>
            <div className="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 300 }}
                label="Employee No"
                variant="outlined"
              />
            </div>
            <div className="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 300 }}
                label="Nationality"
                variant="outlined"
              />
            </div>
          </div>
          {/* ---------------------------------------------------Secone Row Start Here------------------------------------------- */}
          <div className="row my-4">
            <div className="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 300 }}
                label="company"
                variant="outlined"
              />
            </div>
            <div className="col">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: 300 }}
                  label="Leave Start  Date"
                  onChange={(newValue) => setValue(newValue)}
                  renderInput={(params) => (
                    <TextField name="date" {...params} />
                  )}
                />
              </LocalizationProvider>
            </div>
            <div className="col">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
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
{/* ---------------------------------------------------Secone Row Start Here------------------------------------------- */}
          <div className="row my-4">
            <div className="col-4">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: 300 }}
                  label="Resume of work date"
                  onChange={(newValue) => setValue(newValue)}
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
                    id="user-message"
                    className="form-control"
                    rows="3"
                    placeholder="Enter your Comment"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
{/* --------------------------------Print Button---------------------------------------------------------- */}
            
<Stack spacing={2} direction="row" marginBottom={2}  justifyContent="center">
           
            <Link to="/Resumeofworkpdf"><Button variant="contained"><PrintIcon className="mr-1" /> Print Form</Button> </Link>
            <Button variant="contained" color="success"> <SaveIcon className="mr-1"/> Save Form</Button>
            </Stack>
        </div>
      </div>
    </div>
  );
};

export default Resumeofwork;
