import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import AssignUserDropdown from "../AssignUserDropdown";

/*UserStoryForm - client side component
desc: Form to create and edit user stories

Params:
  show: Bool value used to initally display modal
  close:Function passed by parent to handle closing modal

*/

export default function UserStoryForm({ show, close } = props) {
  const [userStoryName, setUserStoryName] = useState("");
  const [userDesc, setUserDesc] = useState("");
  const [userID, setUserID] = useState(-1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
        name: userStoryName,
        description: userDesc,
        userID: parseInt(userID),
      };
      // console.log(body);
      await fetch(`/api/storycreation`, {
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
      alt = "Modal for user stories"
    >
      <Modal.Header closeButton alt = "header">
        <Modal.Title id="contained-modal-title-vcenter" alt = "User story creation">
          User story creation
        </Modal.Title>
      </Modal.Header>

      <Modal.Body alt = "modal body">
        <InputGroup alt = "input group">
          <InputGroup.Text id="addUserStoryName" alt = "User Story Name">
            User Story Name
          </InputGroup.Text>
          <Form.Control
            placeholder="Enter User Story Name Here"
            aria-label="User Story"
            aria-describedby="addUserStory"
            value={userStoryName}
            onChange={(e) => setUserStoryName(e.target.value)}
            alt = "User Story Name input"
          />
        </InputGroup>
        <br />

        <AssignUserDropdown setUserID={setUserID} alt = "Setting the user ID"/>

        <br />

        <InputGroup alt = "Input group">
          <InputGroup.Text id="addDesc" alt = "User Story Description">User Story Description</InputGroup.Text>
          <Form.Control
            as="textarea"
            placeholder="Enter Description Here"
            aria-label="User Story Description"
            aria-describedby="userDesc"
            value={userDesc}
            onChange={(e) => setUserDesc(e.target.value)}
            alt = "User stroy description input"
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer alt = "bottom of the modal">
        <Button onClick={handleSubmit} alt = "add button">Add</Button>
      </Modal.Footer>
    </Modal>
  );
}
