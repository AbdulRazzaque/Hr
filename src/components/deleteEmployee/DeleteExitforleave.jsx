import axios from 'axios';
import config from '../auth/Config';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';



const DeleteExitforleave = ({alert,update,setAlert,getEmployeeByIdExitLeave}) => {
    const deleteRow = async (update) => {
        try {
          // Backend deletion
          await axios.delete(
            `${config.baseUrl}/api/deleteExitofleave/${update._id}`,
            { headers: { Authorization: `Bearer ${config.accessToken}` } }
          );
    
          // Update parent state
        //   removeDeletedItem(update._id);
    
          // Optionally refresh all data from backend
          getEmployeeByIdExitLeave();
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

export default DeleteExitforleave