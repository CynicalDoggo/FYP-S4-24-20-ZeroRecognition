import React from "react";

const UserData = {
    first_name: '',
    email: '',
    phone: '',
};

const AccountOverview = () => {
    return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Account Overview</h2>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="font-medium">{UserData.user_metadeta.first_name}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{UserData.email}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{UserData.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
};

export default AccountOverview;