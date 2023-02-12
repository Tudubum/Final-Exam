import React, { useContext } from "react";
import Post from "./Post";
import UserContext from "../contexts/UserContext";
import PostContext from "../contexts/PostContext";


const LikedPosts = () => {
    const { loggedInUser } = useContext(UserContext);
    const { post } = useContext(PostContext);
    
    const likedPosts = post.filter(post => post.likedBy.includes(loggedInUser.id));
    return (
      <div className="likedPlacesList">
          <h3 className="h3_subtitle">Your liked posts list</h3>

        {likedPosts.map(post => (
          <Post 
          data={post} 
          key={post.id}
          className="list"
          />
        ))}
      </div>
    );
}
 
export default LikedPosts;