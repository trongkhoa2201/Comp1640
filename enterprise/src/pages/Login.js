<<<<<<< HEAD
import React, {useState} from 'react'
import {Form, FormGroup, Label, Input}from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'
import '../Styles/login.css'


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === 'admin@gmail.com' && password === 'letmein') {
      setIsLoggedIn(true);
    }
  }

  if (isLoggedIn) {
    navigate('/home')
  }
  return (
    <div>
      <Form className="form" onSubmit={handleSubmit}>
=======
import React from 'react'
import {Form, FormGroup, Label, Input}from 'reactstrap';

import { motion } from 'framer-motion'
import '../styles/login.css'


const Login = () => {
  return (
    <div>
      <Form className="form" onSubmit={(e) => this.submitForm(e)}>
>>>>>>> fdc513acb8046674f0969a9bd4fc9632ee1c801b
        <h2 className='text-center'>Login</h2>
        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
<<<<<<< HEAD
            value={email}
            onChange={handleEmailChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </FormGroup> <br/>
        <motion.button type="submit" whileTap={{scale:1.2}} className='login-btn'>Login</motion.button>
=======
            id="exampleEmail"
            placeholder="Enter your email"

            onChange={(e) => {
              this.validateEmail(e);
              this.handleChange(e);
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="Enter your password"
            onChange={(e) => this.handleChange(e)}
          />
        </FormGroup> <br/>
        <motion.button whileTap={{scale:1.2}} className='login-btn'>Login</motion.button>
>>>>>>> fdc513acb8046674f0969a9bd4fc9632ee1c801b
        <p>Don't have an account? Login</p>
      </Form>
    </div>
  )
}

export default Login
