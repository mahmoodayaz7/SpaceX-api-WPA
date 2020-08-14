import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom';


function Navigbar() {
  return (
    <div >
  <Navbar bg="light" expand="lg">
  <Link  to="/">
  <Navbar.Brand>React-Bootstrap</Navbar.Brand>
  </Link>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    <Link  to="/"> 
    <button> Home </button>
      </Link>
      <Link  to="/rockets"> 
      <button>rockets </button>
      </Link>

      <Link  to="/launches"> 
      <button>launches </button>
      </Link>
    </Nav>
   
  </Navbar.Collapse>
</Navbar>
    </div>
  );
}

export default Navigbar;
