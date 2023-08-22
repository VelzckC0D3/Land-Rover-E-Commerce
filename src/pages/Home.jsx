import React from 'react';
import { useSelector } from 'react-redux';
import '../assets/style/Home.css';


function Home() {
  // Access the user state from the Redux store
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <h1>Welcome to the Home Page</h1>
      {user && <p>Welcome, {user.name}!</p>}
    </>
  );
}

export default Home;

