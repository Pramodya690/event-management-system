// src/pages/Signup/RoleSelect.jsx
import { useNavigate } from 'react-router-dom';
import './RoleSelect.css';

function RoleSelect() {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    navigate(`/signup/${role}`);
  };

  return (
    <div className="RoleSelect-form-container">
      <div className="RoleSelect-form">
        <h2>Select Your Role</h2>
        <button onClick={() => handleRoleSelect('attendee')}>Attendee</button>
        <button onClick={() => handleRoleSelect('vendor')}>Vendor</button>
        <button onClick={() => handleRoleSelect('organizer')}>Organizer</button>
        <button onClick={() => handleRoleSelect('admin')}>Admin</button>
      </div>
    </div>
  );
}

export default RoleSelect;
