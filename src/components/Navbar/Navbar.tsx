import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom';
import icon from './images/icon.jpeg'
import toggle from './images/toggle.png'
import './styles.css'


function Navigbar() {
  return (
    <div >
  <Navbar data-testid = "navbar" className = "navbarWrapper" expand="xl">
    <div className = "iconWrapper">
  <Link  to="/">
  <Navbar.Brand><img className = "zoom" src = {icon} alt = "icon" ></img></Navbar.Brand>
  </Link>
  </div>
  <Navbar.Toggle  aria-controls="basic-navbar-nav"  > <img className = "toggleButton" alt = "toggle" src = {toggle} ></img> </Navbar.Toggle>
  <Navbar.Collapse className = "collapseMenu"  id="basic-navbar-nav">
    <Nav  className="mr-auto">
    
    <div >
      <Link  to="/rockets"> 
      <button className = "navigationButtons">Rockets </button>
      </Link>

      <Link to="/ships"> 
      <button  className = "navigationButtons"  >Ships </button>
      </Link>

      <Link  to="/missions"> 
      <button  className = "navigationButtons"  >Missions </button>
      </Link>
      </div>
    </Nav>
   
  </Navbar.Collapse>
</Navbar>
    </div>
  );
}

export default Navigbar;
