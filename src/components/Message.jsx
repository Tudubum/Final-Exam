import UserContext from "../contexts/UserContext";
import CommentsContext from "../contexts/CommentsContext";
import { useContext, useState } from "react";
import EditMessage from "./EditMessage";

const Message = ({ data }) => {

  const [isEditing, setIsEditing] = useState(false);

  const { users, loggedInUser } = useContext(UserContext);
  const { deleteAnswer, handleLike, handleDisLike,updateAnswer } = useContext(CommentsContext);

  const AnswerOwner = users.find(user => user.id === data.userId);

  const answerLike = data.likedBy.length - data.disLikedBy.length;

  const changeEditStatus = () => {
    setIsEditing(!isEditing);//jei anksčiau redagavimo režimas buvo įjungtas, tada jis bus išjungtas, ir atvirkščiai.
  };

  const onEditComment = (id, updatedAnswer) => {
    updateAnswer(id, {
        ...updatedAnswer,
        isEdited: true,
        time: new Date().toLocaleString()
    });
    setIsEditing(false);
  };

  return (
    <div className="AnswerCards">
      <div className="ownerInfo">
      {AnswerOwner && 
        <>
        <div className="answer-info">
          <img
            className="avatarImg"
            src={AnswerOwner.image}
            alt="user avatar" 
          />
          <h5>{AnswerOwner.userName}</h5>
          </div>
        </>
      }
      {
        loggedInUser && loggedInUser.id === AnswerOwner.id &&
        <>
        <div className="ownerButtons">
          <button onClick={() => deleteAnswer(data.id)}>delete</button>
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
            <div><p>{answerLike} likes</p></div>
              <div>
                {data.isEdited && <p>Edited</p>}
                <p>{data.time} Posted</p>
                <p className="comment_ANSWER">{data.answer}</p>
              </div>
          </>
          )}
      </div>
      <div className="likeDislikeWrapper">
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
