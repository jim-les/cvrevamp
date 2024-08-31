import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Paper, Grid, InputAdornment, IconButton } from '@mui/material';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAppContext } from '../useAppContext';
import loginPng from '../assets/loginPng.jpg';
import './style.css';
import PreloadedActivityIndicator from '../components/PreloadedActivityIndicator';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAppContext();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        setLoading(true);
        e.preventDefault();
        await login(email, password, setError, navigate);
        setLoading(false);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container component="main" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Preloader */}
            <PreloadedActivityIndicator visible={loading} />

            {/* Main Content */}
            <Typography component="h1" variant="h3" color={'primary'}
                style={{ marginBottom: '20px', fontWeight: '800', fontSize: '1.5rem', position: 'absolute', top: '10px', left: '5%' }} >
                CV Revamp
            </Typography>
            <Paper className="hoverEffect" style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '80vh', maxWidth: '1200px', boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
                {/* Left Section: Login Form */}
                <Box style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography 
                        component="h1" 
                        variant="h4" 
                        style={{ marginBottom: '20px', fontWeight: '800', fontSize: '2.5rem' }}
                    >
                        Welcome Back to 
                        <span style={{ marginBottom: '20px', fontWeight: '800', fontSize: '2.5rem', color:'blue' }}> Cv Revamp</span>
                    </Typography>
                    <Typography component="h1" variant="h5" style={{ fontWeight: '600' }}>
                        Login
                    </Typography>
                    <form onSubmit={handleLogin} style={{ width: '100%', marginTop: '20px' }}>
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
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
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
                </Box>

                {/* Right Section: Additional Content */}
                <Box style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4f6f8' }}>
                    <img src={loginPng} alt="Login" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;
