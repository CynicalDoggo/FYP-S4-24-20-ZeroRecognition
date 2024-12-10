import React, { useState } from "react";
import { supabase } from '../supabaseclient';
import { Link } from "react-router-dom";

const Registration = () => {

    const [formData, setFormData] =useState ({
        firstName:'',lastName:'',email:'',phoneNum:'',password:'',confirmPassword:''
    })

    console.log(formData)

    function handleChange(event) {
      setFormData((prevFormData)=>{
        return{
          ...prevFormData,
          [event.target.name]:event.target.value
        }

      })

    }

    async function handleSubmit(e) {
      e.preventDefault()
      try {
        const { data, error } = await supabase.auth.signUp(
          {
            email: formData.email,
            password: formData.password,
            options: {
              data: {
                first_name: formData.firstName,
                last_name: formData.lastName,
                phone_num: formData.phoneNum,
              }
            }
          }
        )
        if(error) throw error
        alert('Check your email for verification link')

      } catch (error) {
        alert(error)
      }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input placeholder="First Name" 
                name='firstName' 
                onChange={handleChange}/>

                <input placeholder="Last Name" 
                name='lastName' 
                onChange={handleChange}/>

                <input placeholder="Email" 
                name='email' 
                onChange={handleChange}/>

                <input placeholder="Phone Number" 
                name='phoneNum' 
                onChange={handleChange}/>

                <input placeholder="Password" 
                name='password' 
                type="password"
                onChange={handleChange}/>

                <input placeholder="Confirm Password" 
                name='comfirmPassword' 
                type="password"
                onChange={handleChange}/>

                <button type="submit">Submit</button>
            </form>
            Already have an account? <Link to='/'>Login</Link>
        </div>
    )
}
export default Registration;