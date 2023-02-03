import React from 'react';
import './App.css';
import Base from './components/Base';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import City from './components/City';
import Weather from './components/Weather';
function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Base />} />
        <Route path='/City' element={<City />} />
        <Route path='/Weather' element={<Weather />} />
      </Routes>
    </Router>
  );
}

export default App;
