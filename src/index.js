import React from 'react';
import { createRoot } from "react-dom/client";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './context/UserContext';
import { ContextProvider } from './context/AuthContext';
import { ToastProvider } from './components/toast/Toast';
import { DialogProvider } from './context/DialogProvider';
import { ArgonControllerProvider } from './context';
// import { HashRouter as Router } from "react-router-dom";
// import { BrowserRouter as Router } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom"
import history from './history';
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Router basename={process.env.REACT_APP_HOMEPAGE}  history={history}>
  <UserProvider>
    <ContextProvider value={500}>
      <ToastProvider>
        <DialogProvider>
          <ArgonControllerProvider>
          
              <App />
           
          
          </ArgonControllerProvider>
        </DialogProvider>
      </ToastProvider>
    </ContextProvider>
  </UserProvider>
  </Router>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
