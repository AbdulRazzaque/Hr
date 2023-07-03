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
import Newleave from './components/forms/Newleave';
import Annualsettelment from './components/forms/Annualsettelment';
function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/forms" component={Forms} />
      <Route exact path="/notification" component={Notification} />
      <Route exact path="/EndofService" component={EndofService} />
      <Route exact path="/Exitforleave" component={Exitforleave} />
      <Route exact path="/Resumeofwork" component={Resumeofwork} />
      <Route exact path="/Rprenewalform" component={Rprenewalform} />
      <Route exact path="/NewEmployee" component={NewEmployee} />
      <Route exact path="/Newleave" component={Newleave} />
      <Route exact path="/Annualsettelment" component={Annualsettelment} />
   
    </Switch>
  );
}

export default App;
