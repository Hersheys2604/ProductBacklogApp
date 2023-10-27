"use client";
import Burndown from "@/components/Burndown/Burndown";
import SprintSelection from "@/components/Sprint/SprintSelection";
import SprintStatusPill from "@/components/Sprint/SprintStatusPill";
import React, { useState } from "react";
import TaskListSimple from "./TaskListSimple";
import { Button } from "react-bootstrap";
import SprintCreationModal from "./SprintCreationModal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./SprintViewCSS.css"; // Import the CSS file

/* SprintView - Client side component
Desc: The sprint backlog, on default will display the current sprint but can view other sprints too

Params:
    props: object of objects provided by page, will contain information about sprints
    in the form of:
    {{sprint.id ,sprint.status,sprint.tasks}}

*/
export default function SprintView(props) {
  // checking if sprints exist in DB yet
  const [sprintsExist, setSprintsExist] = useState(
    Object.keys(props).length > 0
  );
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  // converting  object of objects -> arr of objects
  props = Object.keys(props).map((key) => {
    return props[key];
  });

  let defaultSprint;

  //If a sprint with the status current exits, set currentSprint to that
  if (props.some((sprint) => sprint.status == "CURRENT")) {
    defaultSprint = props.find((sprint) => sprint.status == "CURRENT");
  } else {
    //else set it to the first sprint
    defaultSprint = props[0];
  }
  // tracking which sprint to display
  const [selectedSprint, setSelectedSprint] = useState(
    sprintsExist ? defaultSprint : defaultSprint
  );

  // var options = { year: 'numeric', month: 'long', day: 'numeric' };

  //method to pass to dropdown to update display
  const updateSprint = (newSprint) => {
    let currentSprint = props.find((sprint) => sprint.id == newSprint);
    setSelectedSprint(currentSprint);
  };

  //get sprintIds for dropdown
  let sprintIds = props.map((key) => {
    return key.id;
  });

  return (
    <>
      <Row>
        {
          // display if sprints exist
          sprintsExist && (
            <>
              {" "}
              <h1 className="sprint-details">
                Sprint
                <SprintSelection
                  setSprint={updateSprint}
                  sprintNums={sprintIds}
                  defaultSprint={selectedSprint.id}
                />
                View <SprintStatusPill Status={selectedSprint.status} />
              </h1>
              <p className="sprint-details">Goal: {selectedSprint.goal}</p>
              <p className="sprint-details">
                Start Date: {selectedSprint.startDate.toString()}
              </p>
              <p className="sprint-details">
                End Date: {selectedSprint.endDate.toString()}
              </p>
              <br></br>
              <br></br>
              <Col>{<Burndown {...selectedSprint} />}</Col>
              <Col>
                <TaskListSimple data={selectedSprint.tasks} />
              </Col>
              {/* <Burndown {...props[selectedSprint]} /> */}
            </>
          )
        }

        {!sprintsExist && (
          <div>
            <h1>Sprint View</h1>
            <p>no sprints here :(</p>
            <p>Let's add one</p>
          </div>
        )}
      </Row>
      <Button
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          zIndex: "100",
          backgroundColor: "545f71",
          fontSize: "30px",
        }}
        onClick={toggleModal}
      >
        + Create New Sprint
      </Button>
      <SprintCreationModal show={showModal} close={toggleModal} />
    </>
  );
}
