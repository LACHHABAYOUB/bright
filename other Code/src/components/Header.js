import React from "react";
//import "./header.css";
import { AppContainer, TitleText } from "./my-styled/common";
import { Navbar, NavItem } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  const onClicked = () => {
    sessionStorage.removeItem("auth-token");
    navigate("/CCS");
  };
  return (
<AppContainer>
<Navbar expand="">
      <Navbar>
        <Navbar.Brand>
          <TitleText>Contact Center Systems Portal</TitleText>
        </Navbar.Brand>
        <NavItem >
          {" "}
          <Button variant="outline-primary" onClick={onClicked}>
            Logout
          </Button>{" "}
        </NavItem>
      </Navbar>
    </Navbar>
</AppContainer>
    
  );
};
export default Header;
