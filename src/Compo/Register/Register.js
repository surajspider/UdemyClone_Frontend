import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import axios from 'axios';

function Register() {
    const navi = useNavigate();
    const [data, setData] = useState({
        uname: "",
        email: "",
        pass: ""
    })
    const handleInput = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!data.uname.trim()) {
            alert("Enter Name!\nIt is mandatory!!")
        }
        else if ((!data.email.includes("@"))) {
            alert("Enter valid email address!!")
        }
        else if (!data.pass.trim()) {
            alert("Enter Password!")
        }
        else {
            console.log(data);
            axios.post("http://localhost:4500/api/register", data)  //https://udemyclone-backend.onrender.com/api/register http://localhost:4500/api/register
                .then((res) => {
                    console.log(res.data);
                    alert(res.data.msg);
                    if (res.data.msg === "User Registered Successfully!") {
                        localStorage.setItem("token", res.data.token);
                        navi("/");
                    }
                })
                .catch(err => console.log(err));
            setData({ uname: "", email: "", pass: "" });
        }
    }
    return (
        <div>
            <div className='register_div'>
                <h3 className='reg_heading'>Sign up and start learning</h3>
                <form>
                    <div className='form-group'>
                        {/* <label htmlFor='uname'>Name</label> */}
                        <input type='text' name='uname' id='uname' placeholder='Full name' value={data.uname} onChange={handleInput} />
                    </div>
                    <div className='form-group'>
                        {/* <label htmlFor='email'>Email</label> */}
                        <input type='email' name='email' id='email' placeholder='Email' value={data.email} onChange={handleInput} />
                    </div>
                    <div className='form-group'>
                        {/* <label htmlFor='pass'>Password</label> */}
                        <input type='password' name='pass' id='pass' placeholder='Password' value={data.pass} onChange={handleInput} />
                    </div>
                    <div className='form-check'>
                        <input className='check' type='checkbox' />
                    </div>
                    <div className='form-checknotice'>
                        <p>Send me special offers, personalized recommendations, and learning tips.</p>
                    </div>
                    <button className='reg_submit' onClick={handleSubmit}>Sign up</button>
                    <p className='fontsi'>By signing up, you agree to our Terms of Use and Privacy Policy.</p>
                    <hr />
                    <NavLink to="/login" className="navdeco"><h4 className='navdeco'>Already have an account? <span className='loginspan'>Log in</span></h4></NavLink>
                </form>
            </div>
            <Footer />
        </div>
    )
}


export default Register