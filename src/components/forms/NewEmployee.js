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
    const fileInputRef = useRef(null);
    const handleBrowseClick = () => {
      fileInputRef.current.click();
    };
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      console.log('Selected file:', file);
      // Perform any other logic with the file here
    };

    // --------------------------------------- English to Arbic Translate Code -----------------------------------------------------
    const [englishText, setEnglishText] = useState("");
    const [arabicText, setArabicText] = useState("");
  
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
       <div class="icon-container">
                <img src={employee}  alt="File icon" class="center headingimage mt-3" draggable="false"/>
            </div>
          <p className="subTitle">Employee Info</p>
                      {/* ---------------------------First Row Strart Here----------------------------------------- */}
                      <div class="row">
              <div class="col-6">
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
              {/* <button onClick={handleTranslate}>Translate to Arabic</button> */}
    
             < AutorenewIcon className="mt-3" />
              <div class="col-5">
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
            
{/* ---------------------------Second Row Strart Here----------------------------------------- */}
                      <div class="row mt-4">
              <div class="col">
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
              <div class="col">
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
              <div class="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 300}}
                type="number"
                label="Mobile Number"
                variant="outlined"
              />
              </div>
            </div>
{/* ---------------------------Thired Row Strart Here----------------------------------------- */}
                      <div class="row my-3">
     
              <div class="col-4">
              <TextField
                id="outlined-basic"
                sx={{ width: 300 }}
                
                label="Marital Status"
                variant="outlined"
              />
              </div>
              <div class="col-4">
              <TextField
                id="outlined-basic"
                sx={{ width: 300}}
                label="Nationality"
                variant="outlined"
              />
              </div>
              <div class="col mt-3">
              <TextField
                id="outlined-basic"
                sx={{ width: 300}}
                
                label="Department "
                variant="outlined"
              />
              </div>
            </div>

{/* ---------------------------Fort Row Strart Here----------------------------------------- */}
          <p className="subTitle">Salary Details</p>
                      <div class="row my-3">
              <div class="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 300}}
                type="number"
                label="Basic Salary"
                variant="outlined"
              />
              </div>
              <div class="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 300}}
                type="number"
                label="Housing Amount"
                variant="outlined"
              />
             
              </div>
              <div class="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 300}}
                type="number"
                label="Transportation Amount"
                variant="outlined"
              />
             
              </div>
              <div class="col my-3">
              <TextField
                id="outlined-basic"
                sx={{ width: 300}}
                type="number"
                label="Other Amount"
                variant="outlined"
              />
             
              </div>
           

            </div>
{/* ---------------------------Fort Row Strart Here----------------------------------------- */}
          <p className="subTitle">Qatar Id</p>
                      <div class="row my-3">
              <div class="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 300}}
                type="number"
                label="Qatar Id Number"
                variant="outlined"
              />
              </div>
              <div class="col">
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
              <div class="col">
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
{/* ---------------------------fifth Row Strart Here----------------------------------------- */}
          <p className="subTitle">Passport Details</p>
                      <div class="row my-3">
              <div class="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 300}}
                type="number"
                label="Passport Number"
                variant="outlined"
              />
              </div>
              <div class="col">
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
              <div class="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 300}}
                
                label="Place of issue"
                variant="outlined"
              />
              </div>
              <div class="col mt-3">
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

{/* ---------------------------fifth Row Strart Here----------------------------------------- */}
<p className="subTitle mt-2">For HR Purpose only</p>
<div class="row mt-4">
              <div class="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 300}}
                
                label="Blood Group"
                variant="outlined"
              />
              </div>
              <div class="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 300}}
                
                label="Employee Number"
                variant="outlined"
              />
              </div>
              <div class="col">
              <TextField
                id="outlined-basic"
                sx={{ width: 300}}
                
                label="Position"
                variant="outlined"
              />
              </div>
  
   
            </div>
{/* ---------------------------sixt Row Strart Here----------------------------------------- */}

                      <div class="row mt-2">
              <div class="col">
              <div class="drop-zone">
            <div class="icon-container">
                <img src={person} alt="File icon" class="center" draggable="false"/>
            </div>
            <input type="file" name="" 
            ref={fileInputRef}
            onChange={handleFileChange}
            id="inputFile"/>
            <div class=" inputFiletitle">Employee Image,<span class="browseBtn" onClick={handleBrowseClick}>browse</span></div>
        </div>
              </div>
              <div class="col">
              <div class="drop-zone">
            <div class="icon-container">
                <img src={fileimg1} alt="File icon" class="center" draggable="false"/>
            </div>
            <input type="file" name="" 
            ref={fileInputRef}
            onChange={handleFileChange}
            id="inputFile"/>
            <div class="tinputFiletitleitle">Employee certificate,<span class="browseBtn" onClick={handleBrowseClick}>browse</span></div>
        </div>
              </div>
              <div class="col">
              <div class="drop-zone">
            <div class="icon-container">
                <img src={passport} alt="File icon" class="center" draggable="false"/>
            </div>
            <input type="file" name="" 
            ref={fileInputRef}
            onChange={handleFileChange}
            id="inputFile"/>
            <div class="inputFiletitle">Employee Passport,<span class="browseBtn" onClick={handleBrowseClick}>browse</span></div>
        </div>
          </div>
              <div class="col">
              <div class="drop-zone">
            <div class="icon-container">
                <img src={idCard} alt="File icon" class="center" draggable="false"/>
            </div>
            <input type="file" name="" 
            ref={fileInputRef}
            onChange={handleFileChange}
            id="inputFile"/>
            <div class="inputFiletitle">Employee ID,<span class="browseBtn" onClick={handleBrowseClick}>browse</span></div>
        </div>
          </div>
       

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