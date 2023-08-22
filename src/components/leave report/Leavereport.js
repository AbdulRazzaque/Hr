
import React from "react";
// import "./forms.scss";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead";
import './leavereport.scss';
import employee from '../../images/employee.jpeg'
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Avatar, Box, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const Leavereport = () => {
  const [display, setDisplay] = React.useState(false);
  const [value, setValue] = React.useState("");
  const columns = [
    {field:'id',headerName:'SR NO',width:50},
    {field: 'image',headerName: 'Profile',width: 70,renderCell: (params) => <Avatar alt="Remy Sharp" src={employee} />, },
    {field:'EmployeeName',headerName:'Employee Name',width:190,},
    {field:'Date',headerName:'Date',width:90},
    {field:'Leavetype',headerName:'Leavetype',width:90},
    {field:'Startdate',headerName:'Startdate',width:90},
    {field:'Lastdate',headerName:'Lastdate',width:90},
    {field:'Leavedays',headerName:'Leavedays',width:90},

  ]
const EmplyeeData = [
  {
    id: 1,
    EmployeeName: 'Ibrahin manzoor',
    Date: '2023-08-08',
    Leavetype:"Business",
    Startdate:"2023-08-08",
    Lastdate:"2024-08-08",
    Leavedays:30

  },
  {
    id: 2,
    EmployeeName: 'John Smith',
    Date: '2023-08-09',
    Leavetype:"Business",
    Startdate:"2023-08-08",
    Lastdate:"2024-08-08",
    Leavedays:20
  },
  {
    id: 3,
    EmployeeName: 'Emily Brown',
    Date: '2023-08-10',
    Leavetype:"Business",
    Startdate:"2023-08-08",
    Lastdate:"2024-08-08",
    Leavedays:50
  },
  {
    id: 4,
    EmployeeName: 'Alice Johnson',
    Date: '2023-08-12',
    Leavetype:"Business",
    Startdate:"2023-08-08",
    Lastdate:"2024-08-08",
    Leavedays:30
  },
  {
    id: 5,
    EmployeeName: 'Michael Williams',
    Date: '2023-08-12',
    Leavetype:"Business",
    Startdate:"2023-08-08",
    Lastdate:"2024-08-08",
    Leavedays:40
  },
  {
    id: 6,
    EmployeeName: 'Sophia Martinez',
    Date: '2023-08-13',
    Leavetype:"Business",
    Startdate:"2023-08-08",
    Lastdate:"2024-08-08",
    Leavedays:60
  },
  {
    id: 7,
    EmployeeName: 'David Miller',
    Date: '2023-08-14',
    Leavetype:"Business",
    Startdate:"2023-08-08",
    Lastdate:"2024-08-08",
    Leavedays:50
  },
  {
    id: 8,
    EmployeeName: 'Olivia Garcia',
    Date: '2023-08-15',
    Leavetype:"Business",
    Startdate:"2023-08-08",
    Lastdate:"2024-08-08",
    Leavedays:50
  },
  {
    id: 9,
    EmployeeName: 'Robert Johnson',
    Date: '2023-08-16',
    Leavetype:"Business",
    Startdate:"2023-08-08",
    Lastdate:"2024-08-08",
    Leavedays:50
  },
  {
    id: 10,
    EmployeeName: 'Jessica Jones',
    Date: '2023-08-17',
    Leavetype:"Business",
    Startdate:"2023-08-08",
    Lastdate:"2024-08-08",
    Leavedays:50
  },
  {
    id: 11,
    EmployeeName: 'William Davis',
    Date: '2023-08-18',
    Leavetype:"Business",
    Startdate:"2023-08-08",
    Lastdate:"2024-08-08",
    Leavedays:50
  },
  {
    id: 12,
    EmployeeName: 'Ella Wilson',
    Date: '2023-08-19',
    Leavetype:"Business",
    Startdate:"2023-08-08",
    Lastdate:"2024-08-08",
    Leavedays:50
  },
  {
    id: 13,
    EmployeeName: 'Aiden Martin',
    Date: '2023-08-20',
    Leavetype:"Business",
    Startdate:"2023-08-08",
    Lastdate:"2024-08-08",
    Leavedays:50
  },
  {
    id: 14,
    EmployeeName: 'Mia Thompson',
    Date: '2023-08-21',
    Leavetype:"Business",
    Startdate:"2023-08-08",
    Lastdate:"2024-08-08",
    Leavedays:50
  },
  {
    id: 15,
    EmployeeName: 'Liam Anderson',
    Date: '2023-08-22',
    Leavetype:"Business",
    Startdate:"2023-08-08",
    Lastdate:"2024-08-08",
    Leavedays:50
  },
];

const history = useHistory();
 const handleRowClick = () =>{
  history.push(`/EmployeeLeaveReport`)
 }
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
  {/* <div className="container Construction">
    <h1 className="typing-heading">Under Construction</h1>
  </div> */}
  <div className="container">
  <h1 className="title text-center my-3">Employee leave report</h1>
      {/* ---------------------------Second Row Strart Here----------------------------------------- */}
      <div className=" row my-4">
              <div className="col-4 ml-3">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: 300 }}
                    label="To"
                    onChange={(newValue) => setValue(newValue)}
                    renderInput={(params) => (
                      <TextField name="date" {...params} />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div className="col-4">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: 300 }}
                    label="From"
                    onChange={(newValue) => setValue(newValue)}
                    renderInput={(params) => (
                      <TextField name="date" {...params} />
                    )}
                  />
                </LocalizationProvider>
             
              </div>
              <div className="col mt-2 mr-1">
              <button type="button" class="btn btn-primary">submit</button>
               
             
              </div>
            </div>
            </div>
            <Box sx={{ height: 900, width: '100%' }}>
      <div className="datagrid-container">
      <DataGrid 
      allowFiltering={true}
        rows={EmplyeeData}
        columns={columns}
        autoHeight
        pageSizeOptions={[10]}
        onRowClick={handleRowClick}

      />
      </div>
    </Box>

      </div>
    </div>
  );
};

export default Leavereport;
