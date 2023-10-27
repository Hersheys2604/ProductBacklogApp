import React from "react";
import Badge from "react-bootstrap/Badge";
import PropTypes from "prop-types";

/* SprintStatusPill - Client side component
Desc: Pill displaying Sprint Status 

Params:
    Status: status of the sprint, can be one of ["PAST", "CURRENT", "FUTURE"]

*/
export default function SprintStatusPill({ Status } = props) {
  return (
    <>
      <>
        {" "}
        <style type="text/css">
          {`
          // .badge{margin-left: 15%;}
    .bg-FUTURE {
      background-color: #C58C37;
      color: white;
    }

    .bg-CURRENT {
        background-color: #2F6334C2;
        color: white;
      }

    .bg-PAST {
    background-color:#953F3F;
    color: white;
    }
    `}
        </style>
      </>
      <Badge pill bg={Status} alt = {Status}>
        {Status}
      </Badge>
    </>
  );
}

SprintStatusPill.propTypes = {
  Status: PropTypes.oneOf(["PAST", "CURRENT", "FUTURE"]),
};
