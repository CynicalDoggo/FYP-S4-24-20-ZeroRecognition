import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountOverview from "../components/GuestHomePage/AccountOverview";
import BookingManagement from "../components/GuestHomePage/BookingManagement";
import RoomPreferences from "../components/RoomPreferences";
import GuestSettings from "../components/GuestSettings";

const Homepage = ({ token }) => {
    let navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Account Overview");

    function handleLogout() {
        sessionStorage.removeItem("token");
        navigate("/");
    }

    const renderContent = () => {
        switch (activeTab) {
            case "Account Overview":
                return <AccountOverview />;
            case "Booking Management":
                return <BookingManagement />;
            case "Room Preferences":
                return <RoomPreferences />;
            case "Settings":
                return <GuestSettings />;
            default:
                return null;
        }
    };

    return (
        <div>
            <h3 className="text-3xl font-bold">Welcome back, {token.user.user_metadata.first_name}</h3>
            <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
                Logout
            </button>

            {/* Navbar */}
            <div className="mt-6">
                <nav className="flex space-x-4">
                    {["Account Overview", "Booking Management", "Room Preferences", "Settings"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded ${
                                activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6 mt-4">{renderContent()}</div>
        </div>
    );
};

export default Homepage;