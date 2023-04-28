import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import 'tw-elements';
import routers from './routes';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AnimatePresence>
      <Router>
        <Routes>
          {routers.map((route) => (
            <Route exact key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Router>
    </AnimatePresence>
  </React.StrictMode>
);
reportWebVitals();
