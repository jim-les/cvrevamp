import React, { useEffect, useState } from 'react';
import { Box, Card, Grid, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, CircularProgress } from '@mui/material';
import axios from 'axios'; // Import axios
import Wrapper from '../../components/common/Wrapper';
import Sidebar from '../../components/Sidebar';
import DashboardTopbar from '../../components/DashboardTopbar';
import { BASE_URL } from '../../BASE_URL';
import { Close } from '@mui/icons-material';

const Sbscription = () => {
    const [subscriptionsPackages, setSubscriptionsPackages] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false); // State for loading indicator
    const [successMessage, setSuccessMessage] = useState(''); // State for success message

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/subscriptions`);
                setSubscriptionsPackages(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSubscriptions(); // Call the fetch function
    }, []);
    
    const handleOpenDialog = (subscription) => {
        setSelectedPackage(subscription);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedPackage(null);
        setPhoneNumber('');
        setLoading(false);
        setSuccessMessage('');
    };

    const handlePay = async () => {
        if (!phoneNumber) {
            // Handle validation error if phone number is not entered
            alert('Please enter a valid phone number.');
            return;
        }

        setLoading(true); // Show loading indicator

        try {
            // Update user subscription with phone number
            await axios.post(`${BASE_URL}/api/payment`, {
                subscriptionId: selectedPackage._id,
                phoneNumber: phoneNumber,
            });

            const response = await axios.get(`${BASE_URL}/api/subscriptions`);
            setSubscriptionsPackages(response.data);
            setLoading(false); // Hide loading indicator
            setSuccessMessage('Payment successful!'); // Set success message
            setPhoneNumber('');
        } catch (error) {
            console.error(error);
            setLoading(false); // Hide loading indicator on error
        }
        setOpenDialog(false); // Close dialog
    };

    return (
        <Wrapper>
            <Grid container spacing={3} height={1}>
                <Grid item md={3} height={1}>
                    <Sidebar />
                </Grid>
                <Grid item md={9} height={1} width={1} style={{ backgroundColor: '#f1f1f5' }}>
                    <DashboardTopbar />
                    <Typography variant='h6' style={{ padding: '20px' }} fontWeight={'bold'}>Available Subscriptions</Typography>
                    <Typography variant='body1' style={{ padding: '0 20px' }}>Choose a subscription package that suits your needs</Typography>
                    <Box maxWidth='lg' style={{ display: 'flex', flexWrap: 'wrap', overflowY: 'scroll', height: '70vh', paddingBottom: '100px' }}>
                        {subscriptionsPackages.map((item, index) => (
                            <Card key={index} style={{
                                padding: '20px',
                                margin: '5px',
                                width: '23%',
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                borderRadius: '8px',
                                position: 'relative'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05)';
                                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.3)';
                                e.currentTarget.style.backgroundColor = "lightblue";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                                e.currentTarget.style.backgroundColor = "white";
                            }}>
                                <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                                    <Typography variant="h6">{item.name}</Typography>
                                    <Typography variant="body1" style={{ fontSize: '12px', textAlign: 'center' }}>{item.description}</Typography>
                                    <Typography variant="h6" style={{ color: 'blue' }}>kSh{item.price} /yr</Typography>
                                    <Box style={{ display: 'flex', padding: '10px 0', alignItems: 'center', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
                                        {item.features.map((feature, index) => (
                                            <Typography variant="body2" key={index} style={{ fontSize: '10px' }}>{feature},</Typography>
                                        ))}
                                    </Box>
                                    <Button variant='contained' color='primary' onClick={() => handleOpenDialog(item)}>Pay</Button>
                                </Box>
                            </Card>
                        ))}
                    </Box>
                </Grid>
            </Grid>

            {/* Dialog for Payment */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6">Pay for Subscription</Typography>
                        <IconButton onClick={handleCloseDialog}>
                            <Close />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    {selectedPackage && (
                        <Box>
                            <Typography variant="body1"><b>Subscription:</b> {selectedPackage.name}</Typography>
                            <Typography variant="body1"><b>Price:</b> kSh{selectedPackage.price} /yr</Typography>
                            <TextField
                                label="Enter Phone Number"
                                variant="outlined"
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                        </Box>
                    )}
                    {loading && (
                        <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' marginTop={2}>
                            <CircularProgress />
                            <Typography variant="body1" style={{ marginTop: '10px' }}>Processing Payment...</Typography>
                        </Box>
                    )}
                    {successMessage && (
                        <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' marginTop={2}>
                            <Typography variant="body1" color="green">{successMessage}</Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                    <Button onClick={handlePay} color="primary" disabled={loading}>Pay</Button>
                </DialogActions>
            </Dialog>
        </Wrapper>
    );
}

export default Sbscription;
