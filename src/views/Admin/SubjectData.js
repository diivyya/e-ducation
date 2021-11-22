import React, { useEffect, useState } from 'react';
import { db } from '../../firebase-config';
import { collection, doc, getDocs, deleteDoc, query, setDoc, where } from 'firebase/firestore';

import { Form, Button, Table, Row, Col } from "react-bootstrap";

import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'

export default function SubjectData() {
    const initialFormValues = {
        name: '', subjectId: '', totalLectures: '', department: '', totalLectures: 0
    }
    const [formValues, setFormValues] = useState(initialFormValues);
    
    const DepartmentCollectionRef = collection(db, "department")
    const SubjectCollectionRef = collection(db, "subject")
    const [department, setDepartment] = useState([]);
    const [subject, setSubject] = useState([]);

    const [showCreateForm, setShowCreateForm] = useState(false);
    const [openEditForm, setOpenEditForm] = useState(false);
    
    const set = name => {
        return ({ target: { value } }) => {
          setFormValues(oldValues => ({...oldValues, [name]: value }));
        }
      };

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
    
    const editSubject = async(sub) => {
        setShowCreateForm(false);
        setOpenEditForm(true);
        setFormValues(sub);
    }

    const updateSubject = async() => {
        await setDoc(doc(db, "subject", formValues.name), formValues);
        getSubject()
        setOpenEditForm(false)
        setFormValues(initialFormValues)
    }


    const deleteSubject = async(id) => {
        const subjectDoc = doc(db, "subject", id);
        await deleteDoc(subjectDoc);
        getSubject()
    }

    const getSubject = async() => {
        const data = await getDocs(SubjectCollectionRef)
        setSubject(data.docs.map((doc) => (
            {...doc.data(), id: doc.id }
    )));
    }

    const getDepartment = async() => {
        const data = await getDocs(DepartmentCollectionRef)
        setDepartment(data.docs.map((doc) => (
            {...doc.data(), id: doc.id }
    )));
    }
    
    const showOnClick = () => {
        setShowCreateForm(!showCreateForm)
        setOpenEditForm(false)
    }

    useEffect(() => {
        getSubject()
        getDepartment()
    }, [])
    
    return (
        <div>
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
                        )
                    })}
                </tbody>
            </Table>
        </div>
    );
}