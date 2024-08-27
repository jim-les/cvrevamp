import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// graduate icon

const DashboardTopbar = () => {
    const navigate = useNavigate();

    return (
        <TopBarContainer>
            <TopBar>
                <TopBarTitle>Dashboard</TopBarTitle>
                <TopBarActions>
                    <TopBarAction onClick = {() => navigate('/')}>View Site</TopBarAction>
                    <TopBarAction>Upgrade</TopBarAction>
                    <TopBarAction>Help</TopBarAction>
                    <TopBarActionButton>
                        Higher Professionals
                    </TopBarActionButton>
                </TopBarActions>
            </TopBar>
        </TopBarContainer>
    );
}

const TopBarContainer = styled.div`
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f4f4f4; /* Light background color */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
`;

const TopBar = styled.div`
    width: 100%;
    max-width: 900px; /* Increased max-width for better alignment */
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TopBarTitle = styled.h1`
    margin: 0;
    font-size: 1.5rem; /* Larger font size */
    color: #333; /* Darker color for better readability */
`;

const TopBarActions = styled.div`
    display: flex;
    gap: 1rem;
`;

const TopBarAction = styled.button`
    background: transparent;
    border: none;
    color: #007bff; /* Blue color for actions */
    font-size: 1rem;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
        background-color: #e9ecef; /* Light background on hover */
        color: #0056b3; /* Darker color on hover */
    }
`;

const TopBarActionButton = styled.button`
    background: #007bff; /* Blue background color */
    color: white; /* White text color */
    font-size: 1rem;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3; /* Darker background on hover */
    }
`;

export default DashboardTopbar;
