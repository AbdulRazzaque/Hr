import React, { useState } from 'react'
import "./Dashhead.scss"
import {withRouter} from 'react-router'
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import InfoIcon from '@mui/icons-material/Info';
import {connect} from 'react-redux'
import logo from '../images/Tharblogo.png'

const Dashhead = (props) => {
    console.log(props);
    const [showInfoDropdown, setShowInfoDropdown] = useState(false);

    const handleInfoDropdownToggle = () => {
      setShowInfoDropdown(!showInfoDropdown);
    };
  
    const handleMenuItemClick = (menuItem) => {
      // Handle submenu item click
      console.log(`Clicked submenu item: ${menuItem}`);
    };
    let {id,display} = props
 
    return (
        
            
        <div className={display?"shadow-lg dashhead":'dashhead displayhidden'}>
        <img src={logo} className='logo'></img>
            {id===1?<div className="menu-container-active">
                <p onClick={()=>props.history.push('/')} ><PersonIcon /> Employees</p>
            </div>:
            <div className="menu-container" onClick={()=>props.history.push('/')} >
            <p><PersonOutlineOutlinedIcon/> Employees</p>
            </div>
            }

    {id===2?<div className="menu-container-active"> 
                <p onClick={()=>props.history.push('forms')}  ><NoteAddIcon /> Form</p> 
            </div>: 
            <div className="menu-container" onClick={()=>props.history.push('forms')}> 
            <p><NoteAddOutlinedIcon /> Form</p> 
            </div> 
            }

            {id===3?<div className="menu-container-active">
                <p><NotificationsActiveIcon /> Notifications</p>
            </div>:
            <div className="menu-container" onClick={()=>props.history.push('notification')} >
            <p><NotificationsActiveIcon /> Notifications</p>
        
            </div>
            }
            {id===4?<div className="menu-container-active">
                <p><TransferWithinAStationIcon /> Left Employee</p>
            </div>:
            <div className="menu-container" onClick={()=>props.history.push('Leftemployee')} >
            <p><TransferWithinAStationIcon /> Left Employee</p>
        
            </div>
            }        
        </div>
    );
}

const mapStateToProps = ({EventUser})=>{
    return {
        user:EventUser
    }
}

export default connect(mapStateToProps)(withRouter(Dashhead));