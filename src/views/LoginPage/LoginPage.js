/*
    ---------- Generic Log In page for Admin, Faculty and Student -------------
*/
import React, { useRef, useState, useEffect } from "react";

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
import { useLocation } from "react-router"

import { Alert, Form } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { db } from "../../firebase-config";
import { doc, getDoc } from "firebase/firestore";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  const location = useLocation();

  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  const classes = useStyles();
  const { ...rest } = props;

  //Whatever Log in role selected on home-page is set to login into app, if password fails or role is different then it gives corresponding error
  async function handleSubmit(e) {
    e.preventDefault();
    try {
        setError("");
        setLoading(true);
        await login(emailRef.current.value, passwordRef.current.value);
        const userDoc = doc(db, location.state.val, emailRef.current.value)
        const docSnap = await getDoc(userDoc);
        if(docSnap.exists()) history.push("/"+location.state.val);
        else setError("You are not "+location.state.val);
    } catch {
        setError("Failed to Log In");
    }
    setLoading(false);
  }

  useEffect(() => {
    if(!location) history.push("/"); 
  }, [])

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
            <GridItem xs={16} sm={16} md={6}>
              <Card className={classes[cardAnimaton]}>
                <Form onSubmit={handleSubmit}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>{location.state ? location.state.val.toUpperCase(): "Admin"} LOG IN</h4>
                  </CardHeader>
                  <CardBody>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form.Group id="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password" className="mt-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>    
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button disabled={loading} type="submit" simple color="primary" size="lg">
                      Log In
                    </Button>
                  </CardFooter>
                </Form>
                <div className="w-100 text-center mb-4">
                    <Link to="/forgot-password">Forgot Password?</Link>
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
