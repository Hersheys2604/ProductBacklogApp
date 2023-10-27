import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

/*UserStoryForm - client side component
desc: Form to create and edit user stories

Params:
  show: Bool value used to initally display modal
  close:Function passed by parent to handle closing modal
  title: modal title
  message: modal message
  buttonText: text on button to enact action
  action: function passed by parent to run if button clicked
*/
export default function ConfirmationModal({
  show,
  close,
  title,
  message,
  buttonText,
  action,
} = props) {
  return (
    <>
      <Modal
        show={show}
        onHide={close}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        alt = "Confirmation Modal"
      >
        <Modal.Header closeButton alt = "close button">
          <Modal.Title id="contained-modal-title-vcenter" alt = {title}>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body alt = {message}>{message}</Modal.Body>
        <Modal.Footer>
          <Button onClick={action} alt = {buttonText}>{buttonText}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
