import React, { Fragment, useState } from 'react'
import "./Home.scss"
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Dashhead from './Dashhead';
import { Autocomplete, Avatar, Box, Fab, TextField, Tooltip } from '@mui/material';
import {DataGrid,Filter} from '@mui/x-data-grid'
import value from '../images/leave.svg'
import employee from '../images/employee.jpeg'
import { useHistory } from 'react-router-dom';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { Button } from '@mui/base';
import InfoIcon from '@mui/icons-material/Info';

function Home(props) {


  const columns =[ 
    {field:'id',headerName:'SR NO',width:50},
    {field: 'image',headerName: 'Profile',width: 70,renderCell: (params) => <Avatar alt="Remy Sharp" src={employee} />, },
    {field:'EmployeeName',headerName:'Employee Name',width:210,},
    {field:'ArbicName',headerName:'Arbic Name',width:130},
    {field:'Nationality',headerName:'Nationality',width:90},
    {field:'Dept',headerName:'Department',width:90},
    {field:'Position',headerName:'Position',width:90},
    {field:'HiringDate',headerName:'Hiring Date',width:90,},
    {field:'probation',headerName:'probation',width:80},
    {field:'QatartId',headerName:'Qatart ID',width:100},
    {field:'Expiry ID',headerName:'Expiry ID',width:100},
    {field:'PassportNo',headerName:'Passport No',width:100},
    {field:'PassportExpiry',headerName:'PassportExpiry',width:120},
    {field:'BasicSalary',headerName:'BasicSalary',width:100},
    {field:'HousingAmount',headerName:'Housing',width:100},
    {field:'TransportAmount',headerName:'Transport',width:100},
    {field:'OtherAmount',headerName:'Other',width:100},
    {field:'Total',headerName:'Total',width:100},
  
    {
      title: "Action",
      field: "Action",
      width: 180,
      renderCell: (params) => (
        <Fragment>
          <Button  onClick={()=>history.push(`/Updateemployee`)}>
            <InfoIcon/>
          </Button>
  
  
        </Fragment>
      ),
    },
    
  ]
  
  
  const EmplyeeData = [
    {
      id: 1,
      EmployeeName: 'Abdur Razzaque Abdul jalil Shaikh',
      ArbicName: 'عبد الرزاق عبد الجليل شيخ',
      Nationality: 'Indian',
      Dept: 'CSE',
      QatartId: '65675464778',
      Position: 'Develop',
      HiringDate: '22/03/22',
      probation: '6 Month',
      PassportNo: 'W34343',
      'Expiry ID': '31/8/23',
      PassportExpiry: '31/12/23',
      BasicSalary: 5000,
      HousingAmount: 1500,
      TransportAmount: 800,
      OtherAmount: 500,
    },
    {
      id: 2,
      EmployeeName: 'Aisha Ali Ibrahim',
      ArbicName: 'عائشة علي إبراهيم',
      Nationality: 'Pakistani',
      Dept: 'CSE',
      QatartId: '65675464778',
      Position: 'Develop',
      HiringDate: '22/03/22',
      probation: '6 Month',
      PassportNo: 'W34343',
      'Expiry ID': '15/09/24',
      PassportExpiry: '31/8/23',
      BasicSalary: 5200,
      HousingAmount: 1600,
      TransportAmount: 850,
      OtherAmount: 550,
    },
    {
      id: 3,
      EmployeeName: 'Fatima Ahmed Rahman',
      ArbicName: 'فاطمة أحمد رحمن',
      Nationality: 'Egyptian',
      Dept: 'CSE',
      QatartId: '65675464778',
      Position: 'Develop',
      HiringDate: '22/03/22',
      probation: '6 Month',
      PassportNo: 'W34343',
      'Expiry ID': '28/11/23',
      PassportExpiry: '28/02/25',
      BasicSalary: 4800,
      HousingAmount: 1400,
      TransportAmount: 750,
      OtherAmount: 450,
    },
    {
      id: 5,
      EmployeeName: 'Ahmed Mustafa Shah',
      ArbicName: 'أحمد مصطفى شاه',
      Nationality: 'Indian',
      Dept: 'CSE',
      QatartId: '65675464778',
      Position: 'Develop',
      HiringDate: '22/03/22',
      probation: '6 Month',
      PassportNo: 'W34343',
      'Expiry ID': '8/8/25',
      PassportExpiry: '10/11/25',
      BasicSalary: 5300,
      HousingAmount: 1550,
      TransportAmount: 820,
      OtherAmount: 520,
    },
    {
      id: 6,
      EmployeeName: 'Zahra Omar Malik',
      ArbicName: 'زهراء عمر مالك',
      Nationality: 'Bangladeshi',
      Dept: 'CSE',
      QatartId: '65675464778',
      Position: 'Develop',
      HiringDate: '22/03/22',
      probation: '6 Month',
      PassportNo: 'W34343',
      'Expiry ID': '31/8/23',
      PassportExpiry: '31/7/23',
      BasicSalary: 5100,
      HousingAmount: 1450,
      TransportAmount: 780,
      OtherAmount: 480,
    },
    {
      id: 7,
      EmployeeName: 'Hassan Abdullah Khan',
      ArbicName: 'حسن عبدالله خان',
      Nationality: 'Indian',
      Dept: 'CSE',
      QatartId: '65675464778',
      Position: 'Develop',
      HiringDate: '22/03/22',
      probation: '6 Month',
      PassportNo: 'W34343',
      'Expiry ID': '19/04/24',
      PassportExpiry: '19/04/24',
      BasicSalary: 4900,
      HousingAmount: 1450,
      TransportAmount: 770,
      OtherAmount: 480,
    },
  
    {
      id: 9,
      EmployeeName: 'Maryam Abdullahi Ahmed',
      ArbicName: 'مريم عبدالله أحمد',
      Nationality: 'Afghan',
      Dept: 'CSE',
      QatartId: '65675464778',
      Position: 'Develop',
      HiringDate: '22/03/22',
      probation: '6 Month',
      PassportNo: 'W34343',
      'Expiry ID': '22/08/25',
      PassportExpiry: '22/08/25',
      BasicSalary: 5400,
      HousingAmount: 1650,
      TransportAmount: 820,
      OtherAmount: 550,
    },
    {
      id: 8,
      EmployeeName: 'Maryam Abdullahi Ahmed',
      ArbicName: 'مريم عبدالله أحمد',
      Nationality: 'Afghan',
      Dept: 'CSE',
      QatartId: '65675464778',
      Position: 'Develop',
      HiringDate: '22/03/22',
      probation: '6 Month',
      PassportNo: 'W34343',
      'Expiry ID': '22/08/25',
      PassportExpiry: '22/08/25',
      BasicSalary: 5400,
      HousingAmount: 1650,
      TransportAmount: 820,
      OtherAmount: 550,
    },
    {
      id: 10,
      EmployeeName: 'Ibrahim Ali Al-Mansoori',
      ArbicName: 'براهيم علي المنصوري',
      Nationality: 'Jordanian',
      Dept: 'CSE',
      QatartId: '65675464778',
      Position: 'Develop',
      HiringDate: '22/03/22',
      probation: '6 Month',
      PassportNo: 'W34343',
      'Expiry ID': '06/01/24',
      PassportExpiry: '06/01/24',
      BasicSalary: 5100,
      HousingAmount: 1550,
      TransportAmount: 800,
      OtherAmount: 500,
    },
    {
      id: 11,
      EmployeeName: 'Khadija Abdullah Al-Hariri',
      ArbicName: 'خديجة عبدالله الحريري',
      Nationality: 'Iraqi',
      Dept: 'CSE',
      QatartId: '65675464778',
      Position: 'Develop',
      HiringDate: '22/03/22',
      probation: '6 Month',
      PassportNo: 'W34343',
      'Expiry ID': '14/03/25',
      PassportExpiry: '14/03/25',
      BasicSalary: 5200,
      HousingAmount: 1600,
      TransportAmount: 850,
      OtherAmount: 550,
    },
    {
      id: 12,
      EmployeeName: 'Abdur Razzaque Abdul jalil Shaikh',
      ArbicName: 'عبد الرزاق عبد الجليل شيخ',
      Nationality: 'Emirati',
      Dept: 'CSE',
      QatartId: '65675464778',
      Position: 'Develop',
      HiringDate: '22/03/22',
      probation: '6 Month',
      PassportNo: 'W34343',
      'Expiry ID': '29/06/25',
      PassportExpiry: '29/06/25',
      BasicSalary: 5500,
      HousingAmount: 1700,
      TransportAmount: 900,
      OtherAmount: 600,
    },
    {
      id: 14,
      EmployeeName: 'Abdur Razzaque Abdul jalil Shaikh',
      ArbicName: 'عبد الرزاق عبد الجليل شيخ',
      Nationality: 'Lebanese',
      Dept: 'CSE',
      QatartId: '65675464778',
      Position: 'Develop',
      HiringDate: '22/03/22',
      probation: '6 Month',
      PassportNo: 'W34343',
      'Expiry ID': '11/09/24',
      PassportExpiry: '11/09/24',
      BasicSalary: 5100,
      HousingAmount: 1600,
      TransportAmount: 850,
      OtherAmount: 550,
    },
    {
      id: 15,
      EmployeeName: 'Abdur Razzaque Abdul jalil Shaikh',
      ArbicName: 'عبد الرزاق عبد الجليل شيخ',
      Nationality: 'Indian',
      Dept: 'CSE',
      QatartId: '65675464778',
      Position: 'Develop',
      HiringDate: '22/03/22',
      probation: '6 Month',
      PassportNo: 'W34343',
      'Expiry ID': '17/02/24',
      PassportExpiry: '17/02/24',
      BasicSalary: 5400,
      HousingAmount: 1800,
      TransportAmount: 900,
      OtherAmount: 600,
    },
    {
      id: 16,
      EmployeeName: 'Abdur Razzaque Abdul jalil Shaikh',
      ArbicName: 'عبد الرزاق عبد الجليل شيخ',
      Nationality: 'Indian',
      Dept: 'CSE',
      QatartId: '65675464778',
      Position: 'Develop',
      HiringDate: '22/03/22',
      probation: '6 Month',
      PassportNo: 'W34343',
      'Expiry ID': '05/10/25',
      PassportExpiry: '05/10/25',
      BasicSalary: 5200,
      HousingAmount: 1700,
      TransportAmount: 850,
      OtherAmount: 550,
    },
  ];
    const [display,setDisplay]=React.useState(false)

     EmplyeeData.forEach((employee)=>{
    employee.Total=  employee.BasicSalary + employee.HousingAmount + employee.TransportAmount + employee.OtherAmount;
    })

    const parseDateFromString = (dateString) => {
      const parts = dateString.split('/');
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Months are 0-based in JavaScript
      const year = parseInt(parts[2], 10) + 2000; // Adding 2000 to handle YY format
      return new Date(year, month, day);
    };
   // Function to apply conditional row styling based on the "Expiry ID"

const getRowClassName = (params) => {
  const expiryDate = parseDateFromString(params.row['Expiry ID']);
  const passportExpiryDate = parseDateFromString(params.row['PassportExpiry']);
  const currentDate = new Date();

  // Calculate the difference in months between the expiry date and the current date
  const idMonthsDifference =
    (expiryDate.getFullYear() - currentDate.getFullYear()) * 12 +
    expiryDate.getMonth() - currentDate.getMonth();

  const passportMonthsDifference =
    (passportExpiryDate.getFullYear() - currentDate.getFullYear()) * 12 +
    passportExpiryDate.getMonth() - currentDate.getMonth();

  if (idMonthsDifference <= 2 && idMonthsDifference >= 0) {
      return 'expiry-id-row'; // Apply class name for rows with close-to-expiring Expiry ID
  }

  if (passportMonthsDifference <= 2 && passportMonthsDifference >= 0) {
    return 'passport-id-row'; // Apply class name for rows with close-to-expiring PassportExpiry
  }

  return '';
};
const history = useHistory();
//  const handleRowClick = () =>{
//   history.push(`/Updateemployee`)
//  }



    return (
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
            <Dashhead id={1} display={display} />
            </div>

            <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container" onClick={()=>display&&setDisplay(false)}>
            <span className="iconbutton display-mobile">
            <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
            <MenuIcon fontSize="inherit" />
             </IconButton>
             </span>

                <h1 className='title text-center'>Employee Info</h1>
                <div className='container'>
                <Autocomplete
     className="my-4"
        options={EmplyeeData}
        id="flat-demo"
        getOptionLabel={(row) => row.EmployeeName && row.Nationality ? `${row.EmployeeName} (${row.Nationality})` : ""}
        // getOptionLabel={(rows)=>rows.EmployeeName && rows.Nationality || ""}
        renderInput={(params) => (
          <TextField {...params} label="Search By Name" variant="standard" />
        )}
      />
                </div>
       <Box sx={{ height: 900, width: '100%' }}>
      <DataGrid
      allowFiltering={true}
        rows={EmplyeeData}
        columns={columns}
        autoHeight
     
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        getRowClassName={getRowClassName}
        // onRowClick={handleRowClick}

      />
      <style>
        {`
          .bold-row {
            font-weight: bold;
          }
        `}
      </style>
    </Box>
            <div style={{position:"fixed",bottom:"5%",right:"5%"}}>
              <Tooltip title="Add New Employee">
              <Fab onClick={()=>props.history.push('NewEmployee')}
               variant="extended" color="primary" aria-label="add">
                 <PersonAddAlt1Icon/> 
              </Fab>
              </Tooltip>
        </div>

             </div>
    </div>
    )
}

export default Home
