import React, { useEffect, useState } from "react";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Autocomplete, Button, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import employeeWarning from '../../images/EmployeeWarning.jpg'
import { useForm } from "react-hook-form";
import { Bounce, toast, ToastContainer } from "react-toastify";
import config from "../auth/Config";
import axios from "axios";
import dayjs from "dayjs";
import PrintIcon from "@mui/icons-material/Print";
import Backicon from "../header/Backicon";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CloseIcon from '@mui/icons-material/Close';
const UpdateWarning = ({ update, showDialog, setShowDialog, ChangeRowData, getEmployeeByIdWarning }) => {
    const [display, setDisplay] = React.useState(false);
    const [date, setDate] = React.useState(dayjs());
    const [data, setData] = useState([])
    const [warningType, setWarningType] = useState(null)
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const history = useHistory()
      useEffect(() => {
        // Pre-select employee if `update` prop is available
        if (update && update.employeeId) {
          setSelectedEmployee(update.employeeId);  // assuming `employeeId` contains the full employee object
          setWarningType(update.warningType)
        }
    
    
      }, [update]);

    const onSubmit = async (data, {action}) => {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key])

        })
        try {
            formData.append("employeeId", selectedEmployee._id)
            formData.append("date", date)
            formData.append("warningType", warningType)
            const response = await axios.put(
                `${config.baseUrl}/api/updateWarning/${update._id}`, formData,
                {
                    headers: {
                        Authorization: `Bearer ${config.accessToken}`

                    }
                }
            )

            console.log(response)
            toast.success(response.data.message || "success", {
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

            getEmployeeByIdWarning()
            setShowDialog(false)
            if (action === "print") {
                history.push('/Warningpdf', { data: Object.fromEntries(formData) });
              }

        }
        catch (error) {
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




    const handleWarningTypeChange = (event) => {
        setWarningType(event.target.value); // Update state with selected value
        console.log("Selected Exit Type:", event.target.value); // For debugging
    };
    const handleEmployee = async (event, value) => {
        setSelectedEmployee(value); // Set selected employee

    }
    return (
        <div className="container">
            {
                update && (
                    <Dialog open={showDialog} fullWidth maxWidth="lg" >
                        <DialogTitle sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', }}>
                            <IconButton onClick={() => setShowDialog(false)} sx={{ color: 'grey.800' }}>
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>





                            <form onSubmit={handleSubmit(onSubmit)}>

                                <h1 className="mt-3 title text-center">
                                    <Backicon />
                                    Employee Warning</h1>
                                <ToastContainer />

                                <div className="icon-container">
                                    <img src={employeeWarning} alt="File icon" className="center headingimage mt-3" draggable="false" />
                                </div>
                                <p className="subTitle">Employee info</p>
                                {/* ---------------------------First Row Start Here----------------------------------------- */}
                                <div className="row">

                                    <div className="col-4">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                value={dayjs(update.date)}
                                                sx={{ width: 300 }}
                                                format="DD/MM/YYYY"
                                                label="Date"
                                                onChange={(newValue) => setDate(newValue)}
                                                renderInput={(params) => (
                                                    <TextField name="date" {...params} />
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </div>

                                </div>
                                <div className="row my-4">

                                    <div className="col-4 ">
                                        <Autocomplete
                                            disablePortal
                                            sx={{ width: 300 }}
                                            id="combo-box-demo"
                                            options={[update.employeeId]}  // wrap the employeeId in an array
                                            getOptionLabel={(option) => option.name || ""}  // Display employee name
                                            value={selectedEmployee}  // Set the pre-selected employee here
                                            onChange={handleEmployee}  // Handle selection
                                            renderInput={(params) => <TextField {...params} label="Name" required />}
                                        />
                                    </div>
                                    <div className="col-4  ">
                                        <TextField
                                            fullWidth
                                            id="Position"
                                            readOnly
                                            sx={{ width: 300 }}
                                            variant="outlined" // Use "outlined" or "filled" variant to prevent label overlap
                                            value={selectedEmployee?.position || ""} // Dynamically update position
                                            placeholder="Employee Number"
                                            label="Employee Number"
                                            InputProps={{
                                                readOnly: true, // Make position field read-only
                                            }}
                                        />
                                    </div>
                                    <div className="col-4  ">
                                        <TextField
                                            fullWidth
                                            id="Position"
                                            readOnly
                                            sx={{ width: 300 }}
                                            variant="outlined" // Use "outlined" or "filled" variant to prevent label overlap
                                            value={selectedEmployee?.employeeNumber || ""} // Dynamically update position
                                            placeholder="Employee Number"
                                            label="Employee Number"
                                            InputProps={{
                                                readOnly: true, // Make position field read-only
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="row my-5">

                                    <div className="col-4">
                                        <FormControl >
                                            <FormLabel id="demo-radio-buttons-group-label" className="font-weight-bold">Warning Type:</FormLabel>
                                            <RadioGroup row
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                name="radio-buttons-group"
                                                value={warningType} // Bind to state
                                                onChange={handleWarningTypeChange} // Handle change event
                                            >
                                                <FormControlLabel value="Warning" control={<Radio />} label="Warning" />
                                                <FormControlLabel value="Penalty" control={<Radio />} label="Penalty" />
                                            </RadioGroup>
                                        </FormControl>
                                    </div>


                                </div>
                                <div className="row my-4">
                                    <div className="col-11">
                                        <TextField
                                            {...register('penaltyAmount')}
                                            id="penaltyAmount"
                                            onChange={ChangeRowData}
                                            value={update.penaltyAmount}
                                            sx={{ width: 400 }}
                                            type="number"
                                            label="Penalty Amount"
                                            variant="outlined"
                                        />
                                    </div>
                                </div>
                                {/* ---------------------------Second Row Start Here----------------------------------------- */}
                                <div className="row">

                                    <div className="col-11">
                                        <TextField
                                            {...register('subject')}
                                            id="subject"
                                            // fullWidth
                                            value={update.subject}
                                            onChange={ChangeRowData}
                                            label="Subject"
                                            multiline
                                            rows={10}
                                            maxRows={5}
                                            variant="filled"
                                            // sx={{ width: 650 }}
                                            fullWidth
                                        />
                                    </div>





                                    {/* -------------------------------------- Fifth row Start Here---------------------------------------------------------*/}

                                    {/* --------------------------------Print Button---------------------------------------------------------- */}
                                    <Stack spacing={2} direction="row"  className ="my-5 " marginBottom={2} justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSubmit(onSubmit)({ action: "print" })}
          >
            <PrintIcon className="mr-1" /> Print Form
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleSubmit(onSubmit)({ action: "save" })}
          >
            <SaveIcon className="mr-1" /> Save Form
          </Button>
        </Stack>

                                </div>
                            </form>

                        </DialogContent>
                    </Dialog>
                )
            }

        </div>

    );
};

export default UpdateWarning;
