import { useState, useEffect } from "react";

import moment from 'moment';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

function AllGoals( {user, allGoals, page, setAllGoals} ) {

  // console.log(page)
  // console.log("user: " + user)

  const [myGoals, setMyGoals] = useState(null)
  const [newGoal, setNewGoal] = useState(null)

  useEffect(() => {
    if (user) {
      fetch(`/api/my_goals/${user.id}`)
      .then((response) => {
        if (response.ok){
          response.json().then((goals) => setMyGoals(goals))
        } else (console.log("Goals were not retrieved properly from the server, please try again."))
      })
    }}, []) 
    
  function getSpecificGoal(id){
    fetch(`/api/goals/${id}`)
    .then((response) => {
      if (response.ok){
        response.json().then((this_goal) => setNewGoal(this_goal))
        console.log(newGoal)
      } else (console.log("This goal could not be found."))
    })
  }

  function handleAddToMyGoals(event){
    // fetch this goal from server
    getSpecificGoal(event.target.id)

    // create copied goal's object
    let postGoal = {
      title: newGoal.title,
      description: newGoal.description,
      status: "unstarted",
      user_id: user.id,
      // STUCK ON TAGS AND HOW TO PASS TO THE SERVER
      tags: new Array(newGoal.tags[0])
    }

    console.log(postGoal)


    // post request to add this with user_id to server
    fetch(`/api/goals`, {
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(postGoal)
    }) 
    .then((response) => {
      console.log(response)
    })
  }

  // determines what goal data the component will display based on which route the user selects
    let goals
    if (page == "all"){
      goals = allGoals;
    }
    if (page == "user"){
      goals = myGoals;
    }

  // checks to see if goals exists before rendering the goal cards
  let goal_cards = 
    goals?.map((goal) => {
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

    return(
          <Card key={goal.id} className="mb-4">
            <Card.Header as="h5" className={goal.tags[0].category}>
                <div className="d-inline">{goal.title}</div>
                 <span className="float-end pe-5 category-label"> {goal.tags[0].category}</span>
            </Card.Header>
            <Card.Body>
              {goal_card_desc}
              <div className="d-flex flex-end justify-content-between align-items-center">
              
              {/* renders user's name if showing all goals, omits if only user goals */}
              <span className="submission-details flex-end">
                submitted
                {page == "all" ? ` by ${goal.user.name}` : ``}
                &nbsp; {moment(goal.created_at).fromNow()}</span>

              {/* renders add to my goals button if showing all goals, omits if user goals */}
              {page == "all" ?
              <Button id={goal.id} variant="primary" className="float-end" onClick={(event) => handleAddToMyGoals(event)} >add this to my goal</Button> : 
              <></>}

              </div>
            </Card.Body>
          </Card>
    )
  })

  return (
    <div >
      <Container>
        <Row>
          <h1 className="my-5">
            {user && page == "user" ? `${user.name}'s Gaming Goals`: `Community Goals` } 
          </h1>
        </Row>
          {goal_cards}
      </Container>
    </div>
  );
}

export default AllGoals;