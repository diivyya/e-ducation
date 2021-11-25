/*
    ---------- Profile Page on Faculty Portal Dashboard -------------
*/

import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { collection, where, getDocs, query } from "firebase/firestore";

import { Button, Form, Col, Row } from "react-bootstrap";

import classNames from "classnames";

import { makeStyles } from "@material-ui/core/styles";

import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";

import profile from "assets/img/profile.png";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {

  const facultyProfile = props.profile;

  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  
  return (
    <div style={{width: "1220px", margin:"auto"}}>
      <Parallax
        small
        filter
        image={require("assets/img/profile-bg.jpg").default}
      />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img src={profile} alt="..." className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{ facultyProfile.name }</h3>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <Form className="mt-5 mb-5 p-5">
                <Row className="mb-5">
                    <Col>
                        <Form.Group id="designation">
                            <Form.Label><b>Designation</b></Form.Label>
                            <Form.Control style={{backgroundColor: "transparent"}}
                                value={facultyProfile.designation}
                                type="text" disabled />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group id="email">
                            <Form.Label><b>Email ID</b></Form.Label>
                            <Form.Control style={{backgroundColor: "transparent"}}
                                value={facultyProfile.email}
                                type="email" disabled />
                            </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-5">
                    <Col>
                        <Form.Group id="id">
                            <Form.Label><b>ID</b></Form.Label>
                            <Form.Control style={{backgroundColor: "transparent"}}
                                value={facultyProfile.facultyId}
                                type="text" disabled />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group id="department">
                            <Form.Label><b>Department</b></Form.Label>
                            <Form.Control style={{backgroundColor: "transparent"}}
                                value={facultyProfile.department}
                                type="text" disabled />
                            </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-5">
                    <Col>
                        <Form.Group id="gender">
                            <Form.Label><b>Gender</b></Form.Label>
                            <Form.Control style={{backgroundColor: "transparent"}}
                                value={facultyProfile.gender}
                                type="text" disabled />
                            </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group id="dob">
                            <Form.Label><b>Date of Birth</b></Form.Label>
                            <Form.Control style={{backgroundColor: "transparent"}}
                                value={facultyProfile.dob}
                                type="text" disabled />
                            </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-5">
                    <Col>
                        <Form.Group id="phone">
                            <Form.Label><b>Contact no</b></Form.Label>
                            <Form.Control style={{backgroundColor: "transparent"}}
                                onChange={(event) => setNewPhone(event.target.value)}
                                value={facultyProfile.phone}
                                type="text" />
                        </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group id="vaccinationStatus">
                        <Form.Label><b>Vaccination Status</b></Form.Label>
                        <Form.Select style={{backgroundColor: "transparent"}} label="Vaccination Status"
                            value={facultyProfile.vaccinationStatus} 
                            onChange={(event) => setNewVaccinationStatus(event.target.value)}>
                            <option>Vaccination Status</option>
                            <option value="Fully Vaccinated">Fully Vaccinated</option>
                            <option value="Partially Vaccinated">Partially Vaccinated</option>
                            <option value="Not Vaccinated">Not Vaccinated</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
              </Row>
              <Row className="mb-5">
                    <Col>
                        <Button variant="outline-dark" type="submit">Edit</Button>
                    </Col>
                </Row>
            </Form> 
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
