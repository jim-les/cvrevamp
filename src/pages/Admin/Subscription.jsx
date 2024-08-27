import React, { useEffect, useState } from 'react';
import { Box, Card, Grid, Typography, Button, Drawer, IconButton, TextField, Divider } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '../../BASE_URL';
import Wrapper from '../../components/common/Wrapper';
import Sidebar from '../../AdminComponents/Sidebar';
import DashboardTopbar from '../../AdminComponents/DashboardTopbar';
import { Close } from '@mui/icons-material';

const Subscription = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedSubscription, setSelectedSubscription] = useState(null);
    const [updatedPrice, setUpdatedPrice] = useState('');
    
    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/subscriptions`);
                setSubscriptions(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSubscriptions(); // Call the fetch function
    }, []);
    
    const handleOpenDrawer = (subscription) => {
        setSelectedSubscription(subscription);
        setUpdatedPrice(subscription.price); // Set current price in the input field
        setDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setDrawerOpen(false);
        setSelectedSubscription(null);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`${BASE_URL}/api/subscriptions/${selectedSubscription._id}`, {
                price: updatedPrice,
            });
            // Refresh subscriptions list after update
            const response = await axios.get(`${BASE_URL}/api/subscriptions`);
            setSubscriptions(response.data);
            handleCloseDrawer();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${BASE_URL}/api/subscriptions/${selectedSubscription._id}`);
            // Refresh subscriptions list after delete
            const response = await axios.get(`${BASE_URL}/api/subscriptions`);
            setSubscriptions(response.data);
            handleCloseDrawer();
        } catch (error) {
            console.error(error);
        }
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
                        {subscriptions.map((item, index) => (
                            <Card key={index} style={{
                                padding: '20px',
                                margin: '5px',
                                width: '23%',
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                borderRadius: '8px',
                                position: 'relative'
                            }}
                            onClick={() => handleOpenDrawer(item)} // Open drawer on click
                            >
                                <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                                    {/* Replace with actual icon */}
                                    <Typography variant="h6">{item.name}</Typography>
                                    <Typography variant="body1" style={{ fontSize: '12px', textAlign: 'center' }}>{item.description}</Typography>
                                    <Typography variant="h6" style={{ color: 'blue' }}>kSh{item.price} /yr</Typography>
                                    <Box style={{ display: 'flex', padding: '10px 0', alignItems: 'center', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
                                        {item.features.map((feature, index) => (
                                            <Typography variant="body2" key={index} style={{ fontSize: '10px' }}>{feature},</Typography>
                                        ))}
                                    </Box>
                                </Box>
                            </Card>
                        ))}
                    </Box>
                </Grid>
            </Grid>
            <Drawer
                anchor='right'
                open={drawerOpen}
                onClose={handleCloseDrawer}
                PaperProps={{ sx: { width: 300, p: 2 } }}
            >
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant='h6'>Manage Subscription</Typography>
                        <IconButton onClick={handleCloseDrawer}>
                            <Close />
                        </IconButton>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    {selectedSubscription && (
                        <Box>
                            <Typography variant='body1'><b>Subscription:</b> {selectedSubscription.name}</Typography>
                            <Typography variant='body1'><b>Current Price:</b> kSh{selectedSubscription.price}</Typography>
                            <TextField
                                label="Update Price"
                                variant="outlined"
                                type="number"
                                value={updatedPrice}
                                onChange={(e) => setUpdatedPrice(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                <Button variant='contained' color='primary' onClick={handleUpdate}>Update</Button>
                                <Button variant='contained' color='error' onClick={handleDelete}>Delete</Button>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Drawer>
        </Wrapper>
    );
}

export default Subscription;
