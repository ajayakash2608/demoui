import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams(); // Get the token from the URL parameters
  const history = useHistory();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    console.log('Received token:', token); // Log the token for debugging
    // Optionally: Add any validation or API calls to verify the token here
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Send the new password to the backend
      const response = await axios.post(`/reset-password/${token}`, { password });
      if (response.status === 200) {
        setSuccess('Password has been reset successfully');
        setTimeout(() => history.push('/login'), 2000); // Redirect to login page after 2 seconds
      }
    } catch (err) {
      setError('Failed to reset password');
      console.error('Error resetting password:', err);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>Reset Password</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          New Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ display: 'block', width: '100%', marginBottom: '10px' }}
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ display: 'block', width: '100%', marginBottom: '20px' }}
          />
        </label>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#28C8B8',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
