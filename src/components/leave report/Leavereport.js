
import React from "react";
// import "./forms.scss";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead";
import './leavereport.scss';
import { Link } from "react-router-dom";
import { Autocomplete, Button, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PrintIcon from '@mui/icons-material/Print';
import exit from '../../images/exit.svg' 
import { FormControl } from "@mui/base";
const Leavereport = () => {
  const [display, setDisplay] = React.useState(false);
  const [value, setValue] = React.useState("");
 
  return (
    <div className="row">
      <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
        <Dashhead id={5} display={display} />
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
  <div className="container Construction">
    <h1 className="typing-heading">Under Construction</h1>
  </div>
      </div>
    </div>
  );
};

export default Leavereport;
