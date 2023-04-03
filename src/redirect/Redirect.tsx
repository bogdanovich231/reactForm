import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NotFound from '../Components/404';
import AboutUs from '../Components/AboutUs';
import Forms from '../Components/Forms';
import SearchBar from '../Components/SearchBar';

export default class Redirect extends Component {
  constructor(data: string) {
    super(data);
    this.state = {};
  }
  render() {
    return (
      <Router>
        <div className="header_menu">
          <nav>
            <ul className="menu">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/form">Form</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<SearchBar />} />
            <Route path="/About" element={<AboutUs />} />
            <Route path="/form" element={<Forms />} />
            <Route element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    );
  }
}
