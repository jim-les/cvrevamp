import React, { useRef, useEffect, useState } from 'react';
import { Card, Box, Typography, Button, Grid, Input, TextField, CardMedia, MenuItem } from '@mui/material';
import styled, { keyframes, css } from 'styled-components';
import { Close } from '@mui/icons-material';
import createCv from '../../assets/createCV.png';
import { AddCard, UploadFile } from '@mui/icons-material';
import axios from 'axios'; // Ensure axios is imported
import { BASE_URL } from '../../BASE_URL'; // Ensure BASE_URL is imported
import { AnimatedCard, ExitButton, ActionBox, DashedOutline } from './style';
import PreloadedActivityIndicator from '../PreloadedActivityIndicator';
import SuccessConfetti from '../SuccessConfetti';
import PaymentModal from '../PaymentModal'; // Import the PaymentModal component
import MpesaPreloader from '../MpesaPreloader';

const ResumeCard = ({ setStage }) => {
    const cardRef = useRef(null);
    const [view, setView] = useState('options'); // State to toggle views
    const [file, setFile] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState(0);
    const [clientDescription, setClientDescription] = useState('');
    const [templates, setTemplates] = useState([]);
    const [yearsOfExperience, setYearsOfExperience] = useState(1);
    const [agency, setAgency] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);
    const [loading, setLoading] = useState(false);
    const [mpesaloading, setMpesaLoading] = useState(false);
    const [paymentOpen, setPaymentOpen] = useState(false); // State to manage payment modal visibility
    const [amountToPay, setAmountToPay] = useState(0); // State to store the amount to be paid

    const calculateAmount = () => {
        // Example calculation logic
        let baseAmount = 1000; // Base amount for simplicity
        if (agency === 'Urgent') {
            baseAmount += 500;
        } else if (agency === 'Extremely Urgent') {
            baseAmount += 1000;
        }
        setAmountToPay(baseAmount + yearsOfExperience * 200); // Adjust this formula as needed
    };
    
    // ugent, Normal , extreamly urgent
    const agencies = ['Urgent', 'Normal', 'Extremely Urgent'];
    const handleCreateNew = () => {
        console.log('Create New Resume');
        setStage('Create Cv');
    };

    const handleUpload = () => {
        setView('upload');
    };

    const handleClose = () => {
        setView('options');
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleTemplateSelect = (index) => {
        setSelectedTemplate(index);
    };

    const handleDescriptionChange = (event) => {
        setClientDescription(event.target.value);
    };

    const handleSuccess = () => {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 10000); // Hide confetti after 3 seconds
    };

    const handleUploadFile = async () => {
        if (file && selectedTemplate && clientDescription) {
            
            const formData = new FormData();
            formData.append('document', file);
            formData.append('documentType', 'resume');
            formData.append('template', selectedTemplate);
            formData.append('description', clientDescription);
            console.log(`urgency: ${agency}, amountToPay: ${amountToPay}`)
            setLoading(true);
            calculateAmount(); // Calculate the amount to be paid before showing the payment modal
            setPaymentOpen(true); // Open the payment modal
            setLoading(false);

            // try {
            //     const response = await axios.post(`${BASE_URL}/api/orders`, formData, {
            //         headers: {
            //             'Content-Type': 'multipart/form-data',
            //             Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            //         },
            //     });
            //     console.log('Order created:', response.data);
            //     handleSuccess();
            //     alert('Your order has been placed successfully!');
            // } catch (error) {
            //     console.error('Error creating order:', error);
            //     alert('There was an error placing your order. Please try again.');
            // } finally {
            //     setLoading(false);
            //     setView('options');
            // }
        } else {
            console.log('Please complete all fields');
            alert('Please select a file, a template, and provide a description.');
        }
    };


    const handleConfirmPayment = async (phoneNumber) => {
        console.log('Payment confirmed for phone number:', phoneNumber);
        setMpesaLoading(true)
        try {
            await axios.post(`${BASE_URL}/api/payments`, {
                amount: amountToPay,
                phoneNumber,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
            handleSuccess();
            alert('Payment successful! Your order has been placed.');
        } catch (error) {
            console.error('Error processing payment:', error);
            alert('There was an error processing your payment. Please try again.');
        } finally {
            setPaymentOpen(false);
            setMpesaLoading(false)
            // setView('options');
        }
    };

    const handleClickOutside = (event) => {
        if (cardRef.current && !cardRef.current.contains(event.target)) {
            setStage('');
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/templates`);
                setTemplates(response.data);
            } catch (error) {
                console.error('Error fetching templates:', error);
            }
        };

        fetchTemplates();
        const interval = setInterval(fetchTemplates, 10000); // Adjust interval as needed
        return () => clearInterval(interval);
    }, []);

    const handleCardClick = (template) => {
        setSelectedTemplate(template);
    };

    return (
        <Box p={3} position="relative" height="100vh">
            {loading && <PreloadedActivityIndicator visible={loading} />}
            {mpesaloading && <MpesaPreloader visible={mpesaloading} />}
            {showConfetti && <SuccessConfetti width={window.innerWidth} height={window.innerHeight} />}
            <PaymentModal
                open={paymentOpen}
                onClose={() => setPaymentOpen(false)}
                onConfirm={handleConfirmPayment}
                amount={amountToPay}
            />


            {view === 'options' ? (
                <Grid container spacing={3} style={{ height: '100%' }}>
                    <Grid item md={8} xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <AnimatedCard ref={cardRef}>
                            <Typography variant='h4' gutterBottom color="blue">
                                Select Resume Type
                            </Typography>
                            <Typography variant='body1' paragraph>
                                Choose how you would like to proceed with your resume.
                            </Typography>
                            
                            <Box display='flex' flexDirection='row' gap={2} mt={3}>
                                <ActionBox onClick={handleCreateNew}>
                                    <AddCard style={{ fontSize: '50px', color: 'inherit' }} />
                                    <Typography variant='h6' style={{ fontWeight: 'bold' }}>
                                        Create New CV
                                    </Typography>
                                    <Typography variant='body2' color='textSecondary'>We'll help you create a CV step-by-step.</Typography>
                                </ActionBox>
                                <ActionBox glowing onClick={handleUpload}>
                                    <UploadFile style={{ fontSize: '50px', color: 'inherit' }} />
                                    <Typography variant='h6' style={{ fontWeight: 'bold' }}>
                                        Upload Resume
                                    </Typography>
                                    <Typography variant='body2' color='textSecondary'>Upload your existing CV and we'll convert it to a digital format.</Typography>
                                </ActionBox>
                            </Box>
                        </AnimatedCard>
                    </Grid>
                    <Grid item md={4} xs={12} style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Card sx={{ p: 2 }}>
                            <Typography variant='h6'>How It Works</Typography>
                            <Typography variant='body2' mt={1}>
                                1. Choose to create a new CV or upload an existing one.
                            </Typography>
                            <Typography variant='body2'>
                                2. If uploading, select a template and provide a description.
                            </Typography>
                            <Typography variant='body2'>
                                3. Confirm and pay to receive your customized CV.
                            </Typography>
                        </Card>
                        <img src={createCv} alt='Create CV illustration' style={{ width: '100%', height: 'auto', maxWidth: '500px' }} />
                    </Grid>
                </Grid>
            ) : (
                <Box p={2} pb={5} display="flex" flexDirection="column" height="100%" overflow="auto">
                    <Grid container spacing={2} justifyContent="space-between">
                        <Grid item md={6}>
                            <Typography variant="h5" gutterBottom>Upload Resume</Typography>
                            <DashedOutline onClick={() => document.getElementById('fileInput').click()}
                                style={{
                                    backgroundColor: file ? 'lightgreen' : 'transparent',
                                    color: file ? 'green' : 'inherit',
                                }}
                                >
                                <Typography variant='h6'>Click or drag to upload resume</Typography>
                                <Input
                                    type="file"
                                    id="fileInput"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                            </DashedOutline>
                        </Grid>

                        <Grid item md={6} pl={2}>
                            <Box display="flex" gap={2} overflow="auto" height="100%">
                                {templates.map((template, index) => (
                                    <Box key={template._id} m={1} position="relative">
                                        {/* <Typography variant="body1">{template._id}</Typography> */}
                                        <Card
                                            // sx={{ width: 280, height: 400 }}
                                            sx={{
                                                minWidth: 300,
                                                height: 370,
                                                border: selectedTemplate === template._id ? '2px solid blue' : 'none',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => handleCardClick(template._id)} // Open the UpdateDrawer on card click
                                        >
                                            <CardMedia
                                                component="img"
                                                sx={{ height: '100%', objectFit: 'cover' }}
                                                image={`${BASE_URL}/${template.filePath}`}
                                                alt={template.name}
                                            />
                                        </Card>
                                    </Box>
                                ))}
                            </Box>
                        </Grid>
                    </Grid>

                    {/* add years of exprience select input */}
                    <Box mt={2}>
                        <TextField
                            label="Years of Experience"
                            type="number"
                            fullWidth
                            variant="outlined"
                            value={yearsOfExperience}
                            onChange={(e) => setYearsOfExperience(e.target.value)}
                        />
                    </Box>

                    {/* {/* state of agency selection drop dwon */}
                    <Box mt={2}>
                        <TextField
                            label="Select Agency"
                            select
                            fullWidth
                            variant="outlined"
                            value={agency}
                            onChange={(e) => setAgency(e.target.value)}
                        >
                            {agencies.map((agency) => (
                                <MenuItem key={agency} value={agency}>
                                    {agency}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>

                    <Box mt={2}>
                        <TextField
                            label="Client Description"
                            multiline
                            rows={4}
                            value={clientDescription}
                            onChange={handleDescriptionChange}
                            fullWidth
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleUploadFile}
                            style={{ marginTop: '20px' }}
                            mb={5}
                        >
                            Upload and Pay
                        </Button>
                        <Button
                            variant="text"
                            onClick={handleClose}
                            style={{ marginTop: '10px' }}
                        >
                            Cancel
                        </Button>
                    </Box>
                    <Box mt={5}/>
                </Box>
            )}

            {/* spacing box */}
            <Box flex={1} sx={{ height: '100px' }} />
        </Box>
    );
};

export default ResumeCard;
