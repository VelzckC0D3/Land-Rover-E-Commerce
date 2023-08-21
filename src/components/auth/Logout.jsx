import axios from 'axios';

const Login = () => {
  const handleLogout = async () => {
    try {
      const response = await axios.delete('http://localhost:3000/logout', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
      });

      if (response.status === 200) {
        console.dir(response.data);
        // Perform any additional actions you need after successful logout
      } else {
        throw new Error(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button type="button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Login;
