import {
    Typography, Button, Box, Grid, Tabs, Tab, Card, Drawer, Input
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
    Add, DownloadForOffline, StarOutlineSharp, Person2Outlined, CalendarMonth, FileCopy
} from '@mui/icons-material';
import Wrapper from '../../components/common/Wrapper';
import Sidebar from '../../components/Sidebar';
import DashboardTopbar from '../../components/DashboardTopbar';
import ResumeCard from '../../components/Resume/ResumeCard';
import CreateCv from '../../components/Resume/CreateCv';
import { BASE_URL } from '../../BASE_URL';
import axios from 'axios';
import styled from 'styled-components';
import docsImage from '../../assets/docs.png';

// Styles for the ResumeCard
const StyledCard = styled('div')`
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s ease;
    cursor: pointer;
    border-radius: 8px;
    background-color: transparent;
    position: relative;
    &:hover {
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
        background-color: rgba(0, 0, 0, 0.1);
    }
`;

// Status colors for document status
const statusColors = {
    pending: 'orange',
    completed: 'green',
    rejected: 'red',
};

// Function to extract the document name from URL
const extractOrderName = (url) => {
    return url.split('/').pop(); // Extract the file name from the URL
};

const Resume = () => {
    const [selectedTab, setSelectedTab] = useState('resume');
    const [stage, setStage] = useState('');
    const [loading, setLoading] = useState(false);
    const [userOrders, setUserOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const token = localStorage.getItem('authToken');
    const [file, setFile] = useState(null);

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
        if (selectedTab === 'resume' || selectedTab === 'coverletter') {
            setFilteredOrders(userOrders.filter(order => order.documentType === selectedTab));
        } else {
            setFilteredOrders(userOrders);
        }
    }, [selectedTab, userOrders]);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const [detailsDrawerOpen, setDetailsDrawerOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const toggleDetailsDrawer = (open, order = null) => () => {
        setSelectedOrder(order);
        setDetailsDrawerOpen(open);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
    };

    return (
        <Wrapper>
            <Grid container spacing={3} height="100vh">
                <Grid item md={3} height="100%">
                    <Sidebar setStage={setStage} />
                </Grid>
                <Grid item md={9} height="100%" style={{ backgroundColor: '#f1f1f5' }}>
                    <DashboardTopbar />

                    {stage === "" && (
                        <Box p={3} style={{ overflowY: 'scroll', height: 'calc(100vh - 100px)' }}>
                            <Box py={3} display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' gap={2}>
                                <Typography variant='h6' style={{ fontWeight: 'bold' }}>Resume & Cover Letter Builder</Typography>
                                <Button variant='contained' color='primary' onClick={() => setStage('Select Resume Type')}>
                                    <Add />
                                    Create New
                                </Button>
                            </Box>

                            <Box mt={3}>
                                <Tabs value={selectedTab} onChange={handleTabChange} aria-label="document tabs" style={{ borderBottom: '1px solid lightgray' }}>
                                    <Tab label="Resume" value="resume" />
                                    <Tab label="Cover Letters" value="coverletter" />
                                </Tabs>

                                {selectedTab === 'resume' && (
                                    <Box mt={3}>
                                        <Typography variant='h6' style={{ fontWeight: 'bold' }}>My Resume</Typography>
                                    </Box>
                                )}

                                {selectedTab === 'coverletter' && (
                                    <Box mt={3}>
                                        <Typography variant='h6' style={{ fontWeight: 'bold' }}>My Cover Letters</Typography>
                                        <Typography variant='body1' style={{ marginTop: '16px' }}>You have not created any cover letter yet. Click on the button above to create a new cover letter.</Typography>
                                    </Box>
                                )}

                                <Box mt={2}>
                                    {loading ? (
                                        <Typography>Loading...</Typography>
                                    ) : (
                                        <Grid container spacing={3}>
                                            {filteredOrders.map((order, index) => (
                                                <Grid item md={4} key={index}>
                                                    <StyledCard onClick={toggleDetailsDrawer(true, order)}>
                                                        <img src={docsImage} alt="document" width={'100%'} height={180} />
                                                        <Box display='flex' alignItems='center'>
                                                            <Typography variant="h6" fontWeight="bold" fontSize={14} display={'flex'} justifyContent={'space-between'} alignContent={'center'} width={'100%'}>
                                                                {extractOrderName(order.documentUrl)}
                                                                <a href={order.documentUrl} download style={{ color: 'black', textDecoration: 'none' }}>
                                                                    <DownloadForOffline style={{ color: 'blue', marginLeft: '8px' }}/>
                                                                </a>
                                                            </Typography>
                                                        </Box>
                                                        <Typography variant="body2" display='flex' gap={1} justifyContent='space-between' alignItems={'center'}>
                                                            {order.documentType}
                                                            <span style={{fontSize: '8px'}}>
                                                                {order.uploadDate}
                                                            </span>
                                                        </Typography>
                                                        <Typography display='flex' gap={1} alignItems='center'
                                                            variant="body2"
                                                            style={{ color: statusColors[order.orderStatus] || 'black', position: 'absolute', right: 10, top: 10, width: '95%', display: 'flex', justifyContent: 'flex-end' }}
                                                        >
                                                            {/* <StarOutlineSharp style={{ color: 'blue' }} /> */}
                                                            <span>
                                                                <b>Status:</b> {order.orderStatus}
                                                            </span>
                                                        </Typography>
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
                    )}

                    {stage === "Select Resume Type" && (
                        <ResumeCard setStage={setStage} />
                    )}

                    {stage === "Create Cv" && (
                        <CreateCv setStage={setStage} />
                    )}
                </Grid>
            </Grid>

            {/* drawer */}
            <Drawer anchor="right" open={detailsDrawerOpen} onClose={toggleDetailsDrawer(false)}>
                <DrawerContent>
                    {selectedOrder ? (
                        <Box p={2}>
                            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                <Typography variant="h6" color="primary" gutterBottom>
                                    Order Details
                                </Typography>
                                <Typography variant="body1" style={{ color: statusColors[selectedOrder.orderStatus] || 'black' }}>
                                    <b>Status:</b> {selectedOrder.orderStatus}
                                </Typography>
                            </Box>
                            <Typography variant="body1" display={'flex'} alignItems={'center'} gap={1} pb={1} > <Person2Outlined />  <b>Name:</b> {extractOrderName(selectedOrder.documentUrl)}</Typography>
                            <Typography variant="body1" display={'flex'} alignItems={'center'} gap={1} py={1}> <FileCopy /> <b>Type:</b> {selectedOrder.documentType}</Typography>
                            <Box display={'flex'} alignItems={'center'} gap={1} py={1} justifyContent={'space-between'}>
                                <Typography variant="body1" display={'flex'} alignItems={'center'} gap={1}> <CalendarMonth /> <b>Date:</b> {selectedOrder.uploadDate}</Typography>
                                <a href={selectedOrder.documentUrl} download style={{ color: 'black', textDecoration: 'none' }}>
                                    <DownloadForOffline style={{ color: 'blue', marginLeft: '8px' }} />
                                </a>
                            </Box>

                            {/* admin response */}
                            <Box pt={9}>
                                <Typography variant="h6" color="primary" gutterBottom> Admin Response</Typography>
                                {selectedOrder.adminResponse && (
                                    <>
                                    <Card style={{ padding: '10px', marginTop: '10px' }} >
                                        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                                            <img src={docsImage} alt="document" width={200} height={180} />
                                            <Box>
                                                <Button variant='contained' color='primary' style={{ marginTop: '10px' }} href={selectedOrder.adminResponseDocumentUrl} download> Download </Button>
                                            </Box>
                                        </Box>
                                    </Card>
                                    <Typography variant="body2" color="textSecondary"> {selectedOrder.adminResponse} </Typography>
                                    </>
                                )}

                                {!selectedOrder.adminResponse && (  
                                    <Typography variant="body2" color="textSecondary">No admin response available.</Typography>
                                )}
                            </Box>
                        </Box>
                    ) : (
                        <Typography variant="body2" color="textSecondary">
                            No order details available.
                        </Typography>
                    )}
                </DrawerContent>
            </Drawer>
        </Wrapper>
    );
};

export default Resume;

const DrawerContent = styled(Box)`
    width: 450px;
    padding: 16px;
`;
