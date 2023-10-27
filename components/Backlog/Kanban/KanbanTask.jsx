import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import PriorityPill from "../../PriorityPill";
import TaskModal from "../../TaskModal";

export default function KanbanTask({
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
}) {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  return (
    <>
      <Card
        style={{
          width: "80%",
          margin: "auto",
          marginBottom: "10px",
          marginTop: "10px",
          cursor: "pointer",
          fontSize: "20px",

        }}
        className="kanban-task"
        onClick={() => setShowModal(true)}
      >
        <Card.Body>
          <Card.Title style={{fontSize: "25px" }}>
            {name} <PriorityPill priority={priority} />
          </Card.Title>

          <Card.Subtitle style={{ color: "grey", fontSize: "15px" }}>
            {tags.length > 0 && tags.map((tag) => `#${tag.name} `)}
          </Card.Subtitle>

          <Card.Text>{description}</Card.Text>
          <Card.Text style={{ color: "grey", textAlign: "right" }}>
            {storyPoints}
          </Card.Text>
        </Card.Body>
      </Card>
      <TaskModal
        show={showModal}
        close={closeModal}
        {...{
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
        }}
      />
    </>
  );
}

KanbanTask.propTypes = {
  priority: PropTypes.oneOf(["LOW", "MEDIUM", "HIGH"]),
};
