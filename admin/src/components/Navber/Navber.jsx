import React from 'react'
import './Navber.css'
import {assets} from '../../assets/assets'
import { Link } from 'react-router-dom'

export const Navber = () => {
  return (
    <div className='navber'>
      <Link to='/'>
      <img className='logo' src={assets.logo} alt="" />
      </Link>
      
      <img className='profile' src={assets.profile_image} alt="" />
    </div>
  )
}
