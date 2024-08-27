// src/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Paper, Grid } from '@mui/material';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password });
            const { token } = response.data;

            // Store token in local storage
            localStorage.setItem('authToken', token);

            // Clear error and redirect or update UI
            setError('');
            alert('Login successful');
            // Redirect or update UI here if needed
            navigate('/dashboard');

        } catch (error) {
            setError('Invalid credentials');
        }
    };

    return (
        <Container component="main" maxWidth="xs" display="flex" justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
            <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <form onSubmit={handleLogin} style={{ width: '100%', marginTop: '10px' }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ margin: '20px 0' }}
                    >
                        Login
                    </Button>
                    {error && <Alert severity="error">{error}</Alert>}

                    <Grid container>
                        <Grid item xs>
                            <Button color="primary">Forgot password?</Button>
                        </Grid>
                        <Grid item>
                            <Button color="primary" onClick={() => navigate('/signup')}>Don't have an account? Sign Up</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Login;
