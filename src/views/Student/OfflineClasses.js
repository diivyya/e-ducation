/*
    ---------- Offline Classes Tab on E-Task in Student Dashboard -------------
*/
import React, { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Alert, Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function OfflineClasses(props) {
  const profile = props.profile;
  const history = useHistory();

  const [offlineClasses, setOfflineClasses] = useState([]);
  const [showSuccesAlert, setShowSuccesAlert] = useState(false);

  //Get all the offline classes for the subject
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

  //If student wants to register, it re-directs to the seating arrangement page
  const navigateTo = (offlineClass) => {
    history.push({
      pathname: "/seating-arrangement",
      state: { seats: offlineClass.seats, scholarNo: profile.scholarNo, classId: offlineClass.id },
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
                  <div className="float-end">
                    { offlineClass.studentsWhoRegistered.includes(profile.scholarNo) ? 
                      <Button variant="success">Registered!</Button> : 
                      <Button
                        className="float-end"
                        variant="outline-dark"
                        onClick={() => navigateTo(offlineClass)}
                      >
                        Book Seat
                      </Button>
                    }
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
