// src/components/Login.js
import React from 'react'; 
import {useState} from 'react'; 
import {Link}  from 'react-router-dom'; 

const Login = () => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 

    const handleSubmit = (e) => {
        e.preventDefault(); 

        //logic to handle login
        console.log({email, password}); 
    }; 

    return (
        <div className="card mt-5">
            <div className="card-body">
                <h2 className="card-title text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            placeholder="Enter email"
                            onChange ={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter password"
                            onChange = {(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        id="login_btn"
                        type="submit"
                        className="btn btn-primary btn-block"
                    >Login</button>
                    <div className="text-center mt-3">
                        <Link to="/Register">Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login; 