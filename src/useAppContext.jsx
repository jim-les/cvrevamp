// useAppContext.jsx fecth user
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from './BASE_URL';

export const useAppContext = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/profile`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading };
}