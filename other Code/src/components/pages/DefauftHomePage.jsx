import React from "react";
import { AppContainerFixed, TitleText, TitleTextMedium } from "../my-styled/common";
import { NavigationBar } from "../NavigationBar";
import logo from "../assets/logo-banner-03.png"

export const DefaultHomePage = () => {
  return (
    <>
    <NavigationBar />
      <AppContainerFixed>
        
        <br />
        <img src={logo} alt="" />
        <br /><br />
        <TitleText>Welcome to the Contact Center Systems Portal</TitleText><br /><br />
        <TitleTextMedium>Access the different data views from the menu above</TitleTextMedium>
      </AppContainerFixed><br/><br/><br/><br/>
    </>

  );
};
