// src/pages/CreateEvent/PostCreateOptions.jsx
import { useNavigate } from 'react-router-dom';
import './PostCreateOptions.css';

function PostCreateOptions() {
  const navigate = useNavigate();

  return (
    <div className="post-create-container">
      <h2>What's Next?</h2>
      <div className="option-buttons">
        <button className="option-btn" onClick={() => navigate('/create-event/form')}>
          Create My First Event
        </button>
        <button className="option-btn" onClick={() => navigate('/find-events')}>
          Discover More Events
        </button>
      </div>
    </div>
  );
}

export default PostCreateOptions;
