// components/BookingForm.jsx

import React, { useState } from 'react';

const BookingForm = () => {
  // State for booking form fields
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [bookingStatus, setBookingStatus] = useState(null);

  // List of available amenities
  const amenitiesList = [
    { id: 1, name: 'Extra Towels' },
    { id: 2, name: 'Room Service' },
    { id: 3, name: 'Spa Access' },
    { id: 4, name: 'Airport Pickup' },
    { id: 5, name: 'Late Checkout' }
  ];

  // Handle change in check-in date
  const handleCheckInChange = (e) => {
    setCheckInDate(e.target.value);
  };

  // Handle change in check-out date
  const handleCheckOutChange = (e) => {
    setCheckOutDate(e.target.value);
  };

  // Handle selecting amenities
  const handleAmenitiesChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedAmenities((prev) => [...prev, value]);
    } else {
      setSelectedAmenities((prev) =>
        prev.filter((amenity) => amenity !== value)
      );
    }
  };

  // Handle form submission (Save Booking)
  const handleSaveChanges = () => {
    if (!checkInDate || !checkOutDate) {
      alert('Please select both check-in and check-out dates');
      return;
    }
    // Mocking a save to the backend (e.g., Supabase)
    setBookingStatus('Booking Saved!');
    console.log({
      checkInDate,
      checkOutDate,
      selectedAmenities,
    });
  };

  // Handle cancel booking
  const handleCancelBooking = () => {
    setCheckInDate('');
    setCheckOutDate('');
    setSelectedAmenities([]);
    setBookingStatus('Booking Cancelled!');
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-center">Booking Form</h2>

      {/* Booking Dates */}
      <div className="my-4">
        <label htmlFor="check-in" className="block text-sm">Check-in Date</label>
        <input
          type="date"
          id="check-in"
          value={checkInDate}
          onChange={handleCheckInChange}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>

      <div className="my-4">
        <label htmlFor="check-out" className="block text-sm">Check-out Date</label>
        <input
          type="date"
          id="check-out"
          value={checkOutDate}
          onChange={handleCheckOutChange}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>

      {/* Amenities */}
      <div className="my-4">
        <p className="text-sm">Select Amenities</p>
        <div className="space-y-2">
          {amenitiesList.map((amenity) => (
            <div key={amenity.id} className="flex items-center">
              <input
                type="checkbox"
                id={`amenity-${amenity.id}`}
                value={amenity.name}
                onChange={handleAmenitiesChange}
                checked={selectedAmenities.includes(amenity.name)}
                className="mr-2"
              />
              <label htmlFor={`amenity-${amenity.id}`} className="text-sm">
                {amenity.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Status Message */}
      {bookingStatus && (
        <div className="mt-4 p-2 text-center text-green-500 font-semibold">
          {bookingStatus}
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handleSaveChanges}
          className="bg-green-500 text-white px-6 py-2 rounded-md"
        >
          Save Changes
        </button>
        <button
          onClick={handleCancelBooking}
          className="bg-red-500 text-white px-6 py-2 rounded-md"
        >
          Cancel Booking
        </button>
      </div>
    </div>
  );
};

export default BookingForm;
