import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import 'flowbite';
import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ImportantLinks from './pages/ImportantLinks';
import Gallery from './pages/Gallery';
import Member from './pages/Member';
import About from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Notifications from './pages/Notifications';
import RForm from './pages/RForm';
import Admin from './pages/Admin';

import Header from './components/Header'; // Import Header component
import Footer from './components/Footer'; // Import Header component

import { Provider } from 'react-redux';
import { store } from './redux/store'; // Your store file

const App = () => {
  return (
    <Provider store={store}>  {/* Redux provider to give access to the store */}
    <Router>
      <Header /> {/* Include Header component */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/importantlinks" element={<ImportantLinks />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/member" element={<Member />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/notification" element={<Notifications />} />
        <Route path="/salary" element={<RForm />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </Router>
    </Provider>
  );
};

export default App;

