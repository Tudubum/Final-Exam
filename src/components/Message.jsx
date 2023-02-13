import UserContext from "../contexts/UserContext";
import CommentsContext from "../contexts/CommentsContext";
import { useContext, useState } from "react";
import EditMessage from "./EditMessage";

const Message = ({ data }) => {

  const [isEditing, setIsEditing] = useState(false);

  const { users, loggedInUser } = useContext(UserContext);
  const { deleteComment, handleLike, handleDisLike,updateComment } = useContext(CommentsContext);

  const CommentOwner = users.find(user => user.id === data.userId);

  const commentLike = data.likedBy.length - data.disLikedBy.length;

  const changeEditStatus = () => {
    setIsEditing(!isEditing);//jei anksčiau redagavimo režimas buvo įjungtas, tada jis bus išjungtas, ir atvirkščiai.
  };

  const onEditComment = (id, updatedComment) => {
    updateComment(id, {
        ...updatedComment,
        isEdited: true,
        time: new Date().toLocaleString()
    });
    setIsEditing(false);
  };

  return (
    <div className="CommentsCards">
      <div className="ownerInfo">
      {CommentOwner && 
        <>
        <div className="comment-info">
          <img
            className="avatarImg"
            src={CommentOwner.image}
            alt="user avatar" 
          />
          <h5>{CommentOwner.userName}</h5>
          </div>
        </>
      }
      {
        loggedInUser && loggedInUser.id === CommentOwner.id &&
        <>
        <div className="ownerButtons">
          <button onClick={() => deleteComment(data.id)}>delete</button>
          <button onClick={changeEditStatus}>edit</button>
        </div>  
        </>
      }
      </div>
      <div className="line"></div>
      <div className="comments_Card">
        {isEditing ? (
            <EditMessage 
                data={data} 
                setIsEditing={setIsEditing} 
                onEditComment={onEditComment} />
            ) : (
          <>
            <div><p>{commentLike} likes</p></div>
              <div>
                {data.isEdited && <p>Edited</p>}
                <p>{data.time} Posted</p>
                <p className="comment">{data.comment}</p>
              </div>
          </>
          )}
      </div>
      <div className="likeDislike">
      {loggedInUser &&
        <>
      <button onClick={() => handleLike(data.id)} className="likeButton">
          {data.likedBy.includes(loggedInUser.id) ? <i className="fa fa-thumbs-up"></i> : <i className="fa fa-thumbs-o-up"></i>}
      </button>
      <button onClick={() => handleDisLike(data.id)} className="DisLikeButton">
          {data.disLikedBy.includes(loggedInUser.id) ? <i className="fa fa-thumbs-down"></i> : <i className="fa fa-thumbs-o-down"></i>}
      </button>
      </>
      }
    </div>
  </div>
    
  );
}
 
export default Message;
