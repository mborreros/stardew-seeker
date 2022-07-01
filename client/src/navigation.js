import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {LinkContainer} from 'react-router-bootstrap'

function Navigation({ user }) {

  return (

    <Navbar bg="light" variant="light">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Stardew Seeker</Navbar.Brand>
        </LinkContainer>
        <Nav className="me-auto">
        <LinkContainer to="/signup">
            <Nav.Link>Sign Up</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/login">
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/all-goals">
            <Nav.Link>Browse Goals</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/my-goals">
            <Nav.Link>My Goals</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/my-account">
            <Nav.Link>My Account</Nav.Link>
          </LinkContainer>
        </Nav>

        {/* conditional rendering of which user is logged in, right top corner */}
        {user ? 
        <Navbar.Text>
        signed in as: {user.username}
        </Navbar.Text> :
        <></>
        }

        

      </Container>
    </Navbar>

  );
}

export default Navigation;
