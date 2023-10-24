import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import Admin from "./Admin";
import User from "./User";

function Home() {
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:8801/')
            .then(res => {
                if (res.data.valid) {
                    console.log(res.data)
                    setRole(res.data.role);
                } else {
                    navigate('/login');
                }
            })
            .catch(err => console.log(err))
    }, []);

    const handleLogout = () => {
        axios.get("http://localhost:8801/logout")
            .then(res => {
                window.location.reload()
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <div className="d-flex justify-content-between m-3">
                <h1>Welcome to the Home Page</h1>
                <button onClick={handleLogout} className="btn btn-primary w-30 mb-2">Log Out</button>
            </div>
            {role === "admin" && <Admin />}
            {role === "user" && <User />}
        </div>
    );
}

export default Home;
