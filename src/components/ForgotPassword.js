import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './forgot.css'; // Import the CSS for styling

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/forgot-password`, { email });
      alert('Password reset link sent');
    } catch (error) {
      alert('Error sending reset link');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <button type="submit">Send Reset Link</button>
        </form>
        <div className="links">
          <Link to="/">Login</Link>
          <br />
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
