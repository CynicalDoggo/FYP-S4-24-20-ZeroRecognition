import React from "react";

const Dashboard = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 shadow rounded">
                    <h2 className="text-xl font-bold">Account Overview</h2>
                    <p>Basic info and quick links here.</p>
                </div>
                <div className="bg-white p-4 shadow rounded">
                    <h2 className="text-xl font-bold">Booking Management</h2>
                    <p>Modify or cancel bookings here.</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
