// src/components/Register.js
import React from "react";
import { Link } from 'react-router-dom'; 

const Register = () => {
    return (
        <div 
            className="modal fade"
            id="registerModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="registerModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="registerModalLabel">
                            Register
                        </h5>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="registerUsername">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="registerUsername"
                                    placeholder="Enter username"
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
                                    required
                                />
                            </div>
                            <button
                                id="register_btn"
                                type="submit"
                                className="btn btn-primary"
                            >Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    ); 
}; 

export default Register; 