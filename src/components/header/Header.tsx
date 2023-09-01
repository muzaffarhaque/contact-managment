import React from 'react';
import './Header.scss';
import {FiMenu} from 'react-icons/fi';
interface props{
  openNav:()=> void
}
const Header:React.FC<props> = ({openNav}) => {
  return (
    <div className='header-section fs-36-24 fw-bold black-242'>
      Header
      <input type="checkbox" name="so" className='d-none' id="so"/>
      <label htmlFor="so" onClick={openNav} className='mb-show label'>
          <FiMenu />
      </label>
    </div>
  )
}

export default Header