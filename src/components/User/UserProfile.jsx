import UserContext from "../../contexts/UserContext";
import { useContext } from "react";
import { NavLink } from 'react-router-dom';

const UserProfile = () => {

    const { loggedInUser } = useContext(UserContext);

    return ( 
        <>
        <NavLink
            style={({ isActive}) => {
                return {color: isActive ? 'white' : '#b39e87',
                textDecoration: isActive ? 'underline' : 'none',
            };}}
                to="/postOwnerPosts"
                >{loggedInUser.userName}
            </NavLink>
            <img
                src={loggedInUser.image}
                alt="user avatar"
                className="avatarImg"
            />
        </>
     );
}
 
export default UserProfile;