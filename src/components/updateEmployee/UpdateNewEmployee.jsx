
import React, { useCallback, useEffect, useState } from 'react'
import { Autocomplete, Button, Chip, Dialog, DialogContent, DialogTitle, Fab, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField, Tooltip } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import dayjs from 'dayjs'
import exit from '../../images/exit.svg'
import axios from 'axios'
import config from '../auth/Config'

// import "./forms.scss";

import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead";


import { InputAdornment } from "@mui/material";
// import ImageIcon from '@mui/icons-material/Image'; // Import Material UI icon
import upload from '../../images/upload.png'
import idCardImage from '../../images/id.png'
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useRef } from 'react';
import PrintIcon from "@mui/icons-material/Print";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import translate from "translate";
import { Link } from "react-router-dom";
import Backicon from "../header/Backicon";
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from "@mui/icons-material/Delete";
const UpdateNewEmployee = ({ update, showDialog, setShowDialog, ChangeRowData, fetchEmployeeData }) => {
  const [months, setMonths] = useState(0);
  const [DateOfBrith, setDateOfBrith] = useState(null)
  const [dateOfJoining, setDateOfjoining] = useState(null);
  const [visaTypeInfo, setVisaTypeInfo] = useState(null);
  const [englishText, setEnglishText] = useState("");
  const [arabicText, setArabicText] = useState("");
  const [dateOfIssue, setDateOfIssue] = useState(null)
  const [passportExpiry, setPassportExpiry] = useState(null)
  const [employeeImage, setEmployeeImage] = useState({ preview: null, file: null });
  const [passport, setPassport] = useState({ preview: null, file: null });
  const [idCard, setIdCard] = useState({ preview: null, file: null });
  const [contractCopy, setContractCopy] = useState({ preview: null, file: null });
  const [graduation, setGraduation] = useState({ preview: null, file: null });
  const [qatarExpiry, setQatarExpiry] = useState(null);
    const [salaryIncrements, setSalaryIncrements] = useState([
      { salaryIncrementAmount: "", salaryIncrementDate: null },
    ]);

  // Refs for each file input
  const employeeFileInputRef = useRef(null);
  const passportFileInputRef = useRef(null);
  const idCardFileInputRef = useRef(null);
  const contractCopyFileInputRef = useRef(null);
  const graduationFileInputRef = useRef(null);
  const history = useHistory()
  // Handle file change for each document
  const handleFileChange = (event, documentType) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      switch (documentType) {
        case 'employeeImage':
          setEmployeeImage({ preview: previewUrl, file: selectedFile })
          break;
        case 'passport':
          setPassport({ preview: previewUrl, file: selectedFile });
          break;
        case 'idCard':
          setIdCard({ preview: previewUrl, file: selectedFile });
          break;
        case 'contractCopy':
          setContractCopy({ preview: previewUrl, file: selectedFile });
          break;
        case 'graduation':
          setGraduation({ preview: previewUrl, file: selectedFile });
          break;
        default:
          break;
      }
    }
  };
  console.log(visaTypeInfo, 'visa Type info')
  const handleMonthChange = (event) => {
    const value = Number(event.target.value);
    if (isNaN(value) || value < 0) {
      setMonths(0);
    } else {
      setMonths(value);
    }
  };
  console.log(months, 'months')

  const calculateDateDifference = () => {
    // Validate dateOfJoining
    if (!dateOfJoining || isNaN(new Date(dateOfJoining).getTime())) {
      return {
        difference: "Please select a valid Date of Joining.",
        futureDate: "",
      };
    }

    // Validate months input
    if (!months || isNaN(months) || months <= 0) {
      return {
        difference: "Please enter a valid number of months.",
        futureDate: "",
      };
    }

    const joiningDate = new Date(dateOfJoining);
    const futureDate = new Date(joiningDate);

    futureDate.setMonth(joiningDate.getMonth() + months);

    // Check if futureDate is valid (some months have fewer days)
    if (isNaN(futureDate.getTime())) {
      return {
        difference: "Error: Invalid future date calculation.",
        futureDate: "",
      };
    }

    // Format future date as "YYYY-MM-DD"
    const futureDateString = futureDate.toISOString().split("T")[0];

    const timeDiff = futureDate - joiningDate;
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const monthsDiff = Math.floor(daysDiff / 30); // Assuming 30 days per month

    return {
      difference: `Difference: ${monthsDiff} months and ${daysDiff % 30} days`,
      futureDate: `Future Date: ${futureDateString}`,
    };
  };
console.log(dateOfJoining,'dateOfJoining')
  const result = calculateDateDifference();

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };
  // Debounced version of handleTranslate
  const debouncedTranslate = useCallback(
    debounce(async (text) => {
      try {
        const translatedText = await translate(text, { to: "ar" });

        setArabicText(translatedText);
      } catch (error) {
        console.error("Translation Error:", error);
      }
    }, 500), // Delay of 500ms
    []
  );

  // This function sets English text and triggers translation
  const handleEnglishTextChange = (e) => {
    const value = e.target.value;
    setEnglishText(value); // Update state for English text
    if (!value.trim()) {
      // Agar English text khaali hai, Arabic text ko bhi blank karo
      setArabicText("")
      return;
    }

    debouncedTranslate(value); // Call debounced translate

  };

  useEffect(() => {
    if (englishText) {
      debouncedTranslate(englishText); // Translate initially when component mounts
    }
  }, [englishText, debouncedTranslate]);

  const visaType = [
    { label: 'Work' },
    { label: 'License' },
    { label: 'Transfer' },
  ];


  console.log(update, 'this update')
  // useEffect(() => {
  //   // Pre-select employee if `update` prop is available
  //   if (update) {
  //     setArabicText(update.arabicName)
  //     setMonths(update.probationMonthofNumber)
  //     setVisaTypeInfo({ label: update.visaType }); // Set only the label part
  //     // setEmployeeImage(update.employeeImage.preview)
  //   }
  //   if (update && update.salaryIncrement) {
  //     const formattedIncrements = update.salaryIncrement.map((item) => ({
  //       salaryIncrementAmount: item.salaryIncrementAmount || "",
  //       salaryIncrementDate: item.salaryIncrementDate || null,
  //     }));
  //     setSalaryIncrements(formattedIncrements);
  //   }

  // }, [update]);

  const isInitialized = useRef(false);

useEffect(() => {
  if (update) {
    setArabicText(update.arabicName);
    setMonths(update.probationMonthofNumber);
    setVisaTypeInfo({ label: update.visaType });
   setDateOfjoining(update.dateOfJoining)
    if (update.salaryIncrement) {
      const formattedIncrements = update.salaryIncrement.map((item) => ({
        salaryIncrementAmount: item.salaryIncrementAmount || "",
        salaryIncrementDate: item.salaryIncrementDate || null,
      }));
      setSalaryIncrements(formattedIncrements);
    }

    // isInitialized.current = true; // ✅ only set true after all state is set
  }
}, [update]);

  //    ===================================update api==================================================================
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const updateRow = async (data, { action }) => {

    try {

      // Initialize FormData for both update and create actions
      const formData = new FormData();


      // Append dynamic fields from `data`
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      // if (qatarExpiry) {
      //   formData.append("qatarIdExpiry", qatarExpiry);
      // }
      formData.append("name", englishText || update.name);
      formData.append("arabicName", arabicText || update.arabicName);
      formData.append("dateOfBirth", DateOfBrith || update.dateOfBirth || "");
      formData.append("passportDateOfIssue", dateOfIssue || update.passportDateOfIssue || "");
      formData.append("passportDateOfExpiry", passportExpiry || update.passportDateOfExpiry || "");
      formData.append("qatarIdExpiry", qatarExpiry || update.qatarExpiry || "");
      formData.append("dateOfJoining", dateOfJoining || update.dateOfJoining || "");
      formData.append("probationMonthofNumber", months || update.probationMonthofNumber || "");
      formData.append("probationDate", result.futureDate.split("Future Date:")[1]?.trim() || update.probationDate || "");
      formData.append("visaType", visaTypeInfo.label || update.visaType.label);

      salaryIncrements.forEach((item, index) => {
        formData.append(`salaryIncrement[${index}][salaryIncrementAmount]`, item.salaryIncrementAmount|| "");
        formData.append(`salaryIncrement[${index}][salaryIncrementDate]`, item.salaryIncrementDate ||"");
      });
      // Append required files to FormData
      formData.append("employeeImage", employeeImage.file || update.employeeImage);
      formData.append("employeePassport", passport.file || update.employeePassport);
      formData.append("employeeQatarID", idCard.file || update.employeeQatarID);
      formData.append("employeeContractCopy", contractCopy.file || update.employeeContractCopy);
      formData.append("employeeGraduationCertificate", graduation.file || update.employeeGraduationCertificate);

      // Send POST request for creating a new employee
      await axios.put(`${config.baseUrl}/api/updateEmployee/${update._id}`, formData, {
        headers: { Authorization: `Bearer ${config.accessToken}` },
      }).then(response => {
        console.log(response)
      }).catch(error => console.log(error))
      // Handle success response
      fetchEmployeeData()
      setShowDialog(false)
      if (action === "print") {
        history.push('/Newemployeepdf', { data: Object.fromEntries(formData) });
      }
    } catch (error) {
      console.log(error)
    }
  };

  const totalSalaryIncrements  = salaryIncrements.reduce((acc,item)=>{
    const amount = parseFloat(item.salaryIncrementAmount) || 0;
    return acc + amount;
   },0) 

  const probationAmount = Number(update.probationAmount)  || 0
  const BasicSalary = Number(update.BasicSalary ) || 0;
  const HousingAmount = Number(update.HousingAmount)  || 0;
  const transportationAmount = Number(update.transportationAmount) ;
  const otherAmount = Number(update.otherAmount) || 0;

  const totalAmount =
  probationAmount+  BasicSalary + HousingAmount + transportationAmount + otherAmount + totalSalaryIncrements;
  console.log(totalAmount);

    // salary increment logic

    const handleAddField = () => {
      setSalaryIncrements([
        ...salaryIncrements,
        { salaryIncrementAmount: "", salaryIncrementDate: "" },
      ]);
    };
  
    const handleRemoveField = (index) => {
      const newIncrements = [...salaryIncrements];
      newIncrements.splice(index, 1);
      setSalaryIncrements(newIncrements);
    };
  
    const handleChange = (index, field, value) => {
      const newIncrements = [...salaryIncrements];
      newIncrements[index][field] = value;
      setSalaryIncrements(newIncrements);
    };
  return (
    <div>
      {
        update && (
          <Dialog open={showDialog} fullWidth maxWidth="lg" >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', }}>
              <IconButton onClick={() => setShowDialog(false)} sx={{ color: 'grey.800' }}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit(updateRow)}>
                <div className="container">
                  <div className="row">

                    <div className="col-11">

                      <h1 className="text-center title ">update EMPLOYEE JOINING FORM </h1>
                    </div>
                  </div>
                  <div className="icon-container">
                    {/* Hidden input for file selection */}
                    <input
                      type="file"
                      id="employeeImage"
                      accept="image/*"
                      style={{ display: 'none' }}
                      ref={employeeFileInputRef}

                      //  id = "employeeImage"
                      onChange={(e) => {
                        handleFileChange(e, "employeeImage");
                      }
                      }
                    />

                    {/* Image label for preview and file selection */}
                    <label htmlFor="employeeImage">
                      <img
                        className="center headingimage mt-3"

                        src={employeeImage.preview || update.employeeImage || upload} // Use preview, update image, or default image
                        alt="Profile Preview"
                        draggable="true"
                      />
                    </label>
                  </div>
                  <p className="subTitle">Employee Info</p>
                  {/* ---------------------------------------------Employee Info--------------------------------------------------------------------- */}
                  {/* ---------------------------------------------First Row--------------------------------------------------------------------- */}
                  <div className="row">
                    <div className="col-6">
                      <TextField
                        fullWidth
                        label="Name"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircle />
                            </InputAdornment>
                          ),
                        }}

                        placeholder="Enter a name as a passport"
                        variant="filled"
                        defaultValue={update.name}
                        onChange={handleEnglishTextChange}
                      />
                    </div>

                    <AutorenewIcon className="mt-3" />

                    <div className="col-5">
                      <TextField
                        fullWidth
                        label="اسم"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircle />
                            </InputAdornment>
                          ),
                        }}
                        placeholder="أدخل اسمًا كجواز سفر"
                        variant="filled"
                        value={arabicText}
                        onChange={(e) => setArabicText(e.target.value)} // Allow manual override
                      />
                    </div>
                  </div>


                  {/* ------------------------------------------------Second Row Strart Here---------------------------------------------------------- */}
                  <div className="row mt-4">
                    <div className="col">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker

                          sx={{ width: 300 }}
                          label="Date Of  Birth"
                          value={dayjs(update.dateOfBirth)}
                          format='DD/MM/YYYY'
                          views={["year", "month", "day"]}
                          onChange={(newValue) => setDateOfBrith(newValue)}
                          renderInput={(params) => (
                            <TextField name="date" {...params} />
                          )}
                        />
                      </LocalizationProvider>
                    </div>
                    <div className="col">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker

                          sx={{ width: 300 }}
                          label="Date Of Joining"
                          format='DD/MM/YYYY'
                          views={["year", "month", "day"]}
                          value={dayjs(update.dateOfJoining)}
                          onChange={(newValue) => setDateOfjoining(newValue)}
                          renderInput={(params) => (
                            <TextField name="date" {...params} />
                          )}

                        />
                      </LocalizationProvider>
                    </div>
                    <div className="col">
                      <TextField

                        sx={{ width: 300 }}
                        type="number"
                        value={update.mobileNumber}
                        id='mobileNumber'
                        {...register("mobileNumber")}
                        onChange={ChangeRowData}
                        label="Mobile Number"
                        variant="outlined"
                      />
                    </div>
                  </div>
                  {/* -----------------------------------------------------Thired Row Strart Here------------------------------------------------------- */}
                  <div className="row my-3">

                    <div className="col-4">
                      <TextField

                        sx={{ width: 300 }}
                        label="Marital Status"
                        variant="outlined"
                        value={update.maritalStatus}
                        id='maritalStatus'
                        {...register("maritalStatus")}
                        onChange={ChangeRowData}
                      />
                    </div>
                    <div className="col-4">
                      <TextField

                        value={update.nationality}
                        {...register("nationality")}
                        id='nationality'
                        onChange={ChangeRowData}
                        sx={{ width: 300 }}
                        label="Nationality"
                        variant="outlined"

                      />
                    </div>
                    <div className="col mt-3">
                      <TextField


                        sx={{ width: 300 }}
                        id='department'
                        {...register("department")}
                        value={update.department}
                        onChange={ChangeRowData}
                        label="Department "
                        variant="outlined"

                      />
                    </div>
                  </div>

                  {/* ------------------------------------------probation period--------------------------------------------------------------------------- */}
                  {/* ------------------------------------------Fort Row Strart Here--------------------------------------------------------------------------- */}
                  <p className="subTitle">probation period</p>
                  <div className="row my-3">
                    <div className="col-4">
                      <TextField

                        sx={{ width: 300 }}
                        label="Months"
                        variant="outlined"
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 2)

                        }}

                        id="probationMonthofNumber"
                        type="number"
                        defaultValue={update.probationMonthofNumber}
                        onChange={(e) => {
                          handleMonthChange(e)
                        }}
                      />
                    </div>
                    <div className="col mt-2">
                      <h2 className="badgedate badge badge-primary mx-4">
                        {result.difference}
                      </h2>
                      {result.futureDate && (
                        <h3 className="badgedate badge badge-secondary ">
                          {result.futureDate}
                        </h3>
                      )}
                    </div>




                  </div>

                  <div className="row my-3">
                    <div className="col">
                      <TextField

                        id='probationAmount'
                        {...register("probationAmount")}
                        value={update.probationAmount}
                        onChange={ChangeRowData}
                        sx={{ width: 300 }}
                        label="Probation Amount"
                        variant="outlined"

                      />
                    </div>

                  </div>

                  {/* --------------------------------------------------Salary Details-------------------------------------------------------- */}
                  {/* --------------------------------------------------Fort Row Strart Here-------------------------------------------------------- */}
                  <p className="subTitle">Salary Details</p>
                  <div className="row my-3">
                    <div className="col">
                      <TextField

                        sx={{ width: 300 }}
                        type="number"
                        label="Basic Salary"
                        variant="outlined"
                        id='BasicSalary'
                        {...register("BasicSalary")}
                        value={update.BasicSalary}
                        onChange={ChangeRowData}

                      />
                    </div>
                    <div className="col">
                      <TextField

                        sx={{ width: 300 }}
                        type="number"
                        label="Housing Amount"
                        variant="outlined"
                        {...register("HousingAmount")}
                        id='HousingAmount'
                        value={update.HousingAmount}
                        onChange={ChangeRowData}

                      />

                    </div>
                    <div className="col">
                      <TextField

                        sx={{ width: 300 }}
                        type="number"
                        label="Transportation Amount"
                        variant="outlined"
                        {...register("transportationAmount")}
                        id='transportationAmount'
                        value={update.transportationAmount}
                        onChange={ChangeRowData}
                      />

                    </div>
                  </div>



                  <div className="row">

                    <div className="col-4 my-3">
                      <TextField

                        sx={{ width: 300 }}
                        type="number"
                        label="Other Amount"
                        variant="outlined"
                        id='otherAmount'
                        {...register("otherAmount")}
                        value={update.otherAmount}
                        onChange={ChangeRowData}
                      />

                    </div>

                    <div className="col mt-3">
                  
                    <Chip label={`TotalAmount  ${totalAmount}`} color="primary" variant="outlined"
                sx={{ fontSize: "1.2rem", fontWeight: "bold", padding: "10px" }}
              size="medium" className="mt-4" />
                    </div>



                  </div>
                  <p className="subTitle">Salary Increment</p>

{salaryIncrements.map((item, index) => (
  <div className="row my-3" key={index}>
    <div className="col-4">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Increment Date"
          format="DD/MM/YYYY"
          value={dayjs(item.salaryIncrementDate)}
          onChange={(newDate) =>
            handleChange(index, "salaryIncrementDate", newDate)
          }
          sx={{ width: 300 }}
        />
      </LocalizationProvider>
    </div>

    <div className="col-4">
      <TextField
        sx={{ width: 300 }}
        type="number"
        label="Increment Amount"
        variant="outlined"
        value={item.salaryIncrementAmount}
        onChange={(e) =>
          handleChange(index, "salaryIncrementAmount", e.target.value)
        }
      />
    </div>

    <div className="col">
  
    <Tooltip title="Remove this field">
        <Fab
          size="small"
          color="error"
          onClick={() => handleRemoveField(index)}
        >
          <DeleteIcon />
        </Fab>
      </Tooltip>
    
      
    </div>
  </div>
))}

<div className="my-3">
  <Tooltip title="Add salary increment">
    <Fab variant="extended" color="primary" onClick={handleAddField}>
      <AddCircleIcon /> Add
    </Fab>
  </Tooltip>
</div>

                  {/* ------------------------------------------Qatar ID Details------------------------------------------------------------- */}
                  {/* ------------------------------------------Fifth Row Strart Here------------------------------------------------------------- */}
                  <p className="subTitle">Qatar ID Details</p>
                  <div className="row my-3">
                    <div className="col-4">
                      <TextField

                        sx={{ width: 300 }}
                        type="number"
                        {...register("qatarID")}
                        label="Qatar Id Number"
                        variant="outlined"
                        id='qatarID'
                        value={update.qatarID}
                        onChange={ChangeRowData}

                      />
                    </div>

                    <div className="col-4">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker

                          sx={{ width: 300 }}
                          label="QID Date Of Expiry"
                          value={dayjs(update.qatarIdExpiry)}
                          format="DD/MM/YYYY"
                          views={["year", "month", "day"]}
                          onChange={(newValue) => setQatarExpiry(newValue)}
                          renderInput={(params) => (
                            <TextField name="date" {...params} />
                          )}
                        />
                      </LocalizationProvider>
                    </div>
                    <div className="col-4">
                      <TextField
                        type="text"
                        sx={{ width: 300 }}
                        {...register("idDesignation")}
                        id='idDesignation'
                        value={update.idDesignation}
                        label="ID Designation"
                        variant="outlined"
                        onChange={ChangeRowData}
                      />
                    </div>

                  </div>
                  {/* ----------------------------------------------Sixt Row Strart Here------------------------------------------------------------ */}
                  <p className="subTitle">Passport Details</p>
                  <div className="row my-3">
                    <div className="col">
                      <TextField

                        sx={{ width: 300 }}
                        label="Passport Number"
                        variant="outlined"
                        {...register("passportNumber")}
                        id='passportNumber'
                        value={update.passportNumber}
                        onChange={ChangeRowData}
                      />
                    </div>
                    <div className="col">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          sx={{ width: 300 }}
                          label="Date Of Issue"
                          value={dayjs(update.passportDateOfIssue)}
                          format='DD/MM/YYYY'
                          views={["year", "month", "day"]}
                          onChange={(newValue) => setDateOfIssue(newValue)}
                          renderInput={(params) => (
                            <TextField name="date" {...params} />
                          )}
                        />
                      </LocalizationProvider>
                    </div>

                    <div className="col mt-3">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker


                          sx={{ width: 300 }}
                          label="Passport Date Of Expiry"
                          value={dayjs(update.passportDateOfExpiry)}
                          format='DD/MM/YYYY'
                          views={["year", "month", "day"]}
                          onChange={(newValue) => setPassportExpiry(newValue)}
                          renderInput={(params) => (
                            <TextField name="date" {...params} />
                          )}
                        />
                      </LocalizationProvider>
                    </div>


                  </div>

                  {/* ---------------------------Seven Row Strart Here----------------------------------------- */}
                  <p className="subTitle mt-2">For HR Purpose only</p>
                  <div className="row mt-4">

                    <div className="col-auto">
                      <TextField

                        sx={{ width: 300 }}

                        label="Employee Number"
                        variant="outlined"
                        value={update.employeeNumber}
                        {...register("employeeNumber")}
                        id='employeeNumber'
                        onChange={ChangeRowData}
                      />
                    </div>
                    <div className="col">
                      <TextField
                        sx={{ width: 300 }}
                        label="Position"
                        variant="outlined"
                        id='position'
                        {...register("position")}
                        value={update.position}
                        onChange={ChangeRowData}
                      />
                    </div>
                    <div className="col">
                       <Autocomplete
                        disablePortal
                        value={visaTypeInfo}
                        options={visaType}
                        getOptionLabel={(options) => options ? options.label : ""}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Visa Type" />}
                        onChange={(e, val) => {
                          setVisaTypeInfo(val)

                        }}

                      />
                    </div>


                  </div>
                  {/* ----------------------------------------------------sixt Row Strart Here----------------------------------------- */}

                  <div className="container">
                    <div className="row mt-2">
                      {/* Passport Image */}
                      <div className="col">
                        <div className="drop-zone">
                          <div className="icon-container">
                            <img
                              src={passport.preview || update.employeePassport || idCardImage} // Default icon when no preview
                              alt="Passport"
                              className="center"
                              draggable="true"
                            />
                          </div>
                          <input
                            type="file"
                            id="employeePassport"
                            ref={passportFileInputRef}

                            onChange={(e) => handleFileChange(e, 'passport')}
                            style={{ display: 'none' }}
                            accept="image/*"
                          />
                          <div className="inputFiletitle">
                            Employee Passport
                            <span
                              className="browseBtn"
                              onClick={() => passportFileInputRef.current.click()} // Trigger click via ref
                            >
                              browse
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* ID Card Image */}
                      <div className="col">
                        <div className="drop-zone">
                          <div className="icon-container">
                            <img
                              src={idCard.preview || update.employeeQatarID || idCardImage} // Default icon when no preview
                              alt="ID Card"
                              className="center"
                              draggable="false"
                            />
                          </div>
                          <input
                            type="file"
                            ref={idCardFileInputRef}
                            onChange={(e) => handleFileChange(e, 'idCard')}
                            style={{ display: 'none' }}
                            accept="image/*"
                          />
                          <div className="inputFiletitle">
                            Employee ID Card
                            <span
                              className="browseBtn"
                              onClick={() => idCardFileInputRef.current.click()} // Trigger click via ref
                            >
                              browse
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Contract Copy Image */}
                      <div className="col">
                        <div className="drop-zone">
                          <div className="icon-container">
                            <img
                              src={contractCopy.preview || update.employeeContractCopy || idCardImage} // Default icon when no preview
                              alt="Contract Copy"
                              className="center"
                              draggable="false"
                            />
                          </div>
                          <input
                            type="file"
                            ref={contractCopyFileInputRef}
                            onChange={(e) => handleFileChange(e, 'contractCopy')}
                            style={{ display: 'none' }}
                            accept="image/*"
                          />
                          <div className="inputFiletitle">
                            Employee Contract Copy
                            <span
                              className="browseBtn"
                              onClick={() => contractCopyFileInputRef.current.click()} // Trigger click via ref
                            >
                              browse
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Graduation Certificate Image */}
                      <div className="col">
                        <div className="drop-zone">
                          <div className="icon-container">
                            <img
                              src={graduation.preview || update.employeeGraduationCertificate || idCardImage} // Default icon when no preview
                              alt="Graduation Certificate"
                              className="center"
                              draggable="false"
                            />
                          </div>
                          <input
                            type="file"
                            ref={graduationFileInputRef}
                            onChange={(e) => handleFileChange(e, 'graduation')}
                            style={{ display: 'none' }}
                            accept="image/*"
                          />
                          <div className="inputFiletitle">
                            Employee Graduation Certificate
                            <span
                              className="browseBtn"
                              onClick={() => graduationFileInputRef.current.click()} // Trigger click via ref
                            >
                              browse
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                  {/* --------------------------------Print Button---------------------------------------------------------- */}

                  <Stack spacing={2} direction="row" marginBottom={2} justifyContent="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSubmit(updateRow)({ action: "print" })}
                    >
                      <PrintIcon className="mr-1" /> Print Form
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleSubmit(updateRow)({ action: "save" })}
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
  )
}

export default UpdateNewEmployee