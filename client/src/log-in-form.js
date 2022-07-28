import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

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
    <div>
      <Container className="mt-4">
      <p> log in form </p>

      <Alert show={formError} variant="danger" onClose={() => setFormError(false)} dismissible>
          Error: {errors}
      </Alert>

      <Form onSubmit={logInUser}>
        <Form.Group className="mb-3" controlId="formUsername">
          {/* <Form.Label>username</Form.Label> */}
          <Form.Control type="username" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          {/* <Form.Label>password</Form.Label> */}
          <Form.Control type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>

        {/* check box for stay signed in */}
        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}

        <Button variant="primary" type="submit">
          log in
        </Button>

      </Form>
      </Container>
    </div>
  );
}

export default LogInForm;