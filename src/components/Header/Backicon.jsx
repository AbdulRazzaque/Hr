import React from 'react'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const BackIcon = () => {
  return (
    <div className="col-1 mt-3 ">
              <ArrowBackIcon onClick ={()=>window.history.back()} className='BackIcon' />
          </div>
  )
}

export default BackIcon