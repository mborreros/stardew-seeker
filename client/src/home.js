function Home( { user }) {

  return (
    <div >
      {!user ? 
      <h1>... home page for unauthorized ...</h1> :
      <h1>Welcome {user.username}</h1>
    }    
    </div>
  )
}

export default Home;