import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// import referenced components
import TestPage from './test';
import Home from './home';
import Navigation from './navigation';
import LogInForm from "./log-in-form";
import SignUpForm from "./sign-up-form";

// bootstrap style sheet
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [user, setUser] = useState(null);

  // auto login
  useEffect(() => {
    fetch("/auth")
      .then((response) => {
        if (response.ok){
          response.json().then((user) => setUser(user))
        }
      }
    )
  }, [])

  return (
    <div>
      <Navigation user={user} setUser={setUser}/>
      <Routes>
        <Route exact path="/" element={ <Home/> } />
        <Route path="/signup" element={ <SignUpForm setUser={setUser}/> } />
        <Route path="/login" element={ <LogInForm setUser={setUser}/> } />
        <Route path="/all-goals" element={ <TestPage /> } />
        <Route path="/my-goals" element={ <TestPage /> } />
        <Route path="/my-account" element={ <TestPage /> } />
      </Routes>
    </div>
  );
}

export default App;
