import Dropdown from "react-bootstrap/Dropdown";
import React, { useState } from "react";

/* SprintSelection - Client side component
Desc: Dropdown for selecting 

Params:
    setSprint: function provided by parent which SprintSelection can set selected sprint
                parent component will handle effects of changing sprint
    sprintNums: arr of sprint IDs to display as options, provided by parent
    defaultSprint: default value of dropdown

*/
export default function SprintSelection({
  setSprint,
  sprintNums,
  defaultSprint,
} = props) {
  //tracking selected sprint to display in dropdown
  const [selectedSprint, setSelectedSprint] = useState(defaultSprint);
  return (
    <>
      &nbsp;&nbsp;
      <Dropdown style={{ display: "inline-block" }} alt = "Dropdown">
        <Dropdown.Toggle variant="success" id="dropdown-basic" alt = {selectedSprint}>
          {selectedSprint}
        </Dropdown.Toggle>

        <Dropdown.Menu alt = "drop down menu">
          {
            // displaying options for sprints
            sprintNums.map((sprintNum) => (
              <Dropdown.Item
                key={sprintNum}
                onClick={() => {
                  setSprint(sprintNum);
                  setSelectedSprint(sprintNum);
                }}
                alt = "the sprint number"
              >
                {sprintNum}
              </Dropdown.Item>
            ))
          }
        </Dropdown.Menu>
      </Dropdown>
      &nbsp;&nbsp;
    </>
  );
}
