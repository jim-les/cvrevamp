import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid, Card } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '../BASE_URL'; // Replace with your base URL

const SignupForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        let formErrors = {};
        if (!formData.username) formErrors.username = "Username is required";
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = "Valid email is required";
        if (!formData.password) formErrors.password = "Password is required";
        if (formData.password !== formData.confirmPassword) formErrors.confirmPassword = "Passwords do not match";
        return formErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}/api/register`, formData);
            setSuccessMessage('Signup successful! Please check your email to verify your account.');
            setFormData({ username: '', email: '', password: '', confirmPassword: '' });
            setErrors({});
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Card style={{ padding: 20, marginTop: 20 }}>
                <Typography variant="h5">Sign Up</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="username"
                        label="Username"
                        fullWidth
                        margin="normal"
                        value={formData.username}
                        onChange={handleChange}
                        error={!!errors.username}
                        helperText={errors.username}
                    />
                    <TextField
                        name="email"
                        label="Email Address"
                        fullWidth
                        margin="normal"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        name="password"
                        type="password"
                        label="Password"
                        fullWidth
                        margin="normal"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                    <TextField
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        fullWidth
                        margin="normal"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                    />
                    {successMessage && <Typography color="green">{successMessage}</Typography>}
                    {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                    <Button type="submit" fullWidth variant="contained" color="primary" disabled={loading} style={{ marginTop: 20 }}>
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </Button>

                    <Grid container>
                        <Grid item>
                            <Button color="primary" href="/login">Already have an account? Login</Button>
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </Container>
    );
};

export default SignupForm;
