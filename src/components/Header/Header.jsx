import React from 'react'
import assets from '../../assets/assets'
import './Header.css'
function Header() {
  return (
    <>
      <nav className="header">
        <div className="main-logo">
          <img src={assets.logo} alt="" />
        </div>
      
      </nav>
    </>
  );
}

export default Header