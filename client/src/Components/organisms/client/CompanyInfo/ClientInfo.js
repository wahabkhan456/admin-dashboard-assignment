import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useTranslation } from "react-i18next";

import { setUserType } from "../../../../store/actions/index";
import API from "../../../../Helper/Api";
import { Loader } from "semantic-ui-react";
export default function ClientInfo() {
  const dispatch = useDispatch();
  const [fullName, setfullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [Loading, setLoading] = useState(false);
  const id = useSelector((state) => state.User.userId);
  const [t] = useTranslation();
  const handelClick = () => {
    setLoading(true);
    API.post("/waiting/putuser", { fullName, companyName, userId: id })
      .then((response) => {
        setLoading(false);
        if (response.data.statusCode === 200) {
          dispatch(setUserType(2, 2, id));
        } else {
          setLoading(false);
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div className="text-center">
      <Loader active={Loading} />
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <form style={{ marginTop: "30px" }}>
            <input
              type="text"
              id="login"
              required
              value={fullName}
              onChange={(e) => setfullName(e.target.value)}
              className="fadeIn second login-input-box-email"
              name="login"
              placeholder={t("FullName")}
            />
            <input
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              type="text"
              id="password"
              className="fadeIn third login-input-box-email"
              name="login"
              placeholder={t("CompanyName")}
            />
            <input
              onClick={(e) => {
                e.preventDefault();
                handelClick();
              }}
              type="submit"
              className="fadeIn fourth submit-button"
              style={{ backgroundColor: "teal", marginTop: "20px" }}
              value={t("GetIn")}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
