import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, Table, TableRow, TableCell, CircularProgress } from '@mui/material';
import axios from 'axios';
import Wrapper from '../../components/common/Wrapper';
import Sidebar from '../../AdminComponents/Sidebar';
import DashboardTopbar from '../../AdminComponents/DashboardTopbar';
import { Group, AccountBalance, ReportOffRounded, CurrencyExchange, AccountBalanceWalletSharp, Person } from '@mui/icons-material';
import { BASE_URL } from '../../BASE_URL';

const AccountUserProfile = ({ user }) => (
    <Box p={2} flex={1} alignItems="center" justifyContent="center">
        <div className="accountCircle" style={{ width: '100%', textAlign: 'center' }}>
            <img src={user.profilePicture || "https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png"} alt="profile" width={100} />
            <Typography variant="h6" color="white" fontWeight={'bold'}>{user.username}</Typography>
        </div>

    </Box>
);

const RankedUsers = ({ users }) => (
    <Box>
        <Typography variant="h4" fontWeight={'bold'} color={'blue'}>Ranked Users</Typography>
        <Box display="flex" flexDirection="row" justifyContent="space-between" overflowX="scroll" gap={2} style={{ padding: '10px 0', overflowX: 'scroll' }}>
            {users.map((user, index) => (
                <Card style={{ minWidth: '200px', height: '100px', padding: '10px 10px', background: 'linear-gradient(rgba(0, 0, 10, 0.8) 0%, darkblue 100%)' }} key={index}>
                    <Box display={'flex'} justifyContent={'center'} alignContent={'center'} pt={2} gap={2}>
                        <Box>
                            <img src={user.profilePicture || "https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png"} alt="profile" width={50} />
                        </Box>
                        <Box>
                            <Typography variant="body3" color={'white'}>{user.username}</Typography>
                            <br />
                            <Typography variant="h7" color={'white'} fontWeight={800}>Orders: {user.orders}</Typography>
                        </Box>
                    </Box>
                </Card>
            ))}
        </Box>
    </Box>
);

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('authToken');
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL}/api/admin/getusers`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUsers(response.data.users || []);
                setCurrentUser(response.data.currentUser || {});
            } catch (error) {
                setError(error);
                if (error.response && error.response.data.error === "Token is invalid") {
                    // Handle token invalid case
                }
            } finally {
                setLoading(false);
            }
        };
        
        fetchUsers();
    }, [token]);

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

    const handleRowClick = (user) => {
        // Handle row click
    };

    const dashboardCards = [
        { title: 'Total Users', value: users.length + 2, icon: Group, color: 'blue' },
        { title: 'Total Subscribers', value: 0, icon: AccountBalance, color: 'green' },
        { title: 'Total Revenue', value: 0, icon: CurrencyExchange, color: 'red' },
        { title: 'Total Orders', value: 0, icon: ReportOffRounded, color: 'purple' },
    ];

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">Error loading data</Typography>;

    return (
        <Wrapper>
            <Grid container spacing={3} height="100vh">
                <Grid item md={3} height="100%">
                    <Sidebar />
                </Grid>
                <Grid item md={9} height="100%" style={{ backgroundColor: '#f1f1f5' }}>
                    <DashboardTopbar />
                    <Box pr={1} style={{ overflowY: 'scroll', height: '80vh' }}>
                        <Grid container spacing={3} style={{ marginTop: 20 }}>
                            {dashboardCards.map((card, index) => (
                                <Grid item md={3} key={index}>
                                    <Card style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', height: '150px', borderBottom: `3px solid ${card.color}`, cursor: 'pointer' }} className='adminDashboardcards'>
                                        <Box p={2}>
                                            <Typography variant="h6">{card.title}</Typography>
                                            <Typography variant="h4" fontWeight={'bold'}>{card.value}</Typography>
                                        </Box>
                                        <Box p={2}>
                                            <card.icon style={{ fontSize: 60, color: card.color }} />
                                        </Box>
                                        {/* <Box p={0} px={2} style={{ position: 'absolute', bottom: 0, backgroundColor: card.color, width: '100%', textAlign: 'left', color: 'white', fontSize: '12px' }}>
                                            View All
                                        </Box> */}
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <Grid container py={2}>
                            <Grid item md={8} pr={2} style={{ height: '300px' }}>
                                <Card style={{ height: '350px', width: '100%' }}>
                                    {/* <LineChartComponent /> */}
                                    <Table>
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell>Username</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Email</TableCell>
                                        </TableRow>
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
                                    </Table>
                                </Card>
                            </Grid>
                            <Grid item md={4}>
                                <Card style={{ height: '350px', background: 'linear-gradient(rgba(0, 0, 10, 0.8) 0%, darkblue 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <AccountUserProfile user={currentUser} />
                                </Card>
                            </Grid>
                        </Grid>

                        <Box style={{ height: '10px', backgroundColor: '#f1f1f1', width: '100%' }}>
                            @footer Bottom
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Wrapper>
    );
};

export default Dashboard;
