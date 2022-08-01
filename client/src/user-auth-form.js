import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

function UserAuthForm({ setUser, user, page }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setScreenName] = useState("");
  const [errors, setErrors] = useState([]);
  const [formError, setFormError] = useState(false);
  const navigate = useNavigate();

  // resetting all form fields when nevigating between login and signup
  useEffect(() => {
    setUsername("")
    setPassword("")
    setScreenName("")
    setFormError(false)
  }, [page])
 
  function logInUser(e) {
    e.preventDefault()

    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })
      .then(response => {
        if (response.ok) {
          response.json().then((user) => setUser(user));
          // navigate user on successful login
          navigate("../my-goals", { replace: true });
        } else {
          response.json().then((err) => setErrors(err.errors))
            .then(() => setFormError(true))
        }
      })
  }

  function handleSignUp(e){
    e.preventDefault()

    const new_user = {
      username,
      password,
      name
    }

    fetch("/signup", {
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(new_user)
    })
    .then(response => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
        // navigate user on successful signup and login
        navigate("../my-goals", { replace: true });
      } else {
        response.json().then((err) => setErrors(err.errors))
        .then(() => setFormError(true))
    }})
  }

  return (
    <div className="login-background">
      <Container>
        <div className="login-form">
        <Row className="justify-content-center">
          <Card style={{ width: '40rem' }} className="px-5">
            <Card.Title as="h1" className="my-5">{page == "signup" ? "Sign Up" : "Login"}</Card.Title>

            <Alert show={formError} variant="danger" onClose={() => setFormError(false)} dismissible>
                Error: {errors}
            </Alert>

            <Form onSubmit={page == "signup" ? handleSignUp : logInUser} autoComplete="off">
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
              </Form.Group>

              { page == "signup" ? 
              <Form.Group className="mb-3" controlId="formScreenName">
                <Form.Label>Screen Name</Form.Label>
                <Form.Control type="screenname" placeholder="This is what your fellow farmers will see!" value={name} onChange={(e) => setScreenName(e.target.value)}/>
              </Form.Group> :
              <></>
              }
              

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </Form.Group>
              

              {page == "signup" ? <>
                <span>Do you have an account? </span>
                <Link to="/login-page">Login</Link> 
              </> : <>
                <span>Don't have an account? </span>
                <Link to="/signup-page">Sign Up</Link> </>}
  
              <Button variant="primary" type="submit" className="my-5 float-end">
                {page == "signup" ? "Sign Up" : "Login"}
              </Button>
            </Form>
          </Card>
        </Row>
        </div>
      </Container>
    </div>
  );
}

export default UserAuthForm;