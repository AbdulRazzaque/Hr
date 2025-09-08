import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import {updateEmployeeRejoinStatus} from './RejoinApi'
const RejoinEmployee = ({selectedEmployee,alert,setAlert,allEndofservice}) => {

    const handleRejoinConfirmation  = async () => {
    try {
      const result = await updateEmployeeRejoinStatus(selectedEmployee);
      console.log("Employee rejoined:", result);

      allEndofservice()
      setAlert(false);
    } catch (error) {

      console.error("Failed to rejoin employee:", error);
    }
  };
  return (
    <div>

           {selectedEmployee && (
                <Dialog open={alert} style={{ height: 600 }}>
                  <DialogTitle>Rejoin Employee</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are You sure You want to Rejoin this.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button  variant="contained" onClick={() => handleRejoinConfirmation ()}>
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

export default RejoinEmployee