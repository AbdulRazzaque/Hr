import React from 'react'
import './Header.scss'
import { Link } from "react-router-dom";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import DarkMode from '../darkMode/DarkMode';
const Header = () => {
  return (
    <div>
            <div className="row mt-5">
    <div className="col-md-9">
      <div className="d-flex justify-content-start">
      </div>
    </div>
    <div className="col-md-3">
      <div className="d-flex justify-content-end">
     <Link to= "/notification">    <div className="p-2 headerIcon mx-4"><NotificationsActiveIcon className='icon'/></div></Link>
     <Link to= "/NewEmployee">   <div className="p-2 headerIcon"><PersonAddAlt1Icon className='icon'/></div> </Link>
       <div className="p-2 headerIcon mx-4"><DarkMode className='icon' /></div>

      </div>
    </div>
  </div>
    </div>
  )
}

export default Header