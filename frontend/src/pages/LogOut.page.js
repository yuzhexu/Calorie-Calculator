import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { clearItems } from "../services/ClientStorage";

export const LogOut = () => {
    const navigate = useNavigate();
    useEffect(() => {
        clearItems();
        navigate("/");
        window.location.reload(false);
    }, [navigate]); // Include navigate in the dependency array

    return '';
}
