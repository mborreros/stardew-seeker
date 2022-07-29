import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

function LogInForm({ setUser, user }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [formError, setFormError] = useState(false);
  const navigate = useNavigate();

  // function which allows user to be redirected once successful login occurs
  useEffect(() => {
    if (user) {
      navigate("../my-goals", { replace: true });
    }}, [user])
 
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
        } else {
          response.json().then((err) => setErrors(err.errors))
            .then(() => setFormError(true))
        }
      })
  }

  return (
    <div className="login-background">
      <Container>
        <div className="login-form">
        <Row className="justify-content-center">
          <Card style={{ width: '40rem' }} className="px-5">
            <Card.Title as="h1" className="my-5">Login</Card.Title>

            <Alert show={formError} variant="danger" onClose={() => setFormError(false)} dismissible>
                Error: {errors}
            </Alert>

            <Form onSubmit={logInUser} autoComplete="off">
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </Form.Group>

              <Button variant="primary" type="submit" className="my-5 float-end">
                Login
              </Button>

            </Form>
          </Card>
        </Row>
        </div>
      </Container>
    </div>
  );
}

export default LogInForm;