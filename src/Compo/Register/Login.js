import axios from 'axios';
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

function Login() {
    const [data, setData] = useState({
        email: "",
        pass: ""
    })
    const navi = useNavigate();
    const handleInput = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if ((!data.email.includes("@"))) {
            alert("Enter valid email address!!")
        }
        else if (!data.pass.trim()) {
            alert("Enter Password!")
        }
        else {
            console.log(data);
            axios.post("https://udemyclone-backend.onrender.com/api/login", data) //https://udemyclone-backend.onrender.com/api/login
                .then((res) => {
                    alert(res.data.msg);
                    if (res.data.msg === "User Logged in Successfully!") {
                        localStorage.setItem("token", res.data.token);
                        console.log(res.data.userdetail)
                        navi("/");
                    }
                })
                .catch(err => console.log(err));
            setData({ email: "", pass: "" })
        }
    }
    return (
        <div>
            <div className='register_div'>
                <h3 className='reg_heading'>Log in to your Udemy account</h3>
                <form>
                    <div className='signupdiff_div'>
                        <div className='logosignup'>
                            <FcGoogle size={"2em"} className='logogoogle' />
                        </div>
                        <h4 className='signuph4'>Continue with Google</h4>
                    </div>
                    <div className='signupdiff_div'>
                        <div className='logosignup'>
                            <FaFacebook color='rgb(59,89,152)' size={"2em"} className='logogoogle' />
                        </div>
                        <h4 className='signuph4'>Continue with Facebook</h4>
                    </div>
                    <div className='signupdiff_div'>
                        <div className='logosignup'>
                            <FaApple size={"2em"} className='logogoogle' />
                        </div>
                        <h4 className='signuph4'>Continue with Apple</h4>
                    </div>
                    <div className='form-group'>
                        {/* <label htmlFor='email'>Email</label> */}
                        <input type='email' name='email' id='email' placeholder='Email' value={data.email} onChange={handleInput} />
                    </div>
                    <div className='form-group'>
                        {/* <label htmlFor='pass'>Password</label> */}
                        <input type='password' name='pass' id='pass' placeholder='Password' value={data.pass} onChange={handleInput} />
                    </div>

                    <button className='reg_submit' onClick={handleSubmit}>Log in</button>
                    <p style={{ textAlign: "center" }}>or <span className='loginspan'>Forgot Password</span></p>
                    <hr />
                    <NavLink to="/register" className="navdeco"><h4 className='navdeco'>Don't have an account? <span className='loginspan'>Sign up</span></h4></NavLink>
                    <p className='loginorg'>Log in with your organization</p>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default Login