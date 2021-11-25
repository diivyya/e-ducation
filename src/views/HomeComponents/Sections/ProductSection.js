/*
    ---------- About my Application section on HomePage -------------
*/
import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Schedule from "@material-ui/icons/Schedule";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>About the application</h2>
          <h5 className={classes.description}>
            This app provides a digital way to students as well as teachers to keep the education going in this pandemic situation.
            Regardless of pandemic, this application is designed to be used for all use-cases of a University on a digital basis.
            It provides various features like University database management, Student inventory, student-faculty chat and Offline class seat booking etc.
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Online Discussion Form"
              description="An online discussion form to ensure the participantion and functioning of online classes."
              icon={Chat}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Validated Inventory"
              description="We provide a smooth interface for students, teachers as well as admins to work with the University Database inventory and retrieve the authorized data with access control."
              icon={VerifiedUser}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Offline-Class Scheduling"
              description="We provide an off-line class seating booking and scheduling features according to the COVID-19 norms."
              icon={Schedule}
              iconColor="info"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
