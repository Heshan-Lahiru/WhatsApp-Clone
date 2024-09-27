import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/whatsapp/whatsapp';
import Setting from './components/whatsapp/setting';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setting" element={<Setting />} />
 
       
      </Routes>
    </Router>
  );
}

export default App;
