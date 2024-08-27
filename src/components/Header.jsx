import React, { useState } from 'react';
import styled from 'styled-components';
import { KeyboardArrowDown } from '@mui/icons-material';

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    return (
        <Topbar>
            <WebTitleContainer>
                <WebTitle>Resume Master</WebTitle>
            </WebTitleContainer>

            <Nav>
                <NavItem href="/">Home</NavItem>
                <NavItem href="/about">Tools</NavItem>
                <DropdownContainer>
                    <NavItem href="#" onClick={toggleDropdown}>
                        CV
                        <KeyboardArrowDown />
                    </NavItem>
                    {dropdownOpen && (
                        <DropdownMenu>
                            <DropdownItem href="/tools">Resume Template</DropdownItem>
                            <DropdownItem href="/resume">Resume Example</DropdownItem>
                            <DropdownItem href="/coverletter">Resume Format</DropdownItem>
                            <DropdownItem href="/coverletter">Resume Help</DropdownItem>
                        </DropdownMenu>
                    )}
                </DropdownContainer>
                <NavItem href="/contact">Contact</NavItem>
                <NavItem href="/contact">Blog</NavItem>
                <NavItem href="/contact">Faqs</NavItem>


                <Account>
                    <AccountButton href="/dashboard">Create Account</AccountButton>
                </Account>
            </Nav>
        </Topbar>
    );
};

const Topbar = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    color: black;
    width: 100%;
`;

const WebTitleContainer = styled.div`
    display: flex;
    align-items: center;
`;

const WebTitle = styled.h2`
    margin: 0;
    font-size: 2.5rem;
    color: blue;
`;

const Nav = styled.nav`
    display: flex;
    gap: 1rem;
    align-items: center;
`;

const NavItem = styled.a`
    color: black;
    text-decoration: none;
    position: relative;
    padding: 0.5rem 1rem;
    display: flex;
    gap: 0.1rem;
    align-items: center;
    border-radius: 4px;
    &:hover {
        color: #007bff; /* Change color on hover */
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    }
`;

const DropdownContainer = styled.div`
    position: relative;
`;

const DropdownMenu = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 320px;
    background-color: white;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    padding: 0.5rem;
    z-index: 1000; /* Ensure the dropdown is above other elements */
`;

const DropdownItem = styled.a`
    display: block;
    color: black;
    text-decoration: none;
    padding: 0.5rem 1rem;
    &:hover {
        background-color: #f1f1f1; /* Background color on hover */
    }
`;

const Account = styled.div`
    display: flex;
    gap: 1rem;
`;

const AccountButton = styled.a`
    background-color: #007bff; /* Blue background */
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;

    &:hover {
        background-color: #0056b3; /* Darker blue on hover */
    }
`;

export default Header;
