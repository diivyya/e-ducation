import React, { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
// import SeatingArrangement from "./SeatingArrangement.js";
import { Alert, Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function OfflineClasses(props) {
  const profile = props.profile;
  const history = useHistory();

  const [offlineClasses, setOfflineClasses] = useState([]);
  const [showSuccesAlert, setShowSuccesAlert] = useState(false);

  const getOfflineClasses = async () => {
    const q1 = query(
      collection(db, "subject"),
      where("department", "==", profile.department),
      where("year", "==", profile.year)
    );
    const querySnapshot1 = await getDocs(q1);
    const subjects = querySnapshot1.docs.map((doc) => doc.id);

    const q2 = query(
      collection(db, "offlineClass"),
      where("subjectName", "in", subjects)
    );
    const querySnapshot2 = await getDocs(q2);
    setOfflineClasses(
      querySnapshot2.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  useEffect(() => {
    getOfflineClasses();
  }, []);
  const navigateTo = () => {
    history.push({
      pathname: "/SeatingArrangement",
      state: {
        profile: "profile",
        email: "email",
        movieimage: "movieimage",
        username: "username",
        mobile: "mobile",
        moviename: "moviename",
        ticketcost: "ticketcost",
        bookingdate: "bookingdate",
        password: "password",
      },
    });
  };
  return (
    <div>
      {showSuccesAlert ? (
        <Alert
          variant="success"
          onClose={() => setShowSuccesAlert(false)}
          dismissible
        >
          Registered successfully!!
        </Alert>
      ) : (
        ""
      )}
      <div>
        {offlineClasses.map((offlineClass) => {
          return (
            <Card
              border="dark"
              style={{
                backgroundColor: "transparent",
                boxShadow: "0px 0px 10px grey",
              }}
              className="m-4"
            >
              <Card.Header>
                <b>{offlineClass.subjectName}</b>
              </Card.Header>
              <Card.Body>
                <Card.Title>{offlineClass.topic}</Card.Title>
                <Card.Text>
                  Faculty: {offlineClass.faculty}
                  <br />
                  Date: {offlineClass.date}
                  <br />
                  Time: {offlineClass.time}
                  {/*}
                  <Button
                    className="float-end"
                    variant="outline-dark"
                    onClick={navigateTo}
                  >
                    Navigate
                  </Button>
            */}
                </Card.Text>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
