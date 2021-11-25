/*
    ---------- Faculty Portal Dashboard -------------
*/

import React, { useState, useEffect } from "react";

import Dashboard from "@material-ui/icons/Dashboard";
import Face from "@material-ui/icons/Face";
import GraphicEqOutlined from '@material-ui/icons/GraphicEqOutlined';
import GradeOutlined from '@material-ui/icons/GradeOutlined';
import LockOpenOutlined from '@material-ui/icons/LockOpenOutlined';

import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { db } from "../../firebase-config";
import { collection, where, getDocs, query } from "firebase/firestore";

import NavPills from "components/NavPills/NavPills";
import ProfilePage from "./ProfilePage";
import AttendanceBoard from "./AttendanceBoard";
import ETaskBoard from "./ETaskBoard";
import GradesBoard from "./GradesBoard";

export default function FacultyDashboard() {
    const history = useHistory();
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();

    const [facultyProfile, setFacultyProfile] = useState({})

    //Get the profile of faculty by using current user session id
    const getProfile = async () => {
        const q = query(collection(db, "faculty"), where("email", "==", currentUser.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.docs.map((doc) => (
          setFacultyProfile({...doc.data(), id: doc.id })
        ));
    }

    //Logout and returns to the homepage
    async function handleLogout() {
        setError("");
        try {
            await logout();
            history.push("");
        } catch {
            setError("Failed to log out");
        }
    }

    //Fetch profile of faculty when page renders
    useEffect(() => {
        getProfile()
    }, [])

    //All the tabs on Dashboard
    return (
        <div>
            <NavPills
                color="info"
                horizontal={{
                    tabsGrid: { xs: 7, sm: 2, md: 2 },
                    contentGrid: { xs: 12, sm: 8, md: 8 },
                  }}
                tabs={[
                    {
                        tabButton: "Profile",
                        tabIcon: Face,
                        tabContent: (
                            <ProfilePage profile = {facultyProfile} />
                        ),
                    },
                    {
                        tabButton: "E-Task",
                        tabIcon: Dashboard,
                        tabContent: (
                            <ETaskBoard profile = {facultyProfile} />
                        ),
                    },
                    {
                        tabButton: "Attendance",
                        tabIcon: GraphicEqOutlined,
                        tabContent: (
                            <AttendanceBoard profile = {facultyProfile} />
                        ),
                    },
                    {
                        tabButton: "Grades",
                        tabIcon: GradeOutlined,
                        tabContent: (
                            <GradesBoard profile = {facultyProfile} />
                        ),
                    },
                    {
                        tabButton: <button style={{backgroundColor: "transparent",
                        borderColor: "transparent", color: "black"}}
                        onClick={handleLogout}>LOG OUT</button>,
                        tabIcon: LockOpenOutlined,
                        tabContent: (
                        ""
                        ),
                    },
                ]}
              />
        </div>
    )
}
