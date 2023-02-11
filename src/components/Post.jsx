import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import PostContext from "../contexts/PostContext";

const Post = ({ data }) => {

    const { users, loggedInUser } = useContext(UserContext);
    const { deletePost, handleLike, handleDisLike} = useContext(PostContext);
  


    const postOwner = users.find(user => user.id === data.userId);


// eslint-disable-next-line
    const PostVote = data.likedBy && data.likedBy.length - (data.disLikedBy && data.disLikedBy.length || 0);

    return (    
    <div className="cardContainer">
        <div className="ownerInfo_LIKES" >
        <div className="postOwnerInfo">
            <div className="user_AVATAR" >
               <img 
                className="avatarImg"
                src={postOwner.image} 
                alt="userAvatar" />
                <h5>{postOwner.userName}</h5>  
            </div>
            <div className="buttonsLikes">
            {loggedInUser &&
        <>
            <button onClick={() => handleLike(data.id)} className="likeButton">
                { loggedInUser && data.likedBy && data.likedBy.includes(loggedInUser.id) ? <i className="fa fa-thumbs-up"></i> : <i className="fa fa-thumbs-o-up"></i>}
            </button>
            <button onClick={() => handleDisLike(data.id)} className="DisLikeButton">
                 { loggedInUser && data.disLikedBy &&  data.disLikedBy.includes(loggedInUser.id) ? <i className="fa fa-thumbs-down"></i> : <i className="fa fa-thumbs-o-down"></i>}
            </button>
        </>
        }
        <p>Likes: {PostVote}</p>
            </div>
        </div>
        </div>
        <div className="post_CONTENT">
            <div className="postInfo">
                <Link to={`/post/${data.id}`}>{data.title}</Link>
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
                    <Link to={`/post/${data.id}`}>Answer</Link>
                 </button>
            )}
              <p className="edit-label">{data.isEdited ? ' ✓ Post was edited' : ''}</p>
        </div>
        </div>
    </div>
    );
    
  };

  export default Post;

  
