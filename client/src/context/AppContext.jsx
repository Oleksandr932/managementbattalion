import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [showLogin, setShowLogin] = useState(false)

    // fetch user data
    const fetchUser = async () => {
        try {
            const { data } = await axios.get('api/user/data');
            if (data.success) {
                setUser(data.user);
                setIsOwner(true);
            } 
        } catch (error) {
            console.error(error.message);
        }
    };

    // logout user
    const logoutUser = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsOwner(false);
        navigate('/');
        axios.defaults.headers.common['authorization'] = '';
        toast.success('Logout successful');
    }



    // retrieve tokin from local storage
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setToken(token);
        }
    }, []);

    // fetch user data if token is available
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['authorization'] = `${token}`;
            fetchUser();
        }
    }, [token]);

    const value = {
        navigate, axios, user, setUser, token, setToken, isOwner, setIsOwner, fetchUser,
        logoutUser, showLogin, setShowLogin};

    return (<AppContext.Provider value={value}>{children}</AppContext.Provider>);
};

export const useAppContext = () => {

    return useContext(AppContext);
};