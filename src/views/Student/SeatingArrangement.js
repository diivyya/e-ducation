/*
    ---------- Seating arrangement feature for offline classes in Student Dashboard -------------
*/

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

import { db } from "../../firebase-config";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

import { Button } from "react-bootstrap";

import Footer from "components/Footer/Footer.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import image from "assets/img/seating-arrangement.png";
const useStyles = makeStyles(styles);

const fs25 = css`
  font-size: 35px;
  text-align: center;
`;
const textLeft = css`
  text-align: left;
`;
const classs = css`
  width: 60%;
  margin: 10px auto;
  background: #f7f5f5;
  padding: 1.5%;
  border-radius: 10px;
  color: #757474;
  @media (max-width: 767px) {
    width: 80%;
  }
`;
const seatCSS = css`
  height: 30px;
  width: 30px;
  border-radius: 3px;
  background: white;
  cursor: pointer;
  margin: 5px;
  padding: 4px;
  padding-right:2px
  color: #a4a4a4;
  border: 1px solid #a4a4a4;
  :focus {
    outline: none;
  }
  :disabled {
    cursor: default;
    color: white;
    background: #ccc;
    border: 1px solid #ccc;
  }
`;
const active = css`
  background: #72f582;
  border: 1px solid #72f582;
`;
const flex = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 10%;
`;

export default function SeatingArrangement() {

  const location = useLocation();
  const history = useHistory();

  const classes = useStyles();

  const [customers, setCustomers] = useState(1);
  const [currentSeats, setCurrentSeats] = useState({ ...location.state.seats });
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [assignNumber, setAssignNumber] = useState(2);

  //Check if the seat is already selected
  const alreadySelected = (category, row, i) => {
    let resp = false;
    selectedSeats.forEach((seat) => {
      if (seat[0] === category && seat[1] === row && seat[2] === i) {
        resp = true;
      }
    });
    return resp;
  };

  //Set the seat selected
  const setSingleSeat = (category, row, k) => {
    const currSeats = { ...currentSeats };
    const selSeats = selectedSeats;
    currSeats[selectedSeats[0][0]][selectedSeats[0][1]][
      selectedSeats[0][2]
    ] = 0;
    currSeats[category][row][k] = assignNumber;
    selSeats[0] = [category, row, k];
    setCurrentSeats(currSeats);
    setSelectedSeats(selSeats);
  };

  //Set seats on and off according to clicks in currentSeats
  const setSeats = (category, row, k) => {
    if (customers === 0 || alreadySelected(category, row, k)) {
      return;
    }
    if (selectedSeats.length === customers) {
      setSingleSeat(category, row, k);
      return;
    }
    const currSeats = { ...currentSeats };
    const selSeats = selectedSeats;
    for (let i = k; i < currSeats[category][row].length; i++) {
      if (currSeats[category][row][i] === 1) {
        break;
      }
      if (i < customers + k && currSeats[category][row][i] !== 2) {
        currSeats[category][row][i] = assignNumber;
        selSeats.push([category, row, i]);
      }
    }
    setSelectedSeats(selSeats);
    setCurrentSeats(currSeats);
  };

  //Submit the final selected seat and registration on firestore
  const ConfirmBooking = async() => {
    let finalSeats = currentSeats
    finalSeats[selectedSeats[0][0]][selectedSeats[0][1]][selectedSeats[0][2]] = 1
    await updateDoc(doc(db, "offlineClass", location.state.classId), {
      seats: finalSeats,
      studentsWhoRegistered: arrayUnion(location.state.scholarNo)
    });
    history.push("/student");
  };

  useEffect(() => {
    if(assignNumber === 1) ConfirmBooking()
  }, [assignNumber])

  return (
    <div
      className={classes.pageHeader}
      style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          boxShadow: "0px 0px 10px 10px grey",
      }}
    >
      <div className={classes.container}>
        <header>
          <h1 css={fs25}><b>Classroom</b></h1>
        </header>
        <div css={classs} style={{backgroundColor: "white"}}>
          {Object.keys(currentSeats).map((category) => (
            <div key={category}>
              <div css={textLeft}>{category}</div>
              {Object.keys(currentSeats[category]).map((row) => (
                <div key={row} css={flex}>
                  <div>{row}</div>
                  <div>
                    {currentSeats[category][row].map((seat, i) => (
                      <button
                        onClick={() => {
                          setSeats(category, row, i);
                        }}
                        disabled={seat === 1}
                        css={[seatCSS, seat === 2 ? active : ""]}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <hr />
            </div>
          ))}
        </div>
        <div className="text-center">
          <Button
            style={{fontSize: "25px"}}
            variant="dark"
            onClick={() => {
              setAssignNumber(1)
            }}
          >
            Confirm
          </Button>
          <span style={{width: "50px"}}>   </span>
          <Button
            style={{fontSize: "25px"}}
            variant="dark"
            onClick={() => history.push("/student")}
          >
            Back
          </Button>
        </div>
      </div>
      <Footer whiteFont />
    </div>
  );
}