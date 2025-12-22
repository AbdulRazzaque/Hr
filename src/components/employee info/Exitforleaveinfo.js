import React, { useEffect, useState } from "react";
import "../forms/forms.scss";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead";
import BackIcon from "../header/BackIcon";
import { useSelector } from "react-redux";
import BusinessIcon from "@mui/icons-material/Business";
import config from "../auth/Config";
import axios from "axios";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateExitforleave from "../updateEmployee/UpdateExitforleave";
import DeleteExitforleave from "../deleteEmployee/DeleteExitforleave";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import placeholderEmployee from '../../images/placeholderEmployee.jpg';

const Exitforleaveinfo = () => {
  const employeeData = useSelector((state) => state?.socket?.messages);

  const [display, setDisplay] = useState(false);
  const [update, setUpdate] = useState({});
  const [alert, setAlert] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [data, setData] = useState([]);

  const getEmployeeByIdExitLeave = async () => {
    if (!employeeData || !employeeData._id) return;
    try {
      const res = await axios.get(
        `${config.baseUrl}/api/getEmployeeByIdExitLeave/${employeeData._id}`
      );
      setData(res.data.allExitOfLeave || []);
    } catch (error) {
      console.log("Unexpected error:", error);
    }
  };

  const updateRowData = (row) => {
    setUpdate(row);
    setShowDialog(true);
  };

  const deleteRowData = (row) => {
    setUpdate(row);
    setAlert(true);
  };

  const ChangeRowData = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getEmployeeByIdExitLeave();
  }, []);

  // ✅ Columns for DataGrid
  const columns = [
    { field: "id", headerName: "#", width: 70 },
    {
      field: "date",
      headerName: "Date",
      width: 120,
      valueFormatter: (params) =>
        moment.parseZone(params.value).local().format("DD-MM-YYYY"),
    },
    { field: "leaveType", headerName: "Leave Type", width: 130 },
    {
      field: "leaveStartDate",
      headerName: "Start Date",
      width: 130,
      valueFormatter: (params) =>
        moment.parseZone(params.value).local().format("DD-MM-YYYY"),
    },
    {
      field: "leaveEndDate",
      headerName: "End Date",
      width: 130,
      valueFormatter: (params) =>
        moment.parseZone(params.value).local().format("DD-MM-YYYY"),
    },
    { field: "numberOfDayLeave", headerName: "Days", width: 90 },
    {
      field: "lastLeaveStartDate",
      headerName: "Last Start Date",
      width: 130,
      valueFormatter: (params) =>
       params.value? moment.parseZone(params.value).local().format("DD-MM-YYYY"):"",
    },
    {
      field: "lastLeaveEndDate",
      headerName: "Last End Date",
      width: 130,
      valueFormatter: (params) =>
       params.value? moment.parseZone(params.value).local().format("DD-MM-YYYY"):"",
    },
   { field: "lastLeaveType", headerName: " Last Leave Type", width: 130 },

    {
      field: "edit",
      headerName: "Action",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <>
          <EditIcon
            className="mr-2 cursor-pointer"
            color="primary"
            onClick={() => updateRowData(params.row.raw)}
          />
         
        </>
      ),
    },
    {
      field: "actions",
      headerName: "Action",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <>
          <DeleteIcon
            className="cursor-pointer"
            color="error"
            onClick={() => deleteRowData(params.row.raw)}
          />
         
        </>
      ),
    },
  ];

  // ✅ Rows mapping
  const rows = data.map((item, index) => ({
    id: index + 1,
    ...item,
    raw: item, // keep full object for edit/delete
  }));

  return (
    <div className="row">
      <div className="col-md-2">
        <Dashhead id={1} display={display} />
      </div>

      <div
        className="col-md-10 dashboard-container"
        onClick={() => display && setDisplay(false)}
      >
        <span className="iconbutton display-mobile">
          <IconButton size="large" onClick={() => setDisplay(true)}>
            <MenuIcon fontSize="inherit" />
          </IconButton>
        </span>

        <BackIcon />
        <h1 className="text-center">Exit For Leave Info</h1>

        {data && data.length > 0 ? (
          <>
            {/* Employee Header */}
            <div className="row bg-white mx-2">
              <div className="col-md-9 offset-md-1">
                <div className="text-center profile">
                  <img
                    src={
                      data[0]?.employeeId?.employeeImage || placeholderEmployee
                    }
                    className="profileimage"
                    alt=""
                  />
                  <h1>{data[0]?.employeeId?.name}</h1>
                  <h6 className="profilenumber">
                    Mobile: {data[0]?.employeeId?.mobileNumber || "N/A"}
                    <span className="ml-2 profileid">
                      Emp No:{" "}
                      {data[0]?.employeeId?.employeeNumber || "N/A"}
                    </span>
                  </h6>
                  <div className="profilecategory text-light">
                    <BusinessIcon className="icon" />
                    <span className="mx-1 text-light">|</span>
                    {data[0]?.employeeId?.position}
                  </div>
                </div>
              </div>
            </div>

            {/* ✅ DataGrid */}
            <Box sx={{ height: 550, width: "100%", mt: 3 }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10, 25, 50]}
                disableRowSelectionOnClick
                autoHeight
              />
            </Box>
          </>
        ) : (
          <div className="no_data">
            <div className="no_data_icon">🚫</div>
            <div className="no_data_text">No Data Available</div>
          </div>
        )}

        <UpdateExitforleave
          showDialog={showDialog}
          update={update}
          setShowDialog={setShowDialog}
          ChangeRowData={ChangeRowData}
          getEmployeeByIdExitLeave={getEmployeeByIdExitLeave}
        />

        <DeleteExitforleave
          alert={alert}
          update={update}
          setAlert={setAlert}
          getEmployeeByIdExitLeave={getEmployeeByIdExitLeave}
        />
      </div>
    </div>
  );
};

export default Exitforleaveinfo;
