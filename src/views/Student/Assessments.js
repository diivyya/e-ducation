/*
    ---------- Assessment Tab on E-Task in Student Dashboard -------------
*/
import React, { useState, useEffect } from 'react';
import { db } from "../../firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";

import { Alert, Button, Card, Form } from "react-bootstrap";

export default function Assessments (props) {
    //profile of student
    const profile = props.profile

    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState("");
    const [assessments, setAssessments] = useState([]);
    const [showSuccesAlert, setShowSuccesAlert] = useState(false);

    //Get assessment for a selected subject
    const getSubjectAssessments = async(event) => {
        setSelectedSubject(event.target.value)
        const q = query(collection(db, "assessment"), where("subjectName", "==", event.target.value));
        const querySnapshot = await getDocs(q);
        setAssessments(querySnapshot.docs.map((doc) => (
            { ...doc.data(), id: doc.id }
        )));
    }

    //Get all the subjects for the student (department and year)
    const getSubjects = async() => {
        const q = query(collection(db, "subject"),
            where("department", "==", profile.department),
            where("year", "==", profile.year));
        const querySnapshot = await getDocs(q);
        setSubjects(querySnapshot.docs.map(doc => doc.id));
    }

    useEffect(() => {
        getSubjects()
    }, [])

    return (
        <div>
            { showSuccesAlert ? 
                <Alert variant="success" onClose={() => setShowSuccesAlert(false)} dismissible>
                    Assessment submitted successfully!!
                </Alert>
            : ""}
            <Form.Select style={{backgroundColor: "transparent", maxWidth: "500px"}} required
                value={selectedSubject} className="m-5"
                onChange={getSubjectAssessments}>
                <option>Subjects</option>
                {
                    subjects.map((sub) => {
                        return (
                            <option value={sub}>{sub}</option>
                        )
                    })
                }
            </Form.Select>
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
                                        <Button className="float-end" variant="outline-dark" href={ assessment.link } >Submit Assessment</Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        );
                    })
                }
            </div>
        </div>
    )
}