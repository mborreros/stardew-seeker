import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

function Navigation({ user, setUser }) {

  const navigate = useNavigate();

  function handleLogout() {
    fetch("/logout", 
    { method: "DELETE" })
    .then((response) => {
      if (response.ok) {
        navigate("../login-page", { replace: true });
        setUser(null);
      }
    })
  }

  return (

    <Navbar bg="light" variant="light">
      <Container className="d-block">
        <Row className='align-items-center'>
          <Col className='d-flex'>
            <LinkContainer to="/">
              <Navbar.Brand>Stardew Seeker</Navbar.Brand>
            </LinkContainer>
            
              <Nav className="me-auto">
                <LinkContainer to="/all-goals">
                  {/* conditionally enable navbar link if user is logged in */}
                  { user ?  <Nav.Link>Browse Goals</Nav.Link> :  <Nav.Link disabled>Browse Goals</Nav.Link> }
                </LinkContainer>
                <LinkContainer to="/my-goals">
                  {/* conditionally enable navbar link if user is logged in */}
                  { user ? <Nav.Link>My Goals</Nav.Link> : <Nav.Link disabled>My Goals</Nav.Link> }
                </LinkContainer> 

                <LinkContainer to="/my-account">
                  {/* conditionally enable navbar link if user is logged in */}
                  { user ? <Nav.Link>My Account</Nav.Link> : <Nav.Link disabled>My Account</Nav.Link> }
                </LinkContainer>
              </Nav>
          </Col>

        {/* conditional rendering of which user is logged in, right top corner */}
        { user ? 
        <Col className='d-flex justify-content-end align-items-center'>
          <Navbar.Text className="p-2 mx-1">signed in as: {user.name} </Navbar.Text>
          <Button variant="secondary" size="sm" onClick={handleLogout} className='mx-1'>Logout</Button>
        </Col>
         :
         <Col className='d-flex justify-content-end'>
          <Button variant="outline-secondary" size="sm" as={Link} to="/login-page" className='mx-1'>Login</Button>
          <Button variant="secondary" size="sm" as={Link} to="/signup-page" className='mx-1'>Sign up</Button>
         </Col>
        }

        </Row>
      </Container>
    </Navbar>

  );
}

export default Navigation;
