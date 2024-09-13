// src/components/Login.js
import React from 'react'; 
import {useState} from 'react'; 
//import {Link}  from 'react-router-dom'; 
import './Login.css'; //custom CSS for Login page

const Login = () => {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [showModal, setShowModal] = useState(false); 

    const handleSubmit = (e) => {
        e.preventDefault(); 

        //logic to handle login or registration
        console.log({email, password}); 
    };  

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    {/* Login Form */}
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
                                        onChange={(e) => setEmail(e.target.value)}
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
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button
                                    id="login_btn"
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                >Login</button>
                                <div className="text-center mt-3">
                                    <button
                                        type="button"
                                        className="btn btn-link"
                                        id="register_modal"
                                        onClick={() => setShowModal(true)}
                                    >Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
  
        {/* Register Modal */}
        <div
            className="modal show fade"//use "show" class for visible modals
            id="registerModal"
            tabIndex="-1"
            role="dialog"
            style={{display: showModal ? 'block' : 'none'}} 
            aria-labelledby="registerModalLabel"
            aria-hidden="true"
            onClick={() => setShowModal(false)} //close modal on outside click
        >
            <div className="modal-dialog" role="document" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="registerModalLabel">
                            Register
                        </h5>
                        {/*Close button on the register modal*/}
                        <button
                            type="button"
                            className="close"
                            onClick={() => setShowModal(false)}
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="registerEmail">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="registerEmail"
                                    placeholder="Enter email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="registerPassword">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="registerPassword"
                                    placeholder="Enter password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="modal-footer">
                                <button
                                    id="register_btn"
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                >Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Login; 