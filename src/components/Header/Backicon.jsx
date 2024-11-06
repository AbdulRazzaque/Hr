import React from 'react'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const Backicon = () => {
  return (
    <div className="col-1 mt-3 ">
              <ArrowBackIcon onClick ={()=>window.history.back()} className='backIcon' />
          </div>
  )
}

export default Backicon