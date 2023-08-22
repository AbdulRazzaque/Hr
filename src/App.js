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


function App() {
  return (
    <Switch> 
      <Route exact path="/" component={Home} />
{/*---------------------------------------- Forms -------------------------------------- */}
      <Route exact path="/forms" component={Forms} />
      <Route exact path="/EndofService" component={EndofService} />
      <Route exact path="/Exitforleave" component={Exitforleave} />
      <Route exact path="/Resumeofwork" component={Resumeofwork} />
      <Route exact path="/Rprenewalform" component={Rprenewalform} />
      <Route exact path="/NewEmployee" component={NewEmployee} />

      <Route exact path="/Annualsettelment" component={Annualsettelment} />
{/*---------------------------------------- Notification -------------------------------------- */}
      <Route exact path="/notification" component={Notification} />

{/*------------------------------ Leftemployee----------------------------------------- */}

<Route exact path="/Leftemployee" component={Leftemployee} />

{/*------------------------------------------- Inforamtion------------------------------------------------------- */}
        <Route exact path="/Employeeinfo" component={Employeeinfo} />
        <Route exact path="/Endofservicesinfo" component={Endofservicesinfo} />
        <Route exact path="/Exitforleaveinfo" component={Exitforleaveinfo} />
        <Route exact path="/Resumeofworkinfo" component={Resumeofworkinfo} />
        <Route exact path="/Rprenewalforminfo" component={Rprenewalforminfo} />
        <Route exact path="/Annualsettelmentinfo" component={Annualsettelmentinfo} />

{/*------------------------------------------- Update Employee information------------------------------------------------------- */}

    <Route exact path="/Updateemployee" component={Updateemployee} />
{/*------------------------------------------- Leave report------------------------------------------------------- */}

    <Route exact path="/Leavereport" component={Leavereport} />
    <Route exact path="/EmployeeLeaveReport" component={EmployeeLeaveReport} />
    </Switch>
  );
}

export default App;
