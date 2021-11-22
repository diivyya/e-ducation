import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Dashboard from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";
import List from "@material-ui/icons/List";
import Face from "@material-ui/icons/Face";
import GraphicEqOutlined from '@material-ui/icons/GraphicEqOutlined';
import GradeOutlined from '@material-ui/icons/GradeOutlined';
import LockOpenOutlined from '@material-ui/icons/LockOpenOutlined';
import ChatBubbleOutlined from '@material-ui/icons/ChatBubbleOutlined';

import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import NavPills from "components/NavPills/NavPills";
import ProfilePage from "./ProfilePage";
import AttendanceBoard from "./AttendanceBoard";
import ETaskBoard from "./ETaskBoard";
import GradesBoard from "./GradesBoard";

const useStyles = makeStyles(styles);

export default function StudentDashboard(props) {
    const history = useHistory();
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();

    const classes = useStyles();
    const { ...rest } = props;

    async function handleLogout() {
        setError("");
        try {
            await logout();
            history.push("");
        } catch {
            setError("Failed to log out");
        }
    }
    return (
        <div>
            <NavPills
                color="primary"
                horizontal={{
                    tabsGrid: { xs: 7, sm: 2, md: 2 },
                    contentGrid: { xs: 12, sm: 8, md: 8 },
                  }}
                tabs={[
                    {
                        tabButton: "Profile",
                        tabIcon: Face,
                        tabContent: (
                            <ProfilePage email={currentUser ? currentUser.email: null} />
                        ),
                    },
                    {
                        tabButton: "E-Task",
                        tabIcon: Dashboard,
                        tabContent: (
                            <ETaskBoard />
                        ),
                    },
                    /*
                    {
                        tabButton: "Schedule",
                        tabIcon: Schedule,
                        tabContent: (
                        <h1>Schedule</h1>
                        ),
                    },
                */
                    {
                        tabButton: "Attendance",
                        tabIcon: GraphicEqOutlined,
                        tabContent: (
                            <AttendanceBoard email = {currentUser ? currentUser.email: null} />
                        ),
                    },
                    {
                        tabButton: "Grades",
                        tabIcon: GradeOutlined,
                        tabContent: (
                            <GradesBoard email = {currentUser ? currentUser.email: null} />
                        ),
                    },
                    {
                        tabButton: <button style={{backgroundColor: "transparent",
                        borderColor: "transparent", color: "black"}}
                        onClick={handleLogout}>LOG OUT</button>,
                        tabIcon: LockOpenOutlined,
                        tabContent: (
                        <h1>Exams</h1>
                        ),
                    },
                    {
                        tabButton: "Chat",
                        tabIcon: ChatBubbleOutlined,
                        tabContent: (
                            ""
                        ),
                    },
                ]}
              />
        </div>
    )
}
