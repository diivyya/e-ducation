import React from "react";
import emailjs from 'emailjs-com';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/workStyle.js";

const useStyles = makeStyles(styles);

export default function WorkSection() {
  const classes = useStyles();

  const handleSubmit = async(event) => {
    await emailjs.sendForm(MAIL_SERVICE_ID, MAIL_TEMPLATE_ID, event.target, MAIL_INTEGRATION_ID)
  }
  return (
    <form className={classes.section} onSubmit={handleSubmit}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
          <h2 className={classes.title}>Feedback Form</h2>
          <h4 className={classes.description}>
            Please do provide feedback/suggestions for this project!
          </h4>
          <form action="https://mailthis.to/divya1107@outlook.com" method="POST">
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Your Name"
                  id="name"
                  name="name"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Your Email"
                  id="email"
                  name="email"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
              <CustomInput
                labelText="Your Message"
                id="message"
                name="message"
                formControlProps={{
                  fullWidth: true,
                  className: classes.textArea,
                }}
                inputProps={{
                  multiline: true,
                  rows: 5,
                }}
              />
              <GridItem xs={12} sm={12} md={4}>
                <Button color="primary" type="submit">Send Message</Button>
              </GridItem>
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    </form>
  );
}
