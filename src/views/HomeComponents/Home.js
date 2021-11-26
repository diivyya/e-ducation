/*
    ---------- HomePage -------------
*/
import React from "react";

import classNames from "classnames";

import { makeStyles } from "@material-ui/core/styles";

import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import ProductSection from "./Sections/ProductSection.js";
import WorkSection from "./Sections/WorkSection.js";

import HeaderLinks from "components/Header/HeaderLinks.js";

import styles from "assets/jss/material-kit-react/views/components.js";

const useStyles = makeStyles(styles);

export default function Components(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        brand="E-ducation"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <Parallax image={require("assets/img/home-bg.png").default}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand} style={{color: "black"}}>
                <h2 className={classes.title} style={{fontSize: "50px"}}>E-ducation</h2>
                <h3 className={classes.subtitle} style={{animation: "floating 3s ease-in-out infinite"}}>
                  <div>A web application</div><div>for Electronic Education!<span class="typed" data-typed-items="Developer, Student, Coder, Data Analyst"></span></div>
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
          <ProductSection />
          <WorkSection />
      </div>
      <Footer />
    </div>
  );
}
