import React, { useEffect, useState } from "react";
import '../forms/forms.scss';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {Button} from "@mui/material";
import Dashhead from "../Dashhead";
import {  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Backicon from "../header/Backicon";
import UpdateNewEmployee from "../updateEmployee/UpdateNewEmployee";
import config from "../auth/Config";
const Employeeinfo = () => {
  const [display, setDisplay] = React.useState(false);
  const [alert, setAlert] = useState(false);
  const [showDialog,setShowDialog]=useState(false)
  const [employeeData,setEmployeeData] = useState([])
const url = process.env.REACT_APP_DEVELOPMENT
 const [update,setUpdate]=useState({})
 const employeeInfoData = useSelector((state) => state.socket.messages)
 const AccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzIyMjM1NDE0NGY1MmZjYjllMDI3ZWQiLCJpYXQiOjE3MzA4MjAyMTIsImV4cCI6MTc2MjM3NzgxMn0.WD66GSrSBKl_0V6T7F7RVHj1SXokR5xVYNwmlYU69P8";
 const history = useHistory()

const fetchEmployeeData =async()=>{
  try {
    await  axios.get(`${config.baseUrl}/api/oneEmployee/${employeeInfoData._id}`,{
      headers: { Authorization: `Bearer ${config.accessToken}` },
    }).then(response =>{
      setEmployeeData(response.data.employee)
      console.log(response.data.employee)
    }).catch(error =>console.log(error))
  } catch (error) {
    console.log(error)
  }

}
useEffect(()=>{
fetchEmployeeData()
},[])
const deleteRow = async () => {
  try {
    await axios.delete(`${url}/api/deleteEmployee/${employeeInfoData._id}`, {
      headers: { Authorization: `Bearer ${AccessToken}` }
    });
    console.log("Employee deleted successfully");
    history.push(`/Home`);
  } catch (error) {
    console.error("Error deleting employee:", error);
  }
};

const ChangeRowData=(e)=>{
  if (!update) return;
  setUpdate({...update,[e.target.id]:e.target.value})
}
const handelUpdate = ()=>{
  // history.push(`/NewEmployee`,{data:employeeData});
  setUpdate(employeeData)
  setShowDialog(true)

}

const totalSalaryIncrements = employeeData?.salaryIncrement?.reduce((acc,item)=>{
  return acc + (parseFloat(item.salaryIncrementAmount) || 0)
},0)
console.log(totalSalaryIncrements,'totalSalaryIncrementds')
const totalAmount = employeeData.BasicSalary+employeeData.HousingAmount+employeeData.transportationAmount+employeeData.otherAmount+employeeData.probationAmount+ totalSalaryIncrements
// console.log(totalAmount,"total")
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
     <div className="container">
     <div>
      <Backicon/>
     </div>
        <h1 className="text-center" >Employee Info</h1>

     </div>
     <div>


    {
      employeeData ?(
        <div className="row mt-5">

    <div className="col-3 py-5 px-5">
    <div className="d-flex flex-column align-items-center text-center">
                  <a href={employeeData.employeeImage} target="_blank" >
                    <img src={employeeData.employeeImage} alt="Employee Image" className="rounded-circle" width="150"/>
                    </a>
                    </div>
                    <div className="mt-3">
                      <h4 className="text-center">{employeeData.name}</h4>
                      <p className="text-secondary mb-1 text-center">{employeeData.position}</p>
                      <p className="text-muted font-size-sm text-center">{employeeData.mobileNumber}</p>
                      <p className="text-muted font-size-sm text-center">{employeeData.employeeNumber}</p>
                    </div>
                            <div className="row d-flex flex-column align-items-center text-center mt-2">
                     <div className="col-sm-12 ">
                      <button onClick={handelUpdate} className="btn btn-info mx-2" >update</button>
                      {alert && (
          <Dialog open={alert} style={{ height: 600 }}>
            <DialogTitle>Delete Row</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are You sure You want to delete this.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={() => deleteRow()}>
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
                      <a className="btn btn-danger text-white" onClick={() => setAlert(true)}>Delete</a>
                    </div>
                  </div>
               
              </div>
          <div className="col-4 py-5 px-5">
           <div className="row">
                    <div className="col-sm-5">
                      <h6 className="mb-0">Arbic Name</h6>
                    </div>
                    <div className="col-sm-6 text-secondary">
                    {employeeData.arabicName}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-5">
                      <h6 className="mb-0">Employee Number</h6>
                    </div>
                    <div className="col-sm-6 text-secondary">
                    {employeeData.employeeNumber}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-5">
                      <h6 className="mb-0">Nationality</h6>
                    </div>
                    <div className="col-sm-6 text-secondary">
                  {employeeData.nationality}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-5">
                      <h6 className="mb-0">Date of Birth</h6>
                    </div>
                    <div className="col-sm-6 text-secondary">
                  {employeeData.dateOfBirth ?moment.parseZone(employeeData.dateOfBirth).local().format("DD/MM/YYYY"):null }
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-5">
                      <h6 className="mb-0">Department</h6>
                    </div>
                    <div className="col-sm-6 text-secondary">
                    {employeeData.department}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-5">
                      <h6 className="mb-0">Position</h6>
                    </div>
                    <div className="col-sm-6 text-secondary">
                    {employeeData.position}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-5">
                      <h6 className="mb-0">Marital Status</h6>
                    </div>
                   <div className="col-sm-6 text-secondary">
                   {employeeData.maritalStatus}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-5">
                      <h6 className="mb-0">Hiring Date</h6>
                    </div>
                   <div className="col-sm-6 text-secondary">
                  {employeeData.dateOfJoining? moment.parseZone(employeeData.dateOfJoining).local().format("DD/MM/YYYY"):null}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-5">
                      <h6 className="mb-0">Probation</h6>
                    </div>
                   <div className="col-sm-6 text-secondary">
                    {employeeData.probationMonthofNumber} Months
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-5">
                      <h6 className="mb-0">Qatar ID</h6>
                    </div>
                   <div className="col-sm-6 text-secondary">
                   {employeeData.qatarID}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-5">
                      <h6 className="mb-0">Qatar Expiry ID</h6>
                    </div>
                   <div className="col-sm-6 text-secondary">
                {employeeData.qatarIdExpiry ? moment.parseZone(employeeData.qatarIdExpiry).local().format("DD/MM/YYYY"):""}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-5">
                      <h6 className="mb-0">iD Designation</h6>
                    </div>
                   <div className="col-sm-6 text-secondary">
                {employeeData.idDesignation }
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-5">
                      <h6 className="mb-0">Passport No</h6>
                    </div>
                   <div className="col-sm-6 text-secondary">
                 {employeeData.passportNumber}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-5">
                      <h6 className="mb-0">Passport Date Of Issue</h6>
                    </div>
                   <div className="col-sm-6 text-secondary">
                   {employeeData.passportDateOfIssue? moment.parseZone(employeeData.passportDateOfIssue).local().format("DD/MM/YYYY"):""}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-5">
                      <h6 className="mb-0">Passport Expiry</h6>
                    </div>
                   <div className="col-sm-6 text-secondary">
                   {employeeData.passportDateOfExpiry? moment.parseZone(employeeData.passportDateOfExpiry).local().format("DD/MM/YYYY"):""}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-5">
                      <h6 className="mb-0">Visa Type
                      </h6>
                    </div>
                   <div className="col-sm-6 text-secondary">
                   { employeeData.visaType }
                    </div>
                  </div>
                  <hr/>
                  </div>
                  <div className="col-4 py-5">
                  <div className="row">
                    <div className="col-sm-5">
                      <h6 className="mb-0">Basic Salary</h6>
                    </div>
                   <div className="col-sm-6 text-secondary">
                   {employeeData.BasicSalary}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-5">
                      <h6 className="mb-0">Housing Amount</h6>
                    </div>
                   <div className="col-sm-6 text-secondary">
                   {employeeData.HousingAmount}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-5">
                      <h6 className="mb-0">Transportation Amount</h6>
                    </div>
                   <div className="col-sm-6 text-secondary">
                   {employeeData.transportationAmount}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-5">
                      <h6 className="mb-0">Other Amount</h6>
                    </div>
                   <div className="col-sm-6 text-secondary">
                   {employeeData.otherAmount}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <div className="col-sm-5">
                      <h6 className="mb-0">Probation Amount</h6>
                    </div>
                   <div className="col-sm-6 text-secondary">
                   {employeeData.probationAmount}
                    </div>
                  </div>
                  <hr/>
                  {
                      employeeData?.salaryIncrement?.map((item,index)=>{

                        if (
                          item.salaryIncrementAmount === null ||
                          item.salaryIncrementAmount === undefined ||
                          item.salaryIncrementAmount === ""
                        ) return null;
                        
                        return (

                        <React.Fragment>
                           <div className="row" key={index}>
                    
                    <div className="col-sm-5">
                      <h6 className="mb-0">Salary Increment #{index + 1} ({item?.salaryIncrementDate? moment.parseZone(item?.salaryIncrementDate).local().format("DD/MM/YYYY") :""})</h6>
                    </div>
                   <div className="col-sm-6 text-secondary">
                   {item?.salaryIncrementAmount}
                    </div>
                  </div>
                  <hr/>
                        </React.Fragment>
                     
                      )
                    })
                    
                  }
                  
                  <div className="row">
                    <div className="col-sm-5">
                      <h6 className="mb-0">Total</h6>
                    </div>
                   <div className="col-sm-6 text-secondary">
                  <b>{totalAmount}</b> 
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    
                   <div className="col-sm-5 text-secondary">
                      <a href={employeeData.employeeQatarID} target="_blank" rel="noopener noreferrer">
                              <img className="mt-3 mx-2 rounded-circle" width="120" src={employeeData.employeeQatarID} alt="Passport" />
                            </a>
                    </div>
                   <div className="col-sm-5 text-secondary">
                      <a href={employeeData.employeePassport} target="_blank" rel="noopener noreferrer">
                              <img className="mt-3 mx-2 rounded-circle" width="120" src={employeeData.employeePassport} alt="Passport" />
                            </a>
                    </div>
                   <div className="col-sm-5 text-secondary">
                      <a href={employeeData.employeeContractCopy} target="_blank" rel="noopener noreferrer">
                              <img className="mt-3 mx-2 rounded-circle" width="120" src={employeeData.employeeContractCopy} alt="Passport" />
                            </a>
                    </div>
                   <div className="col-sm-5 text-secondary">
                      <a href={employeeData.employeeGraduationCertificate} target="_blank" rel="noopener noreferrer">
                              <img className="mt-3 mx-2 rounded-circle" width="120" src={employeeData.employeeGraduationCertificate} alt="Passport" />
                            </a>
                    </div>
                  </div>
                  <hr/>
            
    </div>
  </div>
      ):(
        <h1 className="text-center"> No employee data available</h1>
      )}
      </div>
  
  <hr/>
 
  <UpdateNewEmployee
  showDialog={showDialog}
  update={update}
  setShowDialog={setShowDialog}
  ChangeRowData ={ChangeRowData}
  fetchEmployeeData={fetchEmployeeData}
  />


     </div>
     </div>
  )
}

export default Employeeinfo