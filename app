from flask import Flask
import logging
import hashlib
from supabase import create_client, Client

#Connecting to SUPABASE cloud database 
url = "https://jbqkrihvwaurorcdagiw.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpicWtyaWh2d2F1cm9yY2RhZ2l3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk5NzQ2ODUsImV4cCI6MjA0NTU1MDY4NX0.YKPc7TvBowLYKWVohA_5dsl9IfFMz7qr1fo4f7V3cY8"

supabase: Client = create_client(url, key)

#Functions

#Registering new guest
def register_guest(first_name, last_name, mobile, email, password, facial_data):
    #Hashes their password
    hashed_pass = hashlib.sha256(password.encode()).hexdigest()

    #Data insertion
    data = {
        "first_name": first_name,
        "last_name": last_name,
        "mobile_number": mobile,
        "email": email,
        "password_hash": password,
        "facial_data": facial_data
    }
    
    #Printing for debugging
    print("Adding: ", data)

    #Attempt Insertion
    response = supabase.table("guest").insert(data).execute()

    #error handling
    if response.data:
        print("Guest is registered succesffuly!")
    else:
        print("And error has occured: ", response.get('error'))



