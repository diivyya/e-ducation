import React, { useState } from 'react';
import { db } from "../../firebase-config";
import { collection, increment, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

import { Button, Form, Table } from "react-bootstrap";

export default function Assessments(props) {

    const profile = props.profile

    const [subject, setSubject] = useState("");
    const [students, setStudents] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const getSubjectStudents = async(event) => {
        setSubject(event.target.value)
        const q = query(collection(db, "attendance"),
            where("subjectName", "==", event.target.value))
        const querySnapshot = await getDocs(q);
        setStudents(querySnapshot.docs.map((doc) => (
            { ...doc.data(), id: doc.id }
        )));
    }
    
    return (
        <div>
            <h2>{subject ? subject : ""}</h2>
            <Form.Select style={{backgroundColor: "transparent"}} required
                value={subject} className="mt-5"
                onChange={getSubjectStudents}>
                <option>Subjects</option>
                {
                    profile.subjectsCanTeach.map((sub) => {
                        return (
                            <option value={sub}>{sub}</option>
                        )
                    })
                }
            </Form.Select>
            <div style={{"display": "flex", "justify-content": "flex-end"}}>
                <Button className="mt-5 mr-0" variant="outline-info"
                    onClick = {() => setIsFormOpen(!isFormOpen)}>
                    { isFormOpen ? "Submit" : "Create" }</Button>
            </div>
            { isFormOpen && 
                <Form onSubmit={createDepartment}>
                    <Row className="mb-5">
                        <Col>
                            <Form.Group id="id">
                                <Form.Label><b>ID</b></Form.Label>
                                <Form.Control style={{backgroundColor: "transparent"}}
                                    value={formValues.departmentId} 
                                    onChange={set('departmentId')}
                                    type="text" required />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group id="name">
                                <Form.Label><b>Name</b></Form.Label>
                                <Form.Control style={{backgroundColor: "transparent"}}
                                    value={formValues.name} 
                                    onChange={set('name')}
                                    type="text" required />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group id="budget">
                                <Form.Label><b>Budget</b></Form.Label>
                                <Form.Control style={{backgroundColor: "transparent"}}
                                    value={formValues.budget} 
                                    onChange={set('budget')}
                                    type="text" required />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-5">
                    <Col>
                            <Button variant="outline-dark" type="submit">{ openEditForm ? "Update" : "Create" }</Button>
                        </Col>
                    </Row>
                </Form> 
            }
        </div>
    )
}