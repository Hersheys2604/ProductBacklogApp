import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import PriorityPill from "../PriorityPill";
import './TaskListSimple.css';

export default function TaskListSimple({ selectionOn, data } = props) {
  const [hasTasks, setHasTasks] = useState(Object.keys(data).length > 0);
  if (hasTasks) {
    data = Object.values(data);
  }

  return (
    <Table responsive striped borderless hover style={{ width: "20vw" }}>
      <thead>
        <tr>
          <th>#</th>
          <th>Tasks</th>
        </tr>
      </thead>
      <tbody>
        {hasTasks &&
          data.map((task) => (
            <tr>
              <td>{task.id}</td>
              <td>
                {task.name}
                <PriorityPill priority={task.priority} className="PriorityPill" />
              </td>
            </tr>
          ))}
        {}
      </tbody>
    </Table>
  );
}
