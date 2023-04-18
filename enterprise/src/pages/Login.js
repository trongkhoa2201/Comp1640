import React, { useContext, useState } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Axios from 'axios';
import '../Styles/login.css';
import { getError } from '../getError';
import { toast } from 'react-toastify';
import { Store } from '../Store';

const Login = () => {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/home';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await Axios.post('/api/users/login', {
                email,
                password,
            });
            ctxDispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            // navigate('/home');
            data.role === 'admin' ? navigate('/dashboard') : navigate(redirect || '/');
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
                <div className="login">
                    <motion.button type="submit" whileTap={{ scale: 1.2 }} className="login-btn">
                        Login
                    </motion.button>
                </div>
            </Form>
        </div>
    );
};

export default Login;
