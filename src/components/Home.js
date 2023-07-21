import React from 'react'
import "./Home.scss"
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Dashhead from './Dashhead';
import { Avatar, Box } from '@mui/material';
import {DataGrid,Filter} from '@mui/x-data-grid'
import value from '../images/leave.svg'
import employee from '../images/employee.jpeg'

function Home() {
    const [display,setDisplay]=React.useState(false)
  

    const columns =[ 
        {field:'id',headerName:'SR NO',width:50},
        {field: 'image',headerName: 'Profile',width: 100,editable: true,renderCell: (params) => <Avatar alt="Remy Sharp" src={employee} />, },
        {field:'EmployeeName',headerName:'Employee Name',width:120},
        {field:'ArbicName',headerName:'Arbic Name',width:120},
        {field:'Nationality',headerName:'Nationality',width:90},
        {field:'Dept',headerName:'Department',width:90},
        {field:'QatartId',headerName:'Qatart ID',width:150},
        {field:'workArea',headerName:'work Area',width:90},
        {field:'HiringDate',headerName:'Hiring Date',width:90},
        {field:'probation',headerName:'probation',width:90},
        {field:'PassportNo',headerName:'Passport No',width:150},
    ]
    const rows =[
        {id:1,EmployeeName:'Abdur',ArbicName:"عبدور",Nationality:"Indian",Dept:"CSE",QatartId:"65675464778",workArea:"Develop",HiringDate:"22/03/22",probation:"6 Month",PassportNo:"W34343"},
        {id:2,EmployeeName:'Abdur',ArbicName:"عبدور",Nationality:"Indian",Dept:"CSE",QatartId:"65675464778",workArea:"Develop",HiringDate:"22/03/22",probation:"6 Month",PassportNo:"W34343"},
        {id:3,EmployeeName:'Abdur',ArbicName:"عبدور",Nationality:"Indian",Dept:"CSE",QatartId:"65675464778",workArea:"Develop",HiringDate:"22/03/22",probation:"6 Month",PassportNo:"W34343"},
        {id:4,EmployeeName:'Abdur',ArbicName:"عبدور",Nationality:"Indian",Dept:"CSE",QatartId:"65675464778",workArea:"Develop",HiringDate:"22/03/22",probation:"6 Month",PassportNo:"W34343"},
        {id:5,EmployeeName:'Abdur',ArbicName:"عبدور",Nationality:"Indian",Dept:"CSE",QatartId:"65675464778",workArea:"Develop",HiringDate:"22/03/22",probation:"6 Month",PassportNo:"W34343"},
        {id:6,EmployeeName:'Abdur',ArbicName:"عبدور",Nationality:"Indian",Dept:"CSE",QatartId:"65675464778",workArea:"Develop",HiringDate:"22/03/22",probation:"6 Month",PassportNo:"W34343"},
        {id:7,EmployeeName:'Abdur',ArbicName:"عبدور",Nationality:"Indian",Dept:"CSE",QatartId:"65675464778",workArea:"Develop",HiringDate:"22/03/22",probation:"6 Month",PassportNo:"W34343"},
        {id:9,EmployeeName:'Abdur',ArbicName:"عبدور",Nationality:"Indian",Dept:"CSE",QatartId:"65675464778",workArea:"Develop",HiringDate:"22/03/22",probation:"6 Month",PassportNo:"W34343"},
        {id:10,EmployeeName:'Abdur',ArbicName:"عبدور",Nationality:"Indian",Dept:"CSE",QatartId:"65675464778",workArea:"Develop",HiringDate:"22/03/22",probation:"6 Month",PassportNo:"W34343"},
        {id:11,EmployeeName:'Abdur',ArbicName:"عبدور",Nationality:"Indian",Dept:"CSE",QatartId:"65675464778",workArea:"Develop",HiringDate:"22/03/22",probation:"6 Month",PassportNo:"W34343"},
        {id:12,EmployeeName:'Abdur',ArbicName:"عبدور",Nationality:"Indian",Dept:"CSE",QatartId:"65675464778",workArea:"Develop",HiringDate:"22/03/22",probation:"6 Month",PassportNo:"W34343"},
        {id:14,EmployeeName:'Abdur',ArbicName:"عبدور",Nationality:"Indian",Dept:"CSE",QatartId:"65675464778",workArea:"Develop",HiringDate:"22/03/22",probation:"6 Month",PassportNo:"W34343"},
        {id:15,EmployeeName:'Abdur',ArbicName:"عبدور",Nationality:"Indian",Dept:"CSE",QatartId:"65675464778",workArea:"Develop",HiringDate:"22/03/22",probation:"6 Month",PassportNo:"W34343"},
        {id:16,EmployeeName:'Abdur',ArbicName:"عبدور",Nationality:"Indian",Dept:"CSE",QatartId:"65675464778",workArea:"Develop",HiringDate:"22/03/22",probation:"6 Month",PassportNo:"W34343"},
      
    ]
 
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

                <h1 className='title'>Employee Info</h1>
             {/* <Box sx={{height:400,width:'100%'}}>
                <DataGrid
                rows = {rows}
                columns ={columns}
                initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                  checkboxSelection
                
                />
            </Box> */}
       <Box sx={{ height: 900, width: '100%' }}>
      <DataGrid
      allowFiltering={true}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        // checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>

             </div>
    </div>
    )
}

export default Home
