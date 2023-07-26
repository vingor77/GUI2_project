import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAS_G34ZxHEzTjqStDpl7-_GsqvfQFtKL8",
  authDomain: "communityalert-ea0e1.firebaseapp.com",
  projectId: "communityalert-ea0e1",
  storageBucket: "communityalert-ea0e1.appspot.com",
  messagingSenderId: "973786294606",
  appId: "1:973786294606:web:5472f1b4851221e424161f",
  measurementId: "G-N0FLZ7S1CV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      {user ? <SignOut /> : <SignIn />}
    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    signInWithRedirect(auth, new GoogleAuthProvider());
  }

  return (
    <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

export default App;
