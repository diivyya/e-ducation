/*
    ---------- Offline Classes Tab in E-Task on Faculty Portal Dashboard -------------
*/

import React, { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  addDoc,
  query,
  where
} from "firebase/firestore";
import { seats } from "./constants";
import { Alert, Button, Card, Form, Row, Col } from "react-bootstrap";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

export default function OfflineClasses(props) {
  const profile = props.profile;

  const initialFormValues = {
    subjectName: "",
    topic: "",
    faculty: profile.name,
    date: "",
    time: "",
    seats: seats,
    studentsWhoRegistered: [],
  };
  //setState for storing form values while creation or updation of any offline class
  const [formValues, setFormValues] = useState(initialFormValues);

  const [offlineClasses, setOfflineClasses] = useState([]);

  //States to open and close form and alert
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showSuccesAlert, setShowSuccesAlert] = useState(false);

  //sets the values entered in form to "formValues" state
  const set = (name) => {
    return ({ target: { value } }) => {
      setFormValues((oldValues) => ({ ...oldValues, [name]: value }));
    };
  };

  //Fetch all offlineClasses created by the faculty
  const getOfflineClasses = async () => {
    const q = query(collection(db, "offlineClass"),
            where("faculty", "==", profile.name))
    const querySnapshot = await getDocs(q);
    setOfflineClasses(querySnapshot.docs.map((doc) => (
      { ...doc.data(), id: doc.id }
  )));
  };

  //Create offline class initialised with 0 students registered and an empty class
  const createOfflineClass = async (event) => {
    event.preventDefault();
    await addDoc(collection(db, "offlineClass"), formValues);
    setIsFormOpen(false);
    setFormValues(initialFormValues);
    setShowSuccesAlert(true);
    getOfflineClasses();
  };

  //Deleted an offline class
  const deleteOfflineClass = async (id) => {
    const offlineClassDoc = doc(db, "offlineClass", id);
    await deleteDoc(offlineClassDoc);
    getOfflineClasses();
  };

  useEffect(() => {
    getOfflineClasses();
  }, []);

  return (
    <div>
      {showSuccesAlert ? (
        <Alert
          variant="success"
          onClose={() => setShowSuccesAlert(false)}
          dismissible
        >
          Assessment created successfully!!
        </Alert>
      ) : (
        ""
      )}
      <div style={{ display: "flex", "justify-content": "flex-end" }}>
        <Button
          className="mt-5 mr-0 mb-4"
          variant="outline-info"
          onClick={() => setIsFormOpen(!isFormOpen)}
        >
          {isFormOpen ? "Close" : "Create Offline Class"}
        </Button>
      </div>
      {isFormOpen && (
        <Form onSubmit={createOfflineClass} className="mt-5">
          <Row className="mb-5">
            <Col>
              <Form.Group id="subjectName">
                <Form.Label>
                  <b>Subject Name</b>
                </Form.Label>
                <Form.Select
                  style={{ backgroundColor: "transparent" }}
                  required
                  value={formValues.subjectName}
                  onChange={set("subjectName")}
                >
                  <option>Subjects</option>
                  {profile.subjectsCanTeach.map((sub) => {
                    return <option value={sub}>{sub}</option>;
                  })}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group id="topic">
                <Form.Label>
                  <b>Topic</b>
                </Form.Label>
                <Form.Control
                  style={{ backgroundColor: "transparent" }}
                  value={formValues.topic}
                  onChange={set("topic")}
                  type="text"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group id="date">
                <Form.Label>
                  <b>Date</b>
                </Form.Label>
                <Form.Control
                  type="date"
                  style={{ backgroundColor: "transparent" }}
                  value={formValues.date}
                  onChange={set("date")}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group id="time">
                <Form.Label>
                  <b>Time</b>
                </Form.Label>
                <Form.Control
                  style={{ backgroundColor: "transparent" }}
                  value={formValues.time}
                  onChange={set("time")}
                  type="time"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-5">
            <Col>
              <Button variant="outline-dark" type="submit">
                Create
              </Button>
            </Col>
          </Row>
        </Form>
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
                  Date: {offlineClass.date}
                  <br />
                  Time: {offlineClass.time}
                  <br />
                  Students Registered:{" "}
                  {offlineClass.studentsWhoRegistered &&
                    offlineClass.studentsWhoRegistered.sort().join(", ")}
                </Card.Text>
                <IconButton
                  aria-label="delete"
                  style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "0px",
                  }}
                  onClick={() => {
                    deleteOfflineClass(offlineClass.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
