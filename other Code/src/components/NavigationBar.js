import React, { useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import { useMyUser } from './useMyUser';


const Styles = styled.div`
  .navbar { 
    background-color: #fff;
    height: 75px;
    width: 100%;
    align: center;
    box-shadow: 0px 2px 5px #777;
  }
  a, .navbar-nav, .navbar-dark .nav-link {
    color: #000;
    &:hover { color: blue; }
  }
  .navbar-brand {
    font-size: 2.4em;
    color: #000;
    &:hover { color: blue; }
  }
`;

export const NavigationBar = () => {
  const [userSeeCustom, setUserSeeCustom] = useState(false);
  const userRole = useMyUser();
  let role = userRole.split("|")[1];
  
  React.useEffect(() => {
    (role === "useradmin" || role === "devadmin") ? setUserSeeCustom(true) : setUserSeeCustom(false);
  }, [role]);
  return (
    <Styles>
      <Navbar expand={true} className="flex-column">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav fill variant="tabs" defaultActiveKey="/CCS/home">
            <Nav.Item><Nav.Link eventKey="link-1" href="/CCS/home">Home</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="link-2" href="/CCS/data-view">Data View</Nav.Link></Nav.Item>
            {userSeeCustom && <Nav.Item><Nav.Link eventKey="link-3" href="/CCS/custom-view">Custom Data View</Nav.Link></Nav.Item>}
            <Nav.Item><Nav.Link eventKey="link-4" href="/CCS/health-check">Health Check</Nav.Link></Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Styles>
  )

}