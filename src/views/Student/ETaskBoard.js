import React from 'react';
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/loginPage.js";

const useStyles = makeStyles(styles);

export default function ETaskBoard() {
    const classes = useStyles();

    return (
        <div style={{minHeight:"100vh"}}>
            <CustomTabs
                plainTabs
                headerColor="primary"
                tabs={[
                  {
                    tabName: "Assesments",
                    tabContent: (
                      <p className={classes.textCenter}>
                        1
                      </p>
                    ),
                  },
                  {
                    tabName: "Assignments",
                    tabContent: (
                      <p className={classes.textCenter}>
                        2
                      </p>
                    ),
                  },
                  {
                    tabName: "Offline Classes",
                    tabContent: (
                      <p className={classes.textCenter}>
                        3
                      </p>
                    ),
                  },
                  {
                    tabName: "Notice Board",
                    tabContent: (
                      <p className={classes.textCenter}>
                        3
                      </p>
                    ),
                  },
                ]}
            />
        </div>
    )
}
