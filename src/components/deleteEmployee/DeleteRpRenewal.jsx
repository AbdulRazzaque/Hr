import axios from 'axios';
import React, { useEffect, useState } from 'react'
import config from '../auth/Config';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';



const DeleteRpRenewal = ({alert,update,setAlert,getEmployeeByIdRpRenewal}) => {
    const deleteRow = async (update) => {
        try {
          // Backend deletion
          await axios.delete(
            `${config.baseUrl}/api/deleteUpdateRprenewalform/${update._id}`,
            { headers: { Authorization: `Bearer ${config.accessToken}` } }
          );
    
          // Update parent state
        //   removeDeletedItem(update._id);
    
          // Optionally refresh all data from backend
          getEmployeeByIdRpRenewal();
          setAlert(false)
        } catch (error) {
          console.log(error);
        }
      };
    
  return (
    <div>
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
    </div>
  )
}

export default DeleteRpRenewal