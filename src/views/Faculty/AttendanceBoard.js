import React, { useState } from 'react';
import { db } from "../../firebase-config";
import { collection, increment, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

import { Button, Form, Table } from "react-bootstrap";

export default function AttendanceBoard(props) {

    const profile = props.profile

    const [subject, setSubject] = useState("");
    const [students, setStudents] = useState([]);
    const [takeAttendance, setTakeAttendance] = useState(false);

    const getSubjectStudents = async(event) => {
        setSubject(event.target.value)
        const q = query(collection(db, "attendance"),
            where("subjectName", "==", event.target.value))
        const querySnapshot = await getDocs(q);
        setStudents(querySnapshot.docs.map((doc) => (
            { ...doc.data(), id: doc.id }
        )));
    }

    const markAttendance = async(event) => {
        console.log(subject)
        const objIndex = students.findIndex((obj => obj.id == event.target.value));
        if (event.target.checked) {  
            students[objIndex].lecturesAttended = students[objIndex].lecturesAttended + 1;
        } else {
            students[objIndex].lecturesAttended = students[objIndex].lecturesAttended - 1;
        }                                                         
    }

    const submitAttendance = async() => {
        if (takeAttendance && subject && term) {
              students.map( async (student) => {
                    const attendanceDocRef = doc(db, "attendance", student.id);
                    await updateDoc(attendanceDocRef, {
                        lecturesAttended: student.lecturesAttended,
                        totalLectures: increment(1)
                    });
              })
              getSubjectStudents({target: {value: subject}})
        }
        setTakeAttendance(!takeAttendance)
    }
    
    return (
        <div>
            <h2>{subject ? subject : "Attendance Board"}</h2>
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
                    onClick={submitAttendance}>
                    { takeAttendance ? "Submit" : "Take Attendance" }</Button>
            </div>
            <Table responsive="sm" className="mt-5">
                <thead>
                    <tr>
                        <th>Scholar No.</th>
                        <th>Student Name</th>
                        <th>Lectures Attended</th>
                        <th>Total Lectures</th>
                        <th>Percentage</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => {
                        return (
                            <tr>
                                <td>{ student.scholarNo }</td>
                                <td>{ student.name }</td>
                                <td>{ student.lecturesAttended }</td>
                                <td>{ student.totalLectures }</td>
                                <td>{ Math.round((student.lecturesAttended * 100) / student.totalLectures) }%</td>
                                <td>{ takeAttendance ? <input type="checkbox" name={student.name} value={student.id} onChange={markAttendance} /> : "" }</td>
                            </tr>                        
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}