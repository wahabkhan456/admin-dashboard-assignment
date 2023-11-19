import React, { useState, useEffect } from "react";
import API from "../../../Helper/Api";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { login, setUserType } from "../../../store/actions/index";
import Input from "../../atoms/Input.js";
import { Icon, Loader } from "semantic-ui-react";
import "./Login.css";
import NotifyUserModal from "../../atoms/Modal/NotifyUserModal";

export default function Login(props) {
  const [t] = useTranslation();
  const [message, setmessage] = useState("");
  const [isopen, setisopen] = useState(false);
  const [variant, setvariant] = useState("");
  const Login = useSelector((state) => state.Login.isLogin);
  const [userEmail, setuserEmail] = useState("");
  const [password, setpassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const [err, seterr] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Login) {
      props.history.replace("/");
    }
  }, []);

  const validateEmail = () => {
    const pattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return pattern.test(userEmail);
  };

  const handelClick = () => {
    if (!validateEmail()) {
      seterr(true);
      return;
    }
    setLoading(true);
    API.post("user/signIn", { email: userEmail, password })
      .then((response) => {
        if (response.data.statusCode === 200) {
          const { isAuthenticated, userType, userId } = response.data;

          const d = new Date();
          const newDate = new Date(new Date(d).setHours(d.getHours() + 24));
          localStorage.setItem("expirationDate", newDate);

          dispatch(login());
          dispatch(setUserType(userType, isAuthenticated, userId));
          setLoading(false);
          props.history.replace("/");
        } else {
          setLoading(false);
          setmessage(response.data.message);
          setvariant("danger");
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
        closeModal={() => setisopen(false)}
        variant={variant}
      />
      <Loader active={Loading} />
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div
            className="fadeIn first"
            style={{ marginTop: "20px", marginBottom: "30px" }}
          >
            <Icon name="user" size="huge" color="teal" />
          </div>

          <form>
            {err ? <p style={{ color: "red" }}>enter valid email</p> : null}
            <Input
              type="email"
              required
              value={userEmail}
              setvalue={setuserEmail}
              classes="fadeIn second login-input-box-email"
              name="login"
              placeholder={t("email")}
            />

            <Input
              required
              value={password}
              setvalue={setpassword}
              type="password"
              id="password"
              classes="fadeIn third login-input-box-password"
              name="login"
              placeholder={t("password")}
            />
            <Input
              clicked={(e) => {
                e.preventDefault();
                handelClick();
              }}
              type="submit"
              classes="fadeIn fourth submit-button"
              style={{ backgroundColor: "teal", marginTop: "20px" }}
              value={t("Login")}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
