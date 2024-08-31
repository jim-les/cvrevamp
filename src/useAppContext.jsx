import { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import { BASE_URL } from './BASE_URL';

// Create the context
const AppContext = createContext();

// Create the AppProvider component
export const AppProvider = ({ children }) => {
    const appContextValue = useAppContext();

    return (
        <AppContext.Provider value={appContextValue}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook to use the AppContext
export const useApp = () => useContext(AppContext);

// useAppContext hook implementation
export const useAppContext = () => {
    const baseUrl = BASE_URL;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('authToken') || '');

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${baseUrl}/api/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [token, baseUrl]);

    const login = async (email, password, setError, navigate) => {
        try {
            const response = await axios.post(`${baseUrl}/api/login`, { email, password });
            const { token } = response.data;
            localStorage.setItem('authToken', token);
            setToken(token);
            setError('');
            navigate('/dashboard');
        } catch (error) {
            console.error('Error during login:', error);
            setError('Invalid credentials');
        }
    };

    const isLoggedIn = !!token;

    return { user, loading, isLoggedIn, login };
};
