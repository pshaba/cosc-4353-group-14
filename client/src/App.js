// src/App.js
import React/*, { useEffect, useState }*/ from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Profile from './Profile';
import EventManagementForm from './EventManagementForm';
import VolunteerHistory from './VolunteerHistory';
import Notifications from './Notifications';
import VolunteerMatchingForm from './VolunteerMatchingForm';
import './App.css'; //Custom CSS if needed
import 'bootstrap/dist/css/bootstrap.min.css' //Custom CSS
import 'bootstrap/dist/js/bootstrap.bundle.min' // Bootstrap JS for Register Modal 

function App() {
 // const [backendData, setBackendData ] = useState ([{}])

  // useEffect(() => {
  //   fetch("/api").then(
  //     response => response.json()
  //   ).then(
  //     data => {
  //       setBackendData(data)
  //     }
  //   )
  // }, [])
  return (
    <Router>
      <div>
        <Routes>
          {/* Fixed the routes for /, /login, and /home -- JS */}
          <Route path="/" element={<Login/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/event-management" element={<EventManagementForm />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/volunteer-history" element={<VolunteerHistory />} />
          <Route path="/volunteer-matching" element={<VolunteerMatchingForm />} />
        </Routes>
      </div>
    </Router>
 
    // <Router>
    //   <div>
    //     {/* <div>
        
    //     {(typeof backendData.users === 'undefined') ? (
    //       <p>Loading...</p>
    //     ):(
    //       backendData.users.map((user, i) => (
    //         <p key={i}>{user}</p>
    //       ))
    //     )}

    //   </div> */}
    //   <Routes>
    //     <Route path="/" component={Login} />
    //     <Route path="/profile" component={Profile} />
    //   </Routes>
    //     {/* <Switch>
    //       <Route path="/login" component={Login} />
    //       <Route path="/register" component={Registration} />
    //       <Route path="/profile" component={Profile} />
    //       <Route path="/event-management" component={EventManagement} />
    //       <Route path="/volunteer-matching" component={VolunteerMatching} />
    //       <Route path="/notifications" component={Notifications} />
    //       <Route path="/volunteer-history" component={VolunteerHistory} />
    //     </Switch> */}
    //   </div>
    // </Router>
  );
}

export default App;



