import { useState, useEffect } from "react";

import moment from 'moment';

import Select from 'react-select'

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel'

import trashCan from "./img/icons/trash_can.png"

function AllGoals( { user, page, goals, setAllGoals, setMyGoals } ) {

  const [newGoal, setNewGoal] = useState(null);
  const [categories, setCategories] = useState(null);

    // default user goal form values
    let defaultGoalFormValues = {
      "title": "",
      "description": "",
      "status": "",
      "user_id": 0
    }
    let defaultCategoryFormValue = {
      "tag_id": []
    }

  // add user goal form state variable
  const [goalFormValues, setGoalFormValues] = useState(defaultGoalFormValues);
  const [categoryFormValues, setCategoryFormValues] = useState(defaultCategoryFormValue);

  function handleUserGoalForm(e){
    goalFormValues[e.target.id] = e.target.value;
  }

  function handleUserCategoryForm(inputTags){
    let categoryInputArray = []
    inputTags.map((input) => {
      categoryInputArray.push(parseInt(input.value))
    })
    categoryFormValues["tag_id"] = categoryInputArray
  }
 
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

  function handleUserSubmit(e){
    e.preventDefault()

    // setting user id to the current user based on login
    goalFormValues["user_id"] = user.id

    // post to /api/goals the goalFormValues
    fetch(`/api/goals`, {
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(goalFormValues)
    }) 
    .then(response => {
      if (response.ok) {
        response.json().then((goal) => {
        // .then to get the posted goal's id from the response
          fetch(`/api/goals/${goal.id}/goal_tags`, {
        // post to /api/goals/:goal_id/goal_tags the categoryFormValues
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(categoryFormValues)
          })
          .then(tagResponse => {
            if (tagResponse.ok) {
            // add new goal to the goals state, tag response is the complete goal with tags
              tagResponse.json().then(((tagResponse) => setMyGoals([...goals, tagResponse[0]])))
            } else (console.log("unsuccessful post of tags to server"))
          })
        });
      } 
      else (console.log("that didn't work"))
    })
    handleClose()
  }

  // modal functions and variables
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // generates status dropdown form options
  let status_options = ["unstarted", "in progress", "completed"]
  let status_dropdown = status_options.map((option) => {
    return(
      <option key={option}>{option}</option>
    )
  })

  // generates category/tag dropdown form options
  useEffect(() => {
    fetch(`/api/tags`)
    .then((response) => {
      if (response.ok) {
        response.json().then((tags) => setCategories(tags))
      } else (console.log("Tags were not retrieved properly from the server, please try again"))
    })
  }, [])

  let category_array = []
  categories?.map((category) => {
    category_array.push({ value: `${category.id}`, label: `${category.category}` })
  })

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
          <Col className="col-6">
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
                <Button id={goal.id} variant="primary" className="float-end" onClick={(event) => handleAddToMyGoals(event)}>add this to my goal</Button> : 
                <Button size="sm" variant="outline-secondary" className="trash-button">
                  <img src={trashCan} className="trash-icon" alt="trash can" />
                  Delete
                </Button>
                }

                </div>
              </Card.Body>
            </Card>
          </Col>
    )
  })

  return (
    <div >
      <Container>
        <Row className="align-items-center">

      {/* conditionally render user/all goal title text */}
          <Col>
            <h1 className="my-5">
              {user && page == "user" ? `${user.name}'s Gaming Goals`: `Community Goals` } 
            </h1>
          </Col>

      {/* conditionally renders add goal button on user goal page */}
        {page == "user" ? 
          <Col>
            <Button variant="primary" className="float-end" onClick={handleShow}>Add a Goal</Button>

      {/* add a user goal form modal */}
              <Modal show={show} onHide={handleClose}>

                <Modal.Header closeButton>
                  <Modal.Title>Add a Goal</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                  

                  <Form onSubmit={(e) => handleUserSubmit(e)} id="user_goal_form">

                    <Form.Group className="mb-3" controlId="title">
                      <Form.Floating>
                        <Form.Control placeholder="Title" type="title" onChange={(e) => handleUserGoalForm(e)}  />
                        <label htmlFor="floatingInputCustom">Title</label>
                      </Form.Floating>
                    </Form.Group>

                    {/* <Form.Group className="mb-3" controlId="title">
                      <Form.Label>Title</Form.Label>
                      <Form.Control type="title" onChange={(e) => handleUserGoalForm(e)} autoFocus />
                    </Form.Group> */}

                    <Form.Group className="mb-3" controlId="description">
                      <Form.Floating>
                        <Form.Control placeholder="Description" type="description" as="textarea" style={{ height: '120px' }} onChange={(e) => handleUserGoalForm(e)} />
                        <label htmlFor="floatingInputCustom">Description</label>
                      </Form.Floating>
                    </Form.Group>

                    {/* <Form.Group className="mb-3" controlId="description">
                      <Form.Label>Description</Form.Label>
                      <Form.Control as="textarea" rows={3} placeholder="Describe the steps to reach your goal" onChange={(e) => handleUserGoalForm(e)}/>
                    </Form.Group> */}

                    <Form.Group className="mb-3">
                      <FloatingLabel label="Status" controlId="status">
                        <Form.Select onChange={(e) => handleUserGoalForm(e)}>
                          <option>Select the current goal status</option>
                          {status_dropdown}
                        </Form.Select>
                      </FloatingLabel>
                    </Form.Group>

                    {/* <Form.Group className="mb-3" controlId="status">
                      <Form.Label>Current Status</Form.Label>
                      <Form.Select aria-label="current_status" onChange={(e) => handleUserGoalForm(e)}>
                        <option>Select a status</option>
                          {status_dropdown}
                      </Form.Select>
                    </Form.Group> */}

                  <Form.Group className="mb-3">
                    <Select placeholder="Select a category" closeMenuOnSelect={false} isMulti options={category_array} onChange={(e) => handleUserCategoryForm(e)}/>
                  </Form.Group>

                  </Form>

                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" type="submit" form="user_goal_form">Save Goal</Button>
                </Modal.Footer>
              </Modal>

          </Col> : 
          <></>}
          
        </Row>

        <Row>
          {goal_cards}
        </Row>

      </Container>
    </div>
  );
}

export default AllGoals;