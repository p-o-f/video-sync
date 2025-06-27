import { useState } from 'react';
import './App.css';
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { auth } from '@/utils/firebase';

function App() {
  const [count, setCount] = useState(0);

  // https://firebase.google.com/docs/auth/web/chrome-extension
  const handleLogin = () => {
    // const provider = new GoogleAuthProvider();
    browser.runtime.sendMessage({ action: "signIn" }, (res) => { console.log("handle", res) })
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
