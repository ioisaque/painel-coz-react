import 'bootstrap';
import '~/styles/material-design-iconic-font/css/materialdesignicons.min.css';

import React from 'react';
import ReactDOM from 'react-dom';

import Dashboard from './views/dashboard';
import { ToastContainer } from 'react-toastify';

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer position="top-right" autoClose={5000} />
    <Dashboard/>
  </React.StrictMode>,
  document.getElementById('root')
);
