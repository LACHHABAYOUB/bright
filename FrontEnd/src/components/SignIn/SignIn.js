//import axios from 'axios';
import React, { useContext, useRef } from 'react';
import { Redirect, useHistory, Route } from "react-router-dom";
import './SignIn.css';



const SignIn = (props) => {


  const [errorMessage, setErrorMessage] = React.useState("");
  const Errormesg = () => {
    setErrorMessage("Error Credential!")
  }

    const signForm = useRef();
    const history = useHistory();

    const loginHandler = () => {
        const form = signForm.current
        window.sessionStorage.setItem('loginName',form['username'].value);
       // history.go(1)
        props.history.push('/');
    };


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
                navigate("/posts");
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


    return (
        
        

        <div className="NewPost">
                    

            <form ref={signForm}>
                
            <div><br /></div><h1>Login</h1><div><br /></div>
            <li><img src="https://filecache.mediaroom.com/mr5mr_century_link_2/187039/Brightspeed_Logo_Full_Color_RGB_864px%4072ppi.png" alt="example" width={150}/></li>
            {errorMessage && <div className="error"> {errorMessage} </div>}

                <label>Name</label>
                <input type="text" id={'username'} name={'username'} placeholder="someone@brighspeed.com"/>

                <label>Password</label>
                <input type="password" id={'passoword'} name={'passoword'} placeholder="Password"/>
                <div><br /></div>

                <button  onClick={Errormesg}> <a href="/">Login</a></button> <div><br /></div>


            </form>
        </div>

        
    );
}
export default SignIn;