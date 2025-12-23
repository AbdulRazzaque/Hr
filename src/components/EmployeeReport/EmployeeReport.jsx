
import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead"; 
import axios from "axios";
import { Card, CardContent, Typography, Grid, Box, Avatar, Chip, Skeleton, Autocomplete, Stack, TextField, MenuItem, FormControl, InputLabel, Select } from "@mui/material"
import { styled } from "@mui/material/styles"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import config from "../auth/Config";
function EmployeeReport() {
  const [display, setDisplay] = React.useState(false);
  const [loading, setLoading] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const history = useHistory()
// Styled components for custom effects
const StyledCard = styled(Card)(({ theme }) => ({
    height: "90%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "20px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "translateY(-10px)",
      boxShadow: "0 22px 45px 0 rgba(0, 0, 0, 0.1)",
    },
  }))
  
  const CardHeader = styled(Box)({
    position: "relative",
    height: "160px",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    padding: "20px",
  })
  
  const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: 120,
    height: 120,
    border: `4px solid ${theme.palette.background.paper}`,
    bottom: "-60px",
    position: "absolute",
  }))
  

  const [data,setData]= useState([])
  const [selectedEmployee,setSelectedEmployee] = useState(null)
  console.log(data)

// =========================================Get Api===============================================================================================
  
const getAllEmployeeData =()=>{
  axios.get(`${config.baseUrl}/api/allEmployee`)
  .then(res=>{
   
    let arr = res.data.employees.map((item,index)=>{
      return {...item,id:index+1}
    })
    setData(arr)
  }).catch(err=>console.log(err))
}


const handleChange = (event) => {

  setSelectedDepartment(event.target.value);
};

// =========================================Ues Effect===============================================================================================

   useEffect(()=>{
    getAllEmployeeData()
  },[])


//   const filterData = data.filter((item)=>item.name.toLowerCase().includes(selectedEmployee?.name.toLowerCase()))
 
const filterData = data.filter((item) => 
  (!selectedEmployee || item.name.toLowerCase().includes(selectedEmployee.name.toLowerCase())) &&
  (!selectedDepartment || item.department === selectedDepartment)
);

const uniqueDepartment = [...new Set(data.map((item)=>item.department))]

  // console.log(uniqueDepartment.map((item)=>setDepartment(item?.department) ),'uniqueDepartment')

  const handelClick = (data) =>{
    history.push("/EmployeeReportPdf",{data:data})
   
  }
  return (
    <div className="row">
      <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
        <Dashhead id={8} display={display} />
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
            <div className="my-5">
        <h1 className="title text-center">Employee  Report</h1>
            </div>
    
        <div className="container">
    <div className=" row my-5 ">
        <div className="col-8">
        <Autocomplete
     sx={{ width: 700 }}
      options={data}
      id="avatar-autocomplete"
      getOptionLabel={(option) => option.name || ""}
      onChange={(event,value)=>setSelectedEmployee(value)}
      renderOption={(props, option) => (
        <li {...props}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar alt={option.name} src={option.employeeImage} />
            <div>
              {option.name} - {option.nationality}
            </div>
          </Stack>
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} label="Search By Name" variant="standard" />
      )}
    />
        </div>
        <div className="col-3">
        <Box >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Department</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedDepartment}
          label="Age"
          onChange={handleChange}
        >
 
    {/* <MenuItem value={uniqueDepartment}>{uniqueDepartment}</MenuItem> */}
      <MenuItem value="">All</MenuItem>
        {uniqueDepartment.map((dept)=>(
          <MenuItem key={dept} value={dept}>{dept}</MenuItem>
        ))}
        </Select>
      </FormControl>
    </Box>
        </div>
    </div>
    </div>
        
          
 {/*------------------------------------------------------ First Row Start Here ----------------------------------------- */}
 <Box sx={{ flexGrow: 1, p: 4, backgroundColor: "#f0f2f5" }}>
      <Grid container spacing={4}>
        {loading
          ? Array.from(new Array(8)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Skeleton variant="rectangular" height={300} sx={{ borderRadius: "20px" }} />
              </Grid>
            ))
          : filterData.map((employee) => (
           
         

     
              <Grid item xs={12} sm={6} md={4} lg={3} key={employee.id} onClick={()=>handelClick(employee)}>
                <StyledCard>
                  <CardHeader>
                    <StyledAvatar alt={employee.name} src={employee.employeeImage} />
                  </CardHeader>
                  <CardContent sx={{ textAlign: "center", mt: 8, pb: 3 }}>
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: "bold" }}>
                      {employee.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {employee.role}
                    </Typography>
                    <Chip
                      label={employee.department}
                      color="primary"
                      size="small"
                      sx={{
                        borderRadius: "16px",
                        fontWeight: "bold",
                        backgroundColor: "rgba(63, 81, 181, 0.1)",
                        color: "#3f51b5",
                      }}
                    />
                  </CardContent>
                </StyledCard>
              </Grid>
              
            ))}
      </Grid>
    </Box>
  
      </div>
    </div>
  );
}

export default EmployeeReport;
