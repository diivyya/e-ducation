/*
    ---------- Department Tab on Admin Portal Dashboard -------------
*/

import React, { useEffect, useState } from 'react';
import { db } from '../../firebase-config';
import { collection, doc, getDocs, deleteDoc, query, setDoc, where } from 'firebase/firestore';

import { Alert, Form, Button, Table, Row, Col } from "react-bootstrap";

import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit';

export default function DepartmentData() {
    const initialFormValues = {
        departmentId: '', budget: '', hod: '', name: ''
    }
    //setState for storing form values while creation or updation of any department
    const [formValues, setFormValues] = useState(initialFormValues);
    
    const [department, setDepartment] = useState([]);
    const [faculty, setFaculty] = useState([]);

    //Reference to collection in firestore
    const DepartmentCollectionRef = collection(db, "department")

    //States to open and close form and alert
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    //sets the values entered in form to to "formValues" state
    const set = name => {
        return ({ target: { value } }) => {
          setFormValues(oldValues => ({...oldValues, [name]: value }));
        }
    };
    
    //Creates a new department
    const createDepartment = async(event) => {
        event.preventDefault();
        if (openEditForm) {
            updateDepartment()
        } else {
            await setDoc(doc(db, "department", formValues.name), formValues);
            getDepartment()
            setShowCreateForm(false)
            setFormValues(initialFormValues)
            setShowAlert(true);
        }
    }

    //When we click on edit, it sets the form values to the values of the row and opens the form to update.
    const editDepartment = async(dept) => {
        getFaculty(dept)
        setShowCreateForm(false);
        setOpenEditForm(true);
        setFormValues(dept);
        setShowAlert(true);
    }

    //Update value of clicked department
    const updateDepartment = async() => {
        await setDoc(doc(db, "department", formValues.name), formValues);
        getDepartment()
        setOpenEditForm(false)
        setFormValues(initialFormValues)
        setShowAlert(true);
    }

    //Deletes the clicked department
    const deleteDepartment = async(id) => {
        const departmentDoc = doc(db, "department", id);
        await deleteDoc(departmentDoc);
        getDepartment()
    }

    //Get department data to display
    const getDepartment = async() => {
        const data = await getDocs(DepartmentCollectionRef)
        setDepartment(data.docs.map((doc) => (
            {...doc.data(), id: doc.id }
    )));
    }

    //Get faculty data for the HOD dropdown
    const getFaculty = async(dept) => {
        const q = query(collection(db, "faculty"), where("department", "==", dept.id));
        const querySnapshot = await getDocs(q);
        setFaculty(querySnapshot.docs.map((doc) => (
            { ...doc.data(), id: doc.id }
        )));
    }

    //Sets opening/closing of form
    const showOnClick = () => {
        setShowCreateForm(!showCreateForm)
        setOpenEditForm(false)
    }

    //Load all department data at the time of render
    useEffect(() => {
        getDepartment()
    }, [])
    
    return (
        <div>
            { showAlert ? 
                <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                    Department data updated successfully!!
                </Alert>
            : ""}
            <Button variant="outline-danger" className="mt-4 mb-4" onClick={showOnClick}>
                {(showCreateForm || openEditForm) ? "Close Form" : "Create new department"}</Button>
            {(showCreateForm || openEditForm) &&     
            <Form onSubmit={createDepartment}>
                <Row className="mb-5">
                    <Col>
                        <Form.Group id="id">
                            <Form.Label><b>ID</b></Form.Label>
                            <Form.Control style={{backgroundColor: "transparent"}}
                                value={formValues.departmentId} 
                                onChange={set('departmentId')}
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
                    <Col>
                        <Form.Group id="budget">
                            <Form.Label><b>Budget</b></Form.Label>
                            <Form.Control style={{backgroundColor: "transparent"}}
                                value={formValues.budget} 
                                onChange={set('budget')}
                                type="text" required />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-5" style={{maxWidth: "400px"}}>
                    <Col>
                    { openEditForm ?
                        <Form.Select style={{backgroundColor: "transparent"}} required
                            value={formValues.hod} 
                            onChange={set('hod')}>
                            <option>HOD</option>
                            {
                                faculty.map((fac) => {
                                    return (
                                        <option value={fac.name}>{fac.name}</option>
                                    )
                                })
                        }
                        </Form.Select>
                    :
                        <Form.Group id="id">
                            <Form.Label><b>HOD</b></Form.Label>
                            <Form.Control style={{backgroundColor: "transparent"}}
                                value={formValues.hod} 
                                onChange={set('hod')}
                                type="text" required />
                        </Form.Group>
                    }
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
                        <th>Head of Department</th>
                        <th>Budget</th>
                    </tr>
                </thead>
                <tbody>
                    {department.map((dept) => {
                        return (
                            <tr>
                                <td>{ dept.departmentId }</td>
                                <td>{ dept.id }</td>
                                <td>Prof. { dept.hod }</td>
                                <td>Rs. { dept.budget }</td>
                                <td><IconButton aria-label="delete"
                                    onClick={() => {deleteDepartment(dept.id)}}>
                                        <DeleteIcon />
                                    </IconButton>
                                </td>
                                <td><IconButton aria-label="edit"
                                    onClick={() => {editDepartment(dept)}}>
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