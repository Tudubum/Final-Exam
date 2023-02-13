import logo from "../images/logo.png"
import { useContext } from "react";

import UserContext from "../contexts/UserContext";

import { NavLink } from 'react-router-dom';
import UserProfile from "../components/UserProfile";

const Navbar = () => {

    const { loggedInUser, handleLogout } = useContext(UserContext);
    
return ( 
    <>
        <div className="navBar">
            <div>
                <img 
                className="logoImg"
                src={logo} 
                alt="" />
            </div>
            <div className="linksNav">
                {loggedInUser ? 
            <>
                <NavLink
                    className="addPost"
                    style={({ isActive}) => {
                        return {color: isActive ? 'white' : '#b39e87',
                        textDecoration: isActive ? 'underline' : 'none',
                    };}}
                    to="/add"
                >Add Post</NavLink>
                <NavLink
                    style={({ isActive}) => {
                        return {color: isActive ? 'white' : '#b39e87',
                        textDecoration: isActive ? 'underline' : 'none',
                    };}}
                    to="/">Home</NavLink>
                <UserProfile/>
                {loggedInUser && (
                    <button 
                    className="submit_logout" 
                    onClick={handleLogout}>Log Out</button>
                )}
            </>
            : 
            <>
                <>
                <NavLink
                    style={({ isActive}) => {
                        return {color: isActive ? 'white' : '#b39e87',
                        textDecoration: isActive ? 'underline' : 'none',
                    };}}
                    to="/"
                >Home</NavLink>
                </>
                <NavLink 
                    className="login"
                    style={({ isActive}) => {
                        return {color: isActive ? 'white' : '#b39e87',
                        textDecoration: isActive ? 'underline' : 'none',
                    };}}
                    to='/logIn'
                >Log in</NavLink>
                <NavLink 
                    style={({ isActive}) => {
                        return {color: isActive ? 'white' : '#b39e87' };}}
                    to='/signUp'
                >Sign Up</NavLink>
            </>
                }
            </div>
        </div>
    </> 
);
}
 
export default Navbar;