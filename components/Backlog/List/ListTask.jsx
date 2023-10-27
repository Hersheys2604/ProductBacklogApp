import React from "react";
import PriorityPill from "../../PriorityPill";

export default function ListTask({
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
  return (
    <tr>
      <td>{id}</td>
      <td>
        {name}
        <PriorityPill priority={priority} />
      </td>
      <td>{description}</td>
      <td>{stage}</td>
      <td>{status}</td>

      <td>{storyPoints}</td>
      <td>{type}</td>
      <td> {tags.length > 0 && tags.map((tag) => `#${tag.name} `)}</td>
      <td>{createdAt}</td>
      <td>{updatedAt}</td>
    </tr>
  );
}
