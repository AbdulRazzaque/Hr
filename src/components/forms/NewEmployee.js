import React, { useCallback } from "react";
import "./forms.scss";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {
  Autocomplete,
  Badge,
  Button,
  Chip,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
// import ImageIcon from '@mui/icons-material/Image'; // Import Material UI icon

import upload from "../../images/upload.png";
import idCardImage from "../../images/id.png";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useRef } from "react";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import { useState, useEffect } from "react";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import translate from "translate";
import { Link } from "react-router-dom";
import Backicon from "../header/Backicon";
import { useForm } from "react-hook-form";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import moment from "moment";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const NewEmployee = () => {
  const [display, setDisplay] = React.useState(false);
  const [englishText, setEnglishText] = useState("");
  const [arabicText, setArabicText] = useState("");
  const [DateOfBirth, setDateOfBirth] = useState(null);
  const [dateOfIssue, setDateOfIssue] = useState(null);
  const [passportExpiry, setPassportExpiry] = useState(null);
  const [dateOfJoining, setDateOfJoining] = useState(null);
  const [qatarExpiry, setQatarExpiry] = useState(null);
  const [visaTypeInfo, setVisaTypeInfo] = useState(null);
  const [months, setMonths] = useState(0);
  const [employeeImage, setEmployeeImage] = useState({
    preview: null,
    file: null,
  });
  const [passport, setPassport] = useState({ preview: null, file: null });
  const [idCard, setIdCard] = useState({ preview: null, file: null });
  const [contractCopy, setContractCopy] = useState({
    preview: null,
    file: null,
  });
  const [graduation, setGraduation] = useState({ preview: null, file: null });
  const [department, setDepartment] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [position, setPosition] = useState([]);
  const [selectPosition, setSelectedPosition] = useState("");

  // --------------------------------------- All Varibal Code -----------------------------------------------------
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setFocus,
    formState: { errors },
  } = useForm();
  const url = process.env.REACT_APP_DEVELOPMENT;
  const AccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzIyMjM1NDE0NGY1MmZjYjllMDI3ZWQiLCJpYXQiOjE3MzA4MjAyMTIsImV4cCI6MTc2MjM3NzgxMn0.WD66GSrSBKl_0V6T7F7RVHj1SXokR5xVYNwmlYU69P8";
  const history = useHistory();

  // const showToast = (message, type) => {
  //   const options = {
  //     position: type == "error" ? "top-right" : "top-center",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "dark",
  //   };
  //   type === "error"
  //     ? toast.error(message, options)
  //     : toast.success(message, options);
  // };
  // --------------------------------------- English to Arbic Translate Code -----------------------------------------------------
  //  Debounce function definition
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
      setArabicText("");
      return;
    }
    debouncedTranslate(value); // Call debounced translate
  };

  useEffect(() => {
    if (englishText) {
      debouncedTranslate(englishText); // Translate initially when component mounts
    }
  }, [englishText, debouncedTranslate]);

  // --------------------------------------- Probetion Date Difference Code -----------------------------------------------------

  const handleMonthChange = (event) => {
    const value = Number(event.target.value);
    if (isNaN(value) || value < 0) {
      setMonths(0);
    } else {
      setMonths(value);
    }
  };

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

  const result = calculateDateDifference();

  // --------------------------------------- Passport,id,other Docoument select Code -----------------------------------------------------

  console.log(selectedDepartment, "selectedDepartment");
  // Refs for each file input
  const employeeFileInputRef = useRef(null);
  const passportFileInputRef = useRef(null);
  const idCardFileInputRef = useRef(null);
  const contractCopyFileInputRef = useRef(null);
  const graduationFileInputRef = useRef(null);

  // Handle file change for each document
  const handleFileChange = (event, documentType) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      switch (documentType) {
        case "employeeImage":
          setEmployeeImage({ preview: previewUrl, file: selectedFile });
          break;
        case "passport":
          setPassport({ preview: previewUrl, file: selectedFile });
          break;
        case "idCard":
          setIdCard({ preview: previewUrl, file: selectedFile });
          break;
        case "contractCopy":
          setContractCopy({ preview: previewUrl, file: selectedFile });
          break;
        case "graduation":
          setGraduation({ preview: previewUrl, file: selectedFile });
          break;
        default:
          break;
      }
    }
  };

  //----------------------------------------------- Visa type ----------------------------------------------

  const visaType = [
    { label: "Work" },
    { label: "License" },
    { label: "Transfer" },
  ];

  //----------------------------------------------- Post Request ----------------------------------------------

  // console.log(employeeImage,'employeeImage')
  // const onSubmit = async (data, { action }) => {
  //   try {
  //     const formData = new FormData();

  //     Object.keys(data).forEach((key) => {
  //       formData.append(key, data[key]);
  //     });

  //     if (qatarExpiry) {
  //       formData.append("qatarIdExpiry", qatarExpiry);
  //     }

  //     if (employeeImage.file) {
  //       formData.append("employeeImage", employeeImage.file);
  //     }
  //     if (passport.file) {
  //       formData.append("employeePassport", passport.file);
  //     }
  //     if (idCard.file) {
  //       formData.append("employeeQatarID", idCard.file);
  //     }
  //     if (contractCopy.file) {
  //       formData.append("employeeContractCopy", contractCopy.file);
  //     }
  //     if (graduation.file) {
  //       formData.append("employeeGraduationCertificate", graduation.file);
  //     }

  //     formData.append("name", englishText);
  //     formData.append("arabicName", arabicText);
  //     formData.append("dateOfBirth", DateOfBirth);
  //     formData.append("passportDateOfIssue", dateOfIssue|| "");
  //     formData.append("passportDateOfExpiry", passportExpiry ||"");
  //     formData.append("dateOfJoining", dateOfJoining);
  //     formData.append("probationMonthofNumber", months);
  //     formData.append(
  //       "probationDate",
  //       result.futureDate.split("Future Date:")[1]?.trim()
  //     );
  //     formData.append("visaType", visaTypeInfo);
  //     formData.append("department", selectedDepartment);
  //     formData.append("position", selectPosition);

  //     // Append required files to FormData

  //     // Send POST request for creating a new employee
  //     const response = await axios.post(`${url}/api/newEmployee/`, formData, {
  //       headers: { Authorization: `Bearer ${AccessToken}` },
  //     });
  //     // console.log(response)
  //     // Handle success response
  //     // showToast(response.data.message, "success");
  //     toast.success(response.data.message, {
  //       position: "top-center",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: false,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //       transition: Bounce,
  //       });

  //     setVisaTypeInfo({});
  //     reset(); // Reset the form using your form library
  //     setEmployeeImage("");
  //     setIdCard("");
  //     setPassport("");
  //     setContractCopy("");
  //     setSelectedDepartment(null);
  //     setGraduation("");
  //     // Handle "Print" Action
  //     if (action === "print") {
  //       history.push("/Newemployeepdf", { data: Object.fromEntries(formData) });
  //     }
  //   } catch (error) {
  
  //     toast(error.response?.data.message ||"Please fill all required fields." , {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: false,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "dark",
  //       transition: Bounce,
  //       });
  //   }
  // };
  const onSubmit = async (data, { action }) => {
    try {
      const formData = new FormData();
  
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
  
      if (qatarExpiry) {
        formData.append("qatarIdExpiry", qatarExpiry);
      }
  
      if (employeeImage.file) {
        formData.append("employeeImage", employeeImage.file);
      }
      if (passport.file) {
        formData.append("employeePassport", passport.file);
      }
      if (idCard.file) {
        formData.append("employeeQatarID", idCard.file);
      }
      if (contractCopy.file) {
        formData.append("employeeContractCopy", contractCopy.file);
      }
      if (graduation.file) {
        formData.append("employeeGraduationCertificate", graduation.file);
      }
  
      formData.append("name", englishText);
      formData.append("arabicName", arabicText);
      formData.append("dateOfBirth", DateOfBirth);
      formData.append("passportDateOfIssue", dateOfIssue || "");
      formData.append("passportDateOfExpiry", passportExpiry || "");
      formData.append("dateOfJoining", dateOfJoining);
      formData.append("probationMonthofNumber", months);
      formData.append(
        "probationDate",
        result.futureDate.split("Future Date:")[1]?.trim()
      );
      formData.append("visaType", visaTypeInfo);
      formData.append("department", selectedDepartment);
      formData.append("position", selectPosition);
  
      // Send POST request for creating a new employee
      const response = await axios.post(`${url}/api/newEmployee/`, formData, {
        headers: { Authorization: `Bearer ${AccessToken}` },
      });
  
      // Handle success response
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
  
      setVisaTypeInfo({});
      reset(); // Reset the form using your form library
      setEmployeeImage("");
      setIdCard("");
      setPassport("");
      setContractCopy("");
      setSelectedDepartment(null);
      setGraduation("");
  
      // Handle "Print" Action
      if (action === "print") {
        history.push("/Newemployeepdf", { data: Object.fromEntries(formData) });
      }
    } catch (error) {
      console.log(error,'error')
      console.log(error.response.data.message)
          toast(error.response.data.message|| "Please fill all required fields.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      // if (error.response && error.response.data.errors) {
      //   // Handle backend validation errors
      //   const errorMessages = error.response.data.errors;
  
      //   // Display each error message in the respective field
      //   Object.keys(errorMessages).forEach((field) => {
      //     // This would depend on how you're displaying errors in your form
      //     // You can use a state to store these errors and display them in the UI
      //     console.log(`${field}: ${errorMessages[field]}`);
      //     // You can set errors to be displayed in the UI here (e.g., using setState for error messages)
      //   });
  
      //   // Show toast with the first error or a general error message
      //   toast(errorMessages[Object.keys(errorMessages)[0]] || "Please fill all required fields.", {
      //     position: "top-right",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: false,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "dark",
      //     transition: Bounce,
      //   });
      // } else {
      //   // Handle other errors (e.g., network issues)
      //   toast(error.response?.data.message || "An unexpected error occurred.", {
      //     position: "top-right",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: false,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "dark",
      //     transition: Bounce,
      //   });
      // }
    }
  };
  
  const getDepartment = async () => {
    try {
      await axios.get(`${url}/api/allDepartment`, {}).then((res) => {
        let arr = res.data.allDepartment.map((item, index) => ({
          ...item,
          id: index + 1,
        }));
        setDepartment(arr);

        // console.log(arr)
      });
    } catch (error) {
      // alert(error)
      console.log(error);
    }
  };

  const getPosition = async () => {
    try {
      await axios.get(`${url}/api/allPosition`, {}).then((res) => {
        let arr = res.data.allPosition.map((item, index) => ({
          ...item,
          id: index + 1,
        }));
        setPosition(arr);
        //  console.log(res,'res position')
        // console.log(arr)
      });
    } catch (error) {
      // alert(error)
      console.log(error);
    }
  };
  useEffect(() => {
    getDepartment();
    getPosition();
  }, []);

  const probationAmount = Number(watch("probationAmount")) || 0
  const BasicSalary = Number(watch("BasicSalary")) || 0;
  const HousingAmount = Number(watch("HousingAmount")) || 0;
  const transportationAmount = Number(watch("transportationAmount"));
  const otherAmount = Number(watch("otherAmount")) || 0;

  const totalAmount =
  probationAmount+  BasicSalary + HousingAmount + transportationAmount + otherAmount;
  console.log(totalAmount);
  // -------------------------------------------------------------End----------------------------------------------------------------------------
  return (
    <div className="row">
      <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
        <Dashhead id={3} display={display} />
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <ToastContainer />

          <div className="container">
            <div className="row">
              <Backicon />
              <div className="col-11">
                <h1 className="text-center title ">
                  EMPLOYEE JOINING FORM (THARB CAMEL HOSPITAL)
                </h1>
              </div>
            </div>
            <div className="icon-container">
              {/* Hidden input for file selection */}
              <input
                type="file"
                id="employeeImage"
                accept="image/*"
                style={{ display: "none" }}
                ref={employeeFileInputRef}
                //  id = "employeeImage"
                onChange={(e) => {
                  handleFileChange(e, "employeeImage");
                }}
              />

              {/* Image label for preview and file selection */}
              <label htmlFor="employeeImage">
                <img
                  className="center headingimage mt-3"
                  src={employeeImage.preview || upload} // Use preview, update image, or default image
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
                  onChange={handleEnglishTextChange}
                   autoFocus="autofocus"
                  error={!englishText}
                  helperText={!englishText ? "Name is required" : ""}
                  // required
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
                    format="DD/MM/YYYY"
                    views={["year", "month", "day"]}
                    onChange={(newValue) => setDateOfBirth(newValue)}
                    
                    renderInput={(params) => (
                      <TextField name="date" {...params}  
                      
                    />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div className="col">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: 300 }}
                    label="Date Of Joining"
                    format="DD/MM/YYYY"
                    views={["year", "month", "day"]}
                    onChange={(newValue) => setDateOfJoining(newValue)}
                    renderInput={(params) => (
                      <TextField name="date" {...params} />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div className="col">
                <TextField
                  {...register("mobileNumber")}
                  sx={{ width: 300 }}
                  type="number"
                  label="Mobile Number"
                  variant="outlined"
                
                />
              </div>
            </div>
            {/* -----------------------------------------------------Thired Row Strart Here------------------------------------------------------- */}
            <div className="row my-3">
              <div className="col-4">
                <TextField
                  {...register("maritalStatus")}
                  sx={{ width: 300 }}
                  label="Marital Status"
                  variant="outlined"
                />
              </div>
              <div className="col-4">
                <TextField
                  {...register("nationality",{ required: "Name is required" })}
                  sx={{ width: 300 }}
                  label="Nationality"
                  variant="outlined"
                  required
                />
              </div>
              <div className="col mt-3">
                <Autocomplete
                  disablePortal
                  // value={department}
                  options={department}
                  getOptionLabel={(option) => option?.department || ""}
                  sx={{ width: 300 }}
                  onChange={(e, value) => {
                    setSelectedDepartment(value ? value?.department : "");
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Department" required />
                  )}
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
                  required
                  variant="outlined"
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 2);
                  }}
                  id="probationMonthofNumber"
                  type="number"
                  onChange={(e) => {
                    handleMonthChange(e);
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
                  {...register("probationAmount",{ required: "probationAmount required" })}
                  type="number"
                  required
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
                  {...register("BasicSalary",{ required: "Basic Salary is required" })}
                  required
                />
              </div>
              <div className="col">
                <TextField
                  sx={{ width: 300 }}
                  type="number"
                  label="Housing Amount"
                  variant="outlined"
                  {...register("HousingAmount",{ required: "Housing Amount Salary is required" })}
                  required
                /> 
              </div>
              <div className="col">
                <TextField
                  sx={{ width: 300 }}
                  type="number"
                  label="Transportation Amount"
                  variant="outlined"
                  {...register("transportationAmount",{ required: "transportation Amount is required" })}
                  required
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
                  {...register("otherAmount")}
                  required
                />
              </div>

              <Chip label={`TotalAmount  ${totalAmount}`} color="primary" variant="outlined"
                sx={{ fontSize: "1.2rem", fontWeight: "bold", padding: "10px" }}
              size="medium" className="mt-4" />
            </div>

            {/* ------------------------------------------Qatar ID Details------------------------------------------------------------- */}
            {/* ------------------------------------------Fifth Row Strart Here------------------------------------------------------------- */}
            <p className="subTitle">Qatar ID Details</p>
            <div className="row my-3">
              <div className="col-4">
                <TextField
                  sx={{ width: 300 }}
                  type="number"
                  label="Qatar Id Number"
                  variant="outlined"
                  {...register("qatarID")}
                />
              </div>

              <div className="col-4">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: 300 }}
                    label="QID Date Of Expiry"
                    onChange={(newValue) => setQatarExpiry(newValue || null)}
                    format="DD/MM/YYYY"
                    views={["year", "month", "day"]}
                    renderInput={(params) => (
                      <TextField name="date" {...params} />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div className="col-4">
                <TextField
                  sx={{ width: 300 }}
                  type="text"
                  label="ID Designation"
                  variant="outlined"
                  {...register("idDesignation")}
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
                />
              </div>
              <div className="col">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: 300 }}
                    label="Date Of Issue"
                    format="DD/MM/YYYY"
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
                    format="DD/MM/YYYY"
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
              <div className="col-4">
                <TextField
                  sx={{ width: 300 }}
                  {...register("employeeNumber")}
                  label="Employee Number"
                  variant="outlined"
                />
              </div>
              <div className="col">
                {/* <TextField
          
                sx={{ width: 300}}
                {...register("position")}
                
                label="Position"
                variant="outlined"
              /> */}
                <Autocomplete
                  disablePortal
                  // value={selectPosition}
                  options={position}
                  getOptionLabel={(option) => option?.position || ""}
                  sx={{ width: 300 }}
                  onChange={(e, value) => {
                    setSelectedPosition(value ? value?.position : "");
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="position" required/>
                  )}
                />
              </div>
              <div className="col">
                <Autocomplete
                  disablePortal
                  options={visaType}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Visa Type"  required/>
                  )}
                  onChange={(e, val) => {
                    setVisaTypeInfo(val?.label);
                  }}
                  id="otherAmount"
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
                        src={passport.preview || idCardImage} // Default icon when no preview
                        alt="Passport"
                        className="center"
                        draggable="true"
                      />
                    </div>
                    <input
                      type="file"
                      id="employeePassport"
                      ref={passportFileInputRef}
                      onChange={(e) => handleFileChange(e, "passport")}
                      style={{ display: "none" }}
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
                        src={idCard.preview || idCardImage} // Default icon when no preview
                        alt="ID Card"
                        className="center"
                        draggable="false"
                      />
                    </div>
                    <input
                      type="file"
                      ref={idCardFileInputRef}
                      onChange={(e) => handleFileChange(e, "idCard")}
                      style={{ display: "none" }}
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
                        src={contractCopy.preview || idCardImage} // Default icon when no preview
                        alt="Contract Copy"
                        className="center"
                        draggable="false"
                      />
                    </div>
                    <input
                      type="file"
                      ref={contractCopyFileInputRef}
                      onChange={(e) => handleFileChange(e, "contractCopy")}
                      style={{ display: "none" }}
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
                        src={graduation.preview || idCardImage} // Default icon when no preview
                        alt="Graduation Certificate"
                        className="center"
                        draggable="false"
                      />
                    </div>
                    <input
                      type="file"
                      ref={graduationFileInputRef}
                      onChange={(e) => handleFileChange(e, "graduation")}
                      style={{ display: "none" }}
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

            <Stack
              spacing={2}
              direction="row"
              marginBottom={2}
              justifyContent="center"
            >
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
      </div>
    </div>
  );
};

export default NewEmployee;
