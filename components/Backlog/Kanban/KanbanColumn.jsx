import React from "react";
import PropTypes from "prop-types";
import KanbanTask from "./KanbanTask";

//Renders tasks
export default function KanbanColumn({ id, tasks} = props) {
  return (
    <div className="kanban-column-container">
      {Array.from(tasks).map((task) => (
        <KanbanTask
        key={task.id}
        {...task} />
      ))}
    </div>
  );
}

KanbanColumn.propTypes = {
  id: PropTypes.string,
  tasks: PropTypes.array,
};
