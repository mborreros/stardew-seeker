import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { Chart } from "react-google-charts";

import LogInForm from "./log-in-form";
import SignUpForm from "./sign-up-form";

function Home( { user, setUser, allGoals, categories }) {

  // initial array to categorize data for google pie chart
    let data = [ ["Category", "Number of Goals"]];
  // array to create list of categories for home page text
    let categoryText = []
    let valueCount = {}
    categories?.map((category) => {
      categoryText.push(category.category)
      valueCount[category.category] = 0;
    });
    
  // creating the tags list as an object
  for (let i = 0; i < allGoals?.length; i++) {
    const goal = allGoals[i];
    for (let t = 0; t < goal.tags.length; t++) {
      const tag = goal.tags[t],
        tagName = tag.category;
      valueCount[tagName] = valueCount[tagName] + 1;
    }
  };
  // parsing the tag list object as an array to suit google pie chart's data requirements 
  for (var key in valueCount) {
    let thisVal = valueCount[key];
    data.push(
      [key, thisVal]
    )
  };

  return (
    <Container>
      {!user ? 
      <div className='mt-5'>
        <Row className='my-5 mx-5'>
          <h1> Farm smarter,</h1>
          <h1 className='mx-4'>save the Valley faster!</h1>
        </Row>
        <Row className=' mt-5 d-flex'>
          <Col className='d-flex justify-content-end'>
            <Button variant="outline-secondary">Login</Button>
          </Col>
          <Col>
            <Button variant="secondary">Sign Up</Button> 
          </Col>
        </Row>
      </div>
      :
      <>
        <Row className="home-page-welcome">
          {/* non breaking spaces to accomodate stardrop icon in title */}
          <h1 className='my-5'>&nbsp;&nbsp;&nbsp;&nbsp;Welcome {user.name}!</h1>
        </Row>
        <Row>
          <Col className='col-5'>
            <h6>You've entered your personal Stardew Valley game companion, task master, and goal organizer.</h6>
              <br></br>
            <h6><em>Need a little inspiration?</em> Check out what goals your fellow gamers are working on. Hover over the chart to learn more.</h6>
              <br></br>
            <h6>The Valley villagers and Junimos cannot wait to see what you accomplish!</h6>
              <br></br>
            <div className='pie-chart-text'>
              <p>There are 12 possible game goal categories, including: {categoryText.join(", ")}.</p>
              <p><em>Notice a category missing?</em> That means no goals have been submitted to it yet. Now's your chance to advance your farm and save the Valley!</p>
            </div>
          </Col>
          <Col className='col-7'>
            <Chart chartType="PieChart" data={data} width={"100%"} height={"375px"} />
          </Col>
        </Row>
      </>
    }
    </Container>
  )
}

export default Home;