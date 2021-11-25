/*
    ---------- Grades Tab on Student Dashboard -------------
*/
import React, { useEffect, useState } from 'react';
import { db } from "../../firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";

import { Table } from "react-bootstrap";

export default function GradesBoard(props) {
    const [grades, setGrades] = useState([]);
    
    //Get all grades for a particular student
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
                        <th>Subject ID</th>
                        <th>Subject Name</th>
                        <th>Mini Test</th>
                        <th>Mid Term</th>
                        <th>End Term</th>
                    </tr>
                </thead>
                <tbody>
                    {grades.map((grade) => {
                        return (
                            <tr>
                                <td>{ grade.subjectId }</td>
                                <td>{ grade.subjectName }</td>
                                <td>{ grade.grades.miniTest } / 10</td>
                                <td>{ grade.grades.midTerm } / 20</td>
                                <td>{ grade.grades.endTerm } / 60</td>
                            </tr>                        
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}