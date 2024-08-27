// Wrapper.jsx

import React from 'react';
import styled from 'styled-components';

const Wrapper = ({ children }) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = '/login';
    }
    return (
        <WrapperContainer>
            {children}
        </WrapperContainer>
    )
}

const WrapperContainer = styled.div`
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    overflow: hidden;
    // light bluish
    background-color: #f1f1f5;
`;

export default Wrapper
