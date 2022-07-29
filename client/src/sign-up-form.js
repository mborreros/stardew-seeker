import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

import LogInForm from "./log-in-form";

function SignUpForm({ setUser }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [formError, setFormError] = useState(false);

  function handleSignUp(e){
    e.preventDefault()

    const new_user = {
      username,
      password
    }

    fetch("/signup", {
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(new_user)
    })
    .then(response => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
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
              <Card.Title as="h1" className="my-5">Sign Up</Card.Title>

              <Alert show={formError} variant="danger" onClose={() => setFormError(false)} dismissible>
                  Error: {errors}
              </Alert>

              <Form onSubmit={handleSignUp} autoComplete="off">
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>

                <span>Already a user? </span><Link to="/login-page"> Login</Link>
                <Button variant="primary" type="submit" className="my-5 float-end"> 
                    Sign Up
                </Button>
              </Form>
          </Card>
        </Row>
      </div>
    </Container>
  </div>
  );
}

export default SignUpForm;