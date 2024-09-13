// src/App.js
import React, { useEffect, useState }from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
// import Registration from './Registration';
import Profile from './Profile';
// import EventManagement from './EventManagement';
// import VolunteerMatching from './VolunteerMatching';
// import Notifications from './Notifications';
// import VolunteerHistory from './VolunteerHistory';

function App() {
  const [backendData, setBackendData ] = useState ([{}])

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
        {/* <div>
        
        {(typeof backendData.users === 'undefined') ? (
          <p>Loading...</p>
        ):(
          backendData.users.map((user, i) => (
            <p key={i}>{user}</p>
          ))
        )}

      </div> */}
      <Routes>
      <Route path="/" component={Login} />
      <Route path="/profile" component={Profile} />
      </Routes>
        {/* <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Registration} />
          <Route path="/profile" component={Profile} />
          <Route path="/event-management" component={EventManagement} />
          <Route path="/volunteer-matching" component={VolunteerMatching} />
          <Route path="/notifications" component={Notifications} />
          <Route path="/volunteer-history" component={VolunteerHistory} />
        </Switch> */}
      </div>
    </Router>
  );
}

export default App;



