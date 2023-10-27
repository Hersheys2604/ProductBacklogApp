"use client";
import Backlog from "@/components/Backlog/BackLog";
import SprintSelection from "@/components/Sprint/SprintSelection";
import SprintStatusPill from "@/components/Sprint/SprintStatusPill";
import React, { useState } from "react";

/* SprintBacklogComponent - Client side component
Desc: The sprint backlog, on default will display the current sprint but can view other sprints too

Params:
    props: object of objects provided by page, will contain information about sprints
    in the form of:
    {{sprint.id  ,sprint.status,sprint.tasks}}

*/
export default function SprintBacklog(props) {
  // checking if sprints exist in DB yet
  const [sprintsExist, setSprintsExist] = useState(
    Object.keys(props).length > 0
  );

  // converting  object of objects -> arr of objects
  props = Object.keys(props).map((key) => {
    return props[key];
  });

  let defaultSprint;

  //If a sprint with the status current exits, set currentSprint to that
  if (props.some((sprint) => sprint.status == "CURRENT")) {
    defaultSprint = props.find((sprint) => sprint.status == "CURRENT");
  } else {
    //else set it to the fir
    defaultSprint = props.find((sprint) => sprint.id == 1);
  }

  // tracking which sprint to display
  const [selectedSprint, setSelectedSprint] = useState(
    sprintsExist ? defaultSprint.id : 0
  );
  const [sprintStatus, setSprintStatus] = useState(
    sprintsExist ? defaultSprint.status : "PAST"
  );
  const [sprintTasks, setsprintTasks] = useState(
    sprintsExist ? defaultSprint.tasks : []
  );

  //method to pass to dropdown to update display
  const updateSprint = (newSprint) => {
    let currentSprint = props.find((sprint) => sprint.id == newSprint);
    setSelectedSprint(currentSprint.id);
    setSprintStatus(currentSprint.status);
    setsprintTasks(currentSprint.tasks);
  };

  //get sprintIds for dropdown
  let sprintIds = props.map((key) => {
    return key.id;
  });

  return (
    // <>hi</>
    <>
      {
        // display if sprints exist
        sprintsExist && (
          <>
            {" "}
            <h1 style={{fontSize: "50px",}} alt = "Sprint">
              Sprint
              <SprintSelection
                style={{fontSize: "50px",}}
                setSprint={updateSprint}
                sprintNums={sprintIds}
                defaultSprint={selectedSprint}
              />
              Backlog <SprintStatusPill style={{fontSize: "40px",}} Status={sprintStatus} />
            </h1>
            <br></br>
            <br></br>
            <Backlog {...sprintTasks} />
          </>
        )
      }
      {!sprintsExist && (
        <>
          <h1 alt = "Sprint Backlog" style={{fontSize: "50px",}}>Sprint Backlog</h1>
          <p alt = "no sprints here">no sprints here :(</p>
          <p alt = "go ahead and add some in sprint view (add link), we'll wait">go ahead and add some in sprint view (add link), we'll wait</p>
        </>
      )}
    </>
  );
}
