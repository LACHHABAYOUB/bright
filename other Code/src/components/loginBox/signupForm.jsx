import React, { useContext, useState } from "react";
import axios from "axios";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "../my-styled/common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { properties } from "../properties";

export const SignupForm = (props) => {
  //const [updatePasswordStatus, setUpdatePasswordStatus] = useState("");
  const { switchToSignin } = useContext(AccountContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [newPasswordValue, setNewPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const baseUrl = properties.BASE_URL || "http://localhost:12117";
  
  const updateUserPassword = async () => {
    axios
      .get(baseUrl?`${baseUrl}/CcsRestService/v1/updateUserPassword/${emailValue}/${confirmPasswordValue}`:`../CcsRestService/v1/updateUserPassword/${emailValue}/${confirmPasswordValue}`)
      .then((response) => {
        //setUpdatePasswordStatus(response.data);
        if (response.data === "SUCCESS") {
          setErrorMessage("Successfully changed password!");
          setTimeout(function () {
            setErrorMessage("");
            switchToSignin();
          }, 2000); //Time before execution
        } else {
          setErrorMessage("Failed to change password!");
          setTimeout(function () {
            setErrorMessage("");
          }, 4000); //Time before execution
        }
      });
  };

  const onLoginClicked = async () => {
    // check if new password not same as current
    axios
      .get(baseUrl?`${baseUrl}/CcsRestService/v1/getUser/${emailValue}`:`../CcsRestService/v1/getUser/${emailValue}`)
      .then((response) => {
        //setUserInfo(response.data);
        let userInfo = response.data;
        if (userInfo && userInfo !== "FAILURE") {
          let info = userInfo.split(",");
          if (info[1] === confirmPasswordValue) {
            setErrorMessage(
              "The new password can not be the same as current password!"
            );
            setTimeout(function () {
              setErrorMessage("");
            }, 4000); //Time before execution
          } else {
            if (newPasswordValue === confirmPasswordValue) {
              updateUserPassword();
            } else {
              setErrorMessage("The passwords do not match!");
              setTimeout(function () {
                setErrorMessage("");
              }, 4000); //Time before execution
            }
          }
        }
      });
  };
  return (
    <BoxContainer>
      <FormContainer>
        {errorMessage && <div className="fail">{errorMessage}</div>}
        <Input
          type="email"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          placeholder="Email"
        />
        {/* <Input type="password" placeholder="Temp Password" /> */}
        <Input
          type="password"
          value={newPasswordValue}
          onChange={(e) => setNewPasswordValue(e.target.value)}
          placeholder="New Password"
        />
        <Input
          type="password"
          value={confirmPasswordValue}
          onChange={(e) => setConfirmPasswordValue(e.target.value)}
          placeholder="Confirm New Password"
        />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton
        type="submit"
        disabled={!emailValue || !confirmPasswordValue || !newPasswordValue}
        onClick={onLoginClicked}
      >
        Verify
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Sign In
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
};
