import React, { useEffect, useState } from "react";
import '../forms/forms.scss';
import '../forms/forms.scss';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './employee.scss';
import {  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import config from "../auth/Config";
import axios from 'axios'
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import moment from "moment";
import UpdateEndOfServices from "../updateEmployee/UpdateEndOfServices";
const Endofservicesinfo = () => {
  const [display, setDisplay] = React.useState(false);
  const [data ,setData] =useState([])
  const [alert, setAlert] = useState(false);
  const [showDialog,setShowDialog]=useState(false)
  const [update,setUpdate] = useState("")
  const location = useLocation()

  const servicesData = location?.state?.data
 
  // Get api
  const getEndOfServices =()=>{
    try{
      axios.get(`${config.baseUrl}/api/oneEndofservice/${servicesData._id}`)
      .then(res=>{
  
        setData(res?.data?.oneEndofservice)
        setUpdate(res?.data?.oneEndofservice)
      }).catch(err=>console.log(err))
    
    }catch(error){
      console.log(error)
    }
  }
  const ChangeRowData=(e)=>{
    setUpdate({...update,[e.target.id]:e.target.value})
  }




  // =========================================Ues Effect===============================================================================================
  
     useEffect(()=>{
      getEndOfServices()
    },[])

  //  Delete api
  const deleteRow = async(update)=>{  

  }
  return (
    <div className="row">
    <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
    <Dashhead id={5} display={display} />
    </div>

    <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container" onClick={()=>display&&setDisplay(false)}>
    <span className="iconbutton display-mobile">
    <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
    <MenuIcon fontSize="inherit" />
     </IconButton>
     </span>
     <div className="container">
     <h1 className="text-center my-3 font-family">info End of services</h1>

     </div>
    <div className="row my-5">
    <div className="col-12 px-4 py-4">
    <div className="cardBackground row">

       <div className="cardBorder col-md-3 gradient-custom text-center text-white"
             >
              <img src={data?.employeeId?.employeeImage}
                alt="Avatar" className="Avatar img-fluid my-5"  />
              <h5>{data?.employeeId?.name}</h5>
              <p>{data?.employeeId?.position}</p>
              {/* <i className="far fa-edit mb-5"></i> */}
           <EditIcon className="mx-3 text-white cursor-pointer" onClick ={()=>setShowDialog(true)}  />
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
           
              {/* <DeleteIcon onClick={() => setAlert(true)}  /> */}
              <DeleteIcon className="cursor-pointer mx-3 my-2" onClick={() => setAlert(true)} />
            </div>
          

    <div className="col-md-8">
              <div className="card-body p-4">
                <h6>Information end of services</h6>
                <hr className="mt-0 mb-4"/>
                <div className="row pt-1">
                  <div className="col-6 mb-3">
                    <h6>Date</h6>
                    <p className="text-muted">{moment.parseZone(data.date).local().format("DD/MM/YYYYY")}</p>
                  </div>
                  <div className="col-6 mb-3">
                    <h6>Exit Type</h6>
                    <p className="text-muted">{data.exitType}</p>
                  </div>

 
                </div>
                <h6>Employee Work Info</h6>
                <hr className="mt-0 mb-4"/>
                <div className="row pt-1">
                  <div className="col-6 mb-3">
                    <h6>Last Working Day</h6>
                    <p className="text-muted">{moment.parseZone(data.lastWorkingDate).local().format("DD/MM/YYYYY")}</p>
                  </div>
                  <div className="col-6 mb-3">
                    <h6>Joining Date</h6>
                    <p className="text-muted">{moment.parseZone(data.employeeId?.dateOfJoining).local().format("DD/MM/YYYYY")}</p>
                  </div>
                  <div className="col-6 mb-3">
                    <h6>Resuming of last vacation</h6>
                    <p className="text-muted">{moment.parseZone(data.employeeId?.resumingofLastVacation).local().format("DD/MM/YYYYY")}</p>
                  </div>
                  <div className="col-6 mb-3">
                    <h6>other</h6>
                    <p className="text-muted">{data?.other}</p>
                  </div>
                  <div className="col mb-3">
                    <h6>Subject</h6>
                    <p className="text-muted">{data?.subject}</p>
                  </div>
                </div>

              </div>
            </div>
  
    </div>
    </div>


 
   
  </div>

        <UpdateEndOfServices
           showDialog={showDialog}
           update={update}
           setShowDialog={setShowDialog}
           ChangeRowData={ChangeRowData}
           getEndOfServices={getEndOfServices}
        
        />

     </div>
     </div>
  )
}

export default Endofservicesinfo