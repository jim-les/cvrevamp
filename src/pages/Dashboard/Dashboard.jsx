import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Grid, Typography, Tabs, Tab, Drawer, IconButton } from '@mui/material';
import styled from 'styled-components';
import Auth from '../../Auth/Auth';
import axios from 'axios';
import { Close } from '@mui/icons-material';

// Component imports
import Wrapper from '../../components/common/Wrapper';
import Sidebar from '../../components/Sidebar';
import DashboardTopbar from '../../components/DashboardTopbar';
import template1 from "../../assets/carousel/resume_two.webp";
import template2 from "../../assets/carousel/coverletter1.svg";
import template3 from "../../assets/carousel/carousel3.webp";
import { BASE_URL } from '../../BASE_URL';
import { useAppContext } from '../../useAppContext';

const Dashboard = () => {
    const [selectedTab, setSelectedTab] = useState('all');
    const token = localStorage.getItem('authToken');
    const [loading, setLoading] = useState(false);
    const [userOrders, setUserOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { user } = useAppContext();

    useEffect(() => {
        const fetchUserDocs = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL}/api/orders`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = response.data;
                setUserOrders(data);
                setFilteredOrders(data); // Initialize filtered orders
                console.log(data);
            } catch (error) {
                if (error.response) {
                    const { data } = error.response;
                    if (data.error === 'Token is missing' || data.error === 'Token is invalid') {
                        localStorage.removeItem('authToken');
                        window.location.href = '/login';
                    } else {
                        console.error('API error:', data.error);
                    }
                } else {
                    console.error('Unexpected error:', error);
                }
            }
            setLoading(false);
        };
        fetchUserDocs();
    }, [token]);

    

    useEffect(() => {
        if (selectedTab === 'all') {
            setFilteredOrders(userOrders);
        } else {
            setFilteredOrders(userOrders.filter(order => order.documentType === selectedTab));
        }
    }, [selectedTab, userOrders]);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const getDocumentIcon = (type) => {
        return <span>{type}</span>; // Replace with actual icon logic
    };

    const extractOrderName = (url) => {
        return url.split('/').pop(); // Example logic
    };

    const statusColors = {
        'pending': 'orange',
        'completed': 'green',
        'cancelled': 'red'
    };

    // 

    return (
        <Wrapper>

            <Grid container spacing={3} height={1}>
                <Grid item md={3} height={1}>
                    <Sidebar />
                </Grid>
                <Grid item md={9} height={1} width={1} style={{ backgroundColor: '#f1f1f5' }}>
                    <DashboardTopbar />
                    <Box p={3} style={{ overflowY: 'scroll', height: 'calc(100vh - 100px)' }}>
                        <Box p={3} display='flex' flexDirection='row' justifyContent='center' alignItems='center' gap={2}>
                            <div style={{ flex: 1 }}>
                                <Typography variant='h5' style={{ fontWeight: 'bold', fontSize: '2rem' }}>Welcome back, {user ? user.username : 'Fetching user'}</Typography>
                                <Typography variant="h8">What do you want to create today?</Typography>
                            </div>

                            <Card style={{ width: '100%', height: '100%', padding: '20px', marginTop: '20px', flex: 1, background: "linear-gradient(aqua , darkblue)" }}>
                                <Typography variant='h6' color="white">Create a new CV</Typography>
                                <Typography variant='body2' color="white">Start creating a professional CV in minutes</Typography>
                            </Card>

                            <Card style={{ width: '100%', height: '100%', padding: '20px', marginTop: '20px', flex: 1, background: "linear-gradient(darkblue, aqua)" }}>
                                <Typography variant='h6' color="white">Create a new Cover Letter</Typography>
                                <Typography variant='body2' color="white">Start creating a professional Cover Letter in minutes</Typography>
                            </Card>
                        </Box>

                        <Box p={3}>
                            <hr style={{ border: '1px solid lightgray' }} />
                        </Box>

                        <Box p={3}>
                            <div style={{ flex: 1, flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant='h6' fontWeight='bold'>Your Documents</Typography>
                                <Button variant='outlined' color='primary' onClick={handleDrawerOpen}>View All</Button>
                            </div>

                            <Box>
                                <Tabs value={selectedTab} onChange={handleTabChange} aria-label="document tabs">
                                    <Tab label="All" value="all" />
                                    <Tab label="Resume" value="resume" />
                                    <Tab label="Cover Letters" value="coverLetters" />
                                    <Tab label="Resignation Letters" value="resignationLetters" />
                                </Tabs>
                                <Box mt={2}>
                                    {loading ? (
                                        <Typography>Loading...</Typography>
                                    ) : (
                                        <Grid container spacing={3}>
                                            {filteredOrders.map((order, index) => (
                                                <Grid item md={4} key={index}>
                                                    <StyledCard variant="outlined">
                                                        <Box display='flex' alignItems='center'>
                                                            {getDocumentIcon(order.documentType)}
                                                            <Typography variant="h6" fontWeight="bold" fontSize={14} style={{ marginLeft: '8px' }}>
                                                                {extractOrderName(order.documentUrl)}
                                                            </Typography>
                                                        </Box>
                                                        <Typography variant="body2">Type: {order.documentType}</Typography>
                                                        <Typography
                                                            variant="body2"
                                                            style={{ color: statusColors[order.orderStatus] || 'black' }}
                                                        >
                                                            Status: {order.orderStatus}
                                                        </Typography>
                                                        <Typography variant="body2" fontSize={12}><b>Date:</b> {order.uploadDate}</Typography>
                                                        <Button variant='outlined' color='primary'> View</Button>
                                                    </StyledCard>
                                                </Grid>
                                            ))}

                                            {filteredOrders.length === 0 && (
                                                <Grid item xs={12} style={{ textAlign: 'center' }}>
                                                    <Typography variant="body2" style={{ fontSize: '14px' }}>
                                                        No orders found.
                                                    </Typography>
                                                    <Button variant='outlined' color='primary'>Create New</Button>
                                                </Grid>
                                            )}
                                        </Grid>
                                    )}
                                </Box>
                            </Box>
                        </Box>

                        <Box p={3}>
                            <div style={{ flex: 1, flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant='h6' fontWeight='bold'>Best Templates for you</Typography>
                                <Button variant='outlined' color='primary'>View All</Button>
                            </div>

                            <Box mt={2}>
                                <Grid container spacing={3}>
                                    <Grid item md={4}>
                                        <Card className="template-card">
                                            <img src={template1} alt="template1" style={{ width: '100%', height: '100%' }} />
                                        </Card>
                                    </Grid>

                                    <Grid item md={4}>
                                        <Card className="template-card">
                                            <img src={template2} alt="template2" style={{ width: '100%', height: '100%' }} />
                                        </Card>
                                    </Grid>

                                    <Grid item md={4} height={1}>
                                        <Card className="template-card" height={1}>
                                            <img src={template3} alt="template3" style={{ width: '100%', height: '100%' }} />
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            {/* Drawer for View All */}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerClose}
                PaperProps={{
                    style: {
                        width: '400px'
                    }
                }}
            >
                <Box p={2} display="flex" flexDirection="column" height="100%" overflow="auto">
                    <Box display="flex" justifyContent="flex-end">
                        <IconButton onClick={handleDrawerClose}>
                            <Close />
                        </IconButton>
                    </Box>
                    <Typography variant="h6" fontWeight="bold" mb={2}>All Documents</Typography>
                    <Grid container spacing={2}>
                        {userOrders.map((order, index) => (
                            <Grid item xs={12} key={index}>
                                <StyledCard variant="outlined">
                                    <Box display='flex' alignItems='center'>
                                        {getDocumentIcon(order.documentType)}
                                        <Typography variant="h6" fontWeight="bold" fontSize={14} style={{ marginLeft: '8px' }}>
                                            {extractOrderName(order.documentUrl)}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2">Type: {order.documentType}</Typography>
                                    <Typography
                                        variant="body2"
                                        style={{ color: statusColors[order.orderStatus] || 'black' }}
                                    >
                                        Status: {order.orderStatus}
                                    </Typography>
                                    <Typography variant="body2" fontSize={12}><b>Date:</b> {order.uploadDate}</Typography>
                                    <Button variant='outlined' color='primary'> View</Button>
                                </StyledCard>
                            </Grid>
                        ))}
                        {userOrders.length === 0 && (
                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                <Typography variant="body2" style={{ fontSize: '14px' }}>
                                    No orders found.
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </Drawer>
        </Wrapper>
    );
};

const StyledCard = styled(Card)`
    padding: 16px;
    width: 100%;
    height: 150px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease;
    cursor: pointer;

    &:hover {
        background-color: #f5f5f5;
    }
`;

export default Dashboard;
