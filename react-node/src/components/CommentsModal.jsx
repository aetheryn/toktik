import React from "react";
import ReactDOM from "react-dom";

const OverLay = () => {};

const CommentsModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <OverLay setShowModal={props.setShowCommentsModal} />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default CommentsModal;
