import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead"; 
import { Autocomplete, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import './lefemployeeStyel.scss';
import { Avatar } from '@mui/material';
import { Fragment } from 'react';
import {Button,} from "@mui/material";
import employee from '../../images/employee.jpeg'
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// import {columns, EmplyeeData } from "../EmplyeeData";
// import { Leftemployeecolumns,EmplyeeData } from "./LeftemployeeData";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
function Leftemployee(props) {
  const [display, setDisplay] = React.useState(false);
  const [alert, setAlert] = useState(false);
const history = useHistory();
const Leftemployeecolumns = (history) => [
  {field:'id',headerName:'SR NO',width:50},
  {field: 'image',headerName: 'Profile',width: 70,renderCell: (params) => <Avatar alt="Remy Sharp" src={employee} />, },
  {field:'EmployeeName',headerName:'Employee Name',width:120,},
  {field:'Position',headerName:'Position',width:90},
  {field:'Date',headerName:'Date',width:90},
  {field:'LastworkingDate',headerName:'LastworkingDate',width:90},
  {field:'JoiningDate',headerName:'JoiningDate',width:90},
  {field:'Resume Date',headerName:'Resume Date',width:90},
  {field:'Subject',headerName:'Subject',width:90},
  {field:'Other',headerName:'Other',width:90},
  {
    title: "Action",
    field: "Action",
    width: 100,
    renderCell: () => (
      <Button onClick={() => history.push('EndofService')}>
        <EditIcon />
      </Button>
    )
  },
  {
    title: "Delete",
    field: "Delete",
    width: 100,
    renderCell: () => (
      <Fragment>
        <Button color="error" onClick={() => setAlert(true)}>
          <DeleteIcon />
        </Button>
      </Fragment>
    ),
  },
]

const EmplyeeData = [
  {
    id: 1,
    EmployeeName: 'Ibrahin manzoor',
    Position: 'Position 1',
    Date: '2023-08-08',
    Subject: 'Subject 1',
    LastworkingDate: '2023-08-15',
    JoiningDate: '2022-01-01',
    'Resume Date': '2022-12-31',
    Other: 'Other 1',
  },
  {
    id: 2,
    EmployeeName: 'John Smith',
    Position: 'Developer',
    Date: '2023-08-09',
    Subject: 'Subject 2',
    LastworkingDate: '2023-08-16',
    JoiningDate: '2021-02-15',
    'Resume Date': '2021-02-14',
    Other: 'Other 2',
  },
  {
    id: 3,
    EmployeeName: 'Emily Brown',
    Position: 'Designer',
    Date: '2023-08-10',
    Subject: 'Subject 3',
    LastworkingDate: '2023-08-17',
    JoiningDate: '2020-06-20',
    'Resume Date': '2020-06-19',
    Other: 'Other 3',
  },
  {
    id: 4,
    EmployeeName: 'Alice Johnson',
    Position: 'Manager',
    Date: '2023-08-11',
    Subject: 'Subject 4',
    LastworkingDate: '2023-08-18',
    JoiningDate: '2019-11-01',
    'Resume Date': '2019-10-31',
    Other: 'Other 4',
  },
  {
    id: 5,
    EmployeeName: 'Michael Williams',
    Position: 'Engineer',
    Date: '2023-08-12',
    Subject: 'Subject 5',
    LastworkingDate: '2023-08-19',
    JoiningDate: '2018-04-15',
    'Resume Date': '2018-04-14',
    Other: 'Other 5',
  },
  {
    id: 6,
    EmployeeName: 'Sophia Martinez',
    Position: 'Coordinator',
    Date: '2023-08-13',
    Subject: 'Subject 6',
    LastworkingDate: '2023-08-20',
    JoiningDate: '2017-09-30',
    'Resume Date': '2017-09-29',
    Other: 'Other 6',
  },
  {
    id: 7,
    EmployeeName: 'David Miller',
    Position: 'Supervisor',
    Date: '2023-08-14',
    Subject: 'Subject 7',
    LastworkingDate: '2023-08-21',
    JoiningDate: '2016-04-10',
    'Resume Date': '2016-04-09',
    Other: 'Other 7',
  },
  {
    id: 8,
    EmployeeName: 'Olivia Garcia',
    Position: 'Assistant',
    Date: '2023-08-15',
    Subject: 'Subject 8',
    LastworkingDate: '2023-08-22',
    JoiningDate: '2015-08-20',
    'Resume Date': '2015-08-19',
    Other: 'Other 8',
  },
  {
    id: 9,
    EmployeeName: 'Robert Johnson',
    Position: 'Analyst',
    Date: '2023-08-16',
    Subject: 'Subject 9',
    LastworkingDate: '2023-08-23',
    JoiningDate: '2014-05-15',
    'Resume Date': '2014-05-14',
    Other: 'Other 9',
  },
  {
    id: 10,
    EmployeeName: 'Jessica Jones',
    Position: 'Manager',
    Date: '2023-08-17',
    Subject: 'Subject 10',
    LastworkingDate: '2023-08-24',
    JoiningDate: '2013-03-10',
    'Resume Date': '2013-03-09',
    Other: 'Other 10',
  },
  {
    id: 11,
    EmployeeName: 'William Davis',
    Position: 'Developer',
    Date: '2023-08-18',
    Subject: 'Subject 11',
    LastworkingDate: '2023-08-25',
    JoiningDate: '2012-02-05',
    'Resume Date': '2012-02-04',
    Other: 'Other 11',
  },
  {
    id: 12,
    EmployeeName: 'Ella Wilson',
    Position: 'Designer',
    Date: '2023-08-19',
    Subject: 'Subject 12',
    LastworkingDate: '2023-08-26',
    JoiningDate: '2011-09-01',
    'Resume Date': '2011-08-31',
    Other: 'Other 12',
  },
  {
    id: 13,
    EmployeeName: 'Aiden Martin',
    Position: 'Engineer',
    Date: '2023-08-20',
    Subject: 'Subject 13',
    LastworkingDate: '2023-08-27',
    JoiningDate: '2010-07-15',
    'Resume Date': '2010-07-14',
    Other: 'Other 13',
  },
  {
    id: 14,
    EmployeeName: 'Mia Thompson',
    Position: 'Coordinator',
    Date: '2023-08-21',
    Subject: 'Subject 14',
    LastworkingDate: '2023-08-28',
    JoiningDate: '2009-04-10',
    'Resume Date': '2009-04-09',
    Other: 'Other 14',
  },
  {
    id: 15,
    EmployeeName: 'Liam Anderson',
    Position: 'Assistant',
    Date: '2023-08-22',
    Subject: 'Subject 15',
    LastworkingDate: '2023-08-29',
    JoiningDate: '2008-01-20',
    'Resume Date': '2008-01-19',
    Other: 'Other 15',
  },
];
const deleteRow = async(update)=>{

    
  
}
const columns = Leftemployeecolumns(history); // Pass history as parameter
  return (
    
    <div className="row">
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
      <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
        <Dashhead id={4} display={display} />
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

        <h1 className="title text-center">Left Employee Information</h1>
        <div className='container'>
                <Autocomplete
     className="my-4"
        options={EmplyeeData}
        id="flat-demo"
        getOptionLabel={(row) => row.EmployeeName }
        // getOptionLabel={(rows)=>rows.EmployeeName && rows.Nationality || ""}
        renderInput={(params) => (
          <TextField {...params} label="Search By Name" variant="standard" />
        )}
      />
                </div>

     <Box sx={{ height: 900, width: '100%' }}>
      <div className="datagrid-container">
      <DataGrid 
      allowFiltering={true}
        rows={EmplyeeData}
        columns={columns}
        autoHeight
        pageSizeOptions={[10]}


      />
      </div>
    </Box>
     
      </div>
    </div>
  );
}

export default Leftemployee;
