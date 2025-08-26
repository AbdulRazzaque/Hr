
import React, { useEffect, useState } from 'react'
import "./notification.scss"
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Dashhead from '../Dashhead';
import Header from '../header/Header';
import config from '../auth/Config';
import { io } from 'socket.io-client';
import axios from 'axios';
import placeholder from '../../images/placeholderEmployee.jpg'
import { useDispatch } from 'react-redux';
import { setUnreadCount } from '../redux/socket/socketActions';
import UpdateNewEmployee from '../updateEmployee/UpdateNewEmployee';
function Notification() {
    
    const [display, setDisplay] = useState(false);
    const [socket, setSocket] = useState(null); // Socket instance
    const [notifications, setNotifications] = useState([]);
        const [selectedNotification,setSelectedNotification] = useState(null)
         const [showDialog,setShowDialog]=useState(false)
         const [update,setUpdate]=useState(null)
        const dispatch = useDispatch();
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

        // Fetch initial notifications
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`${config.baseUrl}/api/getNotification`);
                setNotifications(response.data); // This will load the existing notifications
               
            } catch (error) {
                console.error('❌ Error fetching notifications:', error);
            }
        };
        useEffect(() => {
        fetchNotifications();
    },[dispatch])
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

    // ✅ 5. Dismiss Notification
    const handleDismiss = async (index, notificationId) => {
        console.log(index,notificationId,'check index,notificationId')
        try {
            
            if(!notificationId){
                console.error("❌ Invalid notificationId:", notificationId);
                return
            }

          // Send the notification ID to mark as read on the backend
          await axios.put(`${config.baseUrl}/api/markAsRead/${notificationId}`, {
            read: true, // Mark notification as read
          });
      
          console.log('Notification marked as read:', notificationId);
      
          // Remove the notification from the frontend immediately
          setNotifications((prev) => {
            const updatedNotifications = prev.filter((notification) => notification._id !== notificationId);
            return updatedNotifications;
          });
        } catch (error) {
          console.error('❌ Error dismissing notification:', error);
        }
      };
     
      const handleNotificationClick =(notification)=>{
        setSelectedNotification(notification)
       
      }
    const unread = notifications.filter((item) => !item.read).length 
      console.log(unread)
    dispatch(setUnreadCount(unread)); // Dispatch action to update unread count

           const handelUpdate = (notification)=>{

        setUpdate(notification?.employeeId)
        setShowDialog(true)

}
 const ChangeRowData=(e)=>{
  if (!update) return;
  setUpdate({...update,[e.target.id]:e.target.value})
}
 
    return (
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
            <Dashhead id={4} display={display} />
            </div>

            <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container" onClick={()=>display&&setDisplay(false)}>
            <span className="iconbutton display-mobile">
            <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
            <MenuIcon fontSize="inherit" />
             </IconButton>
             </span>

                {/* <h1>Notification</h1> */}
          
                <h1 className='title text-center'>Notification</h1>
                <div className='container'>
                <Header/>
                </div>

<div className=" mt-5">
    <div className="row  ">
       
       
        <div className="col-lg-7 right">
            <div className="box shadow-sm rounded mb-3">
                <div className="box-title border-bottom p-3">
                    <h6 className="m-0 fw-bold">Recent</h6>
                </div>
                {notifications
               
                .filter(notifications => !notifications.read)
                .map((notification,index)=>(
                  
                    <div className="box-body notification_row p-0" key={index}
                    onClick={()=>handleNotificationClick(notification)}
                   
                    >
                    <div className="p-3 d-flex align-items-center  border-bottom osahan-post-header" >
                        <div className="dropdown-list-image mr-3">
                            <img className="rounded-circle" src={notification?.employeeId?.employeeImage} alt="" />
                        </div>
                        <div className="font-weight-bold mr-3">
                           
                            <div className="text-truncate ">{notification.message}</div>
                            <div className="small">  {`Notification: ${notification?.employeeId?.name} has an important update. Please review the details.`}</div>
                        </div>
                        <span className="ml-auto mb-auto">
                            <div className="btn-group">
                            <button
                            type="button"
                            className="btn btn-light btn-sm rounded mx-3"
                            // Remove dropdown behavior
                            onClick={() => handleDismiss(index,notification._id)}
                        >
                            <i className="mdi mdi-close "></i>
                        </button>
                            <button
                            type="button"
                            className="btn btn-light btn-sm rounded"
                            // Remove dropdown behavior
                            onClick={() => handelUpdate(notification)}
                        >
                            <i className="mdi mdi-pencil"></i>
                        </button>
                            </div>
                            <br />
                            <div className="text-right text-muted pt-1">{new Date(notification.timestamp).toLocaleTimeString()}</div>
                        </span>
                    </div>
                    
                </div>
                ))}
                
            </div>
         
        </div>
     <div className="col-lg-5 left">
            <div className="box mb-3 shadow-sm rounded profile-box text-center">
                <div className="p-5">
                    <img src={selectedNotification?.employeeId?.employeeImage || placeholder} className="img-fluid" alt="Responsive image" />
                </div>
                <div className="p-3 border-top border-bottom">
                    <h5 className="font-weight-bold text-dark mb-1 mt-0">{selectedNotification?.employeeId?.name || "N/A"}</h5>
                    <p className="mb-0 text-muted">QID:- {selectedNotification?.employeeId?.qatarID || "N/A"}</p>
                    <p className="mb-0 text-muted">{selectedNotification?.employeeId?.nationality || "N/A"}</p>
                </div>
                <div className="p-3">
                    <div className="d-flex align-items-top mb-2">
                        <p className="mb-0 text-muted">Dep</p>
                        <p className="font-weight-bold text-dark mb-0 mt-0 ml-auto">  {selectedNotification?.employeeId?.department || "N/A"}</p>
                    </div>
                    <div className="d-flex align-items-top">
                        <p className="mb-0 text-muted">Employee Number</p>
                        <p className="font-weight-bold text-dark mb-0 mt-0 ml-auto">   {selectedNotification?.employeeId?.employeeNumber || "N/A"}</p>
                    </div>
                </div>
            </div>

            
        </div>
    </div>
</div>

             </div>
              <UpdateNewEmployee
  showDialog={showDialog}
  update={update}
  setShowDialog={setShowDialog}
  ChangeRowData ={ChangeRowData}
  handleDismiss= {handleDismiss}
   selectedNotification={selectedNotification}  
   fetchNotifications={fetchNotifications}
  />
    </div>
    )
}

export default Notification
