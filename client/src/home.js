import Container from 'react-bootstrap/Container';

function Home( { user }) {

  return (
    <Container>
      {!user ? 
      <h1 className="my-5">... home page for unauthorized ...</h1> :
      <h1 className="my-5">Welcome {user.username}</h1>
    }    
    </Container>
  )
}

export default Home;