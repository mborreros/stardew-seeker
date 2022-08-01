import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// import referenced components
import MyAccount from './account';
import Home from './home';
import Navigation from './navigation';
import UserAuthForm from "./user-auth-form";
import AllGoals from "./goals";

function App() {

  const [user, setUser] = useState(null);
  const [allGoals, setAllGoals] = useState(null);
  const [myGoals, setMyGoals] = useState(null);
  const [categories, setCategories] = useState(null);

  // auto login
  useEffect(() => {
    fetch("/auth")
      .then((response) => {
        if (response.ok) {
          response.json().then((user) => setUser(user))
        } else (console.log("User was not retrieved properly from the server, please try again"))
      }
    )
  }, [])

  // fetching all goals
  useEffect(() => {
    fetch("/api/goals")
    .then((response) => {
      if (response.ok) {
        response.json().then((goals) => setAllGoals(goals))
      } else (console.log("Goals were not retrieved properly from the server, please try again"))
    })
  }, [user])

  // fetching category/tag options
    useEffect(() => {
      fetch(`/api/tags`)
      .then((response) => {
        if (response.ok) {
          response.json().then((tags) => setCategories(tags))
        } else (console.log("Tags were not retrieved properly from the server, please try again"))
      })
    }, [])

  // fetching user specific goals whenever user state changes
  useEffect(() => {
    if (user) {
      fetch(`/api/my_goals/${user.id}`)
      .then((response) => {
        if (response.ok) {
          response.json().then((goals) => setMyGoals(goals))
        } else (console.log("Goals were not retrieved properly from the server, please try again."))
      })
    }}, [user]) 

  return (
    <div>
      <Navigation user={user} setUser={setUser}/>
      <Routes>
        <Route exact path="/" element={ <Home user={user} setUser={setUser} allGoals={allGoals} categories={categories}/> } />
        <Route path="/signup-page" element={ <UserAuthForm setUser={setUser} page={"signup"}/> } />
        <Route path="/login-page" element={ <UserAuthForm setUser={setUser} user={user} page={"login"}/> } />
        <Route path="/all-goals" element={ <AllGoals user={user} page={"all"} myGoals={myGoals} allGoals={allGoals} setAllGoals={setAllGoals} setMyGoals={setMyGoals} /> } />
        <Route path="/my-goals" element={ <AllGoals user={user} page={"user"} allGoals={allGoals} myGoals={myGoals} setAllGoals={setAllGoals} setMyGoals={setMyGoals} categories={categories}/> } />
        <Route path="/my-account" element={ <MyAccount user={user} myGoals={myGoals}/> } />
      </Routes>
    </div>
  );
}

export default App;
