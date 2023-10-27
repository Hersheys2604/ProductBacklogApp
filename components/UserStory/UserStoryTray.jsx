"use client";
import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./UserStory.css";

import { Button } from "react-bootstrap";
import { useState } from "react";
import UserStoryCard from "./UserStoryCard";
import UserStoryForm from "./UserStoryForm";

export default function UserStoryTray(props) {
  const [showTray, setShowTray] = useState(false);
  const toggleTrayDisplay = () => setShowTray(!showTray);

  const [showForm, setShowForm] = useState(false);
  const toggleFormDisplay = () => setShowForm(!showForm);

  props = Object.keys(props).map((key) => {
    return props[key];
  });

  return (
    <>
      <Button className="tab" onClick={toggleTrayDisplay} alt = "Button for user story">
        <div class="tab-text" alt = "User Stories" style={{fontSize: "20px" }}>User  Stories</div>
      </Button>
      <Offcanvas className="Tray" show={showTray} onHide={toggleTrayDisplay} placement="end" alt = "Canvas for user stories">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title alt = "User Stories">User Stories</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body alt = "Body of the canvas">
          {props.map((story) => (
            <UserStoryCard {...story} />
          ))}
        </Offcanvas.Body>
        <Button onClick={toggleFormDisplay} alt = "Button for creating user story">Create User Story</Button>
        <UserStoryForm show={showForm} close={toggleFormDisplay} />
      </Offcanvas>
    </>
  );
}
