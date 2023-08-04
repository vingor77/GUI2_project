//App.js
import React, {useState} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "./SignIn";
import MainPage from "./MainPage";
import Map from "./components/Map";

function App({ auth }) {
  const [user] = useAuthState(auth);
  return (
    <div className="App" style={{ width: "100%", overflow: "hidden" }}>
      {user ? <MainPage auth={auth} /> : <SignIn auth={auth} />}
    </div>
  );
}

export default App;
