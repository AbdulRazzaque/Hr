import React from "react";
import "./forms.scss";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dashhead from "../Dashhead";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Button, InputAdornment, Stack, TextField } from "@mui/material";
import fileimg1 from '../../images/file.svg'
import person from '../../images/person.svg'
import passport from '../../images/passport.svg'
import idCard from '../../images/id.png'
import other from '../../images/other.jpg'
import employee from '../../images/employee.svg'
import AccountCircle from '@mui/icons-material/AccountCircle';
import  { useRef } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from "@mui/icons-material/Print";
import { useState ,useEffect } from "react";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import translate from "translate";
const NewEmployee = () => {

    const [display, setDisplay] = React.useState(false);
    const [value, setValue] = React.useState("");

    const [englishText, setEnglishText] = useState("");
    const [arabicText, setArabicText] = useState("");
    const [SelectedDate,setSelectedDate]= useState(null)
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImageType, setSelectedImageType] = useState(null);
    const [selectedPassport, setSelectedPassport] = useState(null);
    const [selectedIDCard, setSelectedIDCard] = useState(null);
    const [selectedDocument, setSelectedDocument] = useState({});
    // --------------------------------------- English to Arbic Translate Code -----------------------------------------------------
    const handleTranslate = async () => {
      try {
        const translatedText = await translate(englishText, { to: "ar" });
        setArabicText(translatedText);
      } catch (error) {
        console.error("Translation Error:", error);
      }
    };
    const changeArabicText =(e)=>{
      setArabicText(e.target.value)
    }
 
    useEffect (()=>{
      handleTranslate(); // Translate initiallay when the componet mounts
    },[englishText])


    const handleChange = (newValue) => {
      setSelectedDate(newValue);
    };
    // --------------------------------------- Probetion Date Difference Code -----------------------------------------------------

    const calculateDateDifference = ()=>{
      if (SelectedDate){
        const currentDate = new Date();
        const timeDiff = SelectedDate - currentDate;
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 *24 )); 
        const monthsDiff = Math.floor(daysDiff / 30) // Assuming 30 days per months

        return `Difference : ${monthsDiff} months and ${daysDiff % 30} days`;
      }
      return 'Please selcet a date'
    }
  
    // --------------------------------------- Employee Profile image Code -----------------------------------------------------

    const handelImageChange = (event)=>{
      const selectedFile = event.target.files[0];
      if(selectedFile){
        const imgUrl = URL.createObjectURL(selectedFile)
        setSelectedImage (imgUrl)

    }
    };

// --------------------------------------- Passport,id,other Docoument select Code -----------------------------------------------------
const documentTypes = [
  { id: 'passport', title: 'Passport' },
  { id: 'idCard', title: 'ID Card' },
  { id: 'certificate', title: 'Certificate' },
  // Add more document types as needed
];
const passportFileInputRef = useRef(null);
const idCardFileInputRef = useRef(null);
const certificatedFileInputRef = useRef(null);

const [selectedImages, setSelectedImages] = useState({});

const handleBrowseClick = (documentType) => {
  if (documentType === 'passport') {
    passportFileInputRef.current.click();
  }
   else if (documentType === 'idCard') {
    idCardFileInputRef.current.click();
  }
   else if (documentType === 'certificate') {
    certificatedFileInputRef.current.click();
  }
  clearSelectedImage(documentType);
};

const handleFileChange = (event, documentType) => {
  const selectedFile = event.target.files[0];

  if (selectedFile) {
    const imgUrl = URL.createObjectURL(selectedFile);
    updateSelectedImage(documentType, imgUrl);
  }
};

const updateSelectedImage = (documentType, imgUrl) => {
  setSelectedImages((prevSelectedImages) => ({
    ...prevSelectedImages,
    [documentType]: imgUrl,
  }));
};

const clearSelectedImage = (documentType) => {
  setSelectedImages((prevSelectedImages) => ({
    ...prevSelectedImages,
    [documentType]: null,
  }));
};

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
       <div className="container">
        <h1 className="my-3 title">EMPLOYEE JOINING FORM (THARB CAMEL HOSPITAL)</h1>
       <div className="icon-container">
                {/* <img src={person}  alt="File icon" className="center headingimage mt-3" draggable="false"/> */}
                <input  type= "file"  id="imageInput" accept="image/*" style={{display:'none'}} onChange={handelImageChange} />
        <label htmlFor="imageInput">  <img  className="center headingimage mt-3" src={selectedImage || person}></img> </label>
            </div>
          <p className="subTitle">Employee Info</p>
 {/* --------------------------------First Row Strart Here----------------------------------------------------------------- */}
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
                  placeholder="Enter a name as a passport"
                  variant="filled"
                  value={englishText}
                  onChange={(e) => setEnglishText(e.target.value)}
                />
              </div>

    
             < AutorenewIcon className="mt-3" />
              <div className="col-5">
                <TextField
                  id="filled-basic"
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
                  onChange={changeArabicText}
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
                  onChange={(newValue) => setValue(newValue)}
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
                  onChange={(newValue) => setValue(newValue)}
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
              />
              </div>
              <div className="col-4">
              <TextField
                id="outlined-basic"
                sx={{ width: 300}}
                label="Nationality"
                variant="outlined"
              />
              </div>
              <div className="col mt-3">
              <TextField
                id="outlined-basic"
                sx={{ width: 300}}
                
                label="Department "
                variant="outlined"
              />
              </div>
            </div>

{/* ------------------------------------------Fort Row Strart Here--------------------------------------------------------------------------- */}
          <p className="subTitle">probation period</p>
                      <div className="row my-3">
              <div className="col-4">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                 
                  sx={{ width: 300 }}
                  label="Date Of Issue"
                  value={SelectedDate}
                  onChange={handleChange}
                  renderInput={(params) => (
                    <TextField name="date" {...params} />
                  )}
                />
              </LocalizationProvider>
              </div>
              <div className="col mt-2">
            <h2  className="badgedate badge badge-primary "> {calculateDateDifference()}</h2> 
            
              </div>
            
             
           
           

            </div>
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
              />
              </div>
              <div className="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 300}}
                type="number"
                label="Housing Amount"
                variant="outlined"
              />
             
              </div>
              <div className="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 300}}
                type="number"
                label="Transportation Amount"
                variant="outlined"
              />
             
              </div>
              <div className="col my-3">
              <TextField
                id="outlined-basic"
                sx={{ width: 300}}
                type="number"
                label="Other Amount"
                variant="outlined"
              />
             
              </div>
           

            </div>
{/* ------------------------------------------Fifth Row Strart Here------------------------------------------------------------- */}
          <p className="subTitle">Qatar Id</p>
                      <div className="row my-3">
              <div className="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 300}}
                type="number"
                label="Qatar Id Number"
                variant="outlined"
              />
              </div>
              <div className="col">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                 
                  sx={{ width: 300 }}
                  label="Date Of Issue"
                  onChange={(newValue) => setValue(newValue)}
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
                  label="Date Of Expiry"
                  onChange={(newValue) => setValue(newValue)}
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
                type="number"
                label="Passport Number"
                variant="outlined"
              />
              </div>
              <div className="col">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                 
                  sx={{ width: 300 }}
                  label="Date Of Issue"
                  onChange={(newValue) => setValue(newValue)}
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
                
                label="Place of issue"
                variant="outlined"
              />
              </div>
              <div className="col mt-3">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                 
                  sx={{ width: 300 }}
                  label="Date Of Expiry"
                  onChange={(newValue) => setValue(newValue)}
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
              <div className="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 300}}
                
                label="Blood Group"
                variant="outlined"
              />
              </div>
              <div className="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 300}}
                
                label="Employee Number"
                variant="outlined"
              />
              </div>
              <div className="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 300}}
                
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
                {/* <img src={other} alt="File icon" className="center" draggable="false"/> */}
                <img src={selectedImages[documentType.id] || idCard}  alt={documentType.title} className="center" draggable="false" />
            </div>
            <input
              type="file"
              name=""
              ref={documentType.id === 'passport' ? passportFileInputRef : idCardFileInputRef}
              onChange={(event) => handleFileChange(event, documentType.id)}
              style={{ display: 'none' }}
              accept="image/*"
            />
            {/* <div className="inputFiletitle">Employee ID,<span className="browseBtn" onClick={handleBrowseClick}>browse</span></div> */}
            <div className="inputFiletitle">
              Employee {documentType.title},
              <span className="browseBtn" onClick={() => handleBrowseClick(documentType.id)}>browse</span>
            </div>
        </div>
                      
          </div>

                      ))}
            </div>
                      
   
            {/* --------------------------------Print Button---------------------------------------------------------- */}
            
            <Stack spacing={2} direction="row" marginBottom={2}  justifyContent="center">
            <Button variant="contained"> <PrintIcon className="mr-1"/> Print Form</Button>
            <Button variant="contained" color="success"> <SaveIcon className="mr-1"/> Save Form</Button>
            </Stack>
       </div>
       </div>
       </div>
    )
}

export default NewEmployee