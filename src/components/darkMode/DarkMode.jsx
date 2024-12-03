import React, { useContext } from 'react'
// import { ThemeContext } from '../App'
import { ThemeContext } from '../../App';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
const DarkMode = () => {
    const {darkMode,toggleDarkMode}= useContext(ThemeContext)
    return (
        <div>    
            <button onClick={toggleDarkMode} className='mode'>
        {darkMode ? <Brightness7Icon/> :  <Brightness4Icon/>}
      </button></div>
      )
}

export default DarkMode