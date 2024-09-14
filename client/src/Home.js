/* Home.js
This will act as a Home page to hold a navbar to all other components
Contiains Login button to redirect to login/register page 
Once logged in, the Login page will redirect to this Home page
*/
import React from 'react'; 
import { Link } from 'react-router-dom'; 
import './Home.css'
import {loremIpsum} from 'lorem-ipsum'; //used to generate text in home page body
//import {Navbar} from 'react-bootstrap'; 
//import {Container} from 'reactstrap'; 

const Home = () => {

    const paragraphs = loremIpsum({
        count: 2, //number of paragraphs 
        units:'paragraphs'
    }); 

    return (
        <div className="fixed-top">
            {/* NAV BAR FOR HOME PAGE */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <span className="navbar-brand h1">Volunteer Hub</span>
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarNav" 
                        aria-controls="#navbarNav"
                        area-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* NAV BAR BUTTONS + LOGIN BUTTON */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/"> Home </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Profile"> Profile </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/EventManagement"> Manage Events </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/VolunteerMatching"> Match Volunteers </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/VolunteerHistory"> Volunteer History </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Notifications"> Notifications </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="btn btn-outline-success my-2 my-sm-0" to="/Login"> Login </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* HOME PAGE CONTENT -- CONTENT MADE UP FOR APPEARANCE*/}
            <div className="container-fluid">
                <div className="row" id="home_img">
                    <div className="col-12" id="home_img_text">
                        <h5>Ready to begin volunteering?</h5>
                        <p>You have come to a great place. Login or create an account to begin!</p>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-6">
                        <p>{paragraphs}</p>
                    </div>
                    <div className="col-6">
                        <p>{paragraphs}</p>
                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="container-fluid">
                <div className="row">
                    <div className="col" id="footer">&copy; 2024 Volunteer Hub</div>
                </div>
            </footer>
        </div>
    );
};

export default Home; 