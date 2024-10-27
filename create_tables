ALTER DATABASE postgres SET timezone TO 'Asia/Singapore';

CREATE TABLE guest (
  guest_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  mobile_number TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  facial_data bytea
);

CREATE TABLE room (
  room_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  room_number TEXT UNIQUE NOT NULL,
  room_type TEXT,
  is_smoking BOOLEAN,
  is_available BOOLEAN DEFAULT TRUE
);

CREATE TABLE room_preference (
  guest_id BIGINT,
  preference_type TEXT,
  preference_value TEXT,
  FOREIGN KEY (guest_id) REFERENCES guest (guest_id) ON DELETE CASCADE
);

CREATE TABLE room_reservation (
  reservation_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  guest_id BIGINT,
  room_id BIGINT,
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
