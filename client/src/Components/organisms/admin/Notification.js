import React, { useEffect, useState } from "react";
import API from "../../../Helper/Api";
import { Button, Card, Loader, Dimmer } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

export default function Notification() {
  const [Requests, setRequests] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [t] = useTranslation();

  useEffect(() => {
    setLoading(true);
    API.get("/waiting/getusers")
      .then((response) => {
        if (response.data.statusCode === 200) {
          setRequests(response.data.records);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  const interval = setInterval(() => {
    API.get("/waiting/getusers")
      .then((response) => {
        if (response.data.statusCode === 200) {
          setRequests(response.data.records);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, 20000);

  useEffect(() => {
    return function cleanup() {
      clearInterval(interval);
    };
  });

  const handleAccept = (id) => {
    console.log("IN FUNCTION");
    setLoading(true);
    API.get("/waiting/approve?userId=" + id)
      .then((response) => {
        let old = [...Requests];
        let newRecords = old.filter((rec) => rec.userId !== id);
        setRequests(newRecords);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleReject = (id) => {
    setLoading(true);
    API.get("/waiting/reject?userId=" + id)
      .then((response) => {
        let old = [...Requests];
        let newRecords = old.filter((rec) => rec.userId !== id);
        setRequests(newRecords);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div>
      <Loader active={Loading} />

      {Requests.length !== 0 ? (
        <Card.Group>
          {Requests.map((request) => {
            return (
              <Card>
                <Card.Content>
                  <Card.Header>{request.fullName}</Card.Header>
                  <Card.Meta>{request.companyName}</Card.Meta>
                  <Card.Description>
                    {request.fullName} {t("from")} {request.companyName}{" "}
                    {t("apr_message")}.
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className="ui two buttons">
                    <Button
                      basic
                      color="green"
                      onClick={(e) => handleAccept(request.userId)}
                    >
                      {t("Approve")}
                    </Button>
                    <Button
                      basic
                      color="red"
                      onClick={(e) => handleReject(request.userId)}
                    >
                      {t("Decline")}
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            );
          })}
        </Card.Group>
      ) : (
        <p>{t("noti")}</p>
      )}
    </div>
  );
}
