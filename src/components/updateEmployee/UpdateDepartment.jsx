import { Button, Dialog, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import config from '../auth/Config';
import { toast } from 'react-toastify';
function UpdateDepartment({update,showDialog,setShowDialog,ChangeRowData,getAllMember}) {
    console.log(update,'this is Update Department section')
      const { handleSubmit } = useForm();
      const onSubmit = async(data,event) => {
        const formData = new FormData();
        formData.append("department", update.department)
       
        try {
             await axios.put(`${config.baseUrl}/api/updateDepartment/${update._id}`, formData,
            {headers:{token:`${config.accessToken}`}})
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
          
              event.target.reset();
              setShowDialog(false)
          }).catch(error => {
          console.log(error)
          }
          );
          getAllMember()
        } catch (error) {
            alert(error)
            
        }
        
      ;
      }
  return (
    <div>
        {
            update && (
                <Dialog open={showDialog}  >
                <DialogTitle sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', }}>
                  <IconButton onClick={()=>setShowDialog(false)} sx={{ color: 'grey.800' }}>
                    <CloseIcon />
                  </IconButton>
                </DialogTitle>
                      <DialogContent>
                      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container d-flex flex-column align-items-center">
          <div className="row">
            <div className="col">
            <TextField id="outlined-basic"
             value={update.department}
             onChange={ChangeRowData}
             name='department'
             label="Department name"
             variant="outlined" 
             sx={{width:250}} 
             required
            //   {...register("department")}
            />

            </div>
          </div>
          <div className="row my-3">
            
          </div>
          <Button variant="contained" type="submit" className='my-3' >
          update
          </Button>
        </div>
        </form>
        
                        </DialogContent>
                        </Dialog>
            )
        }
    </div>
  )
}

export default UpdateDepartment