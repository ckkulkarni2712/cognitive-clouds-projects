import React from 'react';
import './App.css';
import Base from './components/Base';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Base/>} />
      </Routes>
    </Router>
  );
}

export default App;
