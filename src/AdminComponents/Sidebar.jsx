import React from 'react';
import { useLocation, Link } from 'react-router-dom'; // Import useLocation for route tracking
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { colors } from '@mui/material';

// Import icons
import { Dashboard, People, AccountCircle, Group, Assessment, Equalizer, NotificationsActive, AccountBalanceWalletSharp } from '@mui/icons-material';

// Sidebar links with icons
// dahboard, users, reports, settings, analytics, notifications, help
const links = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <Dashboard style={{ fontSize: 20 }} /> },
    { name: 'Users', path: '/admin/dashboard/users', icon: <Group style={{ fontSize: 20 }} /> },
    { name: 'Templates', path: '/admin/dashboard/templates', icon: <Assessment style={{ fontSize: 20 }} /> },
    { name: 'Orders', path: '/admin/dashboard/orders', icon: <Equalizer style={{ fontSize: 20 }} /> },
    // { name: 'Notifications', path: '/admin/dashboard/notifications', icon: <NotificationsActive style={{ fontSize: 20 }} /> },
    { name: 'Subscription', path: '/admin/dashboard/subscription', icon: <AccountBalanceWalletSharp style={{ fontSize: 20 }} /> },
    { name: 'Profile', path: '/admin/dashboard/profile', icon: <People style={{ fontSize: 20 }} /> },
];


const Sidebar = () => {
    const location = useLocation(); // Get current route

    return (
        <Container>
            <UserContainer>
                <AccountCircle style={{ fontSize: 50 }} />
                <Typography variant="h9" style={{ marginLeft: '10px' }}>
                    Admin Dashboard<br />
                    <span style={{ fontSize: '12px', color: 'blue', marginTop: '10px' }}> You are using a Free Plan</span>
                </Typography>
            </UserContainer>
            {links.map((link) => (
                <StyledLink
                    key={link.path}
                    to={link.path}
                    isActive={location.pathname === link.path} // Determine if the link is active
                >
                    {link.icon}
                    <Typography variant="body2" style={{ marginLeft: '10px' }}>
                        {link.name}
                    </Typography>
                </StyledLink>
            ))}
        </Container>
    );
};

// Styled component for active link
const StyledLink = styled(Link)`
    display: flex;
    align-items: center;
    padding: 5% 10%;
    cursor: pointer;
    text-decoration: none;
    color: ${({ isActive }) => (isActive ? 'blue' : 'black')}; // Active link color
    background-color: ${({ isActive }) => (isActive ? '#e0e0e0' : 'transparent')}; // Active link background color
    border-radius: 4px;

    &:hover {
        background-color: #f5f5f5; // Hover effect
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 100vh;
    background-color: #f4f4f4;
    min-width: 280px;
    padding: 20px 10px;
    transition: background-color 0.3s, color 0.3s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
`;

const UserContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 20px 30px;
    height: 60px;
    border-bottom: 1px solid #e0e0e0;
`;

export default Sidebar;
