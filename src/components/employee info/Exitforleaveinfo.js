import React, { useEffect, useState } from "react";
import '../forms/forms.scss';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead";
import { Link } from "react-router-dom";
import BackIcon from "../header/BackIcon";
import { useSelector } from "react-redux";
import BusinessIcon from '@mui/icons-material/Business';
import config from "../auth/Config";
import axios from "axios";
import moment from "moment";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateExitforleave from "../updateEmployee/UpdateExitforleave";
import DeleteExitforleave from "../deleteEmployee/DeleteExitforleave";
const Exitforleaveinfo = () => {
  const employeeData = useSelector((state) => state?.socket?.messages)
  const [display, setDisplay] = React.useState(false);
  const [update,setUpdate]=useState([])
  const [alert, setAlert] = useState(false);
  const [showDialog,setShowDialog]=useState(false)
const [data,setData]= useState([])
  const getEmployeeByIdExitLeave =async()=>{
    if(!employeeData || !employeeData._id){
      console.error("Employee data or ID is missing")
    }
    try {
      axios.get(`${config.baseUrl}/api/getEmployeeByIdExitLeave/${employeeData._id}`)
      .then(res=>{
        setData(res.data.allExitOfLeave)
      })
    } catch (error) {
      console.log("Unexpected error:", error)
    }
  }
  const updateRowData= async(update)=>{
    // console.log(params,'check in update data in Add Product')
   setUpdate(update)
   console.log(update,'this is update')
     setShowDialog(true)
  
  }
  const deleteRowData= async(update)=>{
    // console.log(params,'check in update data in Add Product')
   setUpdate(update)
   console.log(update,'this is Delete')
     setAlert(true)
  }
  
const ChangeRowData=(e)=>{
  setUpdate({...update,[e.target.name]:e.target.value})
}

  useEffect(()=>{
    getEmployeeByIdExitLeave()
  },[])
  console.log(data,'Exit')
  return (
    <div className="row">
    <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
    <Dashhead id={1} display={display} />
    </div>

    <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container" onClick={()=>display&&setDisplay(false)}>
    <span className="iconbutton display-mobile">
    <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
    <MenuIcon fontSize="inherit" />
     </IconButton>
     </span>
  
     <div>
     <BackIcon/>

     </div>
        <h1 className="text-center" >Exit For leave Info</h1>
        { data && data.length> 0 ?(
            <div>
     
            <div className="row bg-white mx-2">
             <div className="col-md-9 offset-md-1 "> 
               <div className="text-center profile">
               <img src= {data[0]?.employeeId?.employeeImage || 'default-image.png'}className='profileimage' alt=""  />
               <h1>{data[0].employeeId.name}</h1>
                   <h6 className='profilenumber'>    Mobile Number: {data[0]?.employeeId?.mobileNumber || 'N/A'}  <span className='ml-2 profileid'> Employee Number: {data[0]?.employeeId?.employeeNumber || 'N/A'}</span> </h6>  
       
                   <div className="profilecategory">
                           <BusinessIcon className='icon'/>
                            <span> <span className='mx-1'>|</span>  {data[0]?.employeeId?.position}</span> 
                       </div>
               </div>
       
             </div>
         
           </div>
      
     
         
         { data.map((item,index)=>(
           <div className="row mt-5" key={index}>
       
          
           <div className="col-4 py-5 px-5">
           <div className="d-flex align-items-center">
           <EditIcon className="mr-5 cursor-pointer" onClick={() => updateRowData(item)} color="primary"/>
           <DeleteIcon color="error" className="cursor-pointer" onClick={()=>deleteRowData(item)} />
         </div>
       <hr/>
           <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">Date</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                         {moment.parseZone(item?.date).local().format("DD-MM-YYYY")}
                           </div>
                         </div>
                         <hr/>
                         <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">Leave Type</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                           {item.leaveType}
                           </div>
                         </div>
                         <hr/>
                         <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">Leave Start Date</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                           {moment.parseZone(item?.leaveStartDate).local().format("DD-MM-YYYY")}
                           </div>
                         </div>
                         <hr/>
                         <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">Leave End Date</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                           {moment.parseZone(item?.leaveEndDate).local().format("DD-MM-YYYY")}
                           
                           </div>
                         </div>
                         <hr/>
                         <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">last Leave Start Date</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                           {moment.parseZone(item?.lastLeaveStartDate).local().format("DD-MM-YYYY")}
                           </div>
                         </div>
                         <hr/>
                        
                         <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">last Leave EndDate</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                           {moment.parseZone(item?.lastLeaveEndDate).local().format("DD-MM-YYYY")}
                           </div>
                         </div>
                         <hr/>
                        
                       
                         <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">Number of Days of  Leave</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                        {item.numberOfDayLeave}
                           </div>
                         </div>
                         <hr/>
           </div>
           <div className="col-4 py-5">
           <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">Bank Loan</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                           {item.bankLoan}
                           </div>
                         </div>
                         <hr/>
                         <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">Personal Loan</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                           {item.personalLoan}
                           </div>
                         </div>
                         <hr/>
                         <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">credit card</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                          {item.CreditCard}
                           </div>
                         </div>
                         <hr/>
                         <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">company Loan</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                        {item.companyAssetsLoan}
                           </div>
                         </div>
                         <hr/>
                         <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">Company Assest</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                          {item.companyAssets}
                           </div>
                         </div>
                         <hr/>
                         <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">Mobile /Company Sim Card</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                         {item.companySimCard}
                           </div>
                         </div>
                         <hr/>
                         <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">Laptop /Ipad</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                      { item.companyLaptop}
                           </div>
                         </div>
                         <hr/>
                         <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">Tool</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                         {item.tools}
                           </div>
                         </div>
                         <hr/>
                         <div className="row">
                           <div className="col-sm-3">
                             <h6 className="mb-0">Commnet</h6>
                           </div>
                           <div className="col-sm-9 text-secondary">
                          {item.comment}
                           </div>
                         </div>
                         <hr/>
                   
           </div>
         </div>
       
         ))}
            
            </div>
          ): <div className="no_data">
          <div className="no_data_icon">🚫</div>
          <div className="no_data_text">No Data Available</div>
            </div>
        }
   
    
  <hr/>

     </div>
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
  )
}

export default Exitforleaveinfo

// import React, { useEffect, useState } from "react";
// import {
//   Typography,
//   Box,
//   IconButton,
//   Paper,
//   Tooltip,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import Dashhead from "../Dashhead";
// import BackIcon from "../header/BackIcon";
// import { useSelector } from "react-redux";
// import config from "../auth/Config";
// import axios from "axios";
// import moment from "moment";
// import UpdateExitforleave from "../updateEmployee/UpdateExitforleave";
// import DeleteExitforleave from "../deleteEmployee/DeleteExitforleave";
// import { DataGrid } from "@mui/x-data-grid";
// import BusinessIcon from '@mui/icons-material/Business';
// const Exitforleaveinfo = () => {
//   const employeeData = useSelector((state) => state?.socket?.messages);
//   const [display, setDisplay] = useState(false);
//   const [update, setUpdate] = useState([]);
//   const [alert, setAlert] = useState(false);
//   const [showDialog, setShowDialog] = useState(false);
//   const [data, setData] = useState([]);

//   const getEmployeeByIdExitLeave = async () => {
//     if (!employeeData || !employeeData._id) return;
//     try {
//       const res = await axios.get(
//         `${config.baseUrl}/api/getEmployeeByIdExitLeave/${employeeData._id}`
//       );
//       setData(
//         res.data.allExitOfLeave.map((item, idx) => ({
//           ...item,
//           id: item._id || idx, // DataGrid needs an 'id' field
//         }))
//       );
//     } catch (error) {
//       console.log("Unexpected error:", error);
//     }
//   };

//   useEffect(() => {
//     getEmployeeByIdExitLeave();
//   }, []);

//   const updateRowData = (row) => {
//     setUpdate(row);
//     setShowDialog(true);
//   };

//   const deleteRowData = (row) => {
//     setUpdate(row);
//     setAlert(true);
//   };

//   const ChangeRowData = (e) => {
//     setUpdate({ ...update, [e.target.name]: e.target.value });
//   };

//   const columns = [
//     {
//       field: "date",
//       headerName: "Date",
//       width: 110,
//       valueFormatter: (params) =>
//         params.value ? moment(params.value).format("DD-MM-YYYY") : "",
//     },
//     {
//       field: "leaveType",
//       headerName: "Leave Type",
//       width: 120,
//       renderCell: (params) => (
//         <Typography fontWeight={600} color="primary">
//           {params.value}
//         </Typography>
//       ),
//     },
//     {
//       field: "leaveStartDate",
//       headerName: "Start",
//       width: 110,
//       valueFormatter: (params) =>
//         params.value ? moment(params.value).format("DD-MM-YYYY") : "",
//     },
//     {
//       field: "leaveEndDate",
//       headerName: "End",
//       width: 110,
//       valueFormatter: (params) =>
//         params.value ? moment(params.value).format("DD-MM-YYYY") : "",
//     },
//     {
//       field: "numberOfDayLeave",
//       headerName: "Days",
//       width: 80,
//       renderCell: (params) => (
//         <Typography fontWeight={600} color="info.main">
//           {params.value}
//         </Typography>
//       ),
//     },
//     // { field: "bankLoan", headerName: "Bank Loan", width: 100 },
//     // { field: "personalLoan", headerName: "Personal Loan", width: 110 },
//     // { field: "CreditCard", headerName: "Credit Card", width: 110 },
//     // { field: "companyAssetsLoan", headerName: "Company Loan", width: 110 },
//     // { field: "companyAssets", headerName: "Assets", width: 90 },
//     // { field: "companySimCard", headerName: "Sim Card", width: 90 },
//     // { field: "companyLaptop", headerName: "Laptop", width: 90 },
//     // { field: "tools", headerName: "Tools", width: 90 },
//     { field: "comment", headerName: "Comment", width: 160 },
//     {
//       field: "actions",
//       headerName: "Actions",
//       width: 120,
//       sortable: false,
//       filterable: false,
//       renderCell: (params) => (
//         <>
//           <Tooltip title="Edit">
//             <IconButton color="primary" onClick={() => updateRowData(params.row)}>
//               <EditIcon />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Delete">
//             <IconButton color="error" onClick={() => deleteRowData(params.row)}>
//               <DeleteIcon />
//             </IconButton>
//           </Tooltip>
//         </>
//       ),
//     },
//   ];

//   console.log(data,'data')
//   return (
//     <div className="row">
//       <div className="col-md-2">
//         <Dashhead id={1} display={display} />
//       </div>


//       <div className="col-md-10 dashboard-container" onClick={() => display && setDisplay(false)}>
//         <Box sx={{ mb: 2 }}>
//           <BackIcon />
//         </Box>
        
//         <Typography variant="h4" align="center" fontWeight={700} sx={{ mb: 2, color: "#1976d2" }}>
//           Exit For Leave Info
//         </Typography>

        
//             <div>
//                { data && data.length> 0 ?(
     
     
//             <div className="row bg-white mx-2">
//              <div className="col-md-9 offset-md-1 "> 
             
       
//              </div>
         
//            </div>
//                ) : (
//                  <div className="col-md-9 offset-md-1">
//                    <Typography variant="h6" align="center" color="text.secondary">
//                      No Employee Data Available
//                    </Typography>
//                  </div>
//                )}
//             </div>

//         {data && data.length > 0 ? (
//           <Paper elevation={8} sx={{ borderRadius: 4, mt: 2, p: 2 }}>
//             <DataGrid
//               rows={data}
//               columns={columns}
//               autoHeight
//               disableRowSelectionOnClick
//               sx={{
//                 "& .MuiDataGrid-columnHeaders": {
//                   background: "linear-gradient(90deg,#1976d2 60%,#42a5f5 100%)",
//                   color: "#fff",
//                   fontWeight: 700,
//                   fontSize: "1rem",
//                 },
//                 "& .MuiDataGrid-row:hover": {
//                   background: "#e3f2fd",
//                 },
//                 borderRadius: 3,
//                 fontSize: "1rem",
//               }}
//               pageSize={15}
//               // rowsPerPageOptions={[8, 16, 32]}
//             />
//           </Paper>
//         ) : (
//           <Box sx={{
//             textAlign: "center",
//             py: 8,
//             color: "text.secondary",
//             background: "#f5f5f5",
//             borderRadius: 3,
//             mt: 4
//           }}>
//             <Typography variant="h2" fontSize={80}>🚫</Typography>
//             <Typography variant="h6">No Data Available</Typography>
//           </Box>
//         )}
//         <UpdateExitforleave
//           showDialog={showDialog}
//           update={update}
//           setShowDialog={setShowDialog}
//           ChangeRowData={ChangeRowData}
//           getEmployeeByIdExitLeave={getEmployeeByIdExitLeave}
//         />
//         <DeleteExitforleave
//           alert={alert}
//           update={update}
//           setAlert={setAlert}
//           getEmployeeByIdExitLeave={getEmployeeByIdExitLeave}
//         />
//       </div>
//     </div>
//   );
// };

// export default Exitforleaveinfo;