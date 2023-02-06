import logo from "../images/logo.png"

import { NavLink } from 'react-router-dom';


const Navbar = () => {
    return ( 
    <>
        <div className="navBar">
            <div>
                <img src={logo} alt="" />
            </div>
            <div className="linksNav">
            <NavLink 
                className="login"
                style={({ isActive}) => {
                    return {color: isActive ? 'white' : '#b39e87' };}}
                to='/logIn'>Log in
            </NavLink>
            <NavLink 
                style={({ isActive}) => {
                    return {color: isActive ? 'white' : '#b39e87' };}}
                to='/signUp'>Sign Up
            </NavLink>
            </div>
        </div>
    </> 
);
}
 
export default Navbar;