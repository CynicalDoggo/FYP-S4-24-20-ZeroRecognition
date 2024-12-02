--Functions and variables
ALTER DATABASE postgres SET timezone TO 'Asia/Singapore';
CREATE TYPE ROOMSTATUS AS ENUM('Available', 'Occupied', 'Maintenance');
CREATE TYPE BEDTYPE AS ENUM('Twin', 'King', 'Queen');

-- Create a trigger function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column () RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger that calls the function before each update
CREATE TRIGGER update_staffmembers_updated_at BEFORE
UPDATE ON StaffMembers FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column ();

-- Guest Tables
CREATE TABLE guest (
  guest_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  mobile_number TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  faceId_Concsent BOOLEAN DEFAULT false,
  facial_data bytea
);

CREATE TABLE room (
  room_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  room_number TEXT UNIQUE NOT NULL,
  room_type TEXT,
  is_smoking BOOLEAN,
  beds BEDTYPE,
  status ROOMSTATUS DEFAULT 'Available',
  price DECIMAL(10,2) NOT NULL
);

CREATE TABLE room_preference (
  guest_id BIGINT,
  preferences TEXT,
  FOREIGN KEY (guest_id) REFERENCES guest (guest_id) ON DELETE CASCADE
);

CREATE TABLE room_booking (
  reservation_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  guest_id BIGINT,
  room_id BIGINT,
  checkIn_Status BOOLEAN DEFAULT false,
  check_in_date TIMESTAMP WITH TIME ZONE,
  check_out_date TIMESTAMP WITH TIME ZONE,
  FOREIGN KEY (guest_id) REFERENCES guest (guest_id) ON DELETE CASCADE,
  FOREIGN KEY (room_id) REFERENCES room (room_id) ON DELETE SET NULL
);

CREATE TABLE room_entry_attempt (
  guest_id BIGINT,
  room_id BIGINT,
  successful_entry BOOLEAN,
  entrytime TIMESTAMP WITH TIME ZONE,
  FOREIGN KEY (guest_id) REFERENCES guest (guest_id) ON DELETE CASCADE,
  FOREIGN KEY (room_id) REFERENCES room (room_id) ON DELETE SET NULL
);

CREATE TABLE check_ins (
  checkin_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  guest_id BIGINT,
  timedate_in TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  facial_recognition_success BOOLEAN,
  FOREIGN KEY (guest_id) REFERENCES guest (guest_id) ON DELETE CASCADE
);

CREATE TABLE check_outs (
  checkout_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  guest_id BIGINT,
  timedate_out TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  facial_recognition_success BOOLEAN,
  FOREIGN KEY (guest_id) REFERENCES guest (guest_id) ON DELETE CASCADE
);

--Employee tables
CREATE TABLE StaffMember (
  staff_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  full_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT UNIQUE,
  password_hash TEXT,
  active_status BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE SystemAdmins (
  admin_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE,
  password_hash TEXT,
  active_status BOOLEAN DEFAULT TRUE
);

CREATE TABLE Blacklist (
  blacklist_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  guest_id BIGINT,
  reason TEXT,
  added_by BIGINT,
  date_added TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (guest_id) REFERENCES guest (guest_id) ON DELETE CASCADE,
  FOREIGN KEY (added_by) REFERENCES StaffMember (staff_id) ON DELETE SET NULL
);
