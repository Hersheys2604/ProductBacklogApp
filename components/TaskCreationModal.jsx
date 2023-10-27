import Form from "react-bootstrap/Form";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Col, Row } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import AssignUserDropdown from "./AssignUserDropdown";
import AssignSprintDropdown from "./AssignSprintDropdown";
import TagAssign from "./TagAssign";

//wide text areas should be at the end
export default function TaskCreationModal({ show, close, id } = props) {
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [storyPoint, setStoryPoint] = useState("");
  const [priority, setPriority] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [stage, setStage] = useState("");
  const [sprintID, setSprintID] = useState(-1);
  const [userID, setUserID] = useState(-1);
  const [selectedTags, setSelectedTag] = useState([]); //arr of objects format of [{id:tagid}]

  const [data, setData] = useState(null);

  const loadData = async (e, value) => {
    //check if data needs to be loaded in
    if (typeof id !== "undefined") {
      //load in data from backend

      const retrievedInfo = await fetch(`/api/taskFetch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId: id }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          return response.json();
        })
        .then((data) => {
          setTaskName(data.name);
          setTaskDesc(data.description);
          setStoryPoint(data.storyPoints);
          setPriority(data.priority);
          setType(data.type);
          setStatus(data.status);
          setStage(data.stage);
          setUserID(data.userID[0].id);
          return data;
        })
        .catch((error) => {
          console.error(`Could not get products: ${error}`);
        });
    }
  };

  const updateTask = async (e, value) => {
    const retrievedInfo = await fetch(`/api/taskUpdate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskId: id }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update data");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })

      .catch((error) => {
        console.error(`Could not get products: ${error}`);
      });
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
        name: taskName,
        description: taskDesc,
        storyPoints: parseInt(storyPoint),
        priority: priority,
        type: type,
        status: status,
        stage: stage,
        sprintID: parseInt(sprintID),
        userID: parseInt(userID),
        tags: selectedTags.map((tag) => {
          const tagIds = {};
          tagIds["id"] = tag.value;
          return tagIds;
        }),
      };
      await fetch(`/api/taskcreation`, {
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
      //loads all info
      onShow={loadData}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      alt="Modal for inputting tasks"
    >
      <Modal.Header closeButton alt="The Modal Header)">
        <Modal.Title id="contained-modal-title-vcenter" alt="Task Creation">
          Task Creation {id}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          <Col md="auto">
            <InputGroup>
              <InputGroup.Text id="addTaskName">Task Name</InputGroup.Text>
              <Form.Control
                placeholder="Enter Name Here"
                aria-label="Task Name"
                aria-describedby="addTaskName"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                alt="A text box for you to enter your task's name"
              />
            </InputGroup>
          </Col>
        </Row>

        <div style={{ marginBottom: "20px" }}></div>

        <Row alt="a row inside the modal form">
          <Col md="auto" alt="a column within the row inside the modal body">
            <InputGroup alt="An input group">
              <InputGroup.Text id="addDesc" alt="Select Task Type">
                Select Task Type
              </InputGroup.Text>
              <Form.Select
                aria-label={"Select Task Type"}
                value={type}
                onChange={(e) => setType(e.target.value)}
                alt="Drop down menu to let you choose"
              >
                <option alt="Select">Select</option>
                <option value="STORY" alt="Story">
                  Story
                </option>
                <option value="BUG" alt="Bug">
                  Bug
                </option>
              </Form.Select>
            </InputGroup>
          </Col>

          <Col md="auto">
            <TagAssign passSelectedTags={setSelectedTag} />
          </Col>
        </Row>

        <div style={{ marginBottom: "20px" }}></div>

        <Row alt="a row inside the modal form">
          <Col md="auto" alt="a column within the row inside the modal body">
            <InputGroup alt="An input group">
              <InputGroup.Text id="addStoryPoint" alt="Story Points">
                Story Points
              </InputGroup.Text>
              <Form.Select
                aria-label={"Select Story Points"}
                value={storyPoint}
                onChange={(e) => setStoryPoint(e.target.value)}
                alt="Drop down menu of options from 1-10"
              >
                <option alt="Select">Select</option>
                <option value="1" alt="1">
                  1
                </option>
                <option value="2" alt="2">
                  2
                </option>
                <option value="3" alt="3">
                  3
                </option>
                <option value="4" alt="4">
                  4
                </option>
                <option value="5" alt="5">
                  5
                </option>
                <option value="6" alt="6">
                  6
                </option>
                <option value="7" alt="7">
                  7
                </option>
                <option value="8" alt="8">
                  8
                </option>
                <option value="9" alt="9">
                  9
                </option>
                <option value="10" alt="10">
                  10
                </option>
              </Form.Select>
            </InputGroup>
          </Col>
        </Row>

        <div style={{ marginBottom: "20px" }}></div>

        <Row alt="a row inside the modal form">
          <Col md="auto" alt="a column within the row inside the modal body">
            <InputGroup alt="An input group">
              <InputGroup.Text id="addDesc" alt="Select Priority of Task">
                Select Priority of Task
              </InputGroup.Text>
              <Form.Select
                aria-label={"Select Priority of Task"}
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                alt="A drop down menu"
              >
                <option alt="Select">Select</option>
                <option value="LOW" alt="Low">
                  Low
                </option>
                <option value="MEDIUM" alt="Medium">
                  Medium
                </option>
                <option value="HIGH" alt="High">
                  High
                </option>
              </Form.Select>
            </InputGroup>
          </Col>
        </Row>

        <div style={{ marginBottom: "20px" }}></div>

        <Row alt="a row inside the modal form">
          <Col md="auto" alt="a column within the row inside the modal body">
            <InputGroup alt="An input group">
              <InputGroup.Text id="addDesc" alt="Task description">
                Task Description
              </InputGroup.Text>
              <Form.Control
                as="textarea"
                placeholder="Enter Description Here"
                aria-label="Task Description"
                aria-describedby="addDesc"
                value={taskDesc}
                onChange={(e) => setTaskDesc(e.target.value)}
                alt="input section for ur task description"
              />
            </InputGroup>
          </Col>
        </Row>

        <div style={{ marginBottom: "20px" }}></div>

        <Row alt="a row inside the modal form">
          <Col md="auto" alt="a column within the row inside the modal body">
            <InputGroup alt="An input group">
              <InputGroup.Text id="addDesc" alt="Select Task Status">
                Select Task Status
              </InputGroup.Text>
              <Form.Select
                aria-label={"Select Task Status"}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                alt="Drop down menu for ur task status"
              >
                <option alt="Select">Select</option>
                <option value="NOT_STARTED" alt="To do">
                  To do
                </option>
                <option value="IN_PROGRESS" alt="In Progress">
                  In Progress
                </option>
                <option value="COMPLETED" alt="Copmleted">
                  Completed
                </option>
              </Form.Select>
            </InputGroup>
          </Col>
        </Row>

        <div style={{ marginBottom: "20px" }}></div>

        <Row alt="a row inside the modal form">
          <Col md="auto" alt="a column within the row inside the modal body">
            <InputGroup alt="An input group">
              <InputGroup.Text id="addDesc" alt="Select Task Stage">
                Select Task Stage
              </InputGroup.Text>
              <Form.Select
                aria-label={"Select Task Stage"}
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                alt="Drop down menu for task stage"
              >
                <option alt="Select">Select</option>
                <option value="PLANNING" alt="Planning">
                  Planning
                </option>
                <option value="IN_DEVELOPMENT" alt="In development">
                  In Development
                </option>
                <option value="TESTING" alt="testing">
                  Testing
                </option>
              </Form.Select>
            </InputGroup>
          </Col>
        </Row>

        <div style={{ marginBottom: "20px" }}></div>

        <Row alt="a row inside the modal form">
          <Col md="auto" alt="a column within the row inside the modal body">
            <AssignSprintDropdown
              setSprintID={setSprintID}
              defaultSprintID={sprintID}
            />
          </Col>
        </Row>

        <div style={{ marginBottom: "20px" }}></div>

        <Row alt="a row inside the modal form">
          <Col md="auto" alt="a column within the row inside the modal body">
            <AssignUserDropdown setUserID={setUserID} />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>Add</Button>
        {/* <Button onClick={updateTask}>Edit</Button> */}
      </Modal.Footer>
    </Modal>
  );
}
