import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import React, {useState} from 'react';
import './App.css';
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Login from './Login';
import {useStateValue} from "./StateProvider";

function App() {
  const [{user}, dispatch] = useStateValue();
  return (
    <div className="app">
      {!user ? (
        <Login/>
      ): (
        <div className="app__body">
          <Router>
            <Sidebar/>
            <Routes>
              <Route path="/rooms/:roomId" element={<Chat />}/>
              <Route exact path="/" element={<Chat />}/>
            </Routes>
          </Router>
          
        </div>
      )}
    </div>
  );
}

export default App;
