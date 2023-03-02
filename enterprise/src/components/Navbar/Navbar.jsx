import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "../../Styles/Navbar.css"

const Navbar = () => {
  return (
    <Container>
      <div className="navbar d-flex  ">
        <div className="d-flex align-items-center gap-4">


          <div className="right-nav ">
            <i class="ri-notification-2-line fs-5"></i>
          </div>


          <div className="right-nav ">
            <i class="ri-user-line fs-5"></i>
          </div>
          
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
