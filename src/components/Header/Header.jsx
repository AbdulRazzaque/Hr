import React, { useEffect, useState } from 'react'
import './Header.scss'
import { Link } from "react-router-dom";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import DarkMode from '../darkMode/DarkMode';
import Notification from '../notification/Notification';
import axios from 'axios';
import config from '../auth/Config';
import { Badge } from '@mui/material';
import { useSelector } from 'react-redux';
const Header = () => {
  const unreadCount = useSelector((state) => state.socket.unreadCount); // Access unreadCount from Redux store

console.log(unreadCount,'únredCount')

  return (
    <div>
            <div className="row mt-5">
    <div className="col-md-9">
      <div className="d-flex justify-content-start">
      </div>
    </div>
    <div className="col-md-3">
      <div className="d-flex justify-content-end">
     <Link to= "/notification">    
     <div className="p-2 headerIcon mx-4">
           <Badge badgeContent={unreadCount} color="primary"><NotificationsActiveIcon className='icon'/>
          </Badge> </div></Link>
     <Link to= "/NewEmployee">   <div className="p-2 headerIcon"><PersonAddAlt1Icon className='icon'/></div> </Link>
       {/* <div className="p-2 headerIcon mx-4"><DarkMode className='icon' /></div> */}

      </div>
    </div>
    
  </div>
    </div>
  )
}

export default Header