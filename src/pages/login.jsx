import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { login } from '../utils/auth';


// Mock user data (bulk)
const mockUsers = [
  { email: 'admin@example.com', password: 'admin123' },
  { email: 'user1@example.com', password: 'user123' },
  { email: 'manager@example.com', password: 'manager123' },
  { email: 'guest@example.com', password: 'guest123' },
  { email: 'staff@example.com', password: 'staff123' },
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [forgotHover, setForgotHover] = useState(false);
  const [signUpHover, setSignUpHover] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fake login validation
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      setErrorMessage('');
      navigate('/dashboard');
    } else {
      setErrorMessage('Invalid email or password.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <div style={styles.header}>
          <h2 style={styles.title}>Welcome back</h2>
          <p style={styles.subtitle}>Sign in to admin portal of EventSphere</p>
        </div>

        <form style={styles.form} onSubmit={handleSubmit}>
          <div>
            <label style={styles.label} htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              style={{
                ...styles.input,
                ...(emailFocus ? styles.inputFocus : {}),
              }}
            />
          </div>

          <div>
            <div style={styles.flexBetween}>
              <label style={styles.label} htmlFor="password">
                Password
              </label>
              <a
                href="#"
                style={{
                  ...styles.forgotPassword,
                  ...(forgotHover ? styles.forgotPasswordHover : {}),
                }}
                onMouseEnter={() => setForgotHover(true)}
                onMouseLeave={() => setForgotHover(false)}
              >
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
              style={{
                ...styles.input,
                ...(passwordFocus ? styles.inputFocus : {}),
              }}
            />
          </div>

          {errorMessage && (
            <p style={{ color: 'red', fontSize: '0.9rem', marginTop: 8 }}>
              {errorMessage}
            </p>
          )}

          <div>
            <button
              type="submit"
              style={{
                ...styles.button,
                ...(btnHover ? styles.buttonHover : {}),
              }}
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '0 1rem',
    backgroundImage: 'linear-gradient(135deg, rgba(37, 39, 42, 0.7), rgba(41, 45, 51, 0.7)), url("https://i.pinimg.com/736x/33/0d/e6/330de6e84674a0650780d54876197b9b.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  box: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '1.5rem',
    boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '1.875rem', // 3xl ~30px
    fontWeight: '800',
    color: '#1a202c', // gray-900
  },
  subtitle: {
    marginTop: '0.5rem',
    fontSize: '0.875rem', // sm
    color: '#718096', // gray-600
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    width: '95%'
  },
  label: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#4a5568', // gray-700
    marginBottom: '0.5rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid #d1d5db', // gray-300
    borderRadius: '0.5rem',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.3s ease',
  },
  inputFocus: {
    borderColor: '#3b82f6', // blue-500
    boxShadow: '0 0 0 3px rgba(59,130,246,0.5)',
  },
  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },
  forgotPassword: {
    fontSize: '0.75rem',
    color: '#2563eb', // blue-600
    textDecoration: 'none',
    cursor: 'pointer',
  },
  forgotPasswordHover: {
    textDecoration: 'underline',
  },
  button: {
    width: '100%',
    background: 'linear-gradient(90deg, #2563eb 0%, #4f46e5 100%)',
    color: 'white',
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    fontWeight: '600',
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(59,130,246,0.5)',
    transition: 'all 0.3s ease',
  },
  buttonHover: {
    background: 'linear-gradient(90deg, #1e40af 0%, #4338ca 100%)',
    boxShadow: '0 6px 10px rgba(30,64,175,0.7)',
  },
  hrContainer: {
    position: 'relative',
    marginTop: '1.5rem',
  },
  hrLine: {
    borderTop: '1px solid #d1d5db',
  },
  hrTextContainer: {
    position: 'absolute',
    top: '-0.7rem',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'white',
    padding: '0 0.5rem',
    fontSize: '0.875rem',
    color: '#a0aec0',
  },
  socialButtonsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0.75rem',
    marginTop: '1.5rem',
  },
  socialButton: {
    width: '100%',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    backgroundColor: 'white',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#4a5568',
    cursor: 'pointer',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    transition: 'background-color 0.2s ease',
  },
  socialButtonHover: {
    backgroundColor: '#f9fafb', // gray-50
  },
  footerText: {
    marginTop: '1.5rem',
    textAlign: 'center',
    fontSize: '0.875rem',
    color: '#718096',
  },
  signUpLink: {
    fontWeight: '600',
    color: '#2563eb',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  signUpLinkHover: {
    color: '#1d4ed8',
    textDecoration: 'underline',
  },
};