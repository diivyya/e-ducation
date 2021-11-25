import React, { useEffect, useState } from 'react';
import { db } from '../../firebase-config';
import { collection, doc, getDocs, deleteDoc, query, setDoc, where } from 'firebase/firestore';
import { useAuth } from "../../contexts/AuthContext";

import { Alert, Form, Button, Table, Row, Col } from "react-bootstrap";

import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit';

export default function StudentData() {
    const initialFormValues = {
        name: '', email: '', scholarNo: '', year: '', phone: '', password: 'student123',
        department: '', gender: '', vaccinationStatus: '', dob: '', address: ''
    }
    const [formValues, setFormValues] = useState(initialFormValues);
    
    const DepartmentCollectionRef = collection(db, "department")
    const StudentCollectionRef = collection(db, "student")
    const [department, setDepartment] = useState([]);
    const [student, setStudent] = useState([]);

    const [showCreateForm, setShowCreateForm] = useState(false);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const { signup } = useAuth()

    const set = name => {
        return ({ target: { value } }) => {
          setFormValues(oldValues => ({...oldValues, [name]: value }));
        }
    };
    
    const createStudent = async(event) => {
        event.preventDefault();
        if (openEditForm) {
            updateStudent()
        } else {
            await setDoc(doc(db, "student", formValues.email), formValues);
            signup(formValues.email, formValues.password);
            /*
            const q = query(
                collection(db, "subject"),
                where("department", "==", formValues.department),
                where("year", "==", formValues.year)
                );
            const querySnapshot = await getDocs(q);
            const subjects = querySnapshot.docs.map((doc) => (
                {...doc.data(), id: doc.id }
            ));
            subjects.map(async(subject) => {
                await addDoc(collection(db, "marks"), {
                    name: formValues.name,
                    scholarNo: formValues.scholarNo,
                    email: formValues.email,
                    subjectId: subject.id,
                    subjectName: subject.name,
                    grades: {endTerm: null, midTerm: null, miniTest: null}
                });
                await addDoc(collection(db, "attendance"), {
                    name: formValues.name,
                    scholarNo: formValues.scholarNo,
                    email: formValues.email,
                    subjectId: subject.id,
                    subjectName: subject.name,
                    lecturesAttended: 0,
                    totalLectures: subject.totalLectures
                });
            })
            */
            getStudent()
            setShowCreateForm(false)
            setFormValues(initialFormValues)
            setShowAlert(true);
        }
    }

    
    const editStudent = async(stud) => {
        setShowCreateForm(false);
        setOpenEditForm(true);
        setFormValues(stud);
    }

    const updateStudent = async() => {
        await setDoc(doc(db, "student", formValues.email), formValues);
        getStudent()
        setOpenEditForm(false)
        setFormValues(initialFormValues)
        setShowAlert(true);
    }

    const getStudent = async() => {
        const data = await getDocs(StudentCollectionRef)
        setStudent(data.docs.map((doc) => (
            {...doc.data(), id: doc.id }
    )));
    }

    const deleteStudent = async(student) => {
        const studentDoc = doc(db, "student", student.id);
        await deleteDoc(studentDoc);
        /*
        const q1 = query(
            collection(db, "attendance"),
            where("email", "==", student.email),
        );
        await deleteDoc(q1);
        const q2 = query(
            collection(db, "grades"),
            where("email", "==", student.email),
        );
        await deleteDoc(q2);
        */
        getStudent()
        setShowAlert(true);
    }
    
    const showOnClick = () => {
        setShowCreateForm(!showCreateForm)
        setOpenEditForm(false)
    }

    const getDepartment = async() => {
        const data = await getDocs(DepartmentCollectionRef)
        setDepartment(data.docs.map((doc) => (
            {...doc.data(), id: doc.id }
    )));
    }

    useEffect(() => {
        getStudent()
        getDepartment()
    }, [])

    return (
        <div>
            { showAlert ? 
                <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                    Student data updated successfully!!
                </Alert>
            : ""}
            <Button variant="outline-danger" className="mt-4 mb-4" onClick={showOnClick}>
                {(showCreateForm || openEditForm) ? "Close Form" : "Create new student"}</Button>
                {(showCreateForm || openEditForm) &&   
            <Form onSubmit={createStudent}>
                <Row  className="mb-5">
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
                        <Form.Group id="email">
                            <Form.Label><b>Email ID</b></Form.Label>
                            <Form.Control style={{backgroundColor: "transparent"}}
                                value={formValues.email} 
                                onChange={set('email')}
                                type="email" required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group id="id">
                            <Form.Label><b>Scholar No</b></Form.Label>
                            <Form.Control style={{backgroundColor: "transparent"}}
                                value={formValues.scholarNo} 
                                onChange={set('scholarNo')}
                                type="text" required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group id="phone">
                            <Form.Label><b>Contact no</b></Form.Label>
                            <Form.Control style={{backgroundColor: "transparent"}}
                                value={formValues.phone} 
                                onChange={set('phone')}
                                type="text" required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group id="address">
                            <Form.Label><b>Address</b></Form.Label>
                            <Form.Control style={{backgroundColor: "transparent"}}
                                value={formValues.address} 
                                onChange={set('address')}
                                type="text" required />
                        </Form.Group>
                    </Col>
                </Row>
                <Row  className="mb-5">
                    <Col>
                        <Form.Select style={{backgroundColor: "transparent"}} required
                            value={formValues.department} 
                            onChange={set('department')}>
                            <option>Department</option>
                            {
                                department.map((dept) => {
                                    return (
                                        <option value={dept.id}>{dept.id}</option>
                                    )
                                })
                            }
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Select style={{backgroundColor: "transparent"}} required
                            value={formValues.year} 
                            onChange={set('year')}>
                            <option>Year</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Select style={{backgroundColor: "transparent"}} required
                            value={formValues.gender} 
                            onChange={set('gender')}>
                            <option>Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Select style={{backgroundColor: "transparent"}} label="Vaccination Status" required
                            value={formValues.vaccinationStatus} 
                            onChange={set('vaccinationStatus')}>
                            <option>Vaccination Status</option>
                            <option value="Fully Vaccinated">Fully Vaccinated</option>
                            <option value="Partially Vaccinated">Partially Vaccinated</option>
                            <option value="Not Vaccinated">Not Vaccinated</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Control type="date" style={{backgroundColor: "transparent"}}
                            value={formValues.dob} 
                            onChange={set('dob')} required/>
                    </Col>
                </Row>    
                <Row  className="mb-5">
                    <Col>
                        <Button variant="outline-dark" type="submit">{ openEditForm ? "Update" : "Create" }</Button>
                    </Col>
                </Row>
            </Form>    
        }
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Year</th>
                        <th>Department</th>
                        <th>Email ID</th>
                        <th>Contact No.</th>
                        <th>Date of Birth</th>
                        <th>Gender</th>
                        <th>Address</th>
                        <th>Vaccination Status</th>
                    </tr>
                </thead>
                <tbody>
                    {student.map((stud) => {
                        return (
                            <tr>
                                <td>{ stud.scholarNo }</td>
                                <td>{ stud.name }</td>
                                <td>{ stud.year }</td>
                                <td>{ stud.department }</td>
                                <td>{ stud.email }</td>
                                <td>{ stud.phone }</td>
                                <td>{ stud.dob }</td>
                                <td>{ stud.gender }</td>
                                <td>{ stud.address }</td>
                                <td>{ stud.vaccinationStatus }</td>
                                <td><IconButton aria-label="delete"
                                    onClick={() => {deleteStudent(stud)}}>
                                        <DeleteIcon />
                                    </IconButton>
                                </td>
                                <td><IconButton aria-label="edit"
                                    onClick={() => {editStudent(stud)}}>
                                        <Edit />
                                    </IconButton>
                                </td>
                            </tr>                        
                        )
                    })}
                </tbody>
            </Table>
        </div>
    );
}