import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './context/UserContext';
import { ContextProvider } from './context/AuthContext';
import { ToastProvider } from './components/toast/Toast';
import { DialogProvider } from './context/DialogProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
  <ContextProvider value={500}>
    <ToastProvider>
      <DialogProvider>
        {/* <Router history={history}> */}

        <App />
        {/* </Router> */}
      </DialogProvider>
    </ToastProvider>
  </ContextProvider>
</UserProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();