import React from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-bootstrap";

const NotifyUserModal = ({ variant, open, closeModal, message }) => {
  const [t] = useTranslation();
  setTimeout(() => {
    closeModal();
  }, 10000);
  return (
    <div>
      {open ? (
        <Alert variant={variant}>
          <p>{message}</p>
        </Alert>
      ) : null}
    </div>
  );
};

export default NotifyUserModal;
