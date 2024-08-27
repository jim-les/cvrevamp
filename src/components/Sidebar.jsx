import React from 'react';
import { useLocation, Link } from 'react-router-dom'; // Import useLocation for route tracking
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { colors } from '@mui/material';

// Import icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import ResumeIcon from '@mui/icons-material/Article';
import CoverLetterIcon from '@mui/icons-material/Note';
import WebsiteIcon from '@mui/icons-material/Language';
import TemplatesIcon from '@mui/icons-material/FormatListBulleted';
import ToolsIcon from '@mui/icons-material/Build';
import JobAlertsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useAppContext } from '../useAppContext';
import { Button } from '@mui/material';
import { Logout, LogoutOutlined } from '@mui/icons-material';

// Sidebar links with icons
const links = [
    { name: 'Dashboard', path: '/dashboard', icon: <DashboardIcon style={{ fontSize: 20 }} /> },
    { name: 'My Resume', path: '/dashboard/resume', icon: <ResumeIcon style={{ fontSize: 20 }} /> },
    { name: 'Subscriptions', path: '/dashboard/subscription', icon: <CoverLetterIcon style={{ fontSize: 20 }} /> },
    // { name: 'Website', path: '/dashboard/website', icon: <WebsiteIcon style={{ fontSize: 20 }} /> },
    { name: 'Templates', path: '/dashboard/templates', icon: <TemplatesIcon style={{ fontSize: 20 }} /> },
    { name: 'Tools', path: '/dashboard/tools', icon: <ToolsIcon style={{ fontSize: 20 }} /> },
    { name: 'Job Alerts', path: '/dashboard/job-alerts', icon: <JobAlertsIcon style={{ fontSize: 20 }} /> },
];

const Sidebar = ({setStage}) => {
    const location = useLocation(); // Get current route
    const { user } = useAppContext(); // Get user data from context

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Remove user data from local storage
        window.location.href = '/login'; // Redirect to login page
    }

    return (
        <Container>
            <UserContainer>
                <AccountCircle style={{ fontSize: 50 }} />
                <Typography variant="h9" style={{ marginLeft: '10px' }}>
                    {user ? user.username : 'Guest'}
                    <br />
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
            <Button onClick={handleLogout} style={{ marginLeft: '30px', position: 'absolute', bottom: '20px' }}>
                <LogoutOutlined style={{ marginRight: '10px' }} />
                Logout
            </Button>
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
