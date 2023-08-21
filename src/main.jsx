import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './app/store';
import { authSuccess } from './features/auth/authSlice'; // Import authSuccess action
import App from './App';
import './index.css';

const persistedToken = localStorage.getItem('token');
const tokenExpiration = localStorage.getItem('tokenExpiration');

if (persistedToken && tokenExpiration) {
  const currentTime = Date.now();

  if (currentTime < tokenExpiration) {
    // Token is still valid
    store.dispatch(authSuccess({ token: persistedToken }));
  } else {
    // Token has expired
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
