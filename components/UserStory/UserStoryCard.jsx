import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ConfirmationModal from "../ConfirmationModal";

/*UserStoryCard - client side component
desc: Cards displayed in UserStoryTray to represent individual user stories

Params:
  id: user story id
  name: user story name
  description: user story description
  assignedTo: User assigned to the user story
*/
export default function UserStoryCard({
  id,
  name,
  description,
  assignedTo,
} = props) {
  //Ensuring user has been assigned to user story
  if (typeof assignedTo[0] != "undefined") {
    assignedTo = assignedTo[0].first_name;
  }

  // methods + variables handling display of delete button
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  // submition of form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
        storyID: parseInt(id),
      };
      await fetch(`/api/storyDeletion`, {
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

  //

  return (
    <>
      <Card
        style={{
          width: "80%",
          margin: "auto",
          marginBottom: "10px",
          marginTop: "10px",
        }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        alt = "User story card"
      >
        <Card.Body alt = "Card of the body">
          <Card.Title alt = "Title of the card">{name} </Card.Title>

          <Card.Subtitle style={{ color: "grey", fontSize: "10px" }} alt = "Card subtitle">
            {assignedTo}
          </Card.Subtitle>

          <Card.Text alt = {description}>{description}</Card.Text>
          {isHovering && (
            <Button onClick={toggleModal} variant="danger" alt = "Delete button">
              delete
            </Button>
          )}
          <ConfirmationModal
            show={showModal}
            close={toggleModal}
            title="Delete User Story?"
            message="Are you sure?"
            buttonText="Delete"
            action={handleSubmit}
          />
        </Card.Body>
      </Card>
    </>
  );
}
