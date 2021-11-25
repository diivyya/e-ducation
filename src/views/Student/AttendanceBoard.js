/*
    ---------- Attendance Board on Student Dashboard -------------
*/
import React, { useEffect, useState } from 'react';
import { db } from "../../firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";

import { Table } from "react-bootstrap";

export default function AttendanceBoard(props) {
    const [attendance, setAttendance] = useState([]);
    
    //Get attendance for a student id
    const getAttendanceData = async() => {
        const q = query(collection(db, "attendance"), where("email", "==", props.email));
        const querySnapshot = await getDocs(q);
        setAttendance(querySnapshot.docs.map((doc) => (
            {...doc.data(), id: doc.id }
        )));
    }

    useEffect(() => {
        getAttendanceData()
    }, [])

    return (
        <div>
            <h1>Attendance Board</h1>
            <Table responsive="sm" className="mt-5">
                <thead>
                    <tr>
                        <th>Subject ID</th>
                        <th>Subject Name</th>
                        <th>Lectures Attended</th>
                        <th>Total Lectures</th>
                        <th>Percentage</th>
                    </tr>
                </thead>
                <tbody>
                    {attendance.map((att) => {
                        return (
                            <tr>
                                <td>{ att.subjectId }</td>
                                <td>{ att.subjectName }</td>
                                <td>{ att.lecturesAttended }</td>
                                <td>{ att.totalLectures }</td>
                                <td>{ Math.round((att.lecturesAttended * 100) / att.totalLectures) }%</td>
                            </tr>                        
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}