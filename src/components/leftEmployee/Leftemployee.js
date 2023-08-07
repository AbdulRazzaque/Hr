import React from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead"; 
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import {columns, EmplyeeData } from "../EmplyeeData";
function Leftemployee() {
  const [display, setDisplay] = React.useState(false);

  return (
    <div className="row">
      <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
        <Dashhead id={4} display={display} />
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
        <div className='container'>
                {/* <Autocomplete
     className="my-4"
        options={EmplyeeData}
        id="flat-demo"
        getOptionLabel={(row) => row.EmployeeName && row.Nationality ? `${row.EmployeeName} (${row.Nationality})` : ""}
        // getOptionLabel={(rows)=>rows.EmployeeName && rows.Nationality || ""}
        renderInput={(params) => (
          <TextField {...params} label="Search By Name" variant="standard" />
        )}
      /> */}
                </div>
     <Box sx={{ height: 900, width: '100%' }}>
      <DataGrid
      allowFiltering={true}
        rows={EmplyeeData}
        columns={columns}
        autoHeight
     
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        // getRowClassName={getRowClassName}
        // onRowClick={handleRowClick}

      />
      <style>
        {`
          .bold-row {
            font-weight: bold;
          }
        `}
      </style>
    </Box>
     
      </div>
    </div>
  );
}

export default Leftemployee;
