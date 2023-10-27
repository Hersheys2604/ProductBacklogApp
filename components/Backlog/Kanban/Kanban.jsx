"use client";
import React, { useEffect, useState } from "react";
import "./Kanban.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import KanbanColumn from "./KanbanColumn";

export default function Kanban({ data } = props) {
  // sort task types
  const [todo, setTodo] = useState([]);
  const [inProg, setInProg] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    data = Object.values(data);

    setTodo(data.filter((dataObj) => dataObj.status == "NOT_STARTED"));
    setInProg(data.filter((dataObj) => dataObj.status == "IN_PROGRESS"));
    setCompleted(data.filter((dataObj) => dataObj.status == "COMPLETED"));
  }, [data]);

  return (
    <>
      <Container>
        <Row>
          <Col sm>
            <div className="kanban-column todo">
              <h2>Not Started</h2>
              <KanbanColumn id="1" tasks={todo} />
            </div>
          </Col>
          <Col sm>
            <div className="kanban-column prog">
              <h2>In Progress</h2>
              <KanbanColumn id="2" tasks={inProg} />
            </div>
          </Col>

          <Col sm>
            <div className="kanban-column complete">
              <h2>Complete</h2>
              <KanbanColumn id="3" tasks={completed} />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
