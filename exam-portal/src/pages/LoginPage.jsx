import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:5000/api';

const LoginPage = ({ onLoginSuccess, logoutMessage, setLogoutMessage }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  // Clear the logout message when the component is unmounted or a new message appears
  useEffect(() => {
    if (logoutMessage) {
      setMessage(logoutMessage);
      const timer = setTimeout(() => setLogoutMessage(''), 3000); // Clear after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [logoutMessage, setLogoutMessage]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    const url = isLogin ? `${API_BASE_URL}/auth/login` : `${API_BASE_URL}/auth/register`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An error occurred.');
      }

      const data = await response.json();
      
      if (isLogin) {
        if (data.token) {
          onLoginSuccess(data.token);
        } else {
          setMessage('Login failed: Token not received.');
        }
      } else {
        setMessage('Registration successful! Please login.');
        setIsLogin(true);
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      {message && <p className="message">{message}</p>}
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <span onClick={() => setIsLogin(!isLogin)} className="link-text">
          {isLogin ? ' Register here' : ' Login here'}
        </span>
      </p>
    </div>
  );
};

export default LoginPage;
