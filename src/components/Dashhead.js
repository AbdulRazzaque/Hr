import React from 'react';
import "./Dashhead.scss";
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import DashboardIcon from '@mui/icons-material/Dashboard';

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

  const menuItems = [
    

    { id: 1, path: '/', label: 'Dashboard', Icon: DashboardIcon },
    { id: 2, path: 'forms', label: 'Forms', Icon: NoteAddIcon },
    { id: 3, path: 'notification', label: 'Notifications', Icon: NotificationsActiveIcon },
    { id: 4, path: 'Leftemployee', label: 'Left Employee', Icon: TransferWithinAStationIcon },
    { id: 5, path: 'Leavereport', label: 'Leave report', Icon: NextWeekIcon },

  ];

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

      {/* <hr className='ml-2' />
      <div className='mx-3 my-3'>
        <h6 className='subtitle'>HR</h6>
      </div>

      {menuItems.slice(3, 6).map(item => (
        <MenuItem
          key={item.id}
          isActive={id === item.id}
          onClick={() => item.path && history.push(item.path)}
          Icon={item.Icon}
          label={item.label}
        />
      ))} */}

<div className="sticky-bottom fixed-bottom ml-1 mb-1 bt">
       <button className="btn btn-dark"  style={{ width: "14%" }} >
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
