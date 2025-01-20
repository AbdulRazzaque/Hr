import React from 'react'

import ArrowBackicon from '@mui/icons-material/ArrowBack';
const Backicon = () => {
  return (
    <div className="col-1 mt-3 ">
              <ArrowBackicon onClick ={()=>window.history.back()} className='Backicon' />
          </div>
  )
}

export default Backicon