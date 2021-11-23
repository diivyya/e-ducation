import React, { useEffect, useState } from 'react';
import { db } from '../../firebase-config';
import { collection, doc, getDocs, deleteDoc, setDoc } from 'firebase/firestore';

import { Form, Button, Table, Row, Col } from "react-bootstrap";

import Multiselect from 'multiselect-react-dropdown';

import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit';

export default function InternshipAndPlacement() {
    const initialFormValues = {
        name: '', eligibleBranches: [], cgpa: '', package: '', poc: '', tenure: '', jobType: ''
    }
    const [formValues, setFormValues] = useState(initialFormValues);
    
    const [department, setDepartment] = useState([]);
    const [internships, setInternships] = useState([]);
    const [placements, setPlacements] = useState([]);
    const DepartmentCollectionRef = collection(db, "department")
    const InternshipCollectionRef = collection(db, "internship")
    const PlacementCollectionRef = collection(db, "placement")

    const [showCreateForm, setShowCreateForm] = useState(false);
    const [openEditForm, setOpenEditForm] = useState(false);

    const set = name => {
        return ({ target: { value } }) => {
          setFormValues(oldValues => ({...oldValues, [name]: value }));
        }
    };

    const setEligibleBranches = (event) => {
        setFormValues(oldValues => ({...oldValues, ["eligibleBranches"]: event.map((e) => e.id) }))
    }

    const editInternshipOrPlacement = async(placementOrInternship) => {
        setShowCreateForm(false);
        setOpenEditForm(true);
        setFormValues(placementOrInternship);
    }

    const updateInternshipOrPlacement = async(event) => {
        event.preventDefault();
        if (formValues.jobType === "Internship") {
            await setDoc(doc(db, "internship", formValues.name),
                {name: formValues.name, eligibleBranches: formValues.eligibleBranches, cgpa: formValues.cgpa, stipend: formValues.package, poc: formValues.poc, tenure: formValues.tenure});
        } else if (formValues.jobType === "Placement") {
            await setDoc(doc(db, "placement", formValues.name),
                {name: formValues.name, eligibleBranches: formValues.eligibleBranches, cgpa: formValues.cgpa, package: formValues.package, poc: formValues.poc});
        }
        getInternshipAndPlacement()
        setOpenEditForm(false)
        setShowCreateForm(false)
        setFormValues(initialFormValues)
    }

    const deleteInternshipOrPlacement = async(id, isPlacement) => {
        if (isPlacement) {
            const placementDoc = doc(db, "placement", id);
            await deleteDoc(placementDoc);
        } else {
            const internshipDoc = doc(db, "internship", id);
            await deleteDoc(internshipDoc);
        }
        getInternshipAndPlacement()
    }

    const getInternshipAndPlacement = async() => {
        const data1 = await getDocs(PlacementCollectionRef)
        setPlacements(data1.docs.map((doc) => (
            {...doc.data(), id: doc.id }
        )));
        const data2 = await getDocs(InternshipCollectionRef)
        setInternships(data2.docs.map((doc) => (
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
        getInternshipAndPlacement()
        getDepartment()
    }, [])
    
    return (
        <div>
            <Button variant="outline-danger" className="mt-4 mb-4" onClick={showOnClick}>
                {(showCreateForm || openEditForm) ? "Close Form" : "Create"}</Button>
            {(showCreateForm || openEditForm) &&     
            <Form onSubmit={updateInternshipOrPlacement}>
                <Row className="mb-5">
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
                        <Form.Group id="package">
                            <Form.Label><b>Package</b></Form.Label>
                            <Form.Control style={{backgroundColor: "transparent"}}
                                value={formValues.package} 
                                onChange={set('package')}
                                type="text" required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group id="jobType">
                        <Form.Label><b>Job Type</b></Form.Label>
                            <Form.Select style={{backgroundColor: "transparent"}} required
                                value={formValues.jobType} 
                                onChange={set('jobType')}>
                                <option>Job Type</option>
                                <option value="Internship">Internship</option>
                                <option value="Placement">Placement</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group id="cgpa">
                            <Form.Label><b>CGPA Criteria</b></Form.Label>
                            <Form.Control style={{backgroundColor: "transparent"}}
                                value={formValues.cgpa} 
                                onChange={set('cgpa')}
                                type="text" required />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-5">
                    <Col>
                        <Form.Group id="tenure">
                            <Form.Label><b>Tenure</b></Form.Label>
                            <Form.Control style={{backgroundColor: "transparent"}}
                                value={formValues.tenure} 
                                onChange={set('tenure')}
                                type="text" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group id="id">
                            <Form.Label><b>Eligible Branches</b></Form.Label>
                            <Multiselect
                                required
                                options={department}
                                displayValue="id"
                                onSelect={setEligibleBranches}
                                onRemove={setEligibleBranches}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group id="id">
                            <Form.Label><b>PoC</b></Form.Label>
                            <Form.Control style={{backgroundColor: "transparent"}}
                                value={formValues.poc} 
                                onChange={set('poc')}
                                type="text" required />
                        </Form.Group>
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
                        <th>Name</th>
                        <th>Package/Stipend</th>
                        <th>Tenure</th>
                        <th>CGPA Criteria</th>
                        <th>Eligible Branches</th>
                        <th>PoC</th>
                    </tr>
                </thead>
                <tbody>
                    {placements.map((placement) => {
                        return (
                            <tr>
                                <td>{ placement.id }</td>
                                <td>Rs. { placement.package } PA</td>
                                <td>-</td>
                                <td>{ placement.cgpa }</td>
                                <td>{ placement.eligibleBranches.join(", ") }</td>
                                <td>{ placement.poc }</td>
                                <td><IconButton aria-label="delete"
                                    onClick={() => {deleteInternshipOrPlacement(placement.id, true)}}>
                                        <DeleteIcon />
                                    </IconButton>
                                </td>
                                <td><IconButton aria-label="edit"
                                    onClick={() => {editInternshipOrPlacement(placement)}}>
                                        <Edit />
                                    </IconButton>
                                </td>
                            </tr>                        
                        )
                    })}
                    {internships.map((internship) => {
                        return (
                            <tr>
                                <td>{ internship.id }</td>
                                <td>Rs. { internship.stipend } per month</td>
                                <td>{ internship.tenure } weeks</td>
                                <td>{ internship.cgpa }</td>
                                <td>{ internship.eligibleBranches.join(", ") }</td>
                                <td>{ internship.poc }</td>
                                <td><IconButton aria-label="delete"
                                    onClick={() => {deleteInternshipOrPlacement(internship.id, false)}}>
                                        <DeleteIcon />
                                    </IconButton>
                                </td>
                                <td><IconButton aria-label="edit"
                                    onClick={() => {editInternshipOrPlacement(internship)}}>
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