import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead";
import {
  Autocomplete,
  Box,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import "./lefemployeeStyel.scss";
import { Avatar } from "@mui/material";
import { Fragment } from "react";
import { Button } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import config from "../auth/Config";
import axios from "axios";
import moment from "moment";
import dayjs from "dayjs";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { Menu, MenuItem } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ReplayIcon from "@mui/icons-material/Replay"; // icon for rejoin
import RejoinEmployee from "../RejoinEmployee/RejoinEmployee";

function Leftemployee(props) {
  const [display, setDisplay] = React.useState(false);
  const [alert, setAlert] = useState(false);
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [filters, setFilters] = useState({
    dateOfJoining: undefined,
    joiningYear: [],
    filterType: "all",
  });
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const history = useHistory();
  const Leftemployeecolumns = (history) => [
    { field: "id", headerName: "SR NO", width: 50 },
    {
      field: "image",
      headerName: "Profile",
      width: 70,
      renderCell: (params) => (
        <Avatar alt="Remy Sharp" src={params.row.employeeId?.employeeImage} />
      ),
    },

    {
      field: "EmployeeName",
      headerName: "Employee Name",
      width: 200,
      renderCell: (params) => params.row.employeeId?.name,
    },
    {
      field: "Position",
      headerName: "Position",
      width: 120,
      renderCell: (params) => params.row.employeeId?.position,
    },
    {
      field: "Date",
      headerName: "Date",
      width: 120,
      renderCell: (params) =>
        params.row.date
          ? moment.parseZone(params.row.date).local().format("DD/MM/YYYY")
          : null,
    },
    ,
    {
      field: "JoiningDate",
      headerName: "JoiningDate",
      width: 120,
      renderCell: (params) =>
        params.row?.employeeId?.dateOfJoining
          ? moment
              .parseZone(params.row?.employeeId?.dateOfJoining)
              .local()
              .format("DD/MM/YYYY")
          : null,
    },

    {
      field: "Resume Date",
      headerName: "Resume Date",
      width: 120,
      renderCell: (params) =>
        params?.row?.resumingofLastVacation
          ? moment
              .parseZone(params?.row?.resumingofLastVacation)
              .local()
              .format("DD/MM/YYYY")
          : null,
    },
    {
      field: "LastworkingDate",
      headerName: "Last working Date",
      width: 120,
      renderCell: (params) =>
        params.row?.lastWorkingDate
          ? moment
              .parseZone(params.row?.lastWorkingDate)
              .local()
              .format("DD/MM/YYYY")
          : null,
    },
    { field: "exitType", headerName: "Exit Type", width: 100 },
    { field: "subject", headerName: "Subject", width: 200 },
    // {field:'other',headerName:'Other',width:90},
    {
      title: "Action",
      field: "Action",
      width: 100,
      renderCell: (params) => (
        <Button
          onClick={() =>
            history.push("Endofservicesinfo", { data: params.row })
          }
        >
          <EditIcon />
        </Button>
      ),
    },
    // {
    //   title: "Delete",
    //   field: "Delete",
    //   width: 100,
    //   renderCell: () => (
    //     <Fragment>
    //       <Button color="error" onClick={() => setAlert(true)}>
    //         <DeleteIcon />
    //       </Button>
    //     </Fragment>
    //   ),
    // },
    {
      title: "Re Join",
      field: "rejoin",
      width: 100,
      renderCell: (params) => (
        <Fragment>
          <Button
            variant="contained"
            color="success"
            size="small"
            startIcon={<ReplayIcon />} // icon before text
            onClick={() => handleRejoin(params)}
            // disabled={params.row.status === "Active"}
            sx={{
              borderRadius: "20px", // rounded button
              textTransform: "none", // keep normal text
              fontWeight: "bold",
              boxShadow: 3, // little shadow
              "&:hover": {
                backgroundColor: "#2e7d32", // darker green on hover
              },
            }}
          >
            Rejoin
          </Button>
        </Fragment>
      ),
    },
  ];

    const handleRejoin = (params) => {
    console.log("Rejoin clicked for:", params.row.employeeId);
    setSelectedEmployee(params.row.employeeId._id)
    console.log(params.row.employeeId._id)
    console.log(params.row.employeeId)
    setAlert(true);
  };

  const allEndofservice = () => {
    axios
      .get(`${config.baseUrl}/api/allEndofservice`)
      .then((res) => {
        let arr = res.data.allEndofservice.map((item, index) => {
          return { ...item, id: index + 1 };
        });
        setData(arr);
      })
      .catch((err) => console.log(err));
  };

  const deleteRow = async (update) => {
    console.log(update, "update");

    try {
      axios
        .delete(`${config.baseUrl}/api/deleteEndofservice/${update._id}`, {
          headers: { Authorization: `Bearer ${config.accessToken}` },
        })
        .then((response) => {
          console.log(response);

          allEndofservice();
        })
        .catch((error) => console.log(error));
      setAlert(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    allEndofservice();
  }, []);

  const uniqueJoiningYears = [
    ...new Set(
      data
        .filter((emp) => emp.lastWorkingDate)
        .map((emp) => dayjs(emp.lastWorkingDate).year())
    ),
  ].sort((a, b) => b - a); // optional: sort descending

  console.log(data, "data");
  const columns = Leftemployeecolumns(history);

  useEffect(() => {
    let filtered = data.filter((emp) => emp._id);

    if (
      filters.joiningYear.length > 0 &&
      (filters.filterType === "joiningYear" || filters.filterType === "all")
    ) {
      filtered = filtered.filter((emp) => {
        const year = dayjs(emp.lastWorkingDate).year();
        console.log(year);
        return filters.joiningYear.includes(year);
      });
    }

    setFilteredEmployees(filtered);
  }, [filters, data]);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExportPDF = () => {
    history.push("/LeftEmployeePdf", { data: filteredEmployees });
  };

  const handleExportExcel = (evt, selectedRows) => {
    const filterData = filteredEmployees.map((item) => ({
      "Employee Name": item.employeeId.name,
      "Arabic Name": item.employeeId.arabicName,
      Nationality: item.employeeId.nationality,
      // "Employee Number": item.employeeNumber,
      Department: item.employeeId.department,
      "Date Of Joining": item.employeeId.dateOfJoining
        ? moment
            .parseZone(item.employeeId.dateOfJoining)
            .local()
            .format("DD/MM/YYYY")
        : null, // always format
      "Resume Date": item.resumingofLastVacation
        ? moment
            .parseZone(item.resumingofLastVacation)
            .local()
            .format("DD/MM/YYYY")
        : null, // always format
      "Last Working Date": item.lastWorkingDate
        ? moment.parseZone(item.lastWorkingDate).local().format("DD/MM/YYYY")
        : null, // always format
      "Exit Type": item.exitType,
      Subject: item.subject,

    }));

    // export filteredData as excel here ...

    const worksheet = XLSX.utils.json_to_sheet(filterData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    saveAs(
      new Blob([excelBuffer], { type: "application/octet-stream" }),
      "Employees.xlsx"
    );
  };

  return (
    <div className="row">
      {alert && (
        <Dialog open={alert} style={{ height: 600 }}>
          <DialogTitle>Delete Row</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are You sure You want to delete this.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={() => deleteRow(update)}>
              Yes
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                setAlert(false);
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
        <Dashhead id={5} displa y={display} />
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

        <h1 className="title text-center">Left Employee Information</h1>
        <div className="container  my-4">
          <div className="row">
            <div className="col-8">
              <Autocomplete
                multiple
                id="joining-year-multi"
                options={uniqueJoiningYears}
                // sx={{ width: 300 }}
                fullWidth
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
                  <TextField
                    {...params}
                    label="Search By Years"
                    placeholder="Select year(s)"
                  />
                )}
                disabled={
                  filters.filterType !== "all" &&
                  filters.filterType !== "joiningYear"
                }
              />
            </div>

            <div className="col-auto mt-2">
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
                  <PictureAsPdfOutlinedIcon className="mx-1" /> Export to PDF
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleExportExcel();
                    handleClose();
                  }}
                >
                  <TextSnippetOutlinedIcon className="mx-1" /> Export to Excel
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>

        <Box sx={{ height: 900, width: "100%" }}>
          <div className="datagrid-container">
            <DataGrid
              allowFiltering={true}
              // rows={filteredEmployees.length > 0 ? filteredEmployees: selectedEmployee ?[selectedEmployee]:data}
              rows={filteredEmployees.length > 0 ? filteredEmployees : data}
              columns={columns}
              autoHeight
              pageSizeOptions={[10]}
              onRowClick={(params) => setUpdate(params.row)}
            />
          </div>
        </Box>
      </div>
      <RejoinEmployee
      selectedEmployee={selectedEmployee}
      alert={alert}
      setAlert={setAlert}
      allEndofservice={allEndofservice}
      />
    </div>
  );
}

export default Leftemployee;
