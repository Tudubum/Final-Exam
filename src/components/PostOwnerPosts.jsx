import UserContext from "../contexts/UserContext";
import PostContext from "../contexts/PostContext";
import { useContext } from "react";
import Post from "./Post";
import { NavLink } from "react-router-dom";

const PostOwnerPosts = () => {
    const { loggedInUser } = useContext(UserContext);
    const { post } = useContext(PostContext);

  if (!loggedInUser || !post) {
    return null;
  }

  return (
    <div className="pageContainer">
        <div className="sideMenu">
        <NavLink
            style={({ isActive}) => {
                return {color: isActive ? 'white' : '#b39e87' };}}
            to="/liked"
            >
            Liked posts
            </NavLink>
    </div>
    <div className="userContent">
  {
        post
          .filter(post => post.userId === loggedInUser.id)
          .map(post => 
            <Post 
              key={post.id}
              data={post}
            />  
          )
      }
    </div>
    
    </div>
  );
}

 
export default PostOwnerPosts;