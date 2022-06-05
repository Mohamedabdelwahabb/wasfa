import { useState } from "react";

function Todo(props) {
  const [showModal, setShowModal] = useState();

  function showModalHandler() {
    setShowModal(true);
  }

  function closeModalHandler() {
    setShowModal(false);
  }

  return (
    <div className="card">
      <h2>{props.text}</h2>
      <div className="actions">
        <button className="btn" onClick={showModalHandler}>
          Create new Recipe
        </button>
      </div>
      {showModal && <Backdrop onClick={closeModalHandler} />}
      {showModal && <Modal text="Are you sure?" onClose={closeModalHandler} />}
    </div>
  );
}
export default Todo;

function Backdrop(props) {
  return <div className="backdrop" onClick={props.onClick} />;
}

function Modal(props) {
  return (
    <div className="modal">
      <p>{props.text}</p>
      <button className="btn btn--alt" onClick={props.onClose}>
        Cancel
      </button>
      <button className="btn" onClick={props.onClose}>
        Confirm
      </button>
    </div>
  );
}
