import React, { useCallback } from "react";
import "./forms.scss";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Autocomplete, Button, InputAdornment, Stack, TextField } from "@mui/material";
// import ImageIcon from '@mui/icons-material/Image'; // Import Material UI icon

import upload from '../../images/upload.png'
import idCardImage from '../../images/id.png'
import AccountCircle from '@mui/icons-material/AccountCircle';
import  { useRef } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from "@mui/icons-material/Print";
import { useState ,useEffect } from "react";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import translate from "translate";
import { Link } from "react-router-dom";
import Backicon from "../header/Backicon";
import { useForm } from 'react-hook-form' 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import moment from 'moment'
import { useLocation } from 'react-router-dom';
import dayjs from "dayjs";
import { useSelector } from "react-redux";
const NewEmployee = () => {

  const location = useLocation();
  const infoEmployee =location?.state?.data|| null
  // const infoEmployee = useSelector((state) => state.socket[0].message)
  console.log(infoEmployee)
    const [updateEmployee, setUpdateEmployee] = useState(infoEmployee|| {});
    const [display, setDisplay] = React.useState(false);
    const [englishText, setEnglishText] = useState("");
    const [arabicText, setArabicText] = useState("");
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [DateOfBrith,setDateOfBrith]=useState(null)
    const [dateOfIssue,setDateOfIssue]=useState(null)
    const [passportExpiry,setPassportExpiry]=useState(null)
    // State to hold selected images by document type
    const [selectedImages, setSelectedImages] = useState({});
    
    const [dateOfjoining, setDateOfjoining] = useState(null);
    const [qatarExpiry, setQatarExpiry] = useState(null);
    const [visaTypeInfo, setVisaTypeInfo] = useState(null);
    
    
    const [months, setMonths] = useState(0);
    const [imagePreviews, setImagePreviews] = useState({});
   
    // --------------------------------------- All Varibal Code -----------------------------------------------------
    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    const url = process.env.REACT_APP_DEVELOPMENT;
    const AccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzIyMjM1NDE0NGY1MmZjYjllMDI3ZWQiLCJpYXQiOjE3MzA4MjAyMTIsImV4cCI6MTc2MjM3NzgxMn0.WD66GSrSBKl_0V6T7F7RVHj1SXokR5xVYNwmlYU69P8";


    const showToast = (message,type) => {
     const options = {
       position:type =="error"? "top-right":"top-center", 
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
     };
     type === 'error'
      ? toast.error(message,options)
      :toast.success(message,options)
    };
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
            if(!value.trim()){
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

  
    // --------------------------------------- Probetion Date Difference Code -----------------------------------------------------


    const handleMonthChange = (event) => {
      setMonths(Number(event.target.value));
    };

    const calculateDateDifference = () => {
      if (months > 0) {
        const currentDate = new Date();
        
        const futureDate = new Date();
       
        futureDate.setMonth(currentDate.getMonth() + months);
  
        // Format future date as "YYYY-MM-DD"
        const futureDateString = futureDate.toISOString().split('T')[0];
  
        const timeDiff = futureDate - new Date();
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const monthsDiff = Math.floor(daysDiff / 30); // Assuming 30 days per month
  
        return {
          difference: `Difference: ${monthsDiff} months and ${daysDiff % 30} days`,
          futureDate: `Future Date:  ${futureDateString} `,
         
         
        };
      }
      return {
        difference: 'Please select a number of months',
        futureDate: ''
      };
    };
  
    const result = calculateDateDifference();
 


// --------------------------------------- Passport,id,other Docoument select Code -----------------------------------------------------
const [employeeImage, setEmployeeImage] = useState({ preview: null, file: null });
const [passport, setPassport] = useState({ preview: null, file: null });
const [idCard, setIdCard] = useState({ preview: null, file: null });
const [contractCopy, setContractCopy] = useState({ preview: null, file: null });
const [graduation, setGraduation] = useState({ preview: null, file: null });

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


//----------------------------------------------- Visa type ----------------------------------------------

const visaType = [
  { label: 'Work'},
  { label: 'License'},
  { label: 'Transfer'},
];


//----------------------------------------------- Post Request ----------------------------------------------

const onSubmit = async (data, event) => {
  try {
    // Initialize FormData for both update and create actions
    const formData = new FormData();

    if (qatarExpiry) {
      formData.append("qatarIdExpiry", qatarExpiry);
    }

    // Handle the update flow if the employee exists
    if (updateEmployee?._id) {
      // Append dynamic fields from `updateEmployee`
      // Object.keys(updateEmployee).forEach((key) => {
      //   formData.append(key, updateEmployee[key]);
      // });
      Object.keys(updateEmployee).forEach((key) => {
        if (
          ![
            "name",
            "arabicName",
            "employeeImage",
            "employeePassport",
            "employeeQatarID",
            "employeeContractCopy",
            "employeeGraduationCertificate",
            "dateOfBirth",
            "passportDateOfIssue",
            "passportDateOfExpiry",
            "dateOfJoining",
            "probationDate",
            "visaType",
          ].includes(key)
        ) {
          formData.set(key, updateEmployee[key]);
        }
      });
      formData.append("dateOfBirth", DateOfBrith || updateEmployee.dateOfBirth);
      formData.append("passportDateOfIssue", dateOfIssue || updateEmployee.passportDateOfIssue);
      formData.append("passportDateOfExpiry", passportExpiry || updateEmployee.passportDateOfExpiry);
      formData.append("dateOfJoining", dateOfjoining || updateEmployee.dateOfJoining);
      formData.append("employeeQatarID", qatarExpiry || updateEmployee.qatarIdExpiry);
      
      formData.append("probationDate", result.futureDate.split("Future Date:")[1]?.trim() || updateEmployee.probationDate);
      formData.append("visaType", visaTypeInfo||updateEmployee.visaType);
      formData.append("name", englishText || updateEmployee.name);
      formData.append("arabicName", arabicText || updateEmployee.arabicName );
      // Append files to FormData, falling back to existing fields if no new files are provided
      formData.append("employeeImage", employeeImage.file || updateEmployee.employeeImage);
      formData.append("employeePassport", passport.file || updateEmployee.employeePassport);
      formData.append("employeeQatarID", idCard.file || updateEmployee.employeeQatarID);
      formData.append("employeeContractCopy", contractCopy.file || updateEmployee.employeeContractCopy);
      formData.append("employeeGraduationCertificate", graduation.file || updateEmployee.employeeGraduationCertificate);

      console.log(formData,'this is update')
      // Send PUT request for updating an employee
      const response = await axios.put(`${url}/api/updateEmployee/${updateEmployee._id}`, formData, {
        headers: { Authorization: `Bearer ${AccessToken}` },
      });

      // Handle success response
      showToast(response.data.message, "success");
      setUpdateEmployee(response.data.updatedEmployee); // Update state with new data
    } 
    // Handle the create flow for a new employee
    else {
      // Append dynamic fields from `data`
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      // Validate that all required files are uploaded
      if (!employeeImage.file || !passport.file || !idCard.file || !contractCopy.file || !graduation.file) {
        showToast("Please upload all images", "error");
        return; // Stop execution if validation fails
      }
      formData.append("name", englishText);
      formData.append("arabicName", arabicText);
      formData.append("dateOfBirth", DateOfBrith);
      formData.append("passportDateOfIssue", dateOfIssue);
      formData.append("passportDateOfExpiry", passportExpiry);
      formData.append("dateOfJoining", dateOfjoining);
      formData.append("probationMonthofNumber", months);
      formData.append("probationDate", result.futureDate.split("Future Date:")[1]?.trim());
      formData.append("visaType", visaTypeInfo);

      // Append required files to FormData
      formData.append("employeeImage", employeeImage.file);
      formData.append("employeePassport", passport.file);
      formData.append("employeeQatarID", idCard.file);
      formData.append("employeeContractCopy", contractCopy.file);
      formData.append("employeeGraduationCertificate", graduation.file);

      // Send POST request for creating a new employee
      const response = await axios.post(`${url}/api/newEmployee/`, formData, {
        headers: { Authorization: `Bearer ${AccessToken}` },
      });

      // Handle success response
      showToast(response.data.message, "success");

      // Reset form fields and states
      setUpdateEmployee({});
      setVisaTypeInfo({});
      reset(); // Reset the form using your form library
      setEmployeeImage("");
      setIdCard("");
      setPassport("");
      setContractCopy("");
      setGraduation("");
    }
  } catch (error) {
    // Handle error response and display a user-friendly message
    showToast(error.response?.data.message || "An error occurred. Please try again.", "error");
  }
};



//=============================================update Employee Data ===================================================================




const handelUpdateEmployeeData = (e) => {
  const { id, value } = e.target;

  setUpdateEmployee((prevState) => ({ ...prevState, [id]: value }));
 };
 


useEffect(() => {

}, [updateEmployee]);


//============================================update employee api ===================================================================



//----------------------------------------------- all  console.log ----------------------------------------------

console.log(updateEmployee,'this is newEmployee Form')
console.log(englishText)
// -------------------------------------------------------------End----------------------------------------------------------------------------
    return (
      <div className="row">
      <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
      <Dashhead id={2} display={display} />
      </div>
  
      <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container" onClick={()=>display&&setDisplay(false)}>
      <span className="iconbutton display-mobile">
      <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
      <MenuIcon fontSize="inherit" />
       </IconButton>
       </span>
       <form onSubmit={handleSubmit(onSubmit)}>
       <ToastContainer />
       
       <div className="container">
        <div className="row">
   <Backicon/>
          <div className="col-11">

         <h1 className="text-center title ">EMPLOYEE JOINING FORM (THARB CAMEL HOSPITAL)</h1>
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
              onChange={(e)=>{
            handleFileChange(e, "employeeImage");
              }
              }
            />

            {/* Image label for preview and file selection */}
            <label htmlFor="employeeImage">
              <img
                className="center headingimage mt-3"
                
                src={ employeeImage.preview || updateEmployee.employeeImage||upload} // Use preview, update image, or default image
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
      // value={englishText}
          defaultValue={updateEmployee.name}
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
                  onChange={(newValue) => setDateOfBrith(newValue)}
                  renderInput={(params) => (
                    <TextField name="date" {...params} />
                  )}
                  value={updateEmployee?.dateOfBirth ? dayjs(updateEmployee?.dateOfBirth):null}
                />
              </LocalizationProvider>
              </div>
              <div className="col">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                 
                  sx={{ width: 300 }}
                  label="Date Of Joining"
                
                  onChange={(newValue) => setDateOfjoining(newValue)}
                  renderInput={(params) => (
                    <TextField name="date" {...params} />
                  )}
                  value={updateEmployee?.dateOfJoining? dayjs(updateEmployee?.dateOfJoining):null}
                />
              </LocalizationProvider>
              </div>
              <div className="col">
              <TextField
              {...register("mobileNumber")}
              id="mobileNumber"
              sx={{ width: 300 }}
              type="number"
              label="Mobile Number"
              variant="outlined"
              onChange={(e) => handelUpdateEmployeeData(e)}
              value={updateEmployee?.mobileNumber || ""}
            />
              </div>
            </div>
{/* -----------------------------------------------------Thired Row Strart Here------------------------------------------------------- */}
                      <div className="row my-3">
     
              <div className="col-4">
              <TextField
                
                {...register("maritalStatus", { pattern: /^\S.*\S$/ })}
                sx={{ width: 300 }}
                label="Marital Status"
                variant="outlined"
                value={updateEmployee?.maritalStatus|| ""}
                id="maritalStatus"
                onChange={(e) => handelUpdateEmployeeData(e)}
              />
              </div>
              <div className="col-4">
              <TextField
                {...register("nationality", { pattern: /^\S.*\S$/ })}
                
                sx={{ width: 300}}
                label="Nationality"
                variant="outlined"
                value={updateEmployee?.nationality}
                id="nationality"
                onChange={(e) => handelUpdateEmployeeData(e)}
              />
              </div>
              <div className="col mt-3">
              <TextField
           
           {...register("department", { pattern: /^\S.*\S$/ })}
                sx={{ width: 300}}
                
                label="Department "
                variant="outlined"
                value={updateEmployee?.department}
                id="department"
                onChange={(e) => handelUpdateEmployeeData(e)}
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
            onInput = {(e) =>{
              e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,2)

          }}
          value={updateEmployee?.probationMonthofNumber}
          id="probationMonthofNumber"
            type="number"
          onChange={(e) => {
            handelUpdateEmployeeData(e)
            handleMonthChange(e)
          }}
          />
              </div>
              <div className="col mt-2">
          <h2 className="badgedate badge badge-primary mx-4">
          { updateEmployee?.probationDate? moment.parseZone(updateEmployee?.probationDate).format("DD/MM/YYYY"):  result.difference}
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
            {...register("probationAmount", { pattern: /^\S.*\S$/ })}
  
            sx={{ width: 300 }}
            label="Probation Amount"
            variant="outlined"
            value={updateEmployee?.probationAmount}
            id="probationAmount"
            onChange={(e) => handelUpdateEmployeeData(e)}
            />
            </div>

          </div>

{/* --------------------------------------------------Salary Details-------------------------------------------------------- */}
{/* --------------------------------------------------Fort Row Strart Here-------------------------------------------------------- */}
          <p className="subTitle">Salary Details</p>
                      <div className="row my-3">
              <div className="col">
              <TextField
               
                sx={{ width: 300}}
                type="number"
                label="Basic Salary"
                variant="outlined"
                {...register("BasicSalary", { pattern: /^\S.*\S$/ })}
                value={updateEmployee?.BasicSalary}
                id="BasicSalary"
                onChange={(e) => handelUpdateEmployeeData(e)}
              />
              </div>
              <div className="col">
              <TextField
             
                sx={{ width: 300}}
                type="number"
                label="Housing Amount"
                variant="outlined"
                {...register("HousingAmount", { pattern: /^\S.*\S$/ })}
                value={updateEmployee?.HousingAmount}
                id="HousingAmount"
                onChange={(e) => handelUpdateEmployeeData(e)}
              />
             
              </div>
              <div className="col">
              <TextField
       
                sx={{ width: 300}}
                type="number"
                label="Transportation Amount"
                variant="outlined"
                {...register("transportationAmount", { pattern: /^\S.*\S$/ })}
                value={updateEmployee?.transportationAmount}
                id="transportationAmount"
                onChange={(e) => handelUpdateEmployeeData(e)}
              />
             
              </div>
              </div>
             
         

         <div className="row">

                    <div className="col-4 my-3">
                    <TextField
                 
                      sx={{ width: 300}}
                      type="number"
                      label="Other Amount"
                      variant="outlined"
                {...register("otherAmount", { pattern: /^\S.*\S$/ })}
                value={updateEmployee?.otherAmount}
                id="otherAmount"
                onChange={(e) => handelUpdateEmployeeData(e)}
                    />

                    </div>

                    <div className="col mt-3">
                    <Autocomplete
                    disablePortal
                    options={visaType}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Visa Type" />}
                    onChange={(e,val) =>{
                      setVisaTypeInfo(val?.label)
                      handelUpdateEmployeeData(e)
                    } }
                    value={updateEmployee?.visaType}
                    id="otherAmount"
                   
                    />
                    </div>

                      </div>

            
{/* ------------------------------------------Qatar ID Details------------------------------------------------------------- */}
{/* ------------------------------------------Fifth Row Strart Here------------------------------------------------------------- */}
          <p className="subTitle">Qatar ID Details</p>
                      <div className="row my-3">
              <div className="col-4">
              <TextField
          
                sx={{ width: 300}}
                type="number"
                label="Qatar Id Number"
                variant="outlined"
                {...register("qatarID")}
                value={updateEmployee?.qatarID}
                id="qatarID"
                onChange={(e) => handelUpdateEmployeeData(e)}
              />
              </div>
           
              <div className="col-4">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                 
                  sx={{ width: 300 }}
                  label="QID Date Of Expiry"
                  onChange={(newValue) => setQatarExpiry(newValue||null)}
                  format="DD/MM/YYYY"
              value={updateEmployee?.qatarIdExpiry? dayjs(updateEmployee?.qatarIdExpiry):null}
                  renderInput={(params) => (
                    <TextField name="date" {...params} />
                  )}
                />
              </LocalizationProvider>
              </div>

            </div>
{/* ----------------------------------------------Sixt Row Strart Here------------------------------------------------------------ */}
          <p className="subTitle">Passport Details</p>
                      <div className="row my-3">
              <div className="col">
              <TextField
                
                sx={{ width: 300}}
                label="Passport Number"
                variant="outlined"
                {...register("passportNumber", { pattern: /^\S.*\S$/ })}
                value={updateEmployee?.passportNumber}
                id="passportNumber"
                onChange={(e) => handelUpdateEmployeeData(e)}
              />
              </div>
              <div className="col">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: 300 }}
                  label="Date Of Issue"
              
                  value={updateEmployee?.passportDateOfIssue? dayjs(updateEmployee?.passportDateOfIssue):null}
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
                    value={updateEmployee?.passportDateOfExpiry? dayjs(updateEmployee?.passportDateOfExpiry):null}
                  
                  sx={{ width: 300 }}
                  label="Passport Date Of Expiry"
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
             
                sx={{ width: 300}}
                {...register("employeeNumber", { pattern: /^\S.*\S$/ })}
                label="Employee Number"
                variant="outlined"
                value={updateEmployee?.employeeNumber}
                id="employeeNumber"
                onChange={(e) => handelUpdateEmployeeData(e)}
              />
              </div>
              <div className="col">
              <TextField
          
                sx={{ width: 300}}
                {...register("position", { pattern: /^\S.*\S$/ })}
                
                label="Position"
                variant="outlined"
                value={updateEmployee?.position}
                id="position"
                onChange={(e) => handelUpdateEmployeeData(e)}
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
                src={passport.preview || updateEmployee.employeePassport|| idCardImage} // Default icon when no preview
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
                src={idCard.preview ||updateEmployee.employeeQatarID || idCardImage} // Default icon when no preview
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
                src={ contractCopy.preview|| updateEmployee.employeeContractCopy|| idCardImage} // Default icon when no preview
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
                src={ graduation.preview|| updateEmployee.employeeGraduationCertificate|| idCardImage} // Default icon when no preview
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
            
            <Stack spacing={2} direction="row" marginBottom={2}  justifyContent="center">
         <Link to="/Newemployeepdf"> <Button variant="contained" type="submit" > <PrintIcon className="mr-1"/> Print Form</Button></Link> 
            <Button variant="contained" color="success" type="submit"> <SaveIcon className="mr-1"/> Save Form</Button>
            </Stack>
       </div>
       </form>
       </div>
       </div>
    )
}

export default NewEmployee