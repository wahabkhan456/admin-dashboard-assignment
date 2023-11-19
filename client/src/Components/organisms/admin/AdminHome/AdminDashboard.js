import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Icon, Table, Loader, Button } from "semantic-ui-react";
import "./AdminDashboard.css";
import API from "../../../../Helper/Api";

export default function AdminDashboard() {
  const [t] = useTranslation();
  const [loading, setloading] = useState(false);
  const [users, setusers] = useState([]);

  useEffect(() => {
    setloading(true);
    API.get("/user/getusers")
      .then((response) => {
        if (response.data.statusCode === 200) {
          setusers(response.data.users);
          setloading(false);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  const getStatus = (auth) => {
    if (auth === 1) {
      return <Table.Cell negative>{t("unauth")}</Table.Cell>;
    } else if (auth === 2) {
      return <Table.Cell negative>{t("pen")}</Table.Cell>;
    } else if (auth === 3) {
      return <Table.Cell negative>{t("appr")}</Table.Cell>;
    }
  };

  return (
    <div className="admin-dashboard">
      <Loader active={loading} />
      {users.length !== 0 ? (
        <Table called>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>{t("name")}</Table.HeaderCell>
              <Table.HeaderCell>{t("email")}</Table.HeaderCell>
              <Table.HeaderCell>{t("status")}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {users.map((user) => {
              return (
                <Table.Row>
                  <Table.Cell>{user.fullName}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  {getStatus(user.isAuthenticated)}
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      ) : (
        <p>{t("n_f")}</p>
      )}
    </div>
  );
}
