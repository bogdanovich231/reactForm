import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import Redirect from './redirect/Redirect';
import './Book.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Redirect />
  </React.StrictMode>
);
