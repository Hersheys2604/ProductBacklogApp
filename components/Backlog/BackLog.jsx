"use client";
import React, { useState } from "react";
import Kanban from "@/components/Backlog/Kanban/Kanban";
import List from "./List/List";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

import TaskCreationModal from "../TaskCreationModal";

export default function Backlog(props) {
  const [kanbanView, setKanbanView] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const toggleView = () => {
    setKanbanView(!kanbanView);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <Form.Check // prettier-ignore
        type="switch"
        id="custom-switch"
        label="Toggle view"
        onClick={toggleView}
        alt="Button to switch from kanban to list view"
        style={{ fontSize: "20px" }}
      />
      {!kanbanView && <List data={props} />}
      {kanbanView && <Kanban data={props} />}

      <Button
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          zIndex: "100",
          backgroundColor: "545f71",
          fontSize: "20px",
        }}
        onClick={toggleModal}
        alt="Button to add tasks"
      >
        + Add task
      </Button>
      <TaskCreationModal show={showModal} close={toggleModal} />
    </>
  );
}
