import React from 'react'
import { signInWithRedirect, GoogleAuthProvider } from 'firebase/auth'

export default function SignIn(props) {
    const signInWithGoogle = () => {
      signInWithRedirect(props.auth, new GoogleAuthProvider());
    }
    
    return (
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
    )
}
