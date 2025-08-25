import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
} from "@mui/material";
import axios from "axios";
import config from "../auth/Config";
import { Bounce, toast,ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
const TerminateEmployeeModal = ({ update, openModal, setShowDialog, getAllEmployeeData}) => {
    const handleClose = () => setShowDialog(false);
    const [date, setDate] = React.useState(new Date().toISOString().split("T")[0]);
    const {register,handleSubmit,reset,formState:{errors}} = useForm()
 
const onSubmit = async(data,{action})=>{

//   if(!exitType){
//     alert("Please select exit type")
//     return
//   }  
  const formData = new FormData();
  Object.keys(data).forEach((key)=>{
    formData.append(key,data[key])
  })

  try{
    formData.append("employeeId",update._id)
    formData.append("date",date)
  
    formData.append("exitType","")
    formData.append("lastWorkingDate",date)
    formData.append("dateOfJoining",update.dateOfJoining)
    formData.append("resumingofLastVacation", "")

    const response = await axios.post(
      `${config.baseUrl}/api/endofservices`,formData,
     { headers: { Authorization: `Bearer ${config.accessToken}` 

     }
    }
    )
    
 
    toast.success(response.data.message|| "Employee remove successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      });
        setShowDialog(false)
    //   reset()
    //   if (action === "print") {
    //     history.push('/EndofServicepdf', { data: Object.fromEntries(formData) });
    //   }
    //   setSelectedEmployee(null)
    //   setResumingLastVacation(null)
    //   setSelectedLastWorkingDate(null)
      getAllEmployeeData()
    
    }
    catch(error){
      toast.error(error.response?.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
    }
}
  return (
    <>
      {update && (
        <Dialog open={!!openModal} onClose={handleClose} maxWidth="xs" fullWidth>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>{update.name}</DialogTitle>
            <DialogContent>
              <Stack spacing={2} mt={1}>
                <TextField
                  label="Subject"
                  required
                  fullWidth
                  autoFocus
                  {...register("subject")}
                  placeholder="Enter reason or subject"
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button type="button" variant="text" onClick={handleClose}>
                Cancel
              </Button>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            
            </DialogActions>
          </form>
        </Dialog>
      )}
    </>
  );
};

export default TerminateEmployeeModal;
