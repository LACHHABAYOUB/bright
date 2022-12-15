//import axios from 'axios';
import React, { useContext, useRef } from 'react';
import { Redirect, useHistory, Route } from "react-router-dom";
import './SignIn.css';



const SignIn = (props) => {

    const signForm = useRef();
    const history = useHistory();

    const loginHandler = () => {
        const form = signForm.current
        window.sessionStorage.setItem('loginName',form['username'].value);
       // history.go(1)
        props.history.push('/');
    };

    return (

        <div className="NewPost">
                    

            <form ref={signForm}>
                
            <div><br /></div><h1>Login</h1><div><br /></div>
            <li><img
                                    src="https://filecache.mediaroom.com/mr5mr_century_link_2/187039/Brightspeed_Logo_Full_Color_RGB_864px%4072ppi.png"
                                    alt="example" width={150}
                                /></li>
                <label>Name</label>
                <input type="text" id={'username'} name={'username'} placeholder="someone@brighspeed.com"/>

                <label>Password</label>
                <input type="password" id={'passoword'} name={'passoword'} placeholder="Password"/>
                <div><br /></div>

                <button  onClick={loginHandler}> <a href="/">Login</a></button> <div><br /></div>


            </form>
        </div>

        
    );
}
export default SignIn;