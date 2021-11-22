import React, { useEffect, useState } from 'react';
import { db } from "../../firebase-config";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

import { Button, Form, Table, Row, Col } from "react-bootstrap";

export default function GradesBoard(props) {
    const [grades, setGrades] = useState([]);
    const [subject, setSubject] = useState("");
    const [term, setTerm] = useState("");
    const [students, setStudents] = useState([]);
    const [inputGrades, setInputGrades] = useState(false);

    const profile = props.profile
    
    const getGradesData = async() => {
        const q = query(collection(db, "marks"), where("email", "==", profile.email));
        const querySnapshot = await getDocs(q);
        setGrades(querySnapshot.docs.map((doc) => (
            {...doc.data(), id: doc.id }
        )));
    }

    const getSubjectStudents = async(event) => {
        if (subject && term) {
            const q = query(collection(db, "marks"),
                where("subjectName", "==", subject))
            const querySnapshot = await getDocs(q);
            setStudents(querySnapshot.docs.map((doc) => (
                { ...doc.data(), id: doc.id }
            )));
            console.log(students)
        }
    }

    const putGrades = async(event) => {
        console.log(event)
        const objIndex = students.findIndex((obj => obj.id == event.target.name));
        students[objIndex].grades[term] = Number(event.target.value);
    }

    const submitGrades = async() => {
        if (inputGrades) {
            students.map( async (student) => {
                  const marksDocRef = doc(db, "marks", student.id);
                  await updateDoc(marksDocRef, {
                      grades: student.grades
                  });
            })
            getSubjectStudents({target: {value: subject}})
        }
        setInputGrades(!inputGrades)
    }

    useEffect(() => {
        getGradesData()
    }, [])

    return (
        <div>
            <h2>{subject ? subject : "Grades Board"}</h2>
            <Table>
                <Row>
                    <Col>
                        <Form.Select style={{backgroundColor: "transparent"}} required
                            value={subject} className="mt-5"
                            onChange={(event) => setSubject(event.target.value)}>
                            <option>Subjects</option>
                            {
                                profile.subjectsCanTeach.map((sub) => {
                                    return (
                                        <option value={sub}>{sub}</option>
                                    )
                                })
                            }
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Select style={{backgroundColor: "transparent"}} required
                            value={term} className="mt-5"
                            onChange={(event) => setTerm(event.target.value)}>
                            <option>Term</option>
                            <option value="endTerm">End Term</option>
                            <option value="midTerm">Mid Term</option>
                            <option value="miniTest">Mini Test</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Button className="mt-5 mr-0" variant="outline-info"
                                onClick={getSubjectStudents}>
                                Get Students
                        </Button>
                    </Col>
                </Row>
            </Table>
            <div style={{"display": "flex", "justify-content": "flex-end"}}>
                <Button className="mt-5 mr-0" variant="outline-info"
                    onClick={submitGrades}>
                    { inputGrades ? "Submit" : "Input Grades" }
                </Button>
            </div>
            <Table responsive="sm" className="mt-5">
                <thead>
                    <tr>
                        <th>Scholar No.</th>
                        <th>Student Name</th>
                        <th>Marks Obtained</th>
                        <th>Total Marks</th>
                        <th>Percentage</th>
                        <th>{ inputGrades ? "Marks" : "" }</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => {
                        return (
                            <tr>
                                <td>{ student.scholarNo }</td>
                                <td>{ student.name }</td>
                                { term === "endTerm" ?
                                    <>
                                        <td>{student.grades.endTerm}</td>
                                        <td>60</td>
                                        <td>{ Math.round((student.grades.endTerm * 100) / 60) }%</td>
                                    </>
                                : 
                                    ( term === "midTerm" ?
                                    <> 
                                        <td>{student.grades.midTerm}</td>
                                        <td>20</td>
                                        <td>{ student.grades.midTerm * 5 }%</td> 
                                    </>
                                :
                                    <>
                                        <td>{student.grades.endTerm}</td>
                                        <td>10</td>
                                        <td>{ student.grades.endTerm * 10 }%</td>
                                    </> )
                                }
                                <td>{ inputGrades ? 
                                    <input id="marks" style={{backgroundColor: "transparent"}}
                                            name={student.id}
                                            onChange={putGrades} type="text" required />
                                    : ""}
                                </td>
                            </tr>                        
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}