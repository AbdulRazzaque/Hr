import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead";
import './absenceLeavereport.scss';
import MaterialTable from 'material-table';
import { useLocation } from "react-router-dom";
import config from "../auth/Config";
import axios from "axios";
import moment from "moment";

const EmployeeAbsenceLeaveReport = () => {
  const [display, setDisplay] = useState(false);
  const [data, setData] = useState([]);
  const [empInfo, setEmpInfo] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const absenceLeaveData = location?.state?.data;

  const targetEmpId =
    searchParams.get("employeeId") ||
    location?.state?.employeeId ||
    absenceLeaveData?.employeeDetails?._id ||
    absenceLeaveData?.employeeId?._id ||
    (typeof absenceLeaveData?.employeeId === "string" ? absenceLeaveData?.employeeId : null) ||
    absenceLeaveData?._id;

  const columns = [
    { field: 'id', title: 'SR NO', width: 'auto' },
    {
      field: 'image',
      title: 'Profile',
      width: 'auto',
      export: false,
      render: (rowData) => (
        <img
          src={
            rowData.employeeId?.employeeImage ||
            rowData.employeeDetails?.employeeImage ||
            empInfo?.employeeImage
          }
          style={{ width: 40, borderRadius: '50%' }}
          alt="Profile"
        />
      ),
    },
    {
      field: 'employeeName',
      title: 'Employee Name',
      width: 'auto',
      render: (rowData) =>
        rowData.employeeId?.name ||
        rowData.employeeDetails?.name ||
        empInfo?.name ||
        '',
    },
    {
      field: 'date',
      title: 'Date',
      width: 'auto',
      render: (rowData) =>
        rowData?.date || rowData?.createdAt || rowData?.leaveStartDate
          ? moment.parseZone(rowData?.date || rowData?.createdAt || rowData?.leaveStartDate).local().format('DD/MM/YYYY')
          : '',
    },
    { field: 'leaveType', title: 'Leave Type', width: 'auto' },
    {
      field: 'leaveStartDate',
      title: 'Leave Start Date',
      width: 'auto',
      render: (rowData) => {
        const type = (rowData.leaveType || '').toLowerCase();
        let startDate = rowData.leaveStartDate;
        if (type === 'absent' && rowData.AbsenceLeaveStartDate) startDate = rowData.AbsenceLeaveStartDate;
        if (type === 'maternity' && rowData.maternityLeaveStartDate) startDate = rowData.maternityLeaveStartDate;
        return startDate ? moment.parseZone(startDate).local().format('DD/MM/YYYY') : '';
      },
    },
    {
      field: 'leaveEndDate',
      title: 'Leave End Date',
      width: 'auto',
      render: (rowData) => {
        const type = (rowData.leaveType || '').toLowerCase();
        let endDate = rowData.leaveEndDate;
        if (type === 'absent' && rowData.AbsenceLeaveEndDate) endDate = rowData.AbsenceLeaveEndDate;
        if (type === 'maternity' && rowData.maternityLeaveEndDate) endDate = rowData.maternityLeaveEndDate;
        return endDate ? moment.parseZone(endDate).local().format('DD/MM/YYYY') : '';
      },
    },
    {
      field: 'numberOfDayLeave',
      title: 'Leave Days',
      width: 'auto',
      render: (rowData) => {
        const type = (rowData.leaveType || '').toLowerCase();
        if (type === 'sick' && rowData.totalSickLeaveDays !== undefined && rowData.totalSickLeaveDays !== null) {
          return rowData.totalSickLeaveDays;
        }
        if (type === 'absent' && rowData.totalAbsenceLeaveDays !== undefined && rowData.totalAbsenceLeaveDays !== null) {
          return rowData.totalAbsenceLeaveDays;
        }
        if (type === 'maternity' && rowData.totalMaternityLeaveDays !== undefined && rowData.totalMaternityLeaveDays !== null) {
          return rowData.totalMaternityLeaveDays;
        }
        return rowData.numberOfDayLeave || 0;
      },
    },
    { field: 'comment', title: 'Comment', width: 'auto' },
  ];

  const fetchData = async () => {
    if (!targetEmpId) return;
    try {
      const res = await axios.get(`${config.baseUrl}/api/getEmployeeAbsenceLeave/${targetEmpId}`);
      if (res.data?.employeeDetails) {
        setEmpInfo(res.data.employeeDetails);
      }
      const rawAbsence = res.data?.getEmployeeAbsence || [];
      const arr = rawAbsence.map((item, index) => ({
        ...item,
        id: index + 1,
      }));
      setData(arr);
    } catch (error) {
      console.log("Error fetching employee absence leave:", error);
    }
  };

  useEffect(() => {
    if (absenceLeaveData?.employeeDetails) {
      setEmpInfo(absenceLeaveData.employeeDetails);
    } else if (absenceLeaveData?.employeeId && typeof absenceLeaveData.employeeId === 'object') {
      setEmpInfo(absenceLeaveData.employeeId);
    }
    fetchData();
  }, [targetEmpId]);

  return (
    <div className="row">
      <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
        <Dashhead id={7} display={display} />
      </div>

      <div
        className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container"
        onClick={() => display && setDisplay(false)}
      >
        <span className="iconbutton display-mobile">
          <IconButton
            size="large"
            aria-label="Menu"
            onClick={() => setDisplay(true)}
          >
            <MenuIcon fontSize="inherit" />
          </IconButton>
        </span>
        <div className="container">
          <h2 className="text-center my-5">
            {`${empInfo?.name || 'Employee'} Absence Leave Report`}
          </h2>
        </div>
        <div>
          <MaterialTable
            title={empInfo?.name ? `${empInfo.name} Absence Leave Report` : 'Employee Absence Leave Report'}
            columns={columns}
            data={data}
            options={{
              paging: false,
              exportButton: true,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeAbsenceLeaveReport;
