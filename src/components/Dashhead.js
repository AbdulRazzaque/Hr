import React, { useState } from 'react';
import "./Dashhead.scss";
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import NextWeekIcon from '@mui/icons-material/NextWeek';
import LogoutIcon from '@mui/icons-material/Logout';
const MenuItem = ({ isActive, onClick, Icon, label }) => (
  <div className={isActive ? "menu-container-active" : "menu-container"} onClick={onClick}>
    <p><Icon className='mx-1' /> {label}</p>
  </div>
);

const Dashhead = (props) => {
  const { id, display, history } = props;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const menuItems = [
    

    { id: 1, path: '/Dashboard', label: 'Dashboard', Icon: DashboardIcon },
    { id: 2, path: '/Home', label: 'Employees', Icon: GroupIcon },
    { id: 3, path: 'forms', label: 'Forms', Icon: NoteAddIcon },
    { id: 4, path: 'notification', label: 'Notifications', Icon: NotificationsActiveIcon },
    { id: 5, path: 'Leftemployee', label: 'Left Employee', Icon: TransferWithinAStationIcon },
    { id: 6, path: 'Leavereport', label: 'Leave report', Icon: NextWeekIcon },

  ];

  const logout = () => {
    sessionStorage.removeItem('accessToken');
    setIsAuthenticated(false);
    history.push('/');
  };

  return (
    <div className={display ? "shadow-lg dashhead" : 'dashhead displayhidden min-vh-100'} id="sidebar-wrapper">
      <div className="heading py-4">
        <h2>THARB</h2>
      </div>
      {/* <div className='mx-3 my-3'>
        <h6 className='subtitle'>DASHBOARD</h6>
      </div> */}

      {menuItems.map(item => (
        <MenuItem
          key={item.id}
          isActive={id === item.id}
          onClick={() => item.path && history.push(item.path)}
          Icon={item.Icon}
          label={item.label}
        />
      ))}



<div className="sticky-bottom fixed-bottom ml-1 mb-1 bt">
       <button className="btn btn-dark"  style={{ width: "14%" }}  onClick={logout}>
            Logout <LogoutIcon className="mx-3"  />
          </button>
        </div>
    </div>
    
  );
};

const mapStateToProps = ({ EventUser }) => ({
  user: EventUser
});

export default connect(mapStateToProps)(withRouter(Dashhead));
