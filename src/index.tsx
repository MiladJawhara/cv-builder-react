import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import '@mdi/font/css/materialdesignicons.min.css'
import './index.css';
import App from './App';
import Input from './Classes/Input';

Input.init();
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

