import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AccountCircle, Notifications } from '@mui/icons-material';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const user = {
    "name": "Jimleston Osoi"
}

const DashboardTopbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const notifications = [
        'New comment on your post',
        'New follower',
        'System update available'
    ];

    return (
        <TopBarContainer>
            <TopBar>
                <TopBarTitle>Dashboard</TopBarTitle>
                <TopBarActions>
                    <TopBarAction onClick={() => navigate('/')}>View Site</TopBarAction>
                    <NotificationIcon>
                        <IconButton onClick={toggleDrawer(true)}>
                            <Badge badgeContent={3} color="primary">
                                <Notifications />
                            </Badge>
                        </IconButton>
                    </NotificationIcon>
                    <UserAccount>
                        <AccountCircle />
                        <UserName>{user.name}</UserName>
                    </UserAccount>
                </TopBarActions>
            </TopBar>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                <DrawerContent>
                    <List>
                        {notifications.map((notification, index) => (
                            <ListItem button key={index}>
                                <ListItemText primary={notification} />
                            </ListItem>
                        ))}
                    </List>
                </DrawerContent>
            </Drawer>
        </TopBarContainer>
    );
}

const TopBarContainer = styled.div`
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f4f4f4;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TopBar = styled.div`
    width: 100%;
    max-width: 900px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TopBarTitle = styled.h1`
    margin: 0;
    font-size: 1.5rem;
    color: #333;
`;

const TopBarActions = styled.div`
    display: flex;
    align-items: center;
`;

const TopBarAction = styled.button`
    background: transparent;
    border: none;
    color: #007bff;
    font-size: 0.8rem;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;
    margin-left: 1rem;

    &:hover {
        background-color: #e9ecef;
        color: #0056b3;
    }
`;

const NotificationIcon = styled.div`
    margin-left: 1rem;
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const UserAccount = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 5px;
`;

const UserName = styled.p`
    margin: 0;
`;

const DrawerContent = styled.div`
    width: 250px;
    padding: 1rem;
`;

export default DashboardTopbar;
