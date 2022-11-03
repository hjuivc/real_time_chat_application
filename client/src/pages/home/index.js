// client/src/pages/home/index.js

import styles from './style.module.css';
import { useNavigate } from 'react-router-dom';

const Home = ({ username, setUsername, room, setRoom, socket }) => {
  const navigate = useNavigate();

  // Create a function for joining a room
  const joinRoom = () => {
      // If username and room are not empty
      if (room !== '' && username !== '') {
          // Emit the joinRoom event
          socket.emit('joinRoom', { username, room });
      }

      // Navigate to the chat page
      navigate('/chat', { replace: true });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>{`<>DevRooms</>`}</h1>
        <input className={styles.input} placeholder='Username...' 
        onChange={(e) => setUsername(e.target.value)} />

        <select className={styles.input}
        onChange={(e) => setUsername(e.target.value)}>
          <option>-- Select Room --</option>
          <option value='javascript'>JavaScript</option>
          <option value='node'>Node</option>
          <option value='express'>Express</option>
          <option value='react'>React</option>
        </select>
          
          <button // Add a button to join the room. When clicked, call the joinRoom function
                  className='btn btn-secondary' 
                  style={{ width: '100%' }}
                  onClick={joinRoom}>
                    
                  Join Room
          </button>
      </div>
    </div>
    );
  };
  
  export default Home;