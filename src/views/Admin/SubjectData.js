/*
    ---------- Subjects Tab on Admin Portal Dashboard -------------
*/

import React, { useEffect, useState } from 'react';
import { db } from '../../firebase-config';
import { collection, doc, getDocs, deleteDoc, setDoc } from 'firebase/firestore';

import { Alert, Form, Button, Table, Row, Col } from "react-bootstrap";

import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'

export default function SubjectData() {
    const initialFormValues = {
        name: '', subjectId: '', totalLectures: '', department: '', totalLectures: 0
    }
    //setState for storing form values while creation or updation of any subject
    const [formValues, setFormValues] = useState(initialFormValues);
    
    //Reference to collections in firestore
    const DepartmentCollectionRef = collection(db, "department")
    const SubjectCollectionRef = collection(db, "subject")

    //States to store collection data
    const [department, setDepartment] = useState([]);
    const [subject, setSubject] = useState([]);

    //States to open and close form and alert
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    
    //sets the values entered in form to "formValues" state
    const set = name => {
        return ({ target: { value } }) => {
          setFormValues(oldValues => ({...oldValues, [name]: value }));
        }
      };

    //Creates new subject with formValues and store in firestore
    const createSubject = async(event) => {
        event.preventDefault();
        if (openEditForm) {
            updateSubject()
        } else {
            await setDoc(doc(db, "subject", formValues.name), formValues);
            getSubject()
            setShowCreateForm(false)
            setFormValues(initialFormValues)
        }
    }

    //When we click on edit, it sets the form values to the values of the row and opens the form to update.
    const editSubject = async(sub) => {
        setShowCreateForm(true);
        setOpenEditForm(true);
        setFormValues(sub);
    }

    //Updates the subject data when clicked update in form
    const updateSubject = async() => {
        await setDoc(doc(db, "subject", formValues.name), formValues);
        getSubject()
        setOpenEditForm(false)
        setFormValues(initialFormValues)
        setShowAlert(true);
    }

    //Deletes the subject row from firestore
    const deleteSubject = async(id) => {
        const subjectDoc = doc(db, "subject", id);
        await deleteDoc(subjectDoc);
        getSubject()
        setShowAlert(true);
    }

    //Fetches subjects from firestore
    const getSubject = async() => {
        const data = await getDocs(SubjectCollectionRef)
        setSubject(data.docs.map((doc) => (
            {...doc.data(), id: doc.id }
    )));
    }

    //Fetches departments from firestore
    const getDepartment = async() => {
        const data = await getDocs(DepartmentCollectionRef)
        setDepartment(data.docs.map((doc) => (
            {...doc.data(), id: doc.id }
    )));
    }
    
    //Sets opening and closing of form
    const showOnClick = () => {
        setShowCreateForm(!showCreateForm)
        setOpenEditForm(false)
        
        if(!showCreateForm) {
            setFormValues(initialFormValues);
        }
    }

    //Fetches all required collection data at the time of render from firestore
    useEffect(() => {
        getSubject()
        getDepartment()
    }, [])
    
    return (
        <div>
            { showAlert ? 
                <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                    Subject data updated successfully!!
                </Alert>
            : ""}
            <Button variant="outline-danger" className="mt-4 mb-4" onClick={showOnClick}>
                {(showCreateForm || openEditForm) ? "Close Form" : "Create new subject"}</Button>
            {(showCreateForm || openEditForm) &&    
            <Form onSubmit={createSubject}>
                <Row className="mb-5">
                    <Col>
                        <Form.Group id="id">
                            <Form.Label><b>ID</b></Form.Label>
                            <Form.Control style={{backgroundColor: "transparent"}}
                                value={formValues.subjectId} 
                                onChange={set('subjectId')}
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
                </Row>
                <Row className="mb-5">
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
                </Row>
                <Row className="mb-5">
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
                        <th>Department</th>
                        <th>Year</th>
                        <th>Total Lectures</th>
                    </tr>
                </thead>
                <tbody>
                    {subject.map((sub) => {
                        return (
                            <tr>
                                <td>{ sub.subjectId }</td>
                                <td>{ sub.name }</td>
                                <td>{ sub.department }</td>
                                <td>{ sub.year }</td>
                                <td>{ sub.totalLectures }</td>
                                <td><IconButton aria-label="delete"
                                    onClick={() => {deleteSubject(sub.id)}}>
                                        <DeleteIcon />
                                    </IconButton>
                                </td>
                                <td><IconButton aria-label="edit"
                                    onClick={() => {editSubject(sub)}}>
                                        <Edit />
                                    </IconButton>
                                </td>
                            </tr>                      
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}