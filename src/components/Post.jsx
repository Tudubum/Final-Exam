import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import PostContext from "../contexts/PostContext";

const Post = ({ data }) => {

    const { users, loggedInUser } = useContext(UserContext);
    const { deletePost, handleLike,  handleDislike} = useContext(PostContext);
  
    
    const postOwner = users.find(user => user.id === data.userId);
    
console.log(postOwner)

    return (    
    <div className="cardContainer">
        <div className="postOwnerInfo">
            <img 
            className="avatarImg"
            src={postOwner.image} 
            alt="userAvatar" />
        <span>{postOwner.userName}</span>
      
        {
  loggedInUser ? (
    <>
        <button onClick={() => handleLike(data.id)} className="likeButton">
            <i className={`material-icons ${data.likedBy && data.likedBy.includes(loggedInUser.id) ? 'filled' : 'outlined'}`}>thumb_up</i>
        </button>
        <button onClick={() => handleDislike(data.id)} className="dislikeButton">
            <i className={`material-icons ${data.dislikedBy && data.dislikedBy.includes(loggedInUser.id) ? 'filled' : 'outlined'}`}>thumb_down</i>
        </button>
    </>
  ) : (
    <>
        <button className="likeButton disabled">
            <i className={`material-icons outlined`}>thumb_up</i>
        </button>
        <button className="dislikeButton disabled">
            <i className={`material-icons outlined`}>thumb_down</i>
        </button>
    </>
  )
}
        </div>
        <div className="postInfo">
            <h4>{data.title}</h4>
            <div className="seperator"></div>
            <p>{data.description}</p>
        </div>
        <div className="deleteditBtn">
            {loggedInUser && loggedInUser.id === data.userId && (
                <>
                    <button className="btn" onClick={() => deletePost(data.id)}>Delete</button>
                    <button className="btn">
                        <Link to={`/editPost/${data.id}`}>Edit</Link>
                    </button>
                </>
            )}
                
        </div>
        <p className="edit-label">{data.edited ? ' ✓ Post was edited' : ''}</p>
    </div>
    );
    
  };

  export default Post;

  
