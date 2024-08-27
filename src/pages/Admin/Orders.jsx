import React, { useEffect, useState } from 'react';
import { Box, Grid, TextField, Button, Table, TableBody, Card, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography, Drawer, IconButton, Divider, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, Input } from '@mui/material';
import Wrapper from '../../components/common/Wrapper';
import Sidebar from '../../AdminComponents/Sidebar';
import DashboardTopbar from '../../AdminComponents/DashboardTopbar';
import { BASE_URL } from '../../BASE_URL';  
import axios from 'axios';
import { Visibility, Delete, Close } from '@mui/icons-material';
import styled from 'styled-components';
import { Person, Description, PictureAsPdf, FileCopy, FolderOpen, Person2Outlined, CalendarMonth } from '@mui/icons-material';

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

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [detailsDrawerOpen, setDetailsDrawerOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [adminStatement, setAdminStatement] = useState('');
    const [newStatus, setNewStatus] = useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/orders`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setOrders(response.data);
                setFilteredOrders(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching orders. Please try again.');
                setLoading(false);
            }
        };

        fetchOrders();
    }, [token]);

    useEffect(() => {
        setFilteredOrders(
            orders.filter(order =>
                (order.user?.username || '').toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, orders]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const extractOrderName = (url) => {
        const parts = url.split('/');
        return parts[parts.length - 1];
    };

    const handlePrint = () => {
        window.print();
    };

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setDetailsDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setDetailsDrawerOpen(false);
        setSelectedOrder(null);
    };

    const handleDeleteClick = (order) => {
        setOrderToDelete(order);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`${BASE_URL}/api/admin/orders/${orderToDelete._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setOrders(orders.filter(order => order._id !== orderToDelete._id));
            setFilteredOrders(filteredOrders.filter(order => order._id !== orderToDelete._id));
            setDeleteDialogOpen(false);
        } catch (error) {
            setError('Error deleting order. Please try again.');
        }
    };

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
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
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
    
                // Update state and provide feedback
                setSelectedOrder({ ...selectedOrder, orderStatus: newStatus });
                setDetailsDrawerOpen(false);
                alert('Order status updated successfully');
            } catch (error) {
                console.error('Error updating status:', error);
                alert('Error updating status');
            }
        }
    };

    const getDocumentIcon = (documentType) => {
        return documentTypeIcons[documentType] || <Description />;
    };

    const getFileUrl = (documentUrl) => {
        if (!documentUrl) return '';
        return documentUrl.replace('/uploads/', '');
    };

    const getDownloadUrl = (documentUrl) => {
        if (!documentUrl) return '';
        return `${BASE_URL}${documentUrl}`;
    };

    if (loading) {
        return (
            <Wrapper>
                <Grid container spacing={3} height="100vh">
                    <Grid item md={3} height="100%">
                        <Sidebar />
                    </Grid>
                    <Grid item md={9} height="100%" sx={{ backgroundColor: '#f1f1f5' }}>
                        <DashboardTopbar />
                        <Box p={2} sx={{ textAlign: 'center', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CircularProgress />
                        </Box>
                    </Grid>
                </Grid>
            </Wrapper>
        );
    }

    if (error) {
        return (
            <Wrapper>
                <Grid container spacing={3} height="100vh">
                    <Grid item md={3} height="100%">
                        <Sidebar />
                    </Grid>
                    <Grid item md={9} height="100%" sx={{ backgroundColor: '#f1f1f5' }}>
                        <DashboardTopbar />
                        <Box p={2} sx={{ textAlign: 'center', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography color="error">{error}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <Grid container spacing={3} height="100vh">
                <Grid item md={3} height="100%">
                    <Sidebar />
                </Grid>
                <Grid item md={9} height="100%" sx={{ backgroundColor: '#f1f1f5' }}>
                    <DashboardTopbar />
                    <Box pr={1} sx={{ overflowY: 'scroll', height: '80vh' }}>
                        <Box p={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <h2>Orders</h2>
                            </Box>
                            <Box>
                                <TextField
                                    label="Search Orders"
                                    variant="outlined"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    sx={{ mr: 1, height: '30px', flex: 1 }}
                                />
                                <Button variant="contained" color="primary" onClick={handlePrint}>
                                    Print
                                </Button>
                            </Box>
                        </Box>
                        <Box p={2}>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Document Type</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredOrders.map((order) => (
                                            <TableRow key={order._id}>
                                                <TableCell>{order._id}</TableCell>
                                                <TableCell>{order.documentType}</TableCell>
                                                <TableCell style={{ color: statusColors[order.orderStatus] }}>
                                                    {order.orderStatus}
                                                </TableCell>
                                                <TableCell>{order.uploadDate}</TableCell>
                                                <TableCell>
                                                    <IconButton onClick={() => handleViewOrder(order)}>
                                                        <Visibility />
                                                    </IconButton>
                                                    <IconButton onClick={() => handleDeleteClick(order)}>
                                                        <Delete />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Drawer
                anchor="right"
                open={detailsDrawerOpen}
                onClose={handleCloseDrawer}
                sx={{ width: 700 }}
            >
                <Box p={2}>
                    <IconButton onClick={handleCloseDrawer} sx={{ position: 'absolute', top: 8, right: 8 }}>
                        <Close />
                    </IconButton>
                    <Typography variant="h6">Order Details</Typography>
                    <Divider sx={{ my: 2 }} />
                    {selectedOrder && (
                        <>
                            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                <Typography variant="h6" color="primary" gutterBottom>
                                    Order Details
                                </Typography>
                                <Typography variant="body1" style={{ color: statusColors[selectedOrder.orderStatus] || 'black' }}>
                                    <b>Status:</b> {selectedOrder.orderStatus}
                                </Typography>
                            </Box>
                            <Typography variant="body1" display={'flex'} alignItems={'center'} gap={1}> <Person2Outlined />  <b>Name:</b> {extractOrderName(selectedOrder.documentUrl)}</Typography>
                            <Typography variant="body1" display={'flex'} alignItems={'center'} gap={1} py={1}> <FileCopy /> <b>Type:</b> {selectedOrder.documentType}</Typography>
                            <Box display={'flex'} alignItems={'center'} gap={1} py={1} justifyContent={'space-between'}>
                                <Typography variant="body1" display={'flex'} alignItems={'center'} gap={1}> <CalendarMonth /> <b>Date:</b> {selectedOrder.uploadDate}</Typography>
                                <Button variant="contained" color="primary">
                                    <a href={selectedOrder.documentUrl} download style={{ color: 'white', textDecoration: 'none' }}>
                                    Download Order
                                    </a>
                                </Button>
                            </Box>
                            <Box>
                                {selectedOrder.files?.map((file, index) => (
                                    <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                                        {getDocumentIcon(file.type)}
                                        <a href={getDownloadUrl(file.url)} target="_blank" rel="noopener noreferrer">
                                            {file.name}
                                        </a>
                                    </Box>
                                ))}
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

                                            <Button variant="outlined" color="primary" onClick={() => window.open(selectedOrder.adminResponseDocumentUrl, '_blank')}> View Document</Button>
                                        </Card>
                                    </Box>
                                )}
                            </Box>
                            <Box sx={{ mt: 2 }}>
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

                                <Typography variant="h6" style={{ marginTop: '8px' }}> Admin Statement</Typography>
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
                                <Select
                                    value={newStatus}
                                    onChange={handleStatusChange}
                                    fullWidth
                                    sx={{ mt: 2 }}
                                >
                                    {statuses.map(status => (
                                        <MenuItem key={status} value={status}>
                                            {status}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={updateOrderStatus}
                                    >
                                        Update Status
                                    </Button>
                                </Box>
                            </Box>
                        </>
                    )}
                </Box>
            </Drawer>

            <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this order?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Wrapper>
    );
};



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

export default Orders;
