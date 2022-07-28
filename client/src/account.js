import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

function MyAccount({ user }) {
  return (
    <Container>
      <Row>
          <h1 className='mt-5'>Hello {user?.name}</h1>
          <h5 className="welcome-back-text">Welcome back!</h5>
      </Row>
      <Row>
        <Card>
          <Card.Body>
            <Card.Title>Your Account</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}

export default MyAccount;