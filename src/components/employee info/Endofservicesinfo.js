import React from "react";
import '../forms/forms.scss';
import '../forms/forms.scss';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead";
import employee from '../../images/employee.jpeg'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './employee.scss';
import { Link } from "react-router-dom";
import { Autocomplete, Button, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PrintIcon from "@mui/icons-material/Print";
const Endofservicesinfo = () => {
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
     <h1 className="text-center my-3 font-family">info End of services</h1>
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
    <div class="col-6 px-4 py-4">
    <div className="cardBackground row">

       <div class="cardBorder col-md-4 gradient-custom text-center text-white"
             >
              <img src={employee}
                alt="Avatar" class="Avatar img-fluid my-5"  />
              <h5>Ahamd</h5>
              <p>Devloper</p>
              {/* <i class="far fa-edit mb-5"></i> */}
            <Link to="EndofService">  <EditIcon className="mx-3 text-white"/></Link>
              <DeleteIcon/>
            </div>
          

    <div class="col-md-8">
              <div class="card-body p-4">
                <h6>Employee Information</h6>
                <hr class="mt-0 mb-4"/>
                <div class="row pt-1">
                  <div class="col-6 mb-3">
                    <h6>Date</h6>
                    <p class="text-muted">19/1/2023</p>
                  </div>
                  <div class="col-6 mb-3">
                    <h6>Employee Number</h6>
                    <p class="text-muted">45689</p>
                  </div>
                  <div class="col-6 mb-3">
                    <h6>To</h6>
                    <p class="text-muted">45689</p>
                  </div>
                  <div class="col-6 mb-3">
                    <h6>From</h6>
                    <p class="text-muted">45689</p>
                  </div>
                </div>
                <h6>Employee Work Info</h6>
                <hr class="mt-0 mb-4"/>
                <div class="row pt-1">
                  <div class="col-6 mb-3">
                    <h6>Last Working Day</h6>
                    <p class="text-muted">8/7/2023</p>
                  </div>
                  <div class="col-6 mb-3">
                    <h6>Joining Date</h6>
                    <p class="text-muted">3/3/2022</p>
                  </div>
                  <div class="col-6 mb-3">
                    <h6>Resuming of last vacation</h6>
                    <p class="text-muted">8/7/2023</p>
                  </div>
                  <div class="col-6 mb-3">
                    <h6>other</h6>
                    <p class="text-muted">Lorem ipsum</p>
                  </div>
                </div>

              </div>
            </div>
  
    </div>
    </div>
    <div class="col-6 px-4 py-4">
    <div className="cardBackground row">

       <div class="cardBorder col-md-4 gradient-custom text-center text-white"
             >
              <img src={employee}
                alt="Avatar" class="Avatar img-fluid my-5"  />
              <h5>Nasir</h5>
              <p>Devloper</p>
              {/* <i class="far fa-edit mb-5"></i> */}
             
              <EditIcon className="mx-3"/>
              <DeleteIcon/>
            </div>
          

    <div class="col-md-8">
              <div class="card-body p-4">
                <h6>Employee Information</h6>
                <hr class="mt-0 mb-4"/>
                <div class="row pt-1">
                  <div class="col-6 mb-3">
                    <h6>Date</h6>
                    <p class="text-muted">19/1/2023</p>
                  </div>
                  <div class="col-6 mb-3">
                    <h6>Employee Number</h6>
                    <p class="text-muted">45689</p>
                  </div>
                  <div class="col-6 mb-3">
                    <h6>To</h6>
                    <p class="text-muted">45689</p>
                  </div>
                  <div class="col-6 mb-3">
                    <h6>From</h6>
                    <p class="text-muted">45689</p>
                  </div>
                </div>
                <h6>Employee Work Info</h6>
                <hr class="mt-0 mb-4"/>
                <div class="row pt-1">
                  <div class="col-6 mb-3">
                    <h6>Last Working Day</h6>
                    <p class="text-muted">8/7/2023</p>
                  </div>
                  <div class="col-6 mb-3">
                    <h6>Joining Date</h6>
                    <p class="text-muted">3/3/2022</p>
                  </div>
                  <div class="col-6 mb-3">
                    <h6>Resuming of last vacation</h6>
                    <p class="text-muted">8/7/2023</p>
                  </div>
                  <div class="col-6 mb-3">
                    <h6>other</h6>
                    <p class="text-muted">Lorem ipsum</p>
                  </div>
                </div>

              </div>
            </div>
  
    </div>
    </div>
    <div class="col-6 px-4 py-4">
    <div className="cardBackground row">

       <div class="cardBorder col-md-4 gradient-custom text-center text-white"
             >
              <img src={employee}
                alt="Avatar" class="Avatar img-fluid my-5"  />
              <h5>Saad</h5>
              <p>Devloper</p>
              {/* <i class="far fa-edit mb-5"></i> */}
              <EditIcon className="mx-3"/>
              <DeleteIcon/>
            </div>
          

    <div class="col-md-8">
              <div class="card-body p-4">
                <h6>Employee Information</h6>
                <hr class="mt-0 mb-4"/>
                <div class="row pt-1">
                  <div class="col-6 mb-3">
                    <h6>Date</h6>
                    <p class="text-muted">19/1/2023</p>
                  </div>
                  <div class="col-6 mb-3">
                    <h6>Employee Number</h6>
                    <p class="text-muted">45689</p>
                  </div>
                  <div class="col-6 mb-3">
                    <h6>To</h6>
                    <p class="text-muted">45689</p>
                  </div>
                  <div class="col-6 mb-3">
                    <h6>From</h6>
                    <p class="text-muted">45689</p>
                  </div>
                </div>
                <h6>Employee Work Info</h6>
                <hr class="mt-0 mb-4"/>
                <div class="row pt-1">
                  <div class="col-6 mb-3">
                    <h6>Last Working Day</h6>
                    <p class="text-muted">8/7/2023</p>
                  </div>
                  <div class="col-6 mb-3">
                    <h6>Joining Date</h6>
                    <p class="text-muted">3/3/2022</p>
                  </div>
                  <div class="col-6 mb-3">
                    <h6>Resuming of last vacation</h6>
                    <p class="text-muted">8/7/2023</p>
                  </div>
                  <div class="col-6 mb-3">
                    <h6>other</h6>
                    <p class="text-muted">Lorem ipsum</p>
                  </div>
                </div>

              </div>
            </div>
  
    </div>
    </div>
    <div class="col-6 px-4 py-4">
    <div className="cardBackground row">

       <div class="cardBorder col-md-4 gradient-custom text-center text-white"
             >
              <img src={employee}
                alt="Avatar" class="Avatar img-fluid my-5"  />
              <h5>Ali</h5>
              <p>Devloper</p>
              {/* <i class="far fa-edit mb-5"></i> */}
              <EditIcon className="mx-3"/>
              <DeleteIcon/>
            </div>
          

    <div class="col-md-8">
              <div class="card-body p-4">
                <h6>Employee Information</h6>
                <hr class="mt-0 mb-4"/>
                <div class="row pt-1">
                  <div class="col-6 mb-3">
                    <h6>Date</h6>
                    <p class="text-muted">19/1/2023</p>
                  </div>
                  <div class="col-6 mb-3">
                    <h6>Employee Number</h6>
                    <p class="text-muted">45689</p>
                  </div>
                  <div class="col-6 mb-3">
                    <h6>To</h6>
                    <p class="text-muted">45689</p>
                  </div>
                  <div class="col-6 mb-3">
                    <h6>From</h6>
                    <p class="text-muted">45689</p>
                  </div>
                </div>
                <h6>Employee Work Info</h6>
                <hr class="mt-0 mb-4"/>
                <div class="row pt-1">
                  <div class="col-6 mb-3">
                    <h6>Last Working Day</h6>
                    <p class="text-muted">8/7/2023</p>
                  </div>
                  <div class="col-6 mb-3">
                    <h6>Joining Date</h6>
                    <p class="text-muted">3/3/2022</p>
                  </div>
                  <div class="col-6 mb-3">
                    <h6>Resuming of last vacation</h6>
                    <p class="text-muted">8/7/2023</p>
                  </div>
                  <div class="col-6 mb-3">
                    <h6>other</h6>
                    <p class="text-muted">Lorem ipsum</p>
                  </div>
                </div>

              </div>
            </div>
  
    </div>
    </div>
   
  </div>



     </div>
     </div>
  )
}

export default Endofservicesinfo