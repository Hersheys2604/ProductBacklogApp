"use client";
import React, {createContext, useEffect, useState} from "react";
import "./Kanban.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Button} from "react-bootstrap";
import TaskCreationModal from "../TaskCreationModal";
import KanbanColumn from "./KanbanColumn";


const Context = createContext();

//kanban props: getting if its a sprint or not
// if sprint need sprint number

// kanban behavioru
//kanban will listen to backend

//if empty display nada
// else display tasks in columns based on task status (render based on status)
//pass props through to tasks
//if is sprint, rener based on status + sprint num -> if sprint num doesnt exist yet display erroe

//displaying tasks:
// save state
//if change task to another group, use prisma to update it's status using the set methods

export default function Kanban({ isSprint, sprintNum, data } = props) {
  // sort task types
  const [todo, setTodo] = useState([]);
  const [inProg, setInProg] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [showModal, setShowModal] = useState(false);

  //push in states .filter((task) => task.status == "IN_PROGRESS"

  // const removeTask = (taskId) => {
  //   // Create a copy of the data array without the task that matches the taskId
  //   const updatedData = data.filter((task) => task.id !== taskId);
  
  //   // Update the state with the new data
  //   setTodo(updatedData.filter((dataObj) => dataObj.status === "NOT_STARTED"));
  //   setInProg(updatedData.filter((dataObj) => dataObj.status === "IN_PROGRESS"));
  //   setCompleted(updatedData.filter((dataObj) => dataObj.status === "COMPLETED"));
  // };
  
  // this is for assigning task to users
  const assignTaskToUser = (taskId, userId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, assignedTo: userId };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };  useEffect(() => {
    setTodo(data.filter((dataObj) => dataObj.status == "NOT_STARTED"));
    setInProg(data.filter((dataObj) => dataObj.status == "IN_PROGRESS"));
    setCompleted(data.filter((dataObj) => dataObj.status == "COMPLETED"));
    console.log(data);
  }, [data]);

  return (
    <>
      <Container
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
        }}
      >
        <Row>
          <Col sm>
            <div className="kanban-column todo">
              <h2>Not Started</h2>
              <KanbanColumn id="1" tasks={todo}/>
            </div>
          </Col>
          <Col sm>
            <div className="kanban-column prog">
              <h2>In Progress</h2>
              <KanbanColumn id="2" tasks={inProg}/>
            </div>
          </Col>

          <Col sm>
            <div className="kanban-column complete">
              <h2>Complete</h2>
              <KanbanColumn id="3" tasks={completed}/>
            </div>
          </Col>
        </Row>
      </Container>
      <Button
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          zIndex: "100",
          backgroundColor: "545f71",
        }}
        onClick={toggleModal}
      >
        + Add task
      </Button>
      <TaskCreationModal show={showModal} close={toggleModal} />
    </>
  );
}
