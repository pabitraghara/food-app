import React from 'react'
import'./AppDownlode.css'
import { assets } from '../../assets/assets'
const AppDownlode = () => {
  return (
    <div className='app-download' id='app-download'>
      <p>For Bettar Expreience Download <br />Tomato App</p>
      <div className="app-download-platform">
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div>
    </div>
  )
}

export default AppDownlode
