import { useState, useEffect } from "react";

import moment from 'moment';

import Select from 'react-select'

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Dropdown from 'react-bootstrap/Dropdown';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import junimo from "./img/icons/junimo.png";
import trashCan from "./img/icons/trash_can.png";

function AllGoals( { user, page, allGoals, myGoals, setAllGoals, setMyGoals, categories } ) {

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
 
// need to refactor so that this is not a direct repition on the handleUserSubmit function below
  function handleAddToMyGoals(event) {
    // need to ensure a user cannot readd a goal that is already theirs!!!

    fetch(`/api/goals/${event.target.id}`)
      .then((response) => {
        if (response.ok) {
          response.json().then((this_goal) => {
            let thisCategoryInputArray = []
            this_goal.tags.map((tag) => {
              thisCategoryInputArray.push(tag.id)
            })
            categoryFormValues["tag_id"] = thisCategoryInputArray
            goalFormValues["title"] = this_goal.title
            goalFormValues["description"] = this_goal.description
            goalFormValues["status"] = "unstarted"
            goalFormValues["user_id"] = user.id
          }).then(() => {
            fetch(`/api/goals`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(goalFormValues)
            }).then(response => {
              if (response.ok) {
                response.json().then((goal) => {
                  fetch(`/api/goals/${goal.id}/goal_tags`, {
                    // post to /api/goals/:goal_id/goal_tags the categoryFormValues
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(categoryFormValues)
                  })
                    .then(tagResponse => {
                      // add new goal to the goals state, tag response is the complete goal with tags
                      tagResponse.json().then(((tagResponse) => {
                        setAllGoals([...allGoals, tagResponse[0]])
                        setMyGoals([...myGoals, tagResponse[0]])
                        toast.success(<>You added <strong>{tagResponse[0].title}</strong> to your goals!</>, {
                          position: "top-right",
                          autoClose: 2000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: false,
                          draggable: false,
                          progress: undefined,
                          });
                        // handleAlert(parseInt(event.target.id))
                      }))
                    })
                })
              } else (console.log("This goal could not be found."))
            })
          }
          )
        }
      })
  }

  function handleUserSubmit(e) {
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
              tagResponse.json().then(((tagResponse) => {
                setMyGoals([...myGoals, tagResponse[0]])
                setAllGoals([...allGoals, tagResponse[0]])
              }))
            } else (console.log("unsuccessful post of tags to server"))
          })
        });
      } 
      else (console.log("that didn't work"))
    })
    handleClose()
  }

  function handleGoalDelete(e) {
    fetch(`api/goals/${e.target.id}`, 
    { method: "DELETE" })
    .then((response) => {
      if (response.ok) {
        let updatedGoals = myGoals.filter((goal) => 
          goal.id != e.target.id
        )
        let updatedAllGoals = allGoals.filter((goal) => 
          goal.id != e.target.id
        )
        setMyGoals(updatedGoals)
        setAllGoals(updatedAllGoals)
      } else (console.log("Unsuccessful deletion of this goal, please try again"))
    })
  }

  function handleGoalEdit(e) {
    fetch(`/api/goals/${e.target.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "status": e.target.innerText })
      })
      .then((response) => {
        if (response.ok) {
          response.json().then((editedGoal) => {
            let updatedGoals = myGoals.filter((goal) =>
              goal.id != editedGoal.id)
            setMyGoals([editedGoal, ...updatedGoals])
          })
        } else (console.log("Unsuccessful edit of this goal's status, please try again"))
      })
  }

  // modal functions and variables
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // generates status dropdown form options
  let status_options = ["unstarted", "in-progress", "completed"]
  let status_dropdown = status_options.map((option) => {
    return(
      <option key={option}>{option}</option>
    )
  })

  // generates category dropdown options
  let category_array = []
  categories?.map((category) => {
    category_array.push({ value: `${category.id}`, label: `${category.category}` })
  })

  // determines which goal prop the page should display based on what page the user has navigated to 
  let goals
  if (page == "all"){
    goals = allGoals
  } else (goals = myGoals)

  // checks to see if goals exists before rendering the goal cards
  let goal_cards =  
    goals?.map((goal) => {
    // splits the description of the goal into strings by sentence, displays them each in their own line within the card
    let goal_card_desc = goal.description.split(".").map((sentence) => {
      if (sentence.length) {
        return(
          <Card.Text key={Math.random() * 100}>
            {sentence}
          </Card.Text>
        )
      }
    })

    // track progress status drop down options with disabling if already selected for that goal
    let statusEditButtons = status_options.map((option) => {
      if (option == goal.status){
        return(
          <Dropdown.Item disabled key={option} as="button" id={goal.id} onClick={(e) => handleGoalEdit(e)}>{option}</Dropdown.Item>
        )
      } else return(
        <Dropdown.Item key={option} as="button" id={goal.id} onClick={(e) => handleGoalEdit(e)}>{option}</Dropdown.Item>
      )
    })

    // diables/enables add to my goals button based on which user is logged in 
    let userAddButton
    if (goal.user.name == user?.name) {
      userAddButton = true
    } else (userAddButton = false)

    return(
          <Col className="col-6" key={goal.id}>
            <Card id={goal.id} className="mb-4">
              <Card.Header as="h5" className={goal.tags[0].category}>
                  <div className="d-inline">{goal.title}</div>
                  <span className="float-end pe-5 category-label"> {goal.tags[0].category}</span>
              </Card.Header>
              <Card.Body>
                {goal_card_desc}
                {/* renders status if in user goals */}
                {page == "all" ? `` : 
                  <p className={goal.status}>Status: {goal.status}</p>}
                <div className="d-flex align-items-center">

                {/* renders user's name if showing all goals, omits if only user goals */}
                <span className="submission-details flex-start pe-3 me-auto">
                  {page == "all" ? `submitted by ${goal.user.name}` : `logged`} {moment(goal.created_at).fromNow()}
                </span>

                {/* renders add to my goals button if showing all goals, omits if user goals */}
                {page == "all" ?
                <>
                  <Button disabled={userAddButton} id={goal.id} size="sm" variant="secondary" className="float-end" onClick={(event) => handleAddToMyGoals(event)}>Copy to my goals</Button> 
                </> : 
                <>
                  <Dropdown>
                    <Dropdown.Toggle size="sm" variant="outline-secondary" className="junimo-button" id={goal.id}>
                      <img src={junimo} className="junimo-icon" alt="junimo" />
                      Set Progress
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {statusEditButtons}
                    </Dropdown.Menu>
                  </Dropdown>

                  <Button id={goal.id} size="sm" variant="outline-secondary" className="trash-button ms-1" onClick={(e) => handleGoalDelete(e)}>
                    <img src={trashCan} className="trash-icon" alt="trash can" />
                    Delete
                  </Button>
                </>
                }

                </div>
              </Card.Body>
            </Card>
          </Col>
    )
  })

  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss={false} draggable={false} pauseOnHover={false}/>
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

                    <Form.Group className="mb-3" controlId="description">
                      <Form.Floating>
                        <Form.Control placeholder="Description" type="description" as="textarea" style={{ height: '120px' }} onChange={(e) => handleUserGoalForm(e)} />
                        <label htmlFor="floatingInputCustom">Description</label>
                      </Form.Floating>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <FloatingLabel label="Status" controlId="status">
                        <Form.Select onChange={(e) => handleUserGoalForm(e)}>
                          <option>Select the current goal status</option>
                          {status_dropdown}
                        </Form.Select>
                      </FloatingLabel>
                    </Form.Group>
                    {/* first selected will be the main category */}
                  <Form.Group className="mb-3">
                    <label id="category-selector-label" for="category-selector-inp">Categories</label>
                    <Select className="category-selector-container" classNamePrefix="category-selector" 
                    placeholder="First selection will be the main category" 
                    closeMenuOnSelect={false} 
                    isMulti 
                    inputId="category-selector-inp"
                    options={category_array} 
                    onChange={(e) => handleUserCategoryForm(e)}/>
                  </Form.Group>

                  </Form>

                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" type="submit" form="user_goal_form">Save Goal</Button>
                </Modal.Footer>
              </Modal>

          </Col> : 
          <></> }
          
        </Row>

        <Row>
          {goal_cards}
        </Row>

      </Container>
    </div>
  );
}

export default AllGoals;