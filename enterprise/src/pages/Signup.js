import React from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';

import { motion } from 'framer-motion'
import '../styles/login.css'

const Signup = () => {
    return (
        <div>
            <Form className="form" onSubmit={(e) => this.submitForm(e)}>
                <h2 className="text-center">Sign up</h2>
                <FormGroup>
                    <Label>User Name</Label>
                    <Input
                        type="text"
                        name="userName"
                        id="userName"
                        placeholder="Enter your username"
                        onChange={(e) => {
                            this.validateEmail(e);
                            this.handleChange(e);
                        }}
                    />
                </FormGroup>
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
                </FormGroup>{' '}
                <br />
                <motion.button whileTap={{ scale: 1.2 }} className="login-btn">
                    Login
                </motion.button>
                <p>Already have an account? Create an account</p>
            </Form>
        </div>
    );
};

export default Signup;
