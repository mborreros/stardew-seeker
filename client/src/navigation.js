import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {LinkContainer} from 'react-router-bootstrap'

import { NavLink } from "react-router-dom";

function Navigation() {

  return (

    <Navbar bg="light" variant="light">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Stardew Seeker</Navbar.Brand>
        </LinkContainer>
        <Nav className="me-auto">
          <LinkContainer to="/test">
            <Nav.Link>Test</Nav.Link>
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
      </Container>
    </Navbar>

  );
}

export default Navigation;
