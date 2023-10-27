import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Col, Row } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";

export default function SprintCreationModal({ show, close } = props) {
  const [sprintGoal, setSprintGoal] = useState("");
  const [status, setStatus] = useState("");
  const [sprintStart, setSprintStart] = useState("");
  const [sprintEnd, setSprintEnd] = useState("");
  const [sprintStartFINAL, setSprintStartFINAL] = useState({
    varOne: new Date(),
  });
  const [sprintEndFINAL, setSprintEndFINAL] = useState({ varOne: new Date() });
  const [selectedTasks, setSelectedTasks] = useState([]); /*unused for now*/

  const handleSubmit = async (e) => {
    // console.log(sprintGoal)
    // console.log(status)
    // console.log(sprintStart)
    // console.log(sprintEnd)
    // console.log(selectedTasks)
    setSprintEndFINAL(new Date(sprintEnd));
    setSprintStartFINAL(new Date(sprintStart));
    e.preventDefault();
    /*in const body make taskID = selected tasks for later access*/
    try {
      const body = {
        goal: sprintGoal,
        status: status,
        startDate: sprintStartFINAL.toISOString(),
        endDate: sprintEndFINAL.toISOString(),
      };
      await fetch(`/api/sprintcreation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      close();
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      show={show}
      onHide={close}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          New Sprint Creation
        </Modal.Title>
      </Modal.Header>
      <div style={{ marginBottom: "20px" }}></div>

      <Modal.Body>
        <Row>
          <Col md="auto">
            <InputGroup>
              <InputGroup.Text id="addSprintGoal">Sprint Goal</InputGroup.Text>
              <Form.Control
                placeholder="Enter Sprint Goal Here"
                aria-label="Sprint Goal"
                aria-describedby="addSprintGoal"
                value={sprintGoal}
                onChange={(e) => setSprintGoal(e.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>

        <div style={{ marginBottom: "20px" }}></div>

        <Row>
          <Col md="auto">
            <InputGroup className="FinalRowCol1">
              <InputGroup.Text id="addDesc">Sprint Start Date</InputGroup.Text>
              <Form.Control
                type="datetime-local"
                value={sprintStart}
                onChange={(e) => {
                  setSprintStart(e.target.value);
                  // console.log(sprintStart);
                }}
              />
            </InputGroup>
          </Col>
        </Row>

        <div style={{ marginBottom: "20px" }}></div>

        <Row>
          <Col md="auto">
            <InputGroup className="FinalRowCol2">
              <InputGroup.Text id="addDesc">Sprint End Date</InputGroup.Text>
              <Form.Control
                type="datetime-local"
                value={sprintEnd}
                onChange={(e) => setSprintEnd(e.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>

        <div style={{ marginBottom: "20px" }}></div>

        <Row className="FinalRow">
          <Col md="auto">
            <InputGroup className="FinalRowCol1">
              <InputGroup.Text id="addDesc">
                Select Sprint Status
              </InputGroup.Text>
              <Form.Select
                aria-label={"Select Status"}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Select</option>
                <option value="PAST">Past</option>
                <option value="CURRENT">Current</option>
                <option value="FUTURE">Future</option>
              </Form.Select>
            </InputGroup>
          </Col>
        </Row>

        <div style={{ marginBottom: "20px" }}></div>
      </Modal.Body>
      <Modal.Footer>{<Button onClick={handleSubmit}>Add</Button>}</Modal.Footer>
    </Modal>
  );
}
