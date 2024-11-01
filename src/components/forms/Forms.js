import React from 'react'
import "./forms.scss"
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Dashhead from '../Dashhead';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
 import ExitToAppIcon from '@mui/icons-material/ExitToApp';
 import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
 import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

 import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
 import RequestPageIcon from '@mui/icons-material/RequestPage';
 import {Link} from 'react-router-dom'
import Header from '../header/Header';
function Forms() {
    const [display,setDisplay]=React.useState(false)
     

    return (
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
            <Dashhead id={2} display={display} />
            </div>

            <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container" onClick={()=>display&&setDisplay(false)}>
            <span className="iconbutton display-mobile">
            <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
            <MenuIcon fontSize="inherit" />
             </IconButton>
             </span>

                <h1 className='title text-center'>Create Forms</h1>
                <div className="container">

                <Header/>
{/* ------------------------------- First Card section Start Here  ----------------------------------------------------- */}
<div className="row my-5">
<div className="col-sm">
   
   <div className="card card_background">
   <Link to='NewEmployee'>    <div className="card-body">
       < PersonAddAlt1Icon className='cardIcon'/>
       <h2 className='Cardheading text-center'>New Employee</h2>
       </div></Link>
       </div>
   
       </div>
    <div className="col-sm">
    <Link to='EndofService'>   <div className="card  card_background">
        <div className="card-body">
        < AccessTimeIcon className='cardIcon'/>
        <h2 className='Cardheading text-center' >End of Services</h2>
        </div>
        </div>
        </Link>
    </div>
    <div className="col-sm">
    <Link to='Exitforleave'>
    <div className="card card_background" >
        <div className="card-body">

        < ExitToAppIcon className='cardIcon'/>
        <h2 className='Cardheading text-center'>Exit For Leave</h2>
        </div>
        </div>
        </Link>
    </div>

    
  </div>
  {/* ------------------------------- Second Card section Start Here  ----------------------------------------------------- */}

  <div className="row my-5">
  <div className="col-sm">
          
          <div className="card card_background" >
          <Link to='Annualsettelment'>    
           <div className="card-body">
      < RequestPageIcon className='cardIcon'/>
   
      <h2 className='Cardheading text-center'> Annual Settlement</h2>
      </div>
      </Link>
      </div>
  </div>
    <div className="col-sm">
    <Link to='Resumeofwork'> 
        <div className="card card_background" >
        <div className="card-body">
        < DescriptionOutlinedIcon className='cardIcon'/>
        <h2 className='Cardheading text-center'>Resume Of Work</h2>
        </div>
        </div>
        </Link>
    </div>
    <div className="col-sm">
    <Link to='Rprenewalform'> 
    <div className="card card_background" >
        <div className="card-body">
        < PublishedWithChangesIcon className='cardIcon'/>
        <h2 className='Cardheading text-center'>RP Renewal</h2>
        </div>
        </div>
        </Link>
    </div>
  </div>

</div>

             </div>
    </div>
    )
}

export default Forms
