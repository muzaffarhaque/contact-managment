import React from 'react'
import { GrContactInfo } from 'react-icons/gr'
import { BiMapPin } from 'react-icons/bi'
import './SideNave.scss'
import { useNavigate } from 'react-router-dom'
interface props{
  openNav:()=> void,
  show:Boolean
}
const SideNave: React.FC<props> = ({openNav,show}) => {
  const navigate=useNavigate();
  return (
    <div className={`side-nav ${show?'slide-left':""}`}>
      <ul className='side-nav-bar ps-0'>
        <li onClick={()=>{navigate('/');openNav();}} className='fs-18-14 fw-semibold'><div className="icon-frame"><GrContactInfo className="icon" /></div> Create Contact</li>
        <li onClick={()=>{navigate('/dashboard');openNav()}} className='fs-18-14 fw-semibold'><div className="icon-frame"><BiMapPin className="icon" /></div> Map</li>
      </ul>
    </div>
  )
}

export default SideNave