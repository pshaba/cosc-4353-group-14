// src/App.js
import React/*, { useEffect, useState }*/ from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Profile from './Profile';
// import EventManagement from './EventManagement';
// import VolunteerMatching from './VolunteerMatching';
// import Notifications from './Notifications';
// import VolunteerHistory from './VolunteerHistory';
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
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Profile" element={<Profile />} />
        {/* 
        <Route path="/EventManagement" element={<EventManagement />}/>
        <Route path="/Notifications" element={<Notifications />}/>
        <Route path="/VolunteerMatching" element={<VolunteerMatching />}/>
        <Route path="VolunteerHistory" element={<VolunteerHistory/>}/>
        */}
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



