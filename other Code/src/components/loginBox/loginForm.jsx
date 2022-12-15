import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
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
import { useToken } from "../useToken";
import { Alert } from "react-bootstrap";
import { properties } from "../properties";

export const LoginForm = () => {
  const { switchToSignup } = useContext(AccountContext);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useToken();
  const [showFailureNoEmail, setShowFailureNoEmail] = useState(false);
  const [showFailureBadCred, setShowFailureBadCred] = useState(false);
  const [showFailureEmailPass, setShowFailureEmailPass] = useState(false);
  const [showFailureForgotPass, setShowFailureForgotPass] = useState(false);
  const [showFailureNoAcct, setShowFailureNoAcct] = useState(false);
  const baseUrl = properties.BASE_URL || "http://localhost:12117";

  /**
   * Call to get user info
   */
  const getUserInfo = async () => {
    axios
      .get(baseUrl?`${baseUrl}/CcsRestService/v1/getUser/${emailValue}`:`../CcsRestService/v1/getUser/${emailValue}`)
      .then((response) => {
        let resp = response.data;
        if (resp && resp !== "FAILURE") {
          let info = resp.split(",");

          if (passwordValue === info[1] && info[1] !== "dummy") {
            // Authenticated
            setAuth("auth" + "|" + info[3] + "|" + info[0] + "|" + info[2] );
            navigate("/CCS/home");
          } else if (info[1] === "dummy") {
            switchToSignup();
          } else {
            setShowFailureBadCred(true);
            setAuth("");
            setTimeout(function () {
              setShowFailureBadCred(false);
            }, 4000); //Time before execution
          }
        } else {
          setShowFailureBadCred(true);
          setAuth("");
          setTimeout(function () {
            setShowFailureBadCred(false);
          }, 4000); //Time before execution
        }
      });
  };

  const onLoginClicked = (props) => {
    if (emailValue && passwordValue) {
      getUserInfo();
    } else {
      setShowFailureEmailPass(true);
      setTimeout(function () {
        setShowFailureEmailPass(false);
      }, 4000); //Time before execution
    }
  };

  cx

  const verifyAccount = async (props) => {
    if (emailValue) {
      // Check that password is 'dummy'
      axios
        .get(baseUrl?`${baseUrl}/CcsRestService/v1/getUser/${emailValue}`:`../CcsRestService/v1/getUser/${emailValue}`)
        .then((response) => {
          if (response.data !== "FAILURE") {
            let info = response.data.split(",");
            if (info[1] === "dummy") {
              switchToSignup();
            } else {
              setShowFailureForgotPass(true);
              setTimeout(function () {
                setShowFailureForgotPass(false);
              }, 4000); //Time before execution
            }
          } else {
            setShowFailureNoAcct(true);
            setTimeout(function () {
              setShowFailureNoAcct(false);
            }, 4000); //Time before execution
          }
        });
    } else {
      setShowFailureNoEmail(true);
      setTimeout(function () {
        setShowFailureNoEmail(false);
      }, 4000); //Time before execution
    }
  };

  const onForgotPasswordClicked = () => {
    switchToSignup();
  };
  return (
    <BoxContainer>
      <Alert variant="danger" show={showFailureNoEmail} onClose={() => setShowFailureNoEmail(false)} dismissible>
        You must enter an email address to verify.
      </Alert>
      <Alert variant="danger" show={showFailureBadCred} onClose={() => setShowFailureBadCred(false)} dismissible>
        Incorrect login credentials! Please try again.
      </Alert>

      <Alert variant="danger" show={showFailureEmailPass} onClose={() => setShowFailureEmailPass(false)} dismissible>
        You must enter an email address and a password!
      </Alert>
      <Alert variant="danger" show={showFailureForgotPass} onClose={() => setShowFailureForgotPass(false)} dismissible>
        Cannot verify this account. Please contact adminstrator to reset user account or use Forgot your Password.
      </Alert>
      <Alert variant="danger" show={showFailureNoAcct} onClose={() => setShowFailureNoAcct(false)} dismissible>
        Account not found. Please contact adminstrator.
      </Alert>

      <FormContainer>
        {/* {errorMessage && <div className="fail">{errorMessage}</div>} */}
        <Input
          id="emailInputField"
          type="email"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          placeholder="someone@brightspeed.com"
        />
        <Input
          type="password"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
          placeholder="Password"
        />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink onClick={onForgotPasswordClicked}>
        Forgot your password?
      </MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton
        type="submit"
        onClick={onLoginClicked}
      >
        Sign In
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Need to verify user account?{" "}
        <BoldLink href="#" onClick={verifyAccount}>
          Verify
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
};
