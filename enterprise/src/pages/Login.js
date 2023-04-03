import React, { useState } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Axios from 'axios';
import '../styles/login.css';
import { getError } from '../getError';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await Axios.post('/api/users/login', {
                email,
                password,
            });
            navigate('/home');
        } catch (err) {
            toast.error(getError(err));
        }
    };

    return (
        <div>
            <Form className="form" onSubmit={submitHandler}>
                <h2 className="text-center">Login</h2>
                <FormGroup>
                    <Label>Email</Label>
                    <Input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormGroup>{' '}
                <br />
                <motion.button type="submit" whileTap={{ scale: 1.2 }} className="login-btn">
                    Login
                </motion.button>
            </Form>
        </div>
    );
};

export default Login;
