import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "../../Styles/Navbar.css"

const Navbar = () => {
  return (
    <Row className="navbar ">
      <Col className="right-nav">
        <i class="ri-notification-2-line fs-5"></i>
      </Col>
      
    </Row>
  );
};

export default Navbar;
