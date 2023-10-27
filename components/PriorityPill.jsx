import React from "react";
import Badge from "react-bootstrap/Badge";
import PropTypes from "prop-types";

export default function PriorityPill({ priority } = props) {

  return (
    <>
      <>
        {" "}
        <style type="text/css">
          {`
          // .badge{margin-left: 15%;}
    .bg-HIGH {
      background-color: #953F3F;
      color: white;
    }

    .bg-MEDIUM {
        background-color: #C58C37;
        color: white;
      }

    .bg-LOW {
    background-color:#2F6334C2;
    color: white;
    }
    `}
        </style>
      </>
      <Badge pill style={{ fontSize: 10 }} bg={priority}>
        {priority}
      </Badge>
    </>
  );
}

PriorityPill.propTypes = {
  priority: PropTypes.oneOf(["LOW", "MEDIUM", "HIGH"]),
};
