/*
    ---------- Admin Portal Dashboard -------------
*/

import React, { useState, useEffect } from "react";
import FacultyData from "./FacultyData";
import StudentData from "./StudentData";
import DepartmentData from "./DepartmentData";
import SubjectData from "./SubjectData";
import InternshipAndPlacement from "./InternshipAndPlacement";
import Footer from "components/Footer/Footer.js";

import { makeStyles } from "@material-ui/core/styles";
import CustomTabs from "components/CustomTabs/CustomTabs.js";

import { Button, Container } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

const useStyles = makeStyles(styles);


//Returns tabs: Student, Faculty, Department, Subjects, InternshipAndPlacementCell
export default function AdminDashboard(props) {
    const history = useHistory();
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();

    const classes = useStyles();
    const { ...rest } = props;

    //function: Logout and return to homepage
    async function handleLogout() {
        setError("");
        try {
            await logout();
            history.push("");
        } catch {
            setError("Failed to log out");
        }
    }

    //If there is no authorized login to "/admin", return to homepage
    useEffect(() => {
      if(currentUser===null){
        history.push("/login-page")
      }
    },[])

    return (
        <div style={{minHeight:"100vh"}}>
            <Container>
                <CustomTabs
                plainTabs
                headerColor="danger"
                tabs={[
                  {
                    tabName: "Faculty",
                    tabContent: (
                      <p className={classes.textCenter}>
                        <FacultyData />
                      </p>
                    ),
                  },
                  {
                    tabName: "Student",
                    tabContent: (
                      <p className={classes.textCenter}>
                        <StudentData />
                      </p>
                    ),
                  },
                  {
                    tabName: "Department",
                    tabContent: (
                      <p className={classes.textCenter}>
                        <DepartmentData />
                      </p>
                    ),
                  },
                  {
                    tabName: "Subjects",
                    tabContent: (
                      <p className={classes.textCenter}>
                        <SubjectData />
                      </p>
                    ),
                  },
                  {
                    tabName: "Internship And Placement",
                    tabContent: (
                      <p className={classes.textCenter}>
                        <InternshipAndPlacement />
                      </p>
                    ),
                  },
                  {
                    tabName:<Button
                                variant = "light"
                                style={{
                                    backgroundColor: "transparent",
                                    borderColor: "transparent",
                                    color: "white",
                                    fontSize: "12px"
                                }}
                                onClick={handleLogout}>
                                    <b>LOG OUT</b>
                            </Button>
                  },
                ]}
              />
            </Container>
            <Footer />
        </div>
    )
}
