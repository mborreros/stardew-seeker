import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Chart } from "react-google-charts";

import LogInForm from "./log-in-form";

function Home( { user, setUser, allGoals, categories }) {

    // const data = [
    //   ["Task", "Hours per Day"],
    //   ["Work", 11],
    //   ["Eat", 2],
    //   ["Commute", 2],
    //   ["Watch TV", 2],
    //   ["Sleep", 7],
    // ];
    
    // const options = {
    //   title: "My Daily Activities",
    // };


    // ["Category", "Number of Goals"]
    let data = [ ["Category", "Number of Goals"]];
    let valueCount = {}
    categories?.map((category) => {
      // let thisDataCateogry = new Array(category.category, 0)
      valueCount[category.category] = 0;
    })
    // console.log(data)
    
  for (let i = 0; i < allGoals?.length; i++) {
    const goal = allGoals[i];
    for (let t = 0; t < goal.tags.length; t++) {
      const tag = goal.tags[t],
        tagName = tag.category;
      valueCount[tagName] = valueCount[tagName] + 1;
    }
  }

  for (var key in valueCount) {
    let thisVal = valueCount[key];
    data.push(
      [key, thisVal]
    )
  }


  return (
    <Container>
      {!user ? 
      <LogInForm setUser={setUser} user={user} /> :
      <>
        <Row>
          {/* i want to include a little icon that is cute on this page! */}
          <h1 className="my-5">Welcome {user.name}</h1>
        </Row>
        <Row>
          <Col className='col-4'>
          <p>You've entered your personal Stardew Valley game companion, task master, and goal organizer.</p>
          <p>Need a little inspiration? Check out what goals your fellow gamers are working on. Hover over the chart to learn more.</p>
          <p>The Valley villagers and Junimos cannot wait to see what you accomplish!</p>
          
          </Col>
          <Col className='col-8'>
          {/* <p>this is where the tag chart will go</p> */}
          <p>Notice a category missing?</p> 
          <p>That means no goals have been submitted to it yet. Now's your chance to advance your farm and save the Valley!</p>
          <Chart chartType="PieChart" data={data} width={"100%"} height={"400px"} />
          </Col>
        </Row>
      </>
    }
    </Container>
  )
}

export default Home;