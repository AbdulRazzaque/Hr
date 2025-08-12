import './App.scss';
import {Switch,Route}  from 'react-router-dom'
import Home from "./components/Home"
import Forms from './components/forms/Forms';
import Notification from './components/notification/Notification';
import EndofService from './components/forms/EndofService';
import Exitforleave from './components/forms/Exitforleave';
import Resumeofwork from './components/forms/Resumeofwork';
import Rprenewalform from './components/forms/Rprenewalform';
import NewEmployee from './components/forms/NewEmployee';
import Annualsettelment from './components/forms/Annualsettelment';


import Endofservicesinfo from './components/employee info/Endofservicesinfo';
import Exitforleaveinfo from './components/employee info/Exitforleaveinfo';
import Resumeofworkinfo from './components/employee info/Resumeofworkinfo';
import Annualsettelmentinfo from './components/employee info/Annualsettelmentinfo';
import Employeeinfo from './components/employee info/Employeeinfo';
import Rprenewalforminfo from './components/employee info/Rprenewalforminfo';
import Updateemployee from './components/updateEmployee/Updateemployee';
import Leftemployee from './components/leftEmployee/Leftemployee';
import Leavereport from './components/leave report/Leavereport';
import EmployeeLeaveReport from './components/leave report/EmployeeLeaveReport';
import Newemployeepdf from './components/Pdf/Newemployeepdf';
import Exitforleavepdf from './components/Pdf/Exitforleavepdf';
import EndofServicepdf from './components/Pdf/EndofServicepdf';
import Annualsettelmentpdf from './components/Pdf/Annualsettelmentpdf';
import Resumeofworkpdf from './components/Pdf/Resumeofworkpdf';
import Rprenewalformpdf from './components/Pdf/Rprenewalformpdf';
import Dashboard from './components/dashboard/Dashboard';
import Warning from './components/forms/Warning';

import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { createContext, useState } from 'react';
import Warninginfo from './components/employee info/Warninginfo';
import AbsenceLeave from './components/forms/AbsenceLeave';
import Warningpdf from './components/Pdf/Warningpdf';
import AbsenceLeavepdf from './components/Pdf/AbsenceLeavepdf';
import EmployeeReport from './components/EmployeeReport/EmployeeReport';
import EmployeeReportPdf from './components/EmployeeReport/EmployeeReportPdf';
import AddDepartment from './components/department/AddDepartment';
import AddPosition from './components/position/AddPosition';
import BackIcon from './components/header/BackIcon';
import ExportEmployee from './components/ExportEmployee/ExportEmployee';
import ExportPdf from './components/ExportEmployee/ExportPdf';
import LeftEmployeePdf from './components/leftEmployee/LeftEmployeePdf';





export const ThemeContext = createContext();

function App() {

  const [darkMode, setDardMode] = useState(false);

  const toggleDarkMode = () => {
    setDardMode(prevMode => !prevMode);
  };

  // Define Material-UI theme
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>

    <Switch> 
      <Route exact path="/" component={Login} />
    <ProtectedRoute exact path="/Dashboard" component={Dashboard} />
      <ProtectedRoute exact path="/Home" component={Home} />
{/*---------------------------------------- Forms -------------------------------------- */}
      <ProtectedRoute exact path="/forms" component={Forms} />
      <ProtectedRoute exact path="/EndofService" component={EndofService} />
      <ProtectedRoute exact path="/Exitforleave" component={Exitforleave} />
      <ProtectedRoute exact path="/Resumeofwork" component={Resumeofwork} />
      <ProtectedRoute exact path="/Rprenewalform" component={Rprenewalform} />
      <ProtectedRoute exact path="/NewEmployee" component={NewEmployee} />
      <ProtectedRoute exact path="/Annualsettelment" component={Annualsettelment} />
      <ProtectedRoute exact path="/Warning" component={Warning} />
      <ProtectedRoute exact path="/AbsenceLeave" component={AbsenceLeave} />
      <ProtectedRoute exact path="/EmployeeReport" component={EmployeeReport} />
   


{/*---------------------------------------- Notification -------------------------------------- */}
      <ProtectedRoute exact path="/notification" component={Notification} />

{/*------------------------------ Leftemployee----------------------------------------- */}

<ProtectedRoute exact path="/Leftemployee" component={Leftemployee} />
<ProtectedRoute exact path="/LeftEmployeePdf" component={LeftEmployeePdf} />

{/*------------------------------------------- Inforamtion------------------------------------------------------- */}
        <ProtectedRoute exact path="/Employeeinfo" component={Employeeinfo} />
        <ProtectedRoute exact path="/Endofservicesinfo" component={Endofservicesinfo} />
        <ProtectedRoute exact path="/Exitforleaveinfo" component={Exitforleaveinfo} />
        <ProtectedRoute exact path="/Resumeofworkinfo" component={Resumeofworkinfo} />
        <ProtectedRoute exact path="/Rprenewalforminfo" component={Rprenewalforminfo} />
        <ProtectedRoute exact path="/Annualsettelmentinfo" component={Annualsettelmentinfo} />
        <ProtectedRoute exact path="/Warninginfo" component={Warninginfo} />


{/*------------------------------------------- Update Employee information------------------------------------------------------- */}

    <ProtectedRoute exact path="/Updateemployee" component={Updateemployee} />
{/*------------------------------------------- Leave report------------------------------------------------------- */}

    <ProtectedRoute exact path="/Leavereport" component={Leavereport} />
    <ProtectedRoute exact path="/EmployeeLeaveReport" component={EmployeeLeaveReport} />

{/* --------------------------------------pdf------------------------------------------------------------------------------- */}
    <ProtectedRoute exact path="/Newemployeepdf" component={Newemployeepdf} />
    <ProtectedRoute exact path="/Exitforleavepdf" component={Exitforleavepdf} />
    <ProtectedRoute exact path="/EndofServicepdf" component={EndofServicepdf} />
    <ProtectedRoute exact path="/Annualsettelmentpdf" component={Annualsettelmentpdf} />
    <ProtectedRoute exact path="/Resumeofworkpdf" component={Resumeofworkpdf} />
    <ProtectedRoute exact path="/Rprenewalformpdf" component={Rprenewalformpdf} />
    <ProtectedRoute exact path="/Warningpdf" component={Warningpdf} />
    <ProtectedRoute exact path="/AbsenceLeavepdf" component={AbsenceLeavepdf} />
    <ProtectedRoute exact path="/EmployeeReportPdf" component={EmployeeReportPdf} />

{/* --------------------------------------Department------------------------------------------------------------------------------- */}

    <ProtectedRoute exact path="/AddDepartment" component={AddDepartment} />
    <ProtectedRoute exact path="/AddPosition" component={AddPosition} />

{/* --------------------------------------Back Icon------------------------------------------------------------------------------- */}
      <ProtectedRoute exact path="/BackIcon" component={BackIcon} />

{/* --------------------------------------Employee Export------------------------------------------------------------------------------ */}

      <ProtectedRoute exact path="/ExportEmployee" component={ExportEmployee} />
      <ProtectedRoute exact path="/ExportPdf" component={ExportPdf} />




    </Switch>
    </ThemeContext.Provider>
    </ThemeProvider>
  );
}

export default App;
