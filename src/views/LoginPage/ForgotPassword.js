import React, { useRef, useState } from 'react';

import { makeStyles } from "@material-ui/core/styles";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";

import { Alert, Form } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

export default function ForgotPassword(props) {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('')
    const [cardAnimaton, setCardAnimation] = useState("cardHidden");

    setTimeout(function () {
        setCardAnimation("");
      }, 700);
    
    const classes = useStyles();
    const { ...rest } = props;
    
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions')
        } catch {
            setError('Failed to reset!')
        }
        setLoading(false)
    }
    return (
        <div>
            <Header
                absolute
                color="transparent"
                brand="E-ducation"
                rightLinks={<HeaderLinks />}
                {...rest}
            />
            <div
                className={classes.pageHeader}
                style={{
                    backgroundImage: "url(" + image + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "top center",
                    boxShadow: "0px 0px 10px 10px grey"
                }}
            >
                <div className={classes.container}>
                    <GridContainer justify="center">
                        <GridItem xs={14} sm={14} md={6}>
                            <Card className={classes[cardAnimaton]}>
                                <Form onSubmit={handleSubmit}>
                                    <CardHeader color="primary" className={classes.cardHeader}>
                                        <h4>Reset Password</h4>
                                    </CardHeader>
                                    <CardBody>
                                        {error && <Alert variant="danger">{error}</Alert>}
                                        {message && <Alert variant="success">{message}</Alert>}
                                        <Form.Group id="email">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" ref={emailRef} required />
                                        </Form.Group> 
                                    </CardBody>
                                    <CardFooter className={classes.cardFooter}>
                                        <Button disabled={loading} type="submit" simple color="primary" size="lg">
                                            Reset
                                        </Button>
                                    </CardFooter>
                                </Form>
                                <div className="w-100 text-center mb-4">
                                    <Link to="/login-page">Login</Link>
                                </div>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
            <Footer whiteFont />
        </div>
    </div>
  );
}
