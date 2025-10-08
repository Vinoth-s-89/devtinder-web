import React from "react";

const Toast = ({ message }) => {
  return (
    message && (
      <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Message sent successfully.</span>
        </div>
      </div>
    )
  );
};

export default Toast;
