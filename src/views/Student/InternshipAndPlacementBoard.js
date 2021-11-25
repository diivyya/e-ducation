/*
    ---------- Internship and Placement Tab on E-Task in Student Dashboard -------------
*/
import React, { useState, useEffect } from 'react';
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";

import { Alert, Button, Card } from "react-bootstrap";

export default function Assessments (props) {
    const profile = props.profile

    const [internships, setInternships] = useState([]);
    const [placements, setPlacements] = useState([]);
    const [showSuccesAlert, setShowSuccesAlert] = useState(false);

    const PlacementCollectionRef = collection(db, "placement")
    const InternshipCollectionRef = collection(db, "internship")

    //Fetch all internship and placement data
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

    //Authorize apply to only those who are eligible
    const checkEligibility = (company, isPlacement) => {
        if (company.eligibleBranches.includes(profile.department)) {
            if ((isPlacement && profile.year == "4") || (!isPlacement && profile.year == "3")) {
                return true;
            }
        }
        return false
    }

    useEffect(() => {
        getInternshipAndPlacement()
    }, [])

    return (
        <div>
            { showSuccesAlert ? 
                <Alert variant="success" onClose={() => setShowSuccesAlert(false)} dismissible>
                   Registration done successfully!!
                </Alert>
            : ""}
            <div>
                {
                    internships.map((internship) => {
                        return (
                            <Card border="dark" style={{backgroundColor: "transparent", boxShadow: "0px 0px 10px grey"}} className="m-4">
                                <Card.Header><b>Internship: { internship.tenure } weeks</b></Card.Header>
                                <Card.Body>
                                    <Card.Title>{ internship.name }</Card.Title>
                                    <Card.Text>
                                        Stipend: Rs. { internship.stipend } per month<br />
                                        CGPA Criteria: { internship.cgpa }<br />
                                        Eligible Branches: { internship.eligibleBranches.join(", ") }
                                        { checkEligibility(internship, false) ?
                                            <Button className="float-end" variant="outline-dark" href={ internship.registrationLink } >Apply</Button>
                                            : 
                                            <Button className="float-end" variant="outline-danger" disabled>Not Eligible</Button>
                                        }
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        );
                    })
                }
                {
                    placements.map((placement) => {
                        return (
                            <Card border="dark" style={{backgroundColor: "transparent", boxShadow: "0px 0px 10px grey"}} className="m-4">
                                <Card.Header><b>Placement</b></Card.Header>
                                <Card.Body>
                                    <Card.Title>{ placement.name }</Card.Title>
                                    <Card.Text>
                                        Package: Rs. { placement.package } per annum<br />
                                        CGPA Criteria: { placement.cgpa }<br />
                                        Eligible Branches: { placement.eligibleBranches.join(", ") }
                                        { checkEligibility(placement, true) ?
                                            <Button className="float-end" variant="outline-dark" href={ placement.registrationLink } >Apply</Button>
                                            : 
                                            <Button className="float-end" variant="outline-danger" disabled>Not Eligible</Button>
                                        }
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        );
                    })
                }
            </div>
        </div>
    )
}