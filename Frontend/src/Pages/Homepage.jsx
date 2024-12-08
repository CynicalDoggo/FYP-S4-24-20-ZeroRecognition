import React from "react";
import { useNavigate } from "react-router-dom";

const Homepage = ({token}) => {
    let navigate = useNavigate()


    function handleLogout() {
        sessionStorage.removeItem('token')
        navigate('/')
    }

    return (
        <div>
            <h3 className="text-3xl font-bold">Welcome back, {token.user.user_metadata.first_name}</h3>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Homepage