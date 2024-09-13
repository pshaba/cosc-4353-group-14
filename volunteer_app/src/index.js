// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; //your App component
import { BrowserRouter as Router } from 'react-router-dom'; //Import router

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router> {/*enables routing application*/}
            <App />
        </Router>
    </React.StrictMode>
);

