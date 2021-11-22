import React, { useEffect, useState } from 'react';
import { db } from "../../firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";

import { Table } from "react-bootstrap";

export default function GradesBoard(props) {
    const [grades, setGrades] = useState([]);
    
    const getGradesData = async() => {
        const q = query(collection(db, "marks"), where("email", "==", props.email));
        const querySnapshot = await getDocs(q);
        setGrades(querySnapshot.docs.map((doc) => (
            {...doc.data(), id: doc.id }
        )));
    }

    useEffect(() => {
        getGradesData()
    }, [])

    return (
        <div>
            <h1>Grades Board</h1>
            <Table responsive="sm" className="mt-5">
                <thead>
                    <tr>
                        <th>Term</th>
                        <th>Subject ID</th>
                        <th>Subject Name</th>
                        <th>Marks Obtained</th>
                        <th>Total Marks</th>
                    </tr>
                </thead>
                <tbody>
                    {grades.map((grade) => {
                        return (
                            <tr>
                                <td>{ grade.term }</td>
                                <td>{ grade.subjectId }</td>
                                <td>{ grade.subjectName }</td>
                                <td>{ grade.marksObtained }</td>
                                <td>{ grade.totalMarks }</td>
                            </tr>                        
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}