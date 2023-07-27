import employee from '../images/employee.jpeg'
import { Autocomplete, Avatar, Box, Fab, TextField, Tooltip, gridClasses } from '@mui/material';
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
    'Expiry ID': '31/7/23',
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
    PassportExpiry: '31/7/23',
    BasicSalary: 5200,
    HousingAmount: 1600,
    TransportAmount: 850,
    OtherAmount: 550,
  },
  {
    id: 4,
    EmployeeName: 'Fatima Ahmed Rahman',
    ArbicName: 'فاطمة أحمد رحمن',
    Nationality: 'Egyptian',
    Dept: 'CSE',
    QatartId: '65675464778',
    Position: 'Develop',
    HiringDate: '22/03/22',
    probation: '6 Month',
    PassportNo: 'W34343',
    'Expiry ID': '28/09/23',
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
    'Expiry ID': '10/11/25',
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
    'Expiry ID': '31/7/23',
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

export  {
  EmplyeeData,
  columns,
};
