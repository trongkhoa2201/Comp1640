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
 <h2 className='text-center'>Login</h2>
        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
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
<p>Don't have an account? Login</p>
      </Form>
    </div>
  )
}

export default Login