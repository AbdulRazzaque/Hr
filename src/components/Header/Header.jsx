import  { useEffect, useState } from 'react'
import './Header.scss'
import { Link } from "react-router-dom";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

import axios from 'axios';
import config from '../auth/Config';
import { Badge } from '@mui/material';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUnreadCount } from '../redux/socket/socketActions';
const Header = () => {
  const unreadCount = useSelector((state) => state.socket.unreadCount); // Access unreadCount from Redux store
    const [socket, setSocket] = useState(null); // Socket instance
    const [notifications, setNotifications] = useState([]);
    const dispatch = useDispatch();   

// console.log(unreadCount,'únredCount')
useEffect(() => {
  const socketInstance = io(`${config.baseUrl}`, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
  });

  socketInstance.on('connect', () => {
      console.log('✅ WebSocket connected:', socketInstance.id);
  });

  socketInstance.on('disconnect', (reason) => {
      console.warn('🔴 WebSocket disconnected:', reason);
  });

  setSocket(socketInstance);

  return () => {
      socketInstance.disconnect();
  };
}, []);

// ✅ 2. Fetch Existing Notifications from API
  // ✅ 2. Fetch Existing Notifications from API
  useEffect(() => {
    // Fetch initial notifications
    const fetchNotifications = async () => {
        try {
            const response = await axios.get(`${config.baseUrl}/api/getNotification`);
            setNotifications(response.data); // This will load the existing notifications
           
        } catch (error) {
            console.error('❌ Error fetching notifications:', error);
        }
    };

    // Fetch notifications on initial render
    fetchNotifications();
},[])
// Listen for real-time notifications
useEffect(()=>{
  if (socket) {
      socket.on('expiryNotification', (notification) => {
          console.log('🔔 New Notification:', notification);
          setNotifications((prev) => [notification, ...prev]);  // Update the state immediately
      });

      return () => {
          socket.off('expiryNotification'); // Clean up event listener on unmount
      };
  }
}, [socket])

// }, [socket]);  // Depend on socket to ensure it listens when connected


// ✅ 3. Load Notifications from localStorage on Page Load
useEffect(() => {
setNotifications([]);
}, []);

// ✅ 4. Real-Time Notification Listener
useEffect(() => {
if (socket) {
  socket.on('setUpExpiryNotifications', (notification) => {
      console.log('🔔 New Notification:', notification);
      
      setNotifications((prev) => [notification, ...prev]);
  });

  return () => {
      socket.off('setUpExpiryNotifications');
  };
}
}, [socket]);
   
  // ✅ Update unread count in Redux
  useEffect(() => {
    const unread = notifications.filter((item) => !item.read).length;
    dispatch(setUnreadCount(unread));
}, [notifications, dispatch]);
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