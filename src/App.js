import React from 'react';

import ChatBox from './components/chat/ChatBox';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard.js/Dashboard';
import Profile from './components/Profile/Profile';
import Analytics from './components/Analytics/Analytics';
function App() {
  return (

     <Router>
      <div className='App'>
        <Routes>
          
          <Route path='/' element={<Dashboard />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/analytics' element={<Analytics />} />
        </Routes>
        <Sidebar/>

      </div>
    </Router>
  );
}

export default App;
