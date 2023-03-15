import React, { useState } from "react";
import { Button, Col, Container, Form, FormGroup, Row } from "react-bootstrap";

import "../styles/profile.css";
import Ava from "../img/Ava.jpg";

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState();
  return (
    <div className='profileContainer'>
      <Container>
        <Row className='profileContainer'>
          <Col md={6}>
            <h1 className='text-center'>Edit Profile</h1>
            <Form>
              <Form.Group className='mb-3' controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  value={name}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId='pic' className='mb-3'>
                <Form.Label>Avatar</Form.Label>
                <Form.Control type='file' enable />
              </Form.Group>
              <div className='text-center'>
                <Button type='submit'>Update</Button>
              </div>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              borderRadius: "50%",
              justifyContent: "center",
            }}
          >
            <img src={Ava} alt={Ava} className='profilePic' />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
