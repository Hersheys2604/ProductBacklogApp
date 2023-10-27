import React, { useEffect, useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

/*AssignUserDropdown - client side component
desc: dropdown to assign users

Params:
  setUserID: function passed by parent to set user id

*/

export default function AssignUserDropdown({ setUserID } = props) {
  const [userList, setUserList] = useState([]);

  
  // grabbing userlist data from backend
  useEffect(() => {
    const fetchUserInfo = async () => {
      const retrievedInfo = await fetch(`/api/obtainUserId`)
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

      setUserList(retrievedInfo);
    };



    fetchUserInfo();
  }, []);

  return (
    <InputGroup alt = "Input for which user it is being assigned">
      <InputGroup.Text id="addDesc" alt = "User assigned">User assigned</InputGroup.Text>
      <Form.Select
        aria-label={"Select User to assign "}
        // value={userID}
        onChange={(e) => setUserID(e.target.value)}
        alt = "select a user to assign to"
      >
        <option value="-1" alt = "Select User option">Select User</option>
        {userList.map((user) => (
          <option value={user.id} alt = "The user id to select">{user.first_name}</option>
        ))}
      </Form.Select>
    </InputGroup>
  );
}
