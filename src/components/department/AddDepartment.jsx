import React, { Fragment, useEffect, useState } from 'react'
// import "./Home.scss";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
// import Dashhead from "../components/Dashhead";
import Dashhead from '../Dashhead';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateDepartment from '../updateEmployee/UpdateDepartment';

const AddDepartment = () => {
  const [display, setDisplay] = React.useState(false);
  const [department, setDepartment] = React.useState('');
  const [data,setData]=useState([])
  const [flag,setFlag] = React.useState(false)
  const [update,setUpdate]=useState([])
  const [showDialog,setShowDialog]=useState(false)
  const [alert, setAlert] = useState(false);
  // ============================================================================================================================================
  const handleChange = (event) => {
    setDepartment(event.target.value);
  };
// ============================================================================================================================================
  const { register, handleSubmit } = useForm();
  const url= process.env.REACT_APP_DEVELOPMENT
  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwiX2lkIjoiNjVlODZiNzZmOTk0ZmQzZTdmNDliMjJiIiwiaWF0IjoxNzA5NzkzMDcwfQ.siBn36zIBe_WmmIfuHMXI6oq4KMJ4dYaWQ6rDyBBtEo"
 
  // ============================================================================================================================================
  const columns=[
    {field:"id",headerName:"S.N",width:70},
    {field:"department",headerName:"department", width:200},
   
    {
      title: "Delete",
      field: "Delete",
      width: 100,
      renderCell: () => (
        <Fragment>
          <Button color="error"  onClick={() => setAlert(true)}>
            <DeleteIcon />
          </Button>
        </Fragment>
      ),
    },
    {
      title: "Edit",
      field: "Edit",
      width: 100,
      renderCell: (params) => (
        <Fragment>
          <Button   onClick={() => updateRowData(params.row)}>
            <EditIcon />
          </Button>
        </Fragment>
      ),
    },
  
  ]
 

// =========================================Get Api===============================================================================================
const getAllMember =async()=>{
  try {
    await axios.get(`${url}/api/allDepartment`,{
      headers: { token: accessToken }
    })
    .then(res=>{
      let arr = res.data.allDepartment.map((item,index)=>({...item,id:index+1}))
      setData(arr)
     
      console.log(arr)
    })

  } catch (error) {
    // alert(error)
    console.log(error)
    
  }
}

// =========================================Post Api======================================================================

const onSubmit = async(data,event) => {
     
  var obj={
    ...data,
  }
  try {
       await axios.post(`${url}/api/addDepartment`, obj,
      {headers:{token:`${accessToken}`}})
      .then(response=>{
      console.log(response, 'res')
      toast(response.data.msg,{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
      setFlag(!flag)
        event.target.reset();
    }).catch(error => {
      toast(error.response.data,{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      })
    }
    );
    getAllMember()
  } catch (error) {
      alert(error)
      
  }
  
;
}

  //=======================================================Delete code & api here ==============================================================
const deleteRow = async (update) => {

  try {
    await axios
      .delete(
        `${process.env.REACT_APP_DEVELOPMENT}/api/deleteDepartment/${update._id}`,
        {headers:{token:`${accessToken}`}})
        .then(response=>{
        console.log('Response',response)
        // apiRef.current.updateRows([update])
        })

        getAllMember();
      
    setAlert(false);
  } catch (error) {
    console.log(error);
  }
};
// =========================================Update api and logic===============================================================================================


const updateRowData= async(params)=>{
  // console.log(params,'check in update data in Add Product')
 setUpdate(params)
   setShowDialog(true)
}
const changeRoweData=(e)=>{
  setUpdate({...update,[e.target.name]:e.target.value})
  console.log(update)

}
// =========================================By Default api cal===============================================================================================
useEffect(()=>{

  getAllMember()
},[])

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
      <h1 className="my-5 title text-center">
          Add Department 
        
        </h1>
        <ToastContainer />
{/* =============================================Delete Modal code===================================================================================================================================== */}
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
{/* =============================================Form Code==================================================================================================================================== */}

        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container d-flex flex-column align-items-center">
          <div className="row">
            <div className="col">
            <TextField id="outlined-basic" label="Department name" variant="outlined"  sx={{width:250}}  required
            {...register("department")}
            />

            </div>
          </div>
          <div className="row my-3">
            
          </div>
          <Button variant="contained" type="submit" className='my-3' >
          submit
          </Button>
        </div>
        </form>
        
        <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { psku: 0, pskuSize: 5 },
          },
        }}
        pskuSizeOptions={[5, 10]}
        onRowClick={(item)=>setUpdate(item.row)}
        
      />
      <UpdateDepartment
       showDialog={showDialog}
       update={update}
       setShowDialog={setShowDialog}
       ChangeRowData={changeRoweData}
       updateRowData ={updateRowData}
       getAllMember={getAllMember}
      />
    </div>
        </div>
    
        </div>
  )
}

export default AddDepartment