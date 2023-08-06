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
import Newleaveinfo from './components/employee info/Newleaveinfo';
import Resumeofworkinfo from './components/employee info/Resumeofworkinfo';
import Annualsettelmentinfo from './components/employee info/Annualsettelmentinfo';
import Employeeinfo from './components/employee info/Employeeinfo';
import Rprenewalforminfo from './components/employee info/Rprenewalforminfo';
import Updateemployee from './components/updateEmployee/Updateemployee';


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

{/*------------------------------------------- Inforamtion------------------------------------------------------- */}
        <Route exact path="/Employeeinfo" component={Employeeinfo} />
        <Route exact path="/Endofservicesinfo" component={Endofservicesinfo} />
        <Route exact path="/Exitforleaveinfo" component={Exitforleaveinfo} />
        <Route exact path="/Newleaveinfo" component={Newleaveinfo} />
        <Route exact path="/Resumeofworkinfo" component={Resumeofworkinfo} />
        <Route exact path="/Rprenewalforminfo" component={Rprenewalforminfo} />
        <Route exact path="/Annualsettelmentinfo" component={Annualsettelmentinfo} />

{/*------------------------------------------- Update Employee information------------------------------------------------------- */}

    <Route exact path="/Updateemployee" component={Updateemployee} />


    </Switch>
  );
}

export default App;
