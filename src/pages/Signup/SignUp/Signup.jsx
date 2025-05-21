import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Signup.css';

function Signup() {
  const { role } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    console.log(`Signing up as ${role} with`, email, password);
    // Redirect after signup

    if (role === 'organizer') {
      navigate('/organizer-details');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="signup-form-container">
      <form className="signup-form" onSubmit={handleSignup}>
        <h2>Sign Up as {role.charAt(0).toUpperCase() + role.slice(1)}</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Role-specific input example */}
        {role === 'vendor' && (
          <input type="text" placeholder="Business Name" required />
        )}
        {/* {role === 'organizer' && (
          <input type="text" placeholder="Organization" required />
        )} */}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;

