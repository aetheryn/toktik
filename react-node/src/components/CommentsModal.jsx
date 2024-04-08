import React from "react";
import ReactDOM from "react-dom";
import useFetch from "../hooks/useFetch";

const OverLay = () => {
  const fetchData = useFetch();
  const getProfileData = async () => {
    const res = await fetchData()
  };
};

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
