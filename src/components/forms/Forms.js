import React, { Fragment } from 'react'
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
import WarningIcon from '@mui/icons-material/Warning';
import Warning from './Warning';
function Forms() {
    const [display,setDisplay]=React.useState(false)
     
    const formName=[
        {name:"New Employee", icon: < PersonAddAlt1Icon className='cardIcon'/> ,path:"/NewEmployee"},
        {name:"End of Services", icon: < AccessTimeIcon className='cardIcon'/> ,path:"/EndofService"},
        {name:"Exit For Leave", icon: < ExitToAppIcon className='cardIcon'/> ,path:"/Exitforleave"},
        {name:"Annual Settlement", icon: < RequestPageIcon className='cardIcon'/> ,path:"/Annualsettelment"},
        {name:"Resume Of Work", icon: < DescriptionOutlinedIcon className='cardIcon'/> ,path:"/Resumeofwork"},
        {name:"RP Renewal", icon: < PublishedWithChangesIcon className='cardIcon'/> ,path:"/Rprenewalform"},
        {name:"Warning", icon: < WarningIcon className='cardIcon'/> ,path:"/Warning"},

    ]

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
    {formName.map((item,index)=>(
<div className="col-sm my-3">
    <div className="card card_background">
     <Link to={item.path}>  
       <div className="card-body">
         <Fragment >{item.icon}</Fragment>
         <h2 className='Cardheading text-center'>{item.name}</h2>
         </div>
         </Link>
         </div> 
   

   
    
       </div>
    ))}
       </div>


    {/* <div className="col-sm">
    <Link to='EndofService'>   <div className="card  card_background">
        <div className="card-body">
        < AccessTimeIcon className='cardIcon'/>
        <h2 className='Cardheading text-center' >End of Services</h2>
        </div>
        </div>
        </Link>
    </div> */}
    {/* <div className="col-sm">
    <Link to='Exitforleave'>
    <div className="card card_background" >
        <div className="card-body">

        < ExitToAppIcon className='cardIcon'/>
        <h2 className='Cardheading text-center'>Exit For Leave</h2>
        </div>
        </div>
        </Link>
    </div> */}

    
  
  {/* ------------------------------- Second Card section Start Here  ----------------------------------------------------- */}
{/* 
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
  </div> */}
  {/* ------------------------------- Second Card section Start Here  ----------------------------------------------------- */}

  {/* <div className="row my-5">
  <div className="col">
          
          <div className="card card_background" >
          <Link to='Annualsettelment'>    
           <div className="card-body">
      < WarningIcon className='cardIcon'/>
      <h2 className='Cardheading text-center'>Warning</h2>
      </div>
      </Link>
      </div>
  </div>

  
  </div> */}

</div>
             </div>
    </div>
    )
}

export default Forms
