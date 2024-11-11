import React, { useCallback } from "react";
import "./forms.scss";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Autocomplete, Button, InputAdornment, Stack, TextField } from "@mui/material";

import upload from '../../images/upload.png'
import idCard from '../../images/id.png'
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
const NewEmployee = () => {

    const [display, setDisplay] = React.useState(false);
    const [englishText, setEnglishText] = useState("");
    const [arabicText, setArabicText] = useState("");
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [DateOfBrith,setDateOfBrith]=useState(null)
    const [dateOfIssue,setDateOfIssue]=useState(null)
    const [passportExpiry,setPassportExpiry]=useState(null)
    // State to hold selected images by document type
    const [selectedImages, setSelectedImages] = useState({});
    
    const [dateOfjoining, setDateOfjoining] = useState({});
    const [qatarExpiry, setQatarExpiry] = useState(null);
    const [visaTypeInfo, setVisaTypeInfo] = useState(null);
    const [profilePreview, setProfilePreview] = useState(null);
    
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
                console.log(translatedText)
                setArabicText(translatedText);
              } catch (error) {
                console.error("Translation Error:", error);
              }
            }, 500), // Delay of 500ms
            []
          );

          // This function sets English text and triggers translation
          const handleEnglishTextChange = (e) => {
            setEnglishText(e.target.value);
            debouncedTranslate(e.target.value); // Call debounced translate
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
 

    // --------------------------------------- Employee Profile image Code -----------------------------------------------------

    const handelProfileChange = (event)=>{
      const selectedFile = event.target.files[0];
      if(selectedFile){
        const imgUrl = (selectedFile)
        const perview = URL.createObjectURL(selectedFile)
        // const imgUrl = URL.createObjectURL(selectedFile)
        setSelectedProfile (imgUrl)
        setProfilePreview(perview)

    }
    };

// --------------------------------------- Passport,id,other Docoument select Code -----------------------------------------------------
const documentTypes = [
  { id: 'passport', title: 'Passport' },
  { id: 'idCard', title: 'ID Card' },
  { id: 'contractCopy', title: 'Contract Copy' },
  { id: 'graduation', title: 'Graduation Certificate' },
];
 // Refs for each document input field
 const passportFileInputRef = useRef(null);
 const idCardFileInputRef = useRef(null);
 const contractCopyFileInputRef = useRef(null);
 const graduationFileInputRef = useRef(null);

 // State to store the selected images


 // Function to handle browse button clicks
 const handleBrowseClick = (documentType) => {
   switch (documentType) {
     case 'passport':
       passportFileInputRef.current.click();
       break;
     case 'idCard':
       idCardFileInputRef.current.click();
       break;
    
     case 'contractCopy':
       contractCopyFileInputRef.current.click();
       break;
     case 'graduation':
       graduationFileInputRef.current.click();
       break;
     default:
       break;
   }
   // Clear the previous image preview
   clearSelectedImage(documentType);
 };

 // Function to handle file input change
 const handleFileChange = (event, documentType) => {
   const selectedFile = event.target.files[0];
  if(selectedFile){
    updateSelectedImage(documentType,selectedFile)
  }
 };

 // Function to update the selected image preview
 const updateSelectedImage = (documentType, imgFile) => {
   setSelectedImages((prevSelectedImages) => ({
     ...prevSelectedImages,
     [documentType]: imgFile,
   }));
   setImagePreviews((prevPreviews) => ({
    ...prevPreviews,
    [documentType]: URL.createObjectURL(imgFile), // Store the preview URL separately
  }));
 };

 // Function to clear the selected image
 const clearSelectedImage = (documentType) => {
   setSelectedImages((prevSelectedImages) => ({
     ...prevSelectedImages,
     [documentType]: null,
   }));
   setImagePreviews((prevPreviews) => ({
    ...prevPreviews,
    [documentType]: null,
  }));
 };
//----------------------------------------------- Visa type ----------------------------------------------

const visaType = [
  { label: 'Work'},
  { label: 'License'},
  { label: 'Transfer'},
];
console.log(visaTypeInfo)
//----------------------------------------------- Post Request ----------------------------------------------
console.log(arabicText)
const onSubmit = async(data,event)=>{
          // Create a FormData object to send data and image files
        const formData = new FormData();

        // Append each field individually
        formData.append("dateOfBirth", DateOfBrith);
        formData.append("passportDateOfIssue", dateOfIssue);
        formData.append("passportDateOfExpiry", passportExpiry);
        formData.append("dateOfJoining", dateOfjoining);
     
        formData.append("arabicName", arabicText);
        formData.append("probationMonthofNumber", months);
        formData.append("probationDate", result.futureDate.split("Future Date:")[1]?.trim());
        formData.append("visaType",visaTypeInfo);
        if(qatarExpiry){
          formData.append("qatarIdExpiry", qatarExpiry);
        }
        // Append the dynamic fields from `data`
        Object.keys(data).forEach((key) => {
          formData.append(key, data[key]);
        });
        if(!selectedProfile || !selectedImages.passport|| !selectedImages.idCard|| !selectedImages.contractCopy || !selectedImages.graduation){
          showToast( "Please upload all images","error");
        }
        // Append the image(s) to the form data
        // Assuming `data.imageFile` holds your file, adapt as needed
        else if (selectedImages) {
          formData.append("employeeImage", selectedProfile);
          formData.append("employeePassport", selectedImages.passport);
          formData.append("employeeQatarID", selectedImages.idCard);
          formData.append("employeeContractCopy", selectedImages.contractCopy);
          formData.append("employeeGraduationCertificate", selectedImages.graduation);
          
        }
      try {
        const response = await axios.post(`${url}/api/newEmployee/`, formData, 
          {headers:{Authorization:`Bearer ${AccessToken}`}}
      );
        showToast(response.data.message,'success');
        reset();
        setSelectedImages("")
        setSelectedProfile("")
        setImagePreviews({}); // Clear previews
        setProfilePreview({})
      } catch (error) {
        showToast(error.response?.data.message,"error");
      }
}

//----------------------------------------------- all  console.log ----------------------------------------------


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
                {/* <img src={person}  alt="File icon" className="center headingimage mt-3" draggable="false"/> */}
                <input  type= "file"  id="imageInput" accept="image/*" style={{display:'none'}} onChange={handelProfileChange} />
        <label htmlFor="imageInput">  <img  className="center headingimage mt-3" src={profilePreview || upload}></img> </label>
            </div>
          <p className="subTitle">Employee Info</p>
 {/* ---------------------------------------------Employee Info--------------------------------------------------------------------- */}
 {/* ---------------------------------------------First Row--------------------------------------------------------------------- */}
                      <div className="row">
              <div className="col-6">
                <TextField
                  id="filled-basic"
                  fullWidth
                  label="Name"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  {...register("name", { pattern: /^\S.*\S$/ })}
                  placeholder="Enter a name as a passport"
                  variant="filled"
                  value={englishText}
                  onChange={handleEnglishTextChange}
                 
                />
              </div>

    
             < AutorenewIcon className="mt-3" />
              <div className="col-5">
                <TextField
                  id="filled-basic"
                  fullWidth
                  label="اسم"
                  // {...register("arabicName", { pattern: /^\S.*\S$/ })}
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
             onChange={(e) => setArabicText(e.target.value)}
                />
              </div>
            </div>
            
{/* ------------------------------------------------Second Row Strart Here---------------------------------------------------------- */}
                      <div className="row mt-4">
              <div className="col">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
              
                  sx={{ width: 300 }}
                  label="Date Of  Brith"
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
                  onChange={(newValue) => setDateOfjoining(newValue)}
                  renderInput={(params) => (
                    <TextField name="date" {...params} />
                  )}
                />
              </LocalizationProvider>
              </div>
              <div className="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 300}}
                type="number"
                label="Mobile Number"
                variant="outlined"
                {...register("mobileNumber", { pattern: /^\S.*\S$/ })}
              />
              </div>
            </div>
{/* -----------------------------------------------------Thired Row Strart Here------------------------------------------------------- */}
                      <div className="row my-3">
     
              <div className="col-4">
              <TextField
                id="outlined-basic"
                sx={{ width: 300 }}
                
                label="Marital Status"
                variant="outlined"
                {...register("maritalStatus", { pattern: /^\S.*\S$/ })}
              />
              </div>
              <div className="col-4">
              <TextField
                id="outlined-basic"
                sx={{ width: 300}}
                label="Nationality"
                variant="outlined"
                {...register("nationality", { pattern: /^\S.*\S$/ })}

              />
              </div>
              <div className="col mt-3">
              <TextField
                id="outlined-basic"
                sx={{ width: 300}}
                
                label="Department "
                variant="outlined"
                {...register("department", { pattern: /^\S.*\S$/ })}

              />
              </div>
            </div>

{/* ------------------------------------------probation period--------------------------------------------------------------------------- */}
{/* ------------------------------------------Fort Row Strart Here--------------------------------------------------------------------------- */}
          <p className="subTitle">probation period</p>
                      <div className="row my-3">
              <div className="col-4">
              <TextField
            id="outlined-basic"
            sx={{ width: 300 }}
            label="Months"
           
            variant="outlined"
            onInput = {(e) =>{
              e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,2)

          }}
      
            type="number"
            onChange={handleMonthChange}
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
            id="outlined-basic"
            sx={{ width: 300 }}
            label="Probation Amount"
            variant="outlined"
            {...register("probationAmount", { pattern: /^\S.*\S$/ })}

            />
            </div>

          </div>

{/* --------------------------------------------------Salary Details-------------------------------------------------------- */}
{/* --------------------------------------------------Fort Row Strart Here-------------------------------------------------------- */}
          <p className="subTitle">Salary Details</p>
                      <div className="row my-3">
              <div className="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 300}}
                type="number"
                label="Basic Salary"
                variant="outlined"
                {...register("BasicSalary", { pattern: /^\S.*\S$/ })}
              />
              </div>
              <div className="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 300}}
                type="number"
                label="Housing Amount"
                variant="outlined"
                {...register("HousingAmount", { pattern: /^\S.*\S$/ })}

              />
             
              </div>
              <div className="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 300}}
                type="number"
                label="Transportation Amount"
                variant="outlined"
                {...register("transportationAmount", { pattern: /^\S.*\S$/ })}

              />
             
              </div>
              </div>
             
         

         <div className="row">

                    <div className="col-4 my-3">
                    <TextField
                      id="outlined-basic"
                      sx={{ width: 300}}
                      type="number"
                      label="Other Amount"
                      variant="outlined"
                {...register("otherAmount", { pattern: /^\S.*\S$/ })}

                    />

                    </div>

                    <div className="col mt-3">
                    <Autocomplete
                    disablePortal
                    options={visaType}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Visa Type" />}
                    onChange={(e,val) => setVisaTypeInfo(val?.label)}

                    />
                    </div>

                      </div>

            
{/* ------------------------------------------Qatar ID Details------------------------------------------------------------- */}
{/* ------------------------------------------Fifth Row Strart Here------------------------------------------------------------- */}
          <p className="subTitle">Qatar ID Details</p>
                      <div className="row my-3">
              <div className="col-4">
              <TextField
                id="outlined-basic"
                sx={{ width: 300}}
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
                  onChange={(newValue) => setQatarExpiry(newValue||null)}
              
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
                id="outlined-basic"
                sx={{ width: 300}}
                label="Passport Number"
                variant="outlined"
                {...register("passportNumber", { pattern: /^\S.*\S$/ })}

              />
              </div>
              <div className="col">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                 
                  sx={{ width: 300 }}
                  label="Date Of Issue"
                  onChange={(newValue) => setDateOfIssue(newValue)}
                  renderInput={(params) => (
                    <TextField name="date" {...params} />
                  )}
                />
              </LocalizationProvider>
              </div>
              {/* <div className="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 300}}
                {...register("passportPlaceOfIssue", { pattern: /^\S.*\S$/ })}
                label="Place of issue"
                variant="outlined"
              />
              </div> */}
              <div className="col mt-3">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                 
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
                id="outlined-basic"
                sx={{ width: 300}}
                {...register("employeeNumber", { pattern: /^\S.*\S$/ })}
                label="Employee Number"
                variant="outlined"
              />
              </div>
              <div className="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 300}}
                {...register("position", { pattern: /^\S.*\S$/ })}
                
                label="Position"
                variant="outlined"
              />
              </div>
  
   
            </div>
{/* ----------------------------------------------------sixt Row Strart Here----------------------------------------- */}

<div className="row mt-2">
      {documentTypes.map((documentType) => (
        <div key={documentType.id} className="col">
          <div className="drop-zone">
            <div className="icon-container">
              {/* Display the selected image or a default image */}
              <img
                src={imagePreviews[documentType.id] || idCard}
                alt={documentType.title}
                className="center"
                draggable="false"
              />
            </div>
            {/* Hidden file input */}
            <input
              type="file"
              ref={
                documentType.id === 'passport'? passportFileInputRef
                  : documentType.id === 'idCard'? idCardFileInputRef
                  : documentType.id === 'contractCopy'? contractCopyFileInputRef
                  : graduationFileInputRef
                  
              }
              onChange={(e) => handleFileChange(e, documentType.id)}
              style={{ display: 'none' }}
              accept="image/*"
           
            />
            <div className="inputFiletitle">
              Employee {documentType.title}
              <span className="browseBtn" onClick={() => handleBrowseClick(documentType.id)}>
                browse
              </span>
            </div>
          </div>
        </div>
      ))}
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