import axios from 'axios';
import config from '../auth/Config';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';


function DeleteAnnualSettlement({alert,update,setAlert,getEmployeeAnnualSettlements}) {
   
    const deleteRow = async (update) => {
        try {
          await axios.delete(
            `${config.baseUrl}/api/deleteAnnualsettelment/${update._id}`,
            { headers: { Authorization: `Bearer ${config.accessToken}` } }
          );

          getEmployeeAnnualSettlements();
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

export default DeleteAnnualSettlement