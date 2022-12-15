import React from "react";
import { AppContainer } from "./my-styled/common";
import { Navbar } from "react-bootstrap";
import logo from "./assets/Brightspeed_Logo_Full.png";

const Footer = () => (
  <AppContainer>
    <Navbar>
      <Navbar.Brand>
        <p>
        <img src={logo} alt="" width="150px" />
          {" "}
          © Connect Holding LLC. Brightspeed. All rights reserved. Last updated
          on {document.lastModified}.
        </p>
      </Navbar.Brand>
    </Navbar>
  </AppContainer>
);

export default Footer;
