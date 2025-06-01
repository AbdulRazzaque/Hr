


import { Button, Dialog, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import config from '../auth/Config';
import { toast } from 'react-toastify';
function UpdatePosition({update,showDialog,setShowDialog,ChangeRowData,getAllPosition}) {
   console.log(update)
      const { handleSubmit } = useForm();
      // console.log(update.position)
      const onSubmit = async(data,event) => {
        // const formData = new FormData();
        const formData = new FormData();
        formData.append("position",update.position)
        
        try {
            console.log(formData,'formData')
             await axios.put(`${config.baseUrl}/api/UpdatePosition/${update._id}`, formData,
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
              console.log(update.position)
          }).catch(error => {
          console.log(error)
          }
          );
          getAllPosition()
        } catch (error) {
            console.log(error)
            
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
             value={update.position}
             onChange={ChangeRowData}
             name='position'
             label="Position name"
             variant="outlined" 
             sx={{width:250}} 
             required
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

export default UpdatePosition