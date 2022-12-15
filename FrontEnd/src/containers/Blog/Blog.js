import React, { useState, useEffect } from 'react';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import Posts from '../Posts/Posts'
import { Route, Link, Switch, Redirect, useHistory } from 'react-router-dom';
import { LikedPosts } from '../../store/LikedPosts';
import { APIConfig } from '../../store/API-Config';
import SignIn from "../../components/SignIn/SignIn";
import Users from "../Users/Users";
import NewUser from "../../components/NewUser/NewUser";
import NewComponent from "../../components/Status/NewComponent";
import Followings from "../Followings/Followings";


const Blog = (props) => {


    const [likedPosts, setLikedPosts] = useState([]);

    const history = useHistory()
    const logout = () => {
        sessionStorage.clear();
        history.go(0)
        //history.push('/');
    };

    let signBtn, logoutBtn = '';

    if (sessionStorage.getItem("loginName")) {
        signBtn = 'Welcome ' + sessionStorage.getItem("loginName") + "  ";
        logoutBtn = <ul className="loginbutton" onClick={logout}>  <li className="btn-area"><Link to="/SignIn">Logout</Link></li>   </ul>

    } else {
        signBtn = <ul className="loginbutton">  <li className="btn-area"><Link to="/SignIn">Login</Link></li>   </ul>
    }


    return (

        <APIConfig.Provider value={
            {
                postAPI: 'http://localhost:8080/posts/',
                userAPI: 'http://localhost:8080/users/'
            }
        }>
            <LikedPosts.Provider value={{ likedPosts, setLikedPosts }}>
                <div className="Blog">

                    <header>
                        <nav>
                            <ul className="nav-area">
                                <li><img
                                    src="https://filecache.mediaroom.com/mr5mr_century_link_2/187039/Brightspeed_Logo_Full_Color_RGB_864px%4072ppi.png"
                                    alt="example" width={150}
                                /></li>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/posts"> All Reporting</Link></li>
                             
                                <li><Link to={{
                                    pathname: '/new-post',
                                    hash: '#submit',
                                    search: '?quick-submit=true'
                                }}>New Reporting</Link></li>

                            <li><Link to="/users"> Old Reporting</Link></li>

                                { <li><Link to={{
                                    pathname: '/new-user',
                                    hash: '#submit',
                                    search: '?quick-submit=true'
                                }}>New Author</Link></li> }

                            </ul>
                        </nav>
                        {/*
                        <ul className="loginbutton">  <li className="btn-area"><Link to="/SignIn">Login</Link></li>   </ul>
*/}

                        <li className="Logstyle">{signBtn}{logoutBtn}</li>

                    </header>


                    <Switch>

                        <Route path="/SignIn" component={SignIn} exact />
                        <Route path="/following" component={Followings} />
                        <Route path="/new-post" component={NewPost} />
                        <Route path="/new-user" component={NewUser} />
                        <Route path="/posts" component={Posts}  />
                        <Route path="/users" component={Users} />
                        <Route path="/newcomponent" component={NewComponent} />
                        <Redirect from="/" to="/posts" />

                    </Switch>

                    <div><br /><br /><br /><br /><br /><br /><br /></div>
                    <footer id="footer">
                        <small className="right">&copy; Connect Holding LLC. 2022 All Rights Reserved </small>
                    </footer>

                </div>
            </LikedPosts.Provider >
        </APIConfig.Provider>
    );
}


export default Blog;

