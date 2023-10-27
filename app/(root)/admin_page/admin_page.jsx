"use client";
import React from "react";

// prop ={userId, name,email}
export default function UserTable({ data } = props) {
  data = Object.keys(data).map((key) => {
    return data[key];
  });

  return (
    <div>
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  onClick={async (e) => {
                    try {
                      const body = {
                        userId: parseInt(user.id),
                      };
                      await fetch(`/api/delete_user`, {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body),
                      });

                      close();
                      location.reload();
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
