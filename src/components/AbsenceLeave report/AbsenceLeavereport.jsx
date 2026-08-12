
import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead";
import './absenceLeavereport.scss';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Avatar, Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import config from "../auth/Config";
import axios from 'axios';
import dayjs from "dayjs";

const AbsenceLeavereport = () => {
  const currentYearVal = new Date().getFullYear();
  const [display, setDisplay] = useState(false);
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(currentYearVal);
  const [startDate, setStartDate] = useState(dayjs(`${currentYearVal}-01-01`));
  const [endDate, setEndDate] = useState(dayjs(`${currentYearVal}-12-31`));

  const yearOptions = [
    currentYearVal - 2,
    currentYearVal - 1,
    currentYearVal,
    currentYearVal + 1,
    currentYearVal + 2,
  ];

  const columns = [
    { field: 'id', headerName: 'SR NO', width: 80 },
    {
      field: 'image',
      headerName: 'Profile',
      width: 90,
      renderCell: (params) => (
        <Avatar
          alt="Employee"
          src={
            params?.row?.employeeDetails?.employeeImage ||
            params?.row?.employeeId?.employeeImage ||
            params?.row?.employeeImage
          }
        />
      ),
    },
    {
      field: 'EmployeeName',
      headerName: 'Employee Name',
      width: 220,
      valueGetter: (params) =>
        params?.row?.employeeDetails?.name ||
        params?.row?.employeeId?.name ||
        params?.row?.employeeName ||
        '',
    },
    {
      field: 'annualLeave',
      headerName: 'Annual Leave',
      width: 140,
      valueGetter: (params) => params?.row?.annualLeave ?? 0,
    },
    {
      field: 'sickLeave',
      headerName: 'Sick Leave',
      width: 130,
      valueGetter: (params) => params?.row?.sickLeave ?? 0,
    },
    {
      field: 'casualLeave',
      headerName: 'Casual Leave',
      width: 140,
      valueGetter: (params) => params?.row?.casualLeave ?? 0,
    },
    {
      field: 'absent',
      headerName: 'Absent',
      width: 120,
      valueGetter: (params) => params?.row?.absent ?? 0,
    },
    {
      field: 'maternityLeave',
      headerName: 'Maternity Leave',
      width: 150,
      valueGetter: (params) => params?.row?.maternityLeave ?? 0,
    },
    {
      field: 'businessLeave',
      headerName: 'Business Leave',
      width: 140,
      valueGetter: (params) => params?.row?.businessLeave ?? 0,
    },
    {
      field: 'emergencyLeave',
      headerName: 'Emergency Leave',
      width: 150,
      valueGetter: (params) => params?.row?.emergencyLeave ?? 0,
    },
    {
      field: 'totalLeaveDays',
      headerName: 'Total',
      width: 120,
      valueGetter: (params) =>
        params?.row?.totalLeaveDays ??
        ((params?.row?.annualLeave || 0) +
          (params?.row?.sickLeave || 0) +
          (params?.row?.casualLeave || 0) +
          (params?.row?.absent || 0) +
          (params?.row?.maternityLeave || 0) +
          (params?.row?.businessLeave || 0) +
          (params?.row?.emergencyLeave || 0)),
    },
  ];

  const processSummaryData = (rawList) => {
    if (!Array.isArray(rawList)) return [];

    const empMap = {};

    rawList.forEach((item) => {
      const empDetails = item.employeeDetails || item.employeeId || {};
      const empId = empDetails._id || item.employeeId?._id || item._id;
      if (!empId) return;

      if (!empMap[empId]) {
        empMap[empId] = {
          _id: empId,
          employeeId: empDetails,
          employeeDetails: empDetails,
          annualLeave: 0,
          sickLeave: 0,
          casualLeave: 0,
          absent: 0,
          maternityLeave: 0,
          businessLeave: 0,
          emergencyLeave: 0,
          totalLeaveDays: 0,
        };
      }

      if (
        item.annualLeave !== undefined ||
        item.sickLeave !== undefined ||
        item.casualLeave !== undefined ||
        item.absent !== undefined ||
        item.maternityLeave !== undefined ||
        item.businessLeave !== undefined ||
        item.emergencyLeave !== undefined
      ) {
        empMap[empId].annualLeave += item.annualLeave || 0;
        empMap[empId].sickLeave += item.sickLeave || 0;
        empMap[empId].casualLeave += item.casualLeave || 0;
        empMap[empId].absent += item.absent || 0;
        empMap[empId].maternityLeave += item.maternityLeave || 0;
        empMap[empId].businessLeave += item.businessLeave || 0;
        empMap[empId].emergencyLeave += item.emergencyLeave || 0;
      } else if (item.leaveType) {
        const type = item.leaveType.toString().trim().toLowerCase();
        let days = 0;
        if (type === 'sick') {
          days = item.totalSickLeaveDays || 0;
          empMap[empId].sickLeave += days;
        } else if (type === 'absent') {
          days = item.totalAbsenceLeaveDays || 0;
          empMap[empId].absent += days;
        } else if (type === 'maternity') {
          days = item.totalMaternityLeaveDays || 0;
          empMap[empId].maternityLeave += days;
        } else if (type.includes('annual')) {
          days = item.numberOfDayLeave || 0;
          empMap[empId].annualLeave += days;
        } else if (type.includes('casual')) {
          days = item.numberOfDayLeave || 0;
          empMap[empId].casualLeave += days;
        } else if (type.includes('business')) {
          days = item.numberOfDayLeave || 0;
          empMap[empId].businessLeave += days;
        } else if (type.includes('emergency')) {
          days = item.numberOfDayLeave || 0;
          empMap[empId].emergencyLeave += days;
        }
      }
    });

    return Object.values(empMap).map((emp, index) => ({
      ...emp,
      id: index + 1,
      totalLeaveDays:
        emp.annualLeave +
        emp.sickLeave +
        emp.casualLeave +
        emp.absent +
        emp.maternityLeave +
        emp.businessLeave +
        emp.emergencyLeave,
    }));
  };

  const fetchDataForDates = async (sDate, eDate) => {
    try {
      const formattedStartDate = dayjs(sDate).format('YYYY-MM-DD');
      const formattedEndDate = dayjs(eDate).format('YYYY-MM-DD');
      const response = await axios.get(
        `${config.baseUrl}/api/getSickLeaveByDate?startDate=${formattedStartDate}&endDate=${formattedEndDate}`
      );
      const list = response.data?.data || response.data?.lastAbsenceLeave || [];
      setData(processSummaryData(list));
    } catch (error) {
      console.log('Error fetching leave summary by date:', error);
    }
  };

  const handleYearChange = (event) => {
    const yr = event.target.value;
    setSelectedYear(yr);
    const newStart = dayjs(`${yr}-01-01`);
    const newEnd = dayjs(`${yr}-12-31`);
    setStartDate(newStart);
    setEndDate(newEnd);
    fetchDataForDates(newStart, newEnd);
  };

  const getLatestAbsenceLeave = async () => {
    fetchDataForDates(startDate, endDate);
  };

  const getAbsenceLeaveByDate = async () => {
    if (!startDate || !endDate) {
      console.log('Start Date and End Date are required!');
      return;
    }
    const sYear = dayjs(startDate).year();
    const eYear = dayjs(endDate).year();
    if (sYear === eYear) {
      setSelectedYear(sYear);
    }
    fetchDataForDates(startDate, endDate);
  };

  const handleClear = () => {
    const defaultYr = new Date().getFullYear();
    setSelectedYear(defaultYr);
    const defaultStart = dayjs(`${defaultYr}-01-01`);
    const defaultEnd = dayjs(`${defaultYr}-12-31`);
    setStartDate(defaultStart);
    setEndDate(defaultEnd);
    fetchDataForDates(defaultStart, defaultEnd);
  };

  useEffect(() => {
    getLatestAbsenceLeave();
  }, []);

  const history = useHistory();
  const handleRowClick = (params) => {
    const empId =
      params?.row?.employeeDetails?._id ||
      params?.row?.employeeId?._id ||
      params?.row?._id;
    if (empId) {
      history.push(`/EmployeeAbsenceLeaveReport?employeeId=${empId}`, {
        employeeId: empId,
        data: params.row,
      });
    }
  };

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
          <h1 className="title text-center my-3">Absence Leave Summary Report</h1>

          {/* Filter Controls: Year Dropdown, From, To */}
          <div className="row my-4 align-items-center">
            <div className="col-auto ml-3">
              <FormControl sx={{ minWidth: 160 }}>
                <InputLabel id="year-select-label">Year</InputLabel>
                <Select
                  labelId="year-select-label"
                  id="year-select"
                  value={selectedYear}
                  label="Year"
                  onChange={handleYearChange}
                >
                  {yearOptions.map((yr) => (
                    <MenuItem key={yr} value={yr}>
                      {yr}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="col-auto">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: 250 }}
                  label="From"
                  value={startDate}
                  format="DD/MM/YYYY"
                  views={["year", "month", "day"]}
                  onChange={(newValue) => {
                    setStartDate(newValue);
                    if (newValue && dayjs(newValue).isValid()) {
                      setSelectedYear(dayjs(newValue).year());
                    }
                  }}
                  renderInput={(params) => <TextField name="startDate" {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div className="col-auto">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: 250 }}
                  label="To"
                  value={endDate}
                  format="DD/MM/YYYY"
                  views={["year", "month", "day"]}
                  onChange={(newValue) => setEndDate(newValue)}
                  renderInput={(params) => <TextField name="endDate" {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div className="col-auto mt-2">
              <button
                type="button"
                className="rounded btn btn-dark mr-2"
                onClick={getAbsenceLeaveByDate}
              >
                Submit
              </button>
              <button
                type="button"
                className="rounded btn btn-primary"
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        <Box sx={{ height: 750, width: '100%' }}>
          <div className="datagrid-container">
            <DataGrid
              allowFiltering={true}
              rows={data}
              columns={columns}
              autoHeight
              pageSizeOptions={[10, 25, 50]}
              onRowClick={handleRowClick}
            />
          </div>
        </Box>
      </div>
    </div>
  );
};

export default AbsenceLeavereport;
