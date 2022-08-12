import { useState, useEffect } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import { Chart } from "react-google-charts";

import moment from 'moment';

function MyAccount({ user, myGoals }) {

  const [allUsers, setAllUsers] = useState(null);

  // comparing to other users, how much logged in user has contributed to the site
  useEffect(() => {
    fetch("/api/users")
      .then((response) => {
        if (response.ok) {
          response.json().then((users) => setAllUsers(users))
        } else (console.log("Users were not able to be retrieved from the database, please try again"))
      })
  }, [])

  // calculating average goals submitted per user
  let submissionAverage = 0 
  allUsers?.forEach((thisUser) => submissionAverage += thisUser.goals.length);

  // determining whether logged in user contirbution is above or below calculated average
  let userContribution 
  if (user?.goals.length >= submissionAverage/allUsers?.length) {
    userContribution = "above average"
  } else (userContribution = "below average")

  // getting user goals in each status category
  let progressGoals = 0;
  let completedGoals = 0;
  let unstartedGoals = 0;
  myGoals?.forEach((goal) =>{
    if (goal.status == "unstarted") {
      unstartedGoals++
    } if (goal.status == "in-progress") {
      progressGoals++
    } if (goal.status == "completed") {
      completedGoals++
    }
  });

   // google chart of tag status
   const data = [
    ["Status", "Goal Quantity", { role: "style" }],
    ["Unstarted", unstartedGoals, "#60a5f1"], // RGB value
    ["In-Progress", progressGoals, "#86aa0a"], // English color name
    ["Completed", completedGoals, "#fff109"],
  ];

  return (
    <Container>
      <Row>
          <h1 className='mt-5'>Hello, {user?.name}</h1>
          <h5 className="mb-5 welcome-back-text">Welcome back!</h5>
      </Row>
      <Row>
        <Col className="col-4">
          <Card>
            <Card.Header as="h5" className="act-submission">
              <div className="d-inline">Submissions</div>
              <span className="float-end pe-5 act-submission-label"></span>
            </Card.Header>
            <Card.Body>
              You've submitted <b>{myGoals?.length ? myGoals?.length : "0"} goal{myGoals?.length > 1 || !myGoals?.length ? "s" : ""} </b> since joining {moment(user?.created_at).format("MMMM D, YYYY")}
            </Card.Body>
          </Card>
        </Col>

        <Col className="col-4">
          <Card>
          <Card.Header as="h5" className="act-compare">
              <div className="d-inline">Compared to other Gamers</div>
              <span className="float-end pe-5 act-compare-label"></span>
            </Card.Header>
            <Card.Body>
              Out of {allUsers?.length} users, your <b>contribution is {userContribution}</b>
            </Card.Body>
          </Card>
        </Col>

        <Col className="col-4">
          <Card>
            <Card.Header as="h5" className="act-details">
              <div className="d-inline">Account Details</div>
              <span className="float-end pe-5 act-details-label"></span>
            </Card.Header>
            <Card.Body>
              You joined Stardew Seeker <b>{moment(user?.created_at).fromNow()}</b>
            </Card.Body>
          </Card>
        </Col>

        </Row>
        <Row>
          <Col className="col-12">
            <Card className='my-4'>
              <Card.Header as="h5" className="act-goal-stats">
                <div className="d-inline">Your Goal Completion Stats</div>
                <span className="float-end pe-5 act-goals-stats-label"></span>
              </Card.Header>
                  <>
                    <Chart chartType="ColumnChart" width="100%" height="400px" data={data} options={{ legend: 'none'}}/>
                  </>
            </Card>
          </Col>
      </Row>
    </Container>
  );
}

export default MyAccount;