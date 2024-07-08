import React from 'react'
import "./style.css"
import { useLocation } from 'react-router-dom';

function FooterComponent() {
  
  const location = useLocation();

  const blockPath = ["/signin", "/signup"].includes(location.pathname.toLowerCase())
  if (blockPath) return

  return (
    <footer className='footer-container'>FooterComponent</footer>
  )
}

export default FooterComponent