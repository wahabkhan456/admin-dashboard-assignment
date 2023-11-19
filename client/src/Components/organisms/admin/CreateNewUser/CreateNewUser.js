import React, { useState } from "react";
import { Icon, Loader } from "semantic-ui-react";
import "./CreateNewUser.css";
import API from "../../../../Helper/Api";
import { useTranslation } from "react-i18next";
import NotifyUserModal from "../../../atoms/Modal/NotifyUserModal";
import { Alert } from "react-bootstrap";

export default function CreateNewUser() {
  const [isopen, setisopen] = useState(false);
  const [t] = useTranslation();
  const [fullName, setfullName] = useState("");
  const [message, setmessage] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState(false);
  const [varient, setvarient] = useState("");
  const validateEmail = () => {
    const pattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return pattern.test(email);
  };

  const handleClick = () => {
    if (!validateEmail()) {
      seterr(true);
      return;
    }
    setloading(true);
    API.post("/user/signUp", { fullName, password, email, userType: "2" })
      .then((response) => {
        if (response.data.statusCode === 200) {
          setloading(false);
          setfullName("");
          setemail("");
          setpassword("");
          setmessage(response.data.message);

          setvarient("success");
          setisopen(true);
        } else {
          setloading(false);
          setfullName("");
          setemail("");
          setpassword("");
          setmessage(response.data.message);
          setvarient("danger");
          setisopen(true);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div>
      <NotifyUserModal
        open={isopen}
        message={message}
        variant={varient}
        closeModal={() => setisopen(false)}
      />
      <div className="create-new-user-main">
        <Loader active={loading} />
        <div className="create-new-user-input">
          <div className="first">
            <Icon name="user" color="teal" size="huge" />
          </div>

          <input
            placeholder={t("FullName")}
            value={fullName}
            onChange={(e) => setfullName(e.target.value)}
            type="text"
            className="input-box login-input-box-email"
          />

          {err ? <p style={{ color: "red" }}>Enter valid email</p> : null}

          <input
            placeholder={t("email")}
            value={email}
            onChange={(e) => setemail(e.target.value)}
            type="email"
            className="input-box login-input-box-email"
          />
          <input
            placeholder={t("password")}
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            className="input-box login-input-box-email"
          />
          <input
            type="submit"
            value={t("submit")}
            className="submit-button"
            onClick={(e) => {
              e.preventDefault();
              handleClick();
            }}
            style={{ marginTop: "20px" }}
          />
        </div>
      </div>
    </div>
  );
}
