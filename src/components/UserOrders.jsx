import React, { useState } from 'react';
import { Box, Typography, Drawer, TextField, Grid, Card, Button, Input, MenuItem, Select } from '@mui/material';
import styled from 'styled-components';
import axios from 'axios'; // Make sure axios is imported
import { Person, Description, PictureAsPdf, FileCopy, FolderOpen, Person2Outlined, CalendarMonth } from '@mui/icons-material';
import { BASE_URL } from '../BASE_URL';
// Define a mapping for document types to icons
const documentTypeIcons = {
    docx: <Description />,
    pdf: <PictureAsPdf />,
    copy: <FileCopy />,
    folder: <FolderOpen />,
};

const statusColors = {
    pending: 'orange',
    completed: 'green',
    rejected: 'red',
};

const statuses = ['pending', 'completed', 'rejected'];

const UserOrders = ({ drawerOpen, setDrawerOpen, user, orders }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [detailsDrawerOpen, setDetailsDrawerOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [adminStatement, setAdminStatement] = useState('');
    const [newStatus, setNewStatus] = useState('');

    const handleDownload = async (documentUrl) => {
        try {
            // Request the file from the server
            const response = await axios.get(documentUrl, {
                responseType: 'blob' // Important for binary data
            });
    
            // Create a link element to download the file
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'document'); // You can set a filename here
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const toggleDetailsDrawer = (open) => () => {
        setDetailsDrawerOpen(open);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    // Function to extract the order name from the URL
    const extractOrderName = (url) => {
        const parts = url.split('/');
        return parts[parts.length - 1];
    };

    const filteredOrders = orders.filter((doc) =>
        extractOrderName(doc.documentUrl).toLowerCase().includes(searchQuery)
    );

    const getDocumentIcon = (documentType) => {
        // Default to a generic icon if the document type is not found
        return documentTypeIcons[documentType] || <Description />;
    };

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
        setNewStatus(order.orderStatus); // Initialize status
        toggleDetailsDrawer(true)();
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleStatusChange = (event) => {
        setNewStatus(event.target.value);
    };

    const updateOrderStatus = async () => {
        if (selectedOrder) {
            try {
                const formData = new FormData();
                formData.append('orderStatus', newStatus);
                formData.append('adminResponse', adminStatement);
                if (file) formData.append('file', file);
    
                // Make the PUT request with headers and formData
                const response = await axios.put(
                    `${BASE_URL}/api/admin/orders/${selectedOrder._id}`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                        },
                    }
                );
    
                // Update state and provide feedback
                setSelectedOrder({ ...selectedOrder, orderStatus: newStatus });
                // Optionally close drawer
                setDetailsDrawerOpen(false);
                alert('Order status updated successfully');
            } catch (error) {
                console.error('Error updating status:', error);
                alert('Error updating status');
            }
        }
    };

    return (
        <Box p={2}>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                <DrawerContent>
                    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} py={1}>
                        <Typography variant='h6' color={'primary'}>User Orders</Typography>
                        <Box>
                            <TextField
                                variant='standard'
                                placeholder='Search for order'
                                fullWidth
                                style={{ width: '300px', textAlign: 'center' }}
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </Box>
                        <Box display={'flex'} gap={1} alignItems={'center'} py={1}>
                            <Typography variant='body1'>{user.username}</Typography>
                            <Person />
                        </Box>
                    </Box>
                    <hr style={{ color: 'rgba(0, 0, 0, .3)' }} />

                    <Grid container spacing={2} p={2}>
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map((doc, index) => (
                                <Grid item md={4} key={index}>
                                    <StyledCard variant="outlined" onClick={() => handleOrderClick(doc)}>
                                        <Box display='flex' alignItems='center'>
                                            {getDocumentIcon(doc.documentType)}
                                            <Typography variant="h6" fontWeight="bold" fontSize={14} style={{ marginLeft: '8px' }}>
                                                {extractOrderName(doc.documentUrl)}
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2">Type: {doc.documentType}</Typography>
                                        <Typography
                                            variant="body2"
                                            style={{ color: statusColors[doc.orderStatus] || 'black' }}
                                        >
                                            Status: {doc.orderStatus}
                                        </Typography>
                                        <Typography variant="body2" fontSize={12}><b>Date:</b> {doc.uploadDate}</Typography>
                                    </StyledCard>
                                </Grid>
                            ))
                        ) : (
                            <Grid item xs={12}>
                                <Typography variant="body2" align="center" style={{ fontSize: '14px' }}>
                                    No orders found.
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </DrawerContent>
            </Drawer>

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
                                <Button variant="contained" color="primary">
                                    <a href={selectedOrder.documentUrl} download style={{ color: 'white', textDecoration: 'none' }}>
                                    Download Order
                                    </a>
                                </Button>
                            </Box>
                            {selectedOrder.adminResponse && (
                                <Typography variant="body1"><b>Admin Response:</b> {selectedOrder.adminResponse}</Typography>
                            )}
                            <Box mt={2}>
                                {selectedOrder.adminResponseDocumentUrl && (
                                    <Box> 
                                        <Card style={{ padding: '8px', fontSize: '1.5rem', width: '200px', height: '250px', textAlign: 'center', alignItems: 'center', flex: 1, diplay: 'flex' }}>
                                            <a href={selectedOrder.adminResponseDocumentUrl} download style={{ color: 'black', textDecoration: 'none', fontWeight: 'bold' }}>
                                                Download Admin Response Document
                                            </a>

                                            <Button variant="outlined" color="primary"> View Document</Button>
                                        </Card>
                                    </Box>
                                )}
                            </Box>
                            <Box mt={2}>
                                <DashedOutline onClick={() => document.getElementById('fileInput').click()}
                                    style={{
                                        backgroundColor: file ? 'lightgreen' : 'transparent',
                                        color: file ? 'green' : 'inherit',
                                    }}
                                    >
                                    <Typography variant='h6'>
                                        {file ? 'File Uploaded ' + file.name : 'Click or drag to upload resume'}
                                    </Typography>
                                    <Input
                                        type="file"
                                        id="fileInput"
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    /> 
                                </DashedOutline>
                                <Typography variant="body1" style={{ marginTop: '8px' }}> Admin Statement</Typography>
                                <TextField
                                    variant="outlined"
                                    placeholder="Enter admin statement"
                                    fullWidth
                                    value={adminStatement}
                                    onChange={(e) => setAdminStatement(e.target.value)}
                                    multiline
                                    rows={4}
                                    style={{ resize: 'vertical' }}
                                />
                                <Button variant="contained" color="secondary" style={{ marginTop: '8px' }} onClick={updateOrderStatus}>
                                    Upload Document
                                </Button>
                            </Box>
                            <Box mt={2}>
                                <Typography variant="body1"><b>Update Status:</b></Typography>
                                <Select
                                    value={newStatus}
                                    onChange={handleStatusChange}
                                    fullWidth
                                >
                                    {statuses.map((status) => (
                                        <MenuItem key={status} value={status}>
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <Button variant="contained" color="primary" style={{ marginTop: '8px' }} onClick={updateOrderStatus}>
                                    Update Status
                                </Button>
                            </Box>
                        </Box>
                    ) : (
                        <Typography variant="body1" align="center" style={{ fontSize: '14px' }}>
                            Select an order to view details.
                        </Typography>
                    )}
                </DrawerContent>
            </Drawer>
        </Box>
    );
};

const DrawerContent = styled.div`
    width: 700px;
    padding: 1rem;
`;

// Styled Card with hover effect
const StyledCard = styled(Card)`
    padding: 16px;
    width: 100%;
    height: 150px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease;
    cursor: pointer;

    &:hover {
        background-color: #f5f5f5; // Change this to your preferred color
    }
`;

const DashedOutline = styled(Box)`
    border: 2px dashed green; /* Updated border color */
    border-radius: 5px;
    padding: 20px;
    display: flex;
    height: 350px;
    margin-top: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    text-align: center; /* Center text and emoji */
    
    &::before {
        content: '👍'; /* Thumbs up emoji */
        font-size: 50px; /* Adjust size as needed */
        margin-bottom: 10px;
    }
`;
export default UserOrders;
