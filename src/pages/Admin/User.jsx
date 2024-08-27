import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Card, CardContent, CircularProgress } from '@mui/material';
import Wrapper from '../../components/common/Wrapper';
import Sidebar from '../../AdminComponents/Sidebar';
import DashboardTopbar from '../../AdminComponents/DashboardTopbar';
import { Group, Print, Person, Edit, Email, Visibility, Cancel } from '@mui/icons-material';
import axios from 'axios';
import UserOrders from '../../AdminComponents/UserOrders';
import { useNavigate } from 'react-router-dom';

const User = () => {
    const [users, setUsers] = useState([]);
    const [userOrders, setUserOrders] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        username: '',
        email: '',
    });
    const [loading, setLoading] = useState(false);
    const [updateStatus, setUpdateStatus] = useState('');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const token = localStorage.getItem('authToken');
    const navigate = useNavigate();

    // Fetch users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/getusers', {
                    headers: {
                        'Authorization': `Bearer ${token}` // Include token in Authorization header
                    }
                });
                setUsers(response.data);
            } catch (error) {
                if (error.response.data.error === "Token is invalid") {
                    navigate('/login');
                }
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        if (selectedUser) {
            const fetchUserOrders = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/admin/getorders/${selectedUser._id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}` // Include token in Authorization header
                        }
                    });
                    console.log('User orders:', response.data);
                    setUserOrders(response.data);
                }
                catch (error) {
                    console.error('Error fetching user orders:', error);
                }
            }

            setInterval(() => {
                fetchUserOrders();
            } , 5000);
        }
    }, [selectedUser]);


    // Handle row click
    const handleRowClick = (user) => {
        setSelectedUser(user);
        setEditForm({
            username: user.username,
            email: user.email,
        });
        setIsEditing(false);
        setUpdateStatus('');
    };

    // Toggle edit mode
    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Save changes
    const handleSaveClick = async () => {
        setLoading(true);
        setUpdateStatus('');
        try {
            await axios.put(`http://localhost:5000/api/profile/${selectedUser.id}`, editForm);
            setSelectedUser((prev) => ({ ...prev, ...editForm }));
            setUpdateStatus('Update successful!');
        } catch (error) {
            setUpdateStatus('Error updating user. Please try again.');
            console.error('Error updating user:', error);
        } finally {
            setLoading(false);
        }
    };

    const extractOrderName = (url) => {
        // Split the URL by '/' and get the last part
        const parts = url.split('/');
        return parts[parts.length - 1];
    };

    return (
        <Wrapper>
            <Grid container spacing={3} height="100vh">
                <Grid item md={3} height="100%">
                    <Sidebar />
                </Grid>
                <Grid item md={9} height="100%" style={{ backgroundColor: '#f1f1f5' }}>
                    <DashboardTopbar />
                    <Grid container py={1}>
                        <Grid item md={8} pr={1}>
                            <TableContainer component={Paper}>
                                {/* Search input with print button */}
                                <Box display="flex" justifyContent="space-between" alignItems="center" p={2} gap={1}>
                                    <Box style={{ flex: 1 }}>
                                        <input type="text" placeholder="Search" style={{ padding: '10.5px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }} />
                                    </Box>
                                    <Button variant="outlined" color="primary">
                                        <Print />
                                        Print
                                    </Button>
                                </Box>
                                <Table>
                                    {/* Table header with lighter blue shade */}
                                    <TableHead style={{ backgroundColor: '#f1f5f0' }}>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell>Username</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Email</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {users.length > 0 && (
                                            users.map((user, index) => (
                                                <TableRow key={index} onClick={() => handleRowClick(user)} style={{ cursor: 'pointer' }}>
                                                    <TableCell>
                                                        <Person />
                                                    </TableCell>
                                                    <TableCell>{user.username}</TableCell>
                                                    <TableCell style={{ color: 'blue' }}>Active</TableCell>
                                                    <TableCell>{user.email}</TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>

                        {/* User profile */}
                        <Grid item md={4} flex={1} pr={1}>
                            <Paper style={{ height: '90vh' }} px={2}>
                                <Box display="flex" px={1} justifyContent="space-between" alignItems="center" width={1}>
                                    <Box display="flex" p={1} justifyContent="space-between" alignItems="center" width={1}>
                                        <Person style={{ fontSize: 20, color: 'blue' }} />
                                        <Typography variant="h6" fontWeight="bold">User Profile</Typography>
                                    </Box>
                                    <Button onClick={handleEditClick}>
                                        { isEditing ? (<Cancel />):(<Edit style={{ fontSize: 20, color: 'blue' }} />)}
                                    </Button>
                                </Box>
                                <hr style={{ color: 'rgba(0, 0, 0, .3)' }} />
                                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" p={2}>
                                    {selectedUser ? (
                                        <>
                                            <Group style={{ fontSize: 100, color: 'blue' }} />
                                            {isEditing ? (
                                                <Box display="flex" flexDirection="column" width="100%" p={2}>
                                                    <TextField
                                                        name="username"
                                                        label="Username"
                                                        variant="outlined"
                                                        value={editForm.username}
                                                        onChange={handleInputChange}
                                                        style={{ marginBottom: '10px' }}
                                                    />
                                                    <TextField
                                                        name="email"
                                                        label="Email"
                                                        variant="outlined"
                                                        value={editForm.email}
                                                        onChange={handleInputChange}
                                                        style={{ marginBottom: '10px' }}
                                                    />
                                                    <Button onClick={handleSaveClick} variant="contained" color="primary">Save</Button>
                                                </Box>
                                            ) : (
                                                <>
                                                    <Typography variant="h8" fontWeight="bold">{selectedUser.username}</Typography>
                                                    <Typography variant="body1">{selectedUser.email}</Typography>
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <Typography variant="body1">Select a user to view profile</Typography>
                                    )}
                                </Box>
                                {/* Order reviews */}
                                <Box px={2}>
                                {selectedUser && (
                                    <>
                                        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mb={2}>
                                            <Typography variant="h7" fontWeight="bold">Order Reviews</Typography>
                                            <Button variant="outlined" color="primary" style={{fontSize: '8px'}} onClick={() => setDrawerOpen(true)}>View All</Button>
                                        </Box>
                                        {/* loop through the documents */}
                                        <Box display={'flex'} gap={1} overflow={'auto'} style={{maxHeight: '200px'}}>
                                        {userOrders.length > 0 ? (
                                            userOrders.map((doc, index) => (
                                                <Card key={index} variant="outlined" style={{ marginBottom: '10px', minWidth: '150px', height: '150px', boxShadow: '0 0 10px rgba(0, 0, 0, .2' }} >
                                                    <CardContent>
                                                        <Typography variant="body3" fontWeight="bold" fontSize={10}>Order: {extractOrderName( doc.documentUrl) }</Typography>
                                                        <Typography variant="body2">Status: {doc.orderStatus}<a href={doc.url} target="_blank" rel="noopener noreferrer">{doc.url}</a></Typography>
                                                    </CardContent>
                                                </Card>
                                            ))
                                        ) : (
                                            <Typography variant="body2" style={{ fontSize: '12px' }}>
                                                Client has no orders yet
                                            </Typography>
                                        )}
                                        </Box>
                                    </>
                                )}
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/* Floating card for activity indicator and status */}
            {(loading || updateStatus) && (
                <Box 
                    position="fixed" 
                    bottom={16} 
                    right={16} 
                    bgcolor="white" 
                    boxShadow={3} 
                    p={2} 
                    borderRadius={2} 
                    zIndex={1000}
                >
                    {loading ? (
                        <Box display="flex" alignItems="center">
                            <CircularProgress size={24} />
                            <Typography variant="body2" ml={2}>Updating...</Typography>
                        </Box>
                    ) : (
                        <Typography variant="body2" color={updateStatus.startsWith('Error') ? 'red' : 'green'}>
                            {updateStatus}
                        </Typography>
                    )}
                </Box>
            )}

            {/* user ordser popup */}
            {selectedUser && (
                <UserOrders drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} user={selectedUser} orders={userOrders}/>
            )}
        </Wrapper>
    );
};

export default User;
