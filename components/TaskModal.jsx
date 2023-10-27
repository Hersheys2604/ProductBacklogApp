import React from "react";
import PriorityPill from "./PriorityPill";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import TaskCreationModal from "./TaskCreationModal";

export default function TaskModal({
  show,
  close,
  id,
  name,
  type,
  storyPoints,
  priority,
  description,
  status,
  stage,
  createdAt,
  updatedAt,
  tags,
} = props) {
  //opens a modal but it needs to be the current modal
  //should fetch modal from database
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/taskDeletion?id=" + id, {
        method: "DELETE",
      });
      close();
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  const handleStatusUpdate = async (e) => {
    e.preventDefault();
    // console.log(id);
    try {
      if (status === "IN_PROGRESS") {
        const body = { status: "COMPLETED" };
        // console.log(body);
        await fetch("/api/taskStatusUpdate?id=" + id, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        close();
        location.reload();
      } else {
        const body = { status: "IN_PROGRESS" };
        // console.log(body);
        await fetch("/api/taskStatusUpdate?id=" + id, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        close();
        location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Modal
        show={show}
        onHide={close}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ fontSize: "20px" }}
      >
        <Modal.Header closeButton>
          <Col>
            <Row>
              <Modal.Title
                style={{ fontSize: "30px" }}
                id="contained-modal-title-vcenter"
              >
                {name} <PriorityPill priority={priority} />
              </Modal.Title>
            </Row>
            <Row>
              <div>{tags.length > 0 && tags.map((tag) => `#${tag.name} `)}</div>
            </Row>
          </Col>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <p>{description}</p>
            </Col>
            <Col>
              <Row>Status:{status}</Row>
              <Row>Stage:{stage}</Row>
              <Row>Type:{type}</Row>
              <Row>Story Points:{storyPoints}</Row>
              <Row>Created at:{createdAt.toLocaleString()}</Row>
              <Row>Updated at:{updatedAt.toLocaleString()}</Row>
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col></Col>
            <Col></Col>
          </Row>
          <Button variant="danger" onClick={handleDelete}>
            Delete Task
          </Button>

          {/* <Button
      variant="edit"
      onClick={toggleModal}//onclick to open up to the current modal
      //identify task
      //id of task to update
      //load in all task info 
      style={{ marginLeft: '20px', backgroundColor: 'hsl(210, 70%, 60%)'}}
      >
        Edit Task
      </Button>
      <TaskCreationModal show={showModal} close={toggleModal} id={id} /> */}

          <Button
            variant="warning"
            onClick={handleStatusUpdate}
            style={{ marginLeft: "20px" }}
          >
            {status === "NOT_STARTED"
              ? "Mark In Progress"
              : status === "IN_PROGRESS"
              ? "Mark Complete"
              : "Reset to In Progress"}
          </Button>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}
