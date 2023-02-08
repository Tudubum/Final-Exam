import React, { useContext } from "react";
import Post from "./Post";
import UserContext from "../contexts/UserContext";
import PostContext from "../contexts/PostContext";


const LikedPosts = () => {
    const { loggedInUser } = useContext(UserContext);
    const { post } = useContext(PostContext);
    
    const likedPosts = post && post.likedBy ? post.filter(p => p.likedBy.includes(loggedInUser.id)) : [];

    return (
      <div className="likedPlacesList">
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