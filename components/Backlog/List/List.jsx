import React from "react";
import Table from "react-bootstrap/Table";
import ListTask from "./ListTask";

export default function List({ data } = props) {
  data = Object.values(data);
  // console.log(data);
  return (
    <Table responsive striped borderless hover style={{ width: "75vw", overflow: "auto", fontSize: "20px" }}>
      <thead>
        <tr>
          <th>#</th>
          <th>Task </th>
          <th>Description</th>
          <th>Stage</th>
          <th>Status</th>
          <th>Story Points</th>
          <th>Type</th>
          <th>Tags</th>
          <th>Created @</th>
          <th>Updated @</th>
        </tr>
      </thead>
      <tbody>
        {data.map((task) => (
          <ListTask
            id={task.id}
            name={task.name}
            type={task.type}
            storyPoints={task.storyPoints}
            priority={task.priority}
            description={task.description}
            status={task.status}
            stage={task.stage}
            createdAt={task.createdAt.toLocaleString()}
            updatedAt={task.updatedAt.toLocaleString()}
            tags={task.tags}
          />
          //   <ListTask {...task} /> figure out why doesnt work :()
        ))}
      </tbody>
    </Table>
  );
}
