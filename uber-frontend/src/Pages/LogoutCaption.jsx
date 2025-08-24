import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout as captionLogoutAction } from '../context/caption.auth.slice' // Renamed for clarity

const LogoutCaption = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            const token = localStorage.getItem('captionaccesstoken')
            if (!token) {
                dispatch(captionLogoutAction());
                navigate('/logincaption'); 
                return;
            }
            try {
                await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/caption/logout`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } catch (error) {
               console.log("Error in caption login ",error)
            } finally {
                dispatch(captionLogoutAction());
                localStorage.removeItem('captionaccesstoken');
                navigate('/logincaption'); 
            }
        };

        performLogout();
    }, [dispatch, navigate]); 

    
    return <h1>Logging out caption...</h1>;
}
export default LogoutCaption;