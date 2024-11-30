import React, { useState } from 'react'; // Import useState
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/Dashboard/Header';
import Table from './components/Dashboard/Table';
import Add from './components/Dashboard/Add';
import Edit from './components/Dashboard/Edit';

const App = () => {
  const [isAdding, setIsAdding] = useState(false); // Manage adding state
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Assuming user is authenticated

  return (
    <Router>
      <div>
        <Header setIsAdding={setIsAdding} setIsAuthenticated={setIsAuthenticated} />
        <ToastContainer />
        {/* Routes for different pages */}
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit" element={<Edit />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
