import React, { Fragment, useEffect, useState } from 'react'
// import "./Home.scss";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from '../Dashhead';
import { DataGrid } from '@mui/x-data-grid';
// import placeholderEmployee from '../images/placeholderEmployee.jpg'
import placeholderEmployee from '../../images/placeholderEmployee.jpg'
import 'react-toastify/dist/ReactToastify.css';
import config from '../auth/Config';
import axios from 'axios';
import moment from 'moment';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Autocomplete, Badge, Box, Button, Checkbox, Chip, Stack, TextField, Typography } from '@mui/material';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import {  Menu, MenuItem } from "@mui/material";
import dayjs from "dayjs";
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import { useHistory } from 'react-router-dom';
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver';
const ExportEmployee = () => {
  const [display, setDisplay] = React.useState(false);
  const [data, setData] = React.useState([])
    const [anchorEl, setAnchorEl] = useState(null);
 const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const history = useHistory()
  // ============================================================================================================================================


  const getAllEmployeeData =()=>{
  axios.get(`${config.baseUrl}/api/allEmployee`)
  .then(res=>{
   
    let arr = res.data.employees.map((item,index)=>{
      return {...item,id:index+1}
    })
    setData(arr)
  }).catch(err=>console.log(err))
}

  // =========================================Ues Effect===============================================================================================

  useEffect(() => {
    getAllEmployeeData()
  }, [])



// console.log(data,'data')

  const formatDate = (isoString) => isoString ? moment.parseZone(isoString).local().format("DD/MM/YYYY") : null
  const columns = [
    { field: 'id', headerName: 'SR NO', width: 80 },

    {
      field: 'employeeImage',
      headerName: 'Profile',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <img
          src={params.row.employeeImage || placeholderEmployee}
          style={{ width: 40, height: 40, borderRadius: '50%' }}
          alt="Profile"
        />
      ),
    },

    { field: 'name', headerName: 'Employee Name', width: 180 },
    { field: 'arabicName', headerName: 'Arabic Name', width: 180 },
    { field: 'nationality', headerName: 'Nationality', width: 150 },
    //   { field: 'employeeNumber', headerName: 'Employee Number', width: 160 },
    { field: 'department', headerName: 'Department', width: 150 },

    {
      field: 'dateOfJoining',
      headerName: 'Joining Date',
      width: 150,
      valueGetter: (params) => formatDate(params.row.dateOfJoining),
    },
  ];

 


const uniqueDepartment = [...new Set(data.map((item)=>item.department.toLowerCase()))]
const uniqueNationality = [...new Set(data.map((item)=>item.nationality.toLowerCase()))]
const uniqueJoiningYears = [...new Set(data.filter((emp) => emp.dateOfJoining).map((emp) => dayjs(emp.dateOfJoining).year())),].sort((a, b) => b - a); // optional: sort descending
const [filters, setFilters] = useState({
  name: "",
  department: "",
  nationality: "",
  dateOfJoining: undefined,
  joiningYear: [],
  filterType: "all",
});

  const [filteredEmployees, setFilteredEmployees] = useState([])
  const [activeFilters, setActiveFilters] = useState([])

    // Apply filters based on current filter state
  useEffect(() => {
     let filtered = data.filter(emp => emp._id);

    // Name filter
    if (filters.filterType === "name" || filters.filterType === "all") {
      if (filters.name) {
        filtered = filtered.filter((emp) =>
          emp.name.toLowerCase().includes(filters.name.toLowerCase())
        );
      }
    }

  
   if (filters.filterType === "department" || filters.filterType === "all") {
    if (filters.department && filters.department.length > 0) {
      filtered = filtered.filter((emp) =>
        filters.department.includes(emp.department.toLowerCase())
      );
    }
  }
   if (filters.filterType === "nationality" || filters.filterType === "all") {
    if (filters.nationality && filters.nationality.length > 0) {
      filtered = filtered.filter((emp) =>
        filters.nationality.includes(emp.nationality.toLowerCase())
      );
    }
  }
  

if (
  filters.joiningYear.length > 0 &&
  (filters.filterType === "joiningYear" || filters.filterType === "all")
) {
  filtered = filtered.filter((emp) => {
    const year = dayjs(emp.dateOfJoining).year();
    return filters.joiningYear.includes(year);
  });
}


    setFilteredEmployees(filtered);

    console.log(filteredEmployees,'filteredEmployees')
    // Update active filters for display
    const active = [];
    if (filters.name) active.push(`Name: ${filters.name}`);
    if (filters.department)
      active.push(`Department: ${filters.department}`);
    if (filters.nationality)
      active.push(`nationality: ${filters.nationality}`);

if (filters.joiningYear.length > 0)
  active.push(`Joining Year: ${filters.joiningYear.join(", ")}`);

    setActiveFilters(active);
  }, [filters, data]);

  // Clear single filter
  const clearFilter = (filterKey) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: filterKey === "dateOfJoining" ? undefined : "",
    }));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      name: "",
      department: "",
      nationality: "",
      dateOfJoining: undefined,
      joiningYear: [], // <-- ADD THIS
      filterType: "all",
    });
  };

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExportPDF =()=>{
    history.push("/ExportPdf",{data:filteredEmployees})
  }

 const handleExportExcel =(evt,selectedRows)=>{


  const filterData =  filteredEmployees.map(item => ({
    "Employee Name": item.name,
    "Arabic Name": item.arabicName,
    "Nationality": item.nationality,
    // "Employee Number": item.employeeNumber,
    "Department": item.department,
    "Date Of Joining":item.dateOfJoining? moment.parseZone(item.dateOfJoining).local().format("DD/MM/YYYY"):null,         // always format
    // "Probation Date":item.probationDate? moment.parseZone(item.probationDate).local().format("DD/MM/YYYY"):null,           // always format
    // "Qatar ID": item.qatarID,
    // "Qatar ID Expiry":item.qatarIdExpiry?moment.parseZone(item.qatarIdExpiry).local().format("DD/MM/YYYY"):null,          // always format
    // "Passport Number": item.passportNumber,
    // "Passport Date Of Expiry":item.passportDateOfExpiry? moment.parseZone(item.passportDateOfExpiry).local().format("DD/MM/YYYY"):null,  // always format
    // "Status": item.status,
  }));

  // export filteredData as excel here ...


  const worksheet = XLSX.utils.json_to_sheet(filterData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  const excelBuffer = XLSX.write(workbook, {
     bookType: 'xlsx',
      type: 'array' 
    });
  saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), 'Employees.xlsx');

  }

  return (
    <div className="row">
      <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
        <Dashhead id={10} display={display} />
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
        <h1 className="title text-center">
          Export Employee

        </h1>

        <div className="container my-4">
        

          <div className="row my-4">


            <div className="col-auto">
              <Typography variant="subtitle1" gutterBottom>
              Filter by Department
              </Typography>
             <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={uniqueDepartment}
      sx={{ width: 300 }}
      disabled={filters.filterType !== "all" && filters.filterType !== "department"}
      disableCloseOnSelect
      getOptionLabel={(option) => option}
      
                value={filters.department || []}
                 onChange={(e, value) =>
    setFilters((prev) => ({ ...prev, department: value }))
  }
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={option._id}{...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option}
          </li>
        );
      }}
      // style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Department" placeholder="Select" />
      )}
    />
            </div>
            <div className="col-auto">
              <Typography variant="subtitle1" gutterBottom>
              Filter by Nationality
              </Typography>
             <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={uniqueNationality}
      sx={{ width: 300 }}
      disabled={filters.filterType !== "all" && filters.filterType !== "nationality"}
      disableCloseOnSelect
      getOptionLabel={(option) => option}
      
                value={filters.nationality || []}
                 onChange={(e, value) =>
    setFilters((prev) => ({ ...prev, nationality: value }))
  }
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={option._id}{...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option}
          </li>
        );
      }}
      // style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Nationality" placeholder="Select" />
      )}
    />
     
            </div>
         

            <div className="col-auto">
<Typography variant="subtitle1" gutterBottom>
  Filter by Joining Year
</Typography>

<Autocomplete
  multiple
  id="joining-year-multi"
  options={uniqueJoiningYears}
  sx={{ width: 300 }}
  disableCloseOnSelect
  getOptionLabel={(option) => option.toString()}
  value={filters.joiningYear || []}
  onChange={(e, value) =>
    setFilters((prev) => ({ ...prev, joiningYear: value }))
  }
  renderOption={(props, option, { selected }) => (
    <li {...props}>
      <Checkbox
        icon={icon}
        checkedIcon={checkedIcon}
        style={{ marginRight: 8 }}
        checked={selected}
      />
      {option}
    </li>
  )}
  renderInput={(params) => (
    <TextField {...params} label="Joining Year" placeholder="Select year(s)" />
  )}
  disabled={
    filters.filterType !== "all" && filters.filterType !== "joiningYear"
  }
/>

            </div>

   <div className='col-auto mt-5'>
       <Button
        variant="outlined"
        startIcon={<FileDownloadOutlinedIcon />}
        onClick={handleClick}
      >
        Export
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleExportPDF();
            handleClose();
          }}
        >
        <PictureAsPdfOutlinedIcon className='mx-1'/>  Export to PDF
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleExportExcel();
            handleClose();
          }}
        >
         <TextSnippetOutlinedIcon className='mx-1'/> Export to Excel
        </MenuItem>
      </Menu>
    
    </div>
          </div>
        </div>

  <div className="my-4">
  {activeFilters.length > 0 && (
    <div className="space-y-2">
      <Typography variant="subtitle1" className="font-semibold text-gray-700">
        Active Filters
      </Typography>
      <Stack direction="row" flexWrap="wrap" spacing={1}>
        {activeFilters.map((filter, index) => (
          <Chip
            key={index}
            label={filter}
            onDelete={() => {
              if (filter.startsWith("Name:")) clearFilter("name");
              else if (filter.startsWith("Department:")) clearFilter("department");
              else if (filter.startsWith("nationality:")) clearFilter("nationality");
              else if (filter.startsWith("Joining Year:")) clearFilter("joiningYear");
            }}
            color="primary"
            variant="outlined"
            sx={{
              cursor: "pointer",
              fontSize: "0.8rem",
              height: "32px"
            }}
          />
        ))}

        <Button
          variant="contained"
          size="small"
          onClick={clearAllFilters}
          className="ml-2"
        >
          Clear All
        </Button>
      </Stack>
    </div>
  )}
</div>


    <Box sx={{ height: '100%', width: '100%'  ,overflowY: 'auto'}} className="my-5">
  <DataGrid 
    rows={filteredEmployees.length > 0 ? filteredEmployees : data}
    // rows={data}
    columns={columns}
    getRowId={(row) => row._id}
     pageSizeOptions={[data.length]} // Allow showing all rows
    initialState={{
      pagination: {
        paginationModel: { pageSize: data.length, page: 0 }, // Show all
      },
    }}
    // hideFooter
  />
</Box>


      </div>

    </div>
  )
}

export default ExportEmployee