import React, { createRef, useRef, useState } from "react";
import {
  Container,
  Header,
  Label,
  Icon,
  Segment,
  Select,
  Radio,
  Form,
  Button,
} from "semantic-ui-react";

import config from "./config";
import MicrosoftLogin from "react-microsoft-login";

const SignIn = () => {
  const [msalInstance, onMsalInstanceChange] = useState();
  const [clientId, onClientIdChange] = useState(config.client_id);
  const [callbackUrl, onCallbackUrlChange] = useState(
    config.callbackUrl || window.location.href
  );
  const [buttonTheme, onButtonThemeChange] = useState(
    config.themeOptions[0].value
  );
  const [graphScopes, onGraphScopesChange] = useState([
    config.graphScopesOptions[0].value,
  ]);
  const [withUserData, onWithUserDataChange] = useState(true);
  const [customClassName, onCustomClassNameChange] = useState("my-button");
  const [customButton, onCustomButtonChange] = useState(false);
  const [forceRedirectStrategy, onForceRedirectStrategyChange] = useState(
    false
  );
  const [debug, onDebugChange] = useState(true);

  const loginHandler = (err, data, msal) => {
    console.log(err, data);
    if (!err && data) {
      onMsalInstanceChange(msal);
    }
  };

  const logoutHandler = () => {
    msalInstance.logout();
  };

  return (


    <div className="viewport">
      <div className="NewPost">


        <form >

          <div><br /></div><h1>Welcome to BrightSpeed!</h1><div><br /></div>
          <div><br /></div>  <div><br /></div>
      

          <Segment basic>
            <Container text>
              <Segment>
                {msalInstance ? (
                  <Button onClick={logoutHandler}>Logout</Button>
                ) : (
                  <MicrosoftLogin
                    withUserData={withUserData}
                    debug={debug}
                    clientId={clientId}
                    forceRedirectStrategy={forceRedirectStrategy}
                    authCallback={loginHandler}
                    buttonTheme={buttonTheme}
                    className={customClassName}
                    graphScopes={graphScopes}
                    children={customButton && <Button>Custom button</Button>}
                    useLocalStorageCache={true}
                  />
                )}
              </Segment>
            </Container>
          </Segment>
          <div><br /></div><div><br /></div><div><br /></div><div><br /></div><div><br /></div>
          <div><br /></div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
