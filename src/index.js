import React from 'react';
import ReactGa from 'react-ga4';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { HashRouter } from 'react-router-dom';
import './reset.css';

ReactGa.initialize('G-4WVQKK4TMY');

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
   <React.StrictMode>
      <HashRouter>
         <App />
      </HashRouter>
   </React.StrictMode>
);
