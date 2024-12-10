import React, { useState } from "react";
import { supabase } from '../supabaseclient';
import { Link, useNavigate } from "react-router-dom";



const Login = ({setToken}) => {
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
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit}>
                <h1 className="flex items-center justify-center min-h-screen">Login</h1>
                <input placeholder="Email" 
                name='email' 
                onChange={handleChange}/>

                <input placeholder="Password" 
                name='password' 
                type="password"
                onChange={handleChange}/>

                <button type="submit">Submit</button>
            </form>
            Don't have an account? <Link to='/Registration'>Register Here</Link>
        </div>
    )
}
export default Login;