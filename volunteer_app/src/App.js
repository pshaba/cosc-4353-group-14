// src/App.js
import React from 'react';
import { Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  return (
      <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Register" element={<Register />} />
          </Routes>
      </div>
  );
}

export default App;

