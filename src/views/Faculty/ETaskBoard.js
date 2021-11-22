import React from 'react';
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/loginPage.js";

import Assessments from "./Assessments";
import Assignments from "./Assignments";
import OfflineClasses from "./OfflineClasses";

const useStyles = makeStyles(styles);

export default function ETaskBoard(props) {
    const classes = useStyles();

    return (
        <div style={{minHeight:"100vh"}}>
            <CustomTabs
                plainTabs
                headerColor="info"
                tabs={[
                  {
                    tabName: "Assessments",
                    tabContent: (
                      <Assessments profile={props.profile} />
                    ),
                  },
                  {
                    tabName: "Assignments",
                    tabContent: (
                      <Assignments profile={props.profile} />
                    ),
                  },
                  {
                    tabName: "Offline Classes",
                    tabContent: (
                      <OfflineClasses profile={props.profile} />
                    ),
                  },
                ]}
            />
        </div>
    )
}
