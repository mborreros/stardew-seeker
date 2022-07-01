import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function SignUpForm({ setUser }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

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
        response.json().then((err) => setErrors(err.errors));
    }})
  }

  return (
    <div>
      <Container>
      <p> sign up form </p>
    {/* login form */}
      <Form onSubmit={handleSignUp}>
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
          sign up
        </Button>
      </Form>

      {/* error handling */}
      <p>error messages</p>
      {errors.map((error) => (
        <p key={error}>{error}</p>
      ))}

      </Container>
    </div>
  );
}

export default SignUpForm;