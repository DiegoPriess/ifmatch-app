import React from 'react';
import './style.scss';
import Item from './Item';
import { Link } from 'react-router-dom';

const NavBar = () => {

    const ROUTERS = {
        "DASHBOARD": "/dashboard",
        "USERS": "/users"
    }
    
    return (
    
        <nav className="navbar">
            <ul className="navbar-list">
                <Link to={ROUTERS["DASHBOARD"]}><Item icon="home" active={window.location.pathname.includes(ROUTERS["DASHBOARD"]) ? true : false} name="Dashboard"/></Link>
                <Link to={ROUTERS["USERS"]}><Item icon="group" active={window.location.pathname.includes(ROUTERS["USERS"]) ? true : false} name="Users"/></Link>
            </ul>
        </nav>
       
    );

}

export default NavBar;