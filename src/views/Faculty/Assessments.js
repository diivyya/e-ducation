import React, { useState } from 'react';
import { db } from "../../firebase-config";
import { collection, deleteDoc, doc, query, where, getDocs, addDoc } from "firebase/firestore";

import { Alert, Button, Card, Form, Row, Col } from "react-bootstrap";

import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

export default function Assessments(props) {
    const initialFormValues = {
        subjectName: "", deadlineDate: "", deadlineTime: "", term: "", totalMarks: "", link: "", StudentsWhoSubmitted: []
    }
    const [formValues, setFormValues] = useState(initialFormValues);

    const profile = props.profile

    const [subject, setSubject] = useState("");
    const [assessments, setAssessments] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const set = name => {
        return ({ target: { value } }) => {
          setFormValues(oldValues => ({...oldValues, [name]: value }));
        }
    };

    const getSubjectAssessments = async(event) => {
        setSubject(event.target.value)
        const q = query(collection(db, "assessment"),
            where("subjectName", "==", event.target.value))
        const querySnapshot = await getDocs(q);
        setAssessments(querySnapshot.docs.map((doc) => (
            { ...doc.data(), id: doc.id }
        )));
    }

    const createAssessment = async(event) => {
        event.preventDefault();
        await addDoc(collection(db, "assessment"), { ...formValues, subjectName: subject });
        setIsFormOpen(false)
        setFormValues(initialFormValues)
        setShowSuccesAlert(true)
    }

    const deleteAssessment = async(id) => {
        const assessmentDoc = doc(db, "assessment", id);
        await deleteDoc(assessmentDoc);
        getSubjectAssessments({ target: { value: subject }})
    }
    
    return (
        <div>
            { showSuccessAlert ? 
                <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
                    Assessment created successfully!!
                </Alert>
            : ""}
            <h2>{subject ? subject : ""}</h2>
            <Form.Select style={{backgroundColor: "transparent"}} required
                value={subject} className="mt-5"
                onChange={getSubjectAssessments}>
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
                <Button className="mt-5 mr-0 mb-4" variant="outline-info"
                    onClick = {() => setIsFormOpen(!isFormOpen)}>
                    { isFormOpen ? "Close" : "Create" }</Button>
            </div>
            { isFormOpen && subject &&
                <Form onSubmit={createAssessment} className="mt-5">
                    <Row className="mb-5">
                        <Col>
                            <Form.Select style={{backgroundColor: "transparent"}} required
                                value={formValues.term} 
                                onChange={set('term')}>
                                <option>Term</option>
                                <option value="Mini Test">Mini Test</option>
                                <option value="Mid Term">Mid Term</option>
                                <option value="End Term">End Term</option>
                                <option value="Class Test">Class Test</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row className="mb-5">
                        <Col>
                            <Form.Group id="totalMarks">
                                <Form.Label><b>Total Marks</b></Form.Label>
                                <Form.Control style={{backgroundColor: "transparent"}}
                                    value={formValues.totalMarks}  
                                    onChange={set('totalMarks')}
                                    type="text" required />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group id="link">
                                <Form.Label><b>Test Link</b></Form.Label>
                                <Form.Control style={{backgroundColor: "transparent"}}
                                    value={formValues.link} 
                                    onChange={set('link')}
                                    type="text" required />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group id="deadlineDate">
                                <Form.Label><b>Deadline Date</b></Form.Label>
                                <Form.Control type="date" style={{backgroundColor: "transparent"}}
                                    value={formValues.deadlineDate} 
                                    onChange={set('deadlineDate')} required/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group id="deadlineTime">
                                <Form.Label><b>Deadline Time</b></Form.Label>
                                <Form.Control style={{backgroundColor: "transparent"}}
                                    value={formValues.deadlineTime}  
                                    onChange={set('deadlineTime')}
                                    type="time" required />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-5">
                        <Col>
                            <Button variant="outline-dark" type="submit">Create</Button>
                        </Col>
                    </Row>
                </Form> 
            }
            <div>
                {
                    assessments.map((assessment) => {
                        return (
                            <Card border="dark" style={{backgroundColor: "transparent", boxShadow: "0px 0px 10px grey"}} className="m-4">
                                <Card.Header><b>{ assessment.subjectName }</b></Card.Header>
                                <Card.Body>
                                    <Card.Title>{ assessment.term }</Card.Title>
                                    <Card.Text>
                                        Deadline: { assessment.deadlineDate }, { assessment.deadlineTime }<br/>
                                        Total Marks: { assessment.totalMarks }<br/>
                                        <a href={ assessment.link } >Registration Link</a>
                                    </Card.Text>
                                    <IconButton aria-label="delete" style={{display: "block", marginLeft: "auto", marginRight: "0px" }}
                                    onClick={() => {deleteAssessment(assessment.id)}}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Card.Body>
                            </Card>
                        );
                    })
                }
            </div>
        </div>
    )
}