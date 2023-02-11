import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import PostContext from "../contexts/PostContext";

const Post = ({ data }) => {

    const { users, loggedInUser } = useContext(UserContext);
    const { deletePost, handleLike,  handleDislike} = useContext(PostContext);
  
    
    const postOwner = users.find(user => user.id === data.userId);

    const PostVote = data.likedBy && data.likedBy.length - (data.disLikedBy && data.disLikedBy.length || 0);

    return (    
    <div className="cardContainer">
        <div className="postOwnerInfo">
            <div>
               <img 
                className="avatarImg"
                src={postOwner.image} 
                alt="userAvatar" />
                <span>{postOwner.userName}</span>  
            </div>
        </div>
        {loggedInUser &&
        <>
            <button onClick={() => handleLike(data.id)} className="likeButton">
                { loggedInUser && data.likedBy && data.likedBy.includes(loggedInUser.id) ? <i className="fa fa-thumbs-up"></i> : <i className="fa fa-thumbs-o-up"></i>}
            </button>
            <button onClick={() => handleDislike(data.id)} className="DisLikeButton">
                 { loggedInUser && data.disLikedBy &&  data.disLikedBy.includes(loggedInUser.id) ? <i className="fa fa-thumbs-down"></i> : <i className="fa fa-thumbs-o-down"></i>}
            </button>
        </>
        }
        <p>Likes: {PostVote}</p>
   
        <div className="postInfo">
            <Link to={`/post/${data.id}`}>{data.title}</Link>
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
           {loggedInUser && loggedInUser.id !== data.userId && (
                <button className="answer_btn">
                    <Link to={`/messageForm/${data.id}`}>Answer</Link>
                 </button>
            )}
        </div>
        <p className="edit-label">{data.edited ? ' ✓ Post was edited' : ''}</p>
    
    </div>
    );
    
  };

  export default Post;

  
