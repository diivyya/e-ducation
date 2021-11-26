/*
    ---------- Profile Page on Student Portal Dashboard -------------
*/

import React from "react";
import { Button, Form, Col, Row } from "react-bootstrap";

import classNames from "classnames";

import { makeStyles } from "@material-ui/core/styles";

import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";

import { AvatarGenerator } from 'random-avatar-generator';

import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

export default function ProfilePage (props) {

  const studentProfile = props.profile;
  
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const generator = new AvatarGenerator();
  const image = generator.generateRandomAvatar();

  return (
    <div>
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
                    <img src={image} alt="..." className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{ studentProfile.name }</h3>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <Form className="mt-5 mb-5 p-5">
                <Row  className="mb-5">
                  <Col>
                    <Form.Group id="id">
                      <Form.Label><b>Scholar No</b></Form.Label>
                      <Form.Control style={{backgroundColor: "transparent"}}
                        value={studentProfile.scholarNo}
                        type="text" disabled />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group id="email" className="pl-3 pr-3">
                      <Form.Label><b>Email ID</b></Form.Label>
                      <Form.Control style={{backgroundColor: "transparent"}}
                        value={studentProfile.email}
                        type="email" disabled />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-5">
                  <Col>
                    <Form.Group id="department">
                      <Form.Label><b>Department</b></Form.Label>
                      <Form.Control style={{backgroundColor: "transparent"}}
                        value={studentProfile.department}
                        type="text" disabled />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group id="year">
                      <Form.Label><b>Year</b></Form.Label>
                      <Form.Control style={{backgroundColor: "transparent"}}
                        value={studentProfile.year}
                        type="text" disabled />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-5">
                  <Col>
                    <Form.Group id="dob">
                      <Form.Label><b>Date of Birth</b></Form.Label>
                      <Form.Control style={{backgroundColor: "transparent"}}
                        value={studentProfile.dob}
                        type="text" disabled />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group id="gender">
                      <Form.Label><b>Gender</b></Form.Label>
                      <Form.Control style={{backgroundColor: "transparent"}}
                        value={studentProfile.gender}
                        type="text" disabled />
                    </Form.Group>
                  </Col>
                </Row>
                  <Row  className="mb-5">
                    <Col>
                        <Form.Group id="phone">
                            <Form.Label><b>Contact no</b></Form.Label>
                            <Form.Control 
                                onChange={(event) => {
                                    setNewPhone(event.target.value);
                                }}
                                type="text" value={studentProfile.phone} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group id="address">
                            <Form.Label><b>Address</b></Form.Label>
                            <Form.Control style={{backgroundColor: "transparent"}}
                                onChange={(event) => {
                                    setNewAddress(event.target.value);
                                }}
                                type="text" value={studentProfile.address} />
                        </Form.Group>
                    </Col>
                  </Row>
                  <Row  className="mb-5">
                    <Col>
                      <Form.Group id="vaccinationStatus">
                        <Form.Label><b>Vaccination Status</b></Form.Label>
                        <Form.Select style={{backgroundColor: "transparent"}} label="Vaccination Status"
                          value={studentProfile.vaccinationStatus}
                          onChange={(event) => setNewVaccinationStatus(event.target.value)}>
                          <option>Vaccination Status</option>
                          <option value="Fully Vaccinated">Fully Vaccinated</option>
                          <option value="Partially Vaccinated">Partially Vaccinated</option>
                          <option value="Not Vaccinated">Not Vaccinated</option>
                        </Form.Select>
                      </Form.Group>
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
