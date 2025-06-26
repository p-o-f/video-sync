import { useState } from 'react';
import './App.css';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/utils/firebase';

function App() {
  const [count, setCount] = useState(0);

  const handleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }
  return (
    <>
      <h1>yo</h1>
      <button onClick={handleLogin}>Login</button>
      <div className="card">
        <button onClick={() => { console.log("hi"); setCount((count) => count + 1) }}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
