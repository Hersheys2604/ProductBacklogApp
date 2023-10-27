import React, { useEffect, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

/*AssignSprintDropdown - client side component
desc: dropdown to assign Sprints

Params:
  setSprintID: function passed by parent to set Sprint id

*/
export default function AssignSprintDropdown({ setSprintID, defaultSprintID } = props) {
  const hasDefault = (typeof defaultSprintID) === 'undefined';
  if (!hasDefault) {
    defaultSprintID =-1
  }
  const [SprintList, setSprintList] = useState([]);

  // grabbing Sprintlist data from backend
  useEffect(() => {
    const fetchSprintInfo = async () => {
      const retrievedInfo = await fetch(`/api/obtainSprintID`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }

          return response.json();
        })
        .then((data) => {
          return data;
        })
        .catch((error) => {
          console.error(`Could not get products: ${error}`);
        });

      setSprintList(retrievedInfo);
    };
    fetchSprintInfo();
  }, []);

  return (
    <InputGroup  className="FinalRowCol1" alt = "Input for which sprint it is being assigned">
      <InputGroup.Text id="addDesc" alt = "Sprint assigned">Sprint assigned</InputGroup.Text>
      <Form.Select
        aria-label={"Select Sprint to assign "}
        // value={SprintID}
        onChange={(e) => setSprintID(e.target.value)}
        alt = "Select the sprint to assign to"
      >
        <option value={defaultSprintID} alt="Select Sprint option">{hasDefault && (defaultSprintID)}{!hasDefault && "Select Sprint" }</option>
        {SprintList.map((sprint) => (
          <option value={sprint.id} alt = "the sprint option">{sprint.id}</option>
        ))}
      </Form.Select>
    </InputGroup>
  );
}
