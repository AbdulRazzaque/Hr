
import React from "react";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead";
import './leavereport.scss';
import employee from '../../images/employee.jpeg'
import MaterialTable, { MTableToolbar } from 'material-table';
import { useEffect,useState } from "react";
const EmployeeLeaveReport = () => {
  const [display, setDisplay] = React.useState(false);


  const columns = [
    {field:'id',title:'SR NO', width: 'auto'},
    {field: 'image',title: 'Profile',  width: 'auto', export: false, render: rowData => <img src={employee} style={{width: 40, borderRadius: '50%'}}/> },
    {field:'EmployeeName',title:'Employee Name', width: 'auto'},
    {field:'Date',title:'Date', width: 'auto'},
    {field:'Leavetype',title:'Leavetype', width: 'auto'},
    {field:'Startdate',title:'Startdate', width: 'auto'},
    {field:'Lastdate',title:'Lastdate', width: 'auto'},
    {field:'Leavedays',title:'Leavedays', width: 'auto'},

  ]
 const data = [
    {
      id: 1,
      EmployeeName: 'Ibrahim manzoor',
      Date: '2023-08-08',
      Leavetype:"Business",
      Startdate:"2023-08-08",
      Lastdate:"2024-08-08",
      Leavedays:30
  
    },
    {
      id: 2,
      EmployeeName: 'Ibrahim manzoor',
      Date: '2023-08-09',
      Leavetype:"Business",
      Startdate:"2023-08-08",
      Lastdate:"2024-08-08",
      Leavedays:20
    },
    {
      id: 3,
      EmployeeName: 'Ibrahim manzoor',
      Date: '2023-08-10',
      Leavetype:"Business",
      Startdate:"2023-08-08",
      Lastdate:"2024-08-08",
      Leavedays:50
    },
    {
      id: 4,
      EmployeeName: 'Ibrahim manzoor',
      Date: '2023-08-12',
      Leavetype:"Business",
      Startdate:"2023-08-08",
      Lastdate:"2024-08-08",
      Leavedays:30
    },
    {
      id: 5,
      EmployeeName: 'Ibrahim manzoor',
      Date: '2023-08-12',
      Leavetype:"Business",
      Startdate:"2023-08-08",
      Lastdate:"2024-08-08",
      Leavedays:40
    },
    {
      id: 6,
      EmployeeName: 'Ibrahim manzoor',
      Date: '2023-08-13',
      Leavetype:"Business",
      Startdate:"2023-08-08",
      Lastdate:"2024-08-08",
      Leavedays:60
    },
    {
      id: 7,
      EmployeeName: 'Ibrahim manzoor',
      Date: '2023-08-14',
      Leavetype:"Business",
      Startdate:"2023-08-08",
      Lastdate:"2024-08-08",
      Leavedays:50
    },
    {
      id: 8,
      EmployeeName: 'Ibrahim manzoor',
      Date: '2023-08-15',
      Leavetype:"Business",
      Startdate:"2023-08-08",
      Lastdate:"2024-08-08",
      Leavedays:50
    },
    {
      id: 9,
      EmployeeName: 'Ibrahim manzoor',
      Date: '2023-08-16',
      Leavetype:"Business",
      Startdate:"2023-08-08",
      Lastdate:"2024-08-08",
      Leavedays:50
    },
    {
      id: 10,
      EmployeeName: 'Ibrahim manzoor',
      Date: '2023-08-17',
      Leavetype:"Business",
      Startdate:"2023-08-08",
      Lastdate:"2024-08-08",
      Leavedays:50
    },
    {
      id: 11,
      EmployeeName: 'Ibrahim manzoor',
      Date: '2023-08-18',
      Leavetype:"Business",
      Startdate:"2023-08-08",
      Lastdate:"2024-08-08",
      Leavedays:50
    },
    {
      id: 12,
      EmployeeName: 'Ibrahim manzoor',
      Date: '2023-08-19',
      Leavetype:"Business",
      Startdate:"2023-08-08",
      Lastdate:"2024-08-08",
      Leavedays:50
    },
    {
      id: 13,
      EmployeeName: 'Ibrahim manzoor',
      Date: '2023-08-20',
      Leavetype:"Business",
      Startdate:"2023-08-08",
      Lastdate:"2024-08-08",
      Leavedays:50
    },
    {
      id: 14,
      EmployeeName: 'Ibrahin manzoor',
      Date: '2023-08-21',
      Leavetype:"Business",
      Startdate:"2023-08-08",
      Lastdate:"2024-08-08",
      Leavedays:50
    },
    {
      id: 15,
      EmployeeName: 'Ibrahin manzoor',
      Date: '2023-08-22',
      Leavetype:"Business",
      Startdate:"2023-08-08",
      Lastdate:"2024-08-08",
      Leavedays:50
    },
  ]

//---------------------------------- Material Tabel page Size code here----------------------------------------------------------------
const [autoPageSize, setAutoPageSize] = useState(10); // Default page size
useEffect(() => {
    // Calculate and set the auto page size based on some criteria
    const calculatedPageSize = Math.min(10, Math.ceil(data.length / 2));
    setAutoPageSize(calculatedPageSize);
  }, [data]);

  
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
 
        <MaterialTable
      title="Employee Leave"
      columns={columns}
     data= {data}
    //   options={{
    //     pageSize: autoPageSize,
    //     pageSizeOptions: [], // Disable user selection of page size
    //   }
    options={{
        paging: false, // Disable pagination
        exportButton:true
      }}
    />
        </div>

    </div>
  );
};

export default EmployeeLeaveReport;
