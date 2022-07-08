import { useState, useEffect } from "react";

import moment from 'moment'

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'

function AllGoals() {

  const [goals, setGoals] = useState(null)

  useEffect(() => {
    fetch("/api/goals")
    .then((response) => {
      if (response.ok){
        response.json().then((goals) => setGoals(goals))
      }
      else (console.log("Goals were not retrieved properly from the server, please try again"))
    })
  }, [])

  // checks to see if goals exists before rendering the goal cards
  let goal_cards = goals?.map((goal) => {
    // splits the description of the goal into strings by sentence, displays them each in their own line within the card
    let goal_card_desc = goal.description.split(".").map((sentence) => {
      if (sentence.length) {
        return(
          <Card.Text key={sentence}>
            {sentence}
          </Card.Text>
        )
      }
    })
    
    // console.log(goal.user)
    // console.log(goal)

    return(
          <Card key={goal.id} className="mb-4">
            <Card.Header as="h5" className={goal.tags[0].category}>
                <div className="d-inline">{goal.title}</div>
                {/* <Badge pill bg="secondary" className="float-end"> */}
                 <span className="float-end pe-5 category-label"> {goal.tags[0].category}</span>
                {/* </Badge> */}
            </Card.Header>
            <Card.Body>
              {goal_card_desc}
              <div className="d-flex flex-end justify-content-between align-items-center">
              <span className="submission-details flex-end">submitted by {goal.user.name} {moment(goal.created_at).fromNow()}</span>
              <Button variant="primary" className="float-end">add this to my goal</Button>
              </div>
            </Card.Body>
          </Card>
    )
  })

  return (
    <div >
      <Container>
        <Row>
          <h1 className="my-5">Community Goals</h1>
        </Row>

          {goal_cards}

      </Container>
    </div>
  );
}

export default AllGoals;