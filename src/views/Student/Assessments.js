import React, { useState, useEffect } from 'react';
import { db } from "../../firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";

import { Alert, Card, Form } from "react-bootstrap";

export default function Assessments (props) {
    const profile = props.profile

    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState("");
    const [assessments, setAssessments] = useState([]);
    const [showSuccesAlert, setShowSuccesAlert] = useState(false);

    const getSubjectAssessments = async(event) => {
        setSelectedSubject(event.target.value)
        const q = query(collection(db, "assessment"), where("subject", "==", selectedSubject));
        const querySnapshot = await getDocs(q);
        setAssessments(querySnapshot.docs.map((doc) => (
            { ...doc.data(), id: doc.id }
        )));
    }

    const getSubjects = async() => {
        const q = query(collection(db, "subject"),
            where("department", "==", profile.department),
            where("year", "==", profile.year));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot)
        setSubjects(querySnapshot.docs.map((doc) => (
            { ...doc.data(), id: doc.id }
        )));
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
            <h2>{selectedSubject ? selectedSubject : ""}</h2>
            <Form.Select style={{backgroundColor: "transparent"}} required
                value={selectedSubject} className="mt-5"
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
                                        <a href={ assessment.link } >Submit Assessment</a>
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