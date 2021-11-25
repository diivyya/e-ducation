import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import {
  collection,
  doc,
  getDocs,
  deleteDoc,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

import { Alert, Form, Button, Table, Row, Col } from "react-bootstrap";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";

import Multiselect from "multiselect-react-dropdown";

export default function FacultyData() {
  const initialFormValues = {
    name: "",
    email: "",
    facultyId: "",
    designation: "",
    phone: "",
    password: "faculty123",
    department: "",
    gender: "",
    vaccinationStatus: "",
    dob: "",
    subjectsCanTeach: [],
  };
  const [formValues, setFormValues] = useState(initialFormValues);

  const FacultyCollectionRef = collection(db, "faculty");
  const DepartmentCollectionRef = collection(db, "department");
  const [faculty, setFaculty] = useState([]);
  const [department, setDepartment] = useState([]);
  const [subject, setSubject] = useState([]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);

  const { signup } = useAuth();

  const set = (name) => {
    return ({ target: { value } }) => {
      setFormValues((oldValues) => ({ ...oldValues, [name]: value }));
    };
  };

  const createFaculty = async (event) => {
    event.preventDefault();
    if (openEditForm) {
      updateFaculty();
    } else {
      await setDoc(doc(db, "faculty", formValues.email), formValues);
      signup(formValues.email, formValues.password);
      /*
      const data = {
        username: formValues.facultyId,
        secret: formValues.password,
        email: formValues.email,
        first_name: formValues.name,
      };
      const config = {
        method: "post",
        url: "https://api.chatengine.io/users/",
        headers: {
          "PRIVATE-KEY": "2565eb88-7df8-4a01-ad3a-122a0daf08b1",
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
        */
      getFaculty();
      setShowCreateForm(false);
      setFormValues(initialFormValues);
    }
  };

  const editFaculty = async (fac) => {
    setShowCreateForm(false);
    setOpenEditForm(true);
    setFormValues(fac);
  };

  const updateFaculty = async () => {
    await setDoc(doc(db, "faculty", formValues.email), formValues);
    getFaculty();
    setOpenEditForm(false);
    setFormValues(initialFormValues);
  };

  const deleteFaculty = async (id) => {
    const facultyDoc = doc(db, "faculty", id);
    await deleteDoc(facultyDoc);
    getFaculty();
  };

  const showOnClick = () => {
    setShowCreateForm(!showCreateForm);
    setOpenEditForm(false);
  };

  const getFaculty = async () => {
    const data = await getDocs(FacultyCollectionRef);
    setFaculty(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const getDepartment = async () => {
    const data = await getDocs(DepartmentCollectionRef);
    setDepartment(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const getSubject = async () => {
    const q = query(
      collection(db, "subject"),
      where("department", "==", formValues.department)
    );
    const querySnapshot = await getDocs(q);
    setSubject(
      querySnapshot.docs.map((doc) => ({ name: doc.data(), id: doc.id }))
    );
  };

  const setSubjectsCanTeach = (event) => {
    setFormValues((oldValues) => ({
      ...oldValues,
      ["subjectsCanTeach"]: event.map((e) => e.id),
    }));
  };

  useEffect(() => {
    getSubject();
  }, [formValues.department]);

  useEffect(() => {
    getFaculty();
    getDepartment();
  }, []);

  return (
    <div>
      <Button
        variant="outline-danger"
        className="mt-4 mb-4"
        onClick={showOnClick}
      >
        {showCreateForm || openEditForm ? "Close Form" : "Create new faculty"}
      </Button>
      {(showCreateForm || openEditForm) && (
        <Form onSubmit={createFaculty}>
          <Row className="mb-5">
            <Col>
              <Form.Group id="name">
                <Form.Label>
                  <b>Name</b>
                </Form.Label>
                <Form.Control
                  style={{ backgroundColor: "transparent" }}
                  value={formValues.name}
                  onChange={set("name")}
                  type="text"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group id="email">
                <Form.Label>
                  <b>Email ID</b>
                </Form.Label>
                <Form.Control
                  style={{ backgroundColor: "transparent" }}
                  value={formValues.email}
                  onChange={set("email")}
                  type="email"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group id="facultyId">
                <Form.Label>
                  <b>ID</b>
                </Form.Label>
                <Form.Control
                  style={{ backgroundColor: "transparent" }}
                  value={formValues.facultyId}
                  onChange={set("facultyId")}
                  type="text"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group id="phone">
                <Form.Label>
                  <b>Contact no</b>
                </Form.Label>
                <Form.Control
                  style={{ backgroundColor: "transparent" }}
                  value={formValues.phone}
                  onChange={set("phone")}
                  type="text"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                controlId="image"
                className="mb-3"
                style={{ backgroundColor: "transparent" }}
                onChange={(event) => setNewImage(event.target.files[0])}
              >
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-5">
            <Col>
              <Form.Select
                style={{ backgroundColor: "transparent" }}
                required
                value={formValues.designation}
                onChange={set("designation")}
              >
                <option>Designation</option>
                <option value="Professor">Professor</option>
                <option value="Assistant Professor">Assistant Professor</option>
                <option value="Temporary Faculty">Temporary Faculty</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Select
                style={{ backgroundColor: "transparent" }}
                required
                value={formValues.department}
                onChange={set("department")}
              >
                <option>Department</option>
                {department.map((dept) => {
                  return <option value={dept.id}>{dept.id}</option>;
                })}
              </Form.Select>
            </Col>
            <Col>
              <Form.Select
                style={{ backgroundColor: "transparent" }}
                required
                value={formValues.gender}
                onChange={set("gender")}
              >
                <option>Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Select
                style={{ backgroundColor: "transparent" }}
                label="Vaccination Status"
                required
                value={formValues.vaccinationStatus}
                onChange={set("vaccinationStatus")}
              >
                <option>Vaccination Status</option>
                <option value="Fully Vaccinated">Fully Vaccinated</option>
                <option value="Partially Vaccinated">
                  Partially Vaccinated
                </option>
                <option value="Not Vaccinated">Not Vaccinated</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Control
                type="date"
                style={{ backgroundColor: "transparent" }}
                value={formValues.dob}
                onChange={set("dob")}
                required
              />
            </Col>
          </Row>
          <Row className="mb-5">
            <Col>
              <Multiselect
                required
                options={subject}
                displayValue="id"
                onSelect={setSubjectsCanTeach}
                onRemove={setSubjectsCanTeach}
              />
            </Col>
          </Row>
          <Row className="mb-5">
            <Col>
              <Button variant="outline-dark" type="submit">
                {openEditForm ? "Update" : "Create"}
              </Button>
            </Col>
          </Row>
        </Form>
      )}
      <Table responsive="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Department</th>
            <th>Email ID</th>
            <th>Subjects</th>
            <th>Contact No.</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Vaccination Status</th>
          </tr>
        </thead>
        <tbody>
          {faculty.map((fac) => {
            return (
              <tr>
                <td>{fac.facultyId}</td>
                <td>{fac.name}</td>
                <td>{fac.designation}</td>
                <td>{fac.department}</td>
                <td>{fac.email}</td>
                <td>{fac.subjectsCanTeach.join(", ")}</td>
                <td>{fac.phone}</td>
                <td>{fac.dob}</td>
                <td>{fac.gender}</td>
                <td>{fac.vaccinationStatus}</td>
                <td>
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      deleteFaculty(fac.id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </td>
                <td>
                  <IconButton
                    aria-label="edit"
                    onClick={() => {
                      editFaculty(fac);
                    }}
                  >
                    <Edit />
                  </IconButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
