import React from 'react'
import {Form, FormGroup, Label, Input}from 'reactstrap';
import {Link, useNavigate} from 'react-router-dom'

import { motion } from 'framer-motion'
import '../Styles/login.css'

const Login = () => {
  return (
    <div>
      <Form className="form" onSubmit={(e) => this.submitForm(e)}>
        <h2 className='text-center'>Login</h2>
        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
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
        <p>Don't have an account? <Link to='/signup'>Create an account</Link></p>
      </Form>
    </div>
  )
}

export default Login
