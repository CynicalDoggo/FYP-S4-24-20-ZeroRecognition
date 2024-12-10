import React, { useState } from "react";
import { supabase } from '../supabaseclient';
import { Link, useNavigate } from "react-router-dom";


const StaffLogin = ({setToken}) => {
    let navigate = useNavigate()

    const [formData, setFormData] =useState ({
        email:'',password:''
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
        const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
          })

        if (error) throw error   
        console.log(data)
        setToken(data)
        navigate('/Homepage')

      } catch (error) {
        alert(error)
      }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>

                <input placeholder="Username" 
                name='username' 
                onChange={handleChange}/>

                <input placeholder="Password" 
                name='password' 
                type="password"
                onChange={handleChange}/>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
export default StaffLogin;