import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './app/store';
import { authSuccess } from './features/auth/authSlice'; // Import authSuccess action
import App from './App';
import './index.css';

const persistedUser = JSON.parse(localStorage.getItem('user'));
const persistedToken = localStorage.getItem('token');
const tokenExpiration = localStorage.getItem('tokenExpiration');

if (persistedUser && persistedToken && tokenExpiration) {
  const currentTime = Date.now();

  if (currentTime < tokenExpiration) {
    store.dispatch(authSuccess({ token: persistedToken, user: persistedUser }));
  } else {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('user');
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
