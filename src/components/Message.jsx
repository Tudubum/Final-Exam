import UserContext from "../contexts/UserContext";
import AnswersContext from "../contexts/CommentsContext";
import { useContext, useState } from "react";
import EditAnswer from "./EditMessage";

const Answer = ({ data }) => {

  const [isEditing, setIsEditing] = useState(false);

  const { users, loggedInUser } = useContext(UserContext);
  const { deleteAnswer, handleLike, handleDisLike,updateAnswer } = useContext(AnswersContext);

  const AnswerOwner = users.find(user => user.id === data.userId);
  const AnswerVote = data.likedBy.length - data.disLikedBy.length;

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const onUpdate = (id, updatedAnswer) => {
    updateAnswer(id, {
        ...updatedAnswer,
        isEdited: true,
        timestamp: new Date().toLocaleString()
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
          <button onClick={toggleEdit}>edit</button>
        </div>  
        </>
      }
      </div>
      <br/>
      <div className="line"></div>
      <div className="AnswerCardDataInfo">
      {isEditing ? (
              <EditAnswer data={data} setIsEditing={setIsEditing} onUpdate={onUpdate} />
            ) : (
        <>
        <div><p>{AnswerVote} likes</p></div>
      <div>
      {data.isEdited && <p>Edited</p>}
      <p>{data.timestamp} Posted</p>
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
 
export default Answer;
