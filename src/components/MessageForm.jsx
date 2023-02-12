import CommentsContext from "../contexts/CommentsContext";
import UserContext from "../contexts/UserContext";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MessageForm = ( ) => {

  const { id } = useParams();

    const [formInputs, setFormInputs] = useState({
       comment: "", 
    });

    const { addNewComments } = useContext(CommentsContext);
    const { loggedInUser } = useContext(UserContext);
    const navigation = useNavigate()
   
    const handleSubmit = e => {
        e.preventDefault();
        const newComments ={
            comment: formInputs.comment,
            id: Date.now(),
            userId: loggedInUser.id,
            questionId: Number(id),
            time: new Date().toLocaleString(),
            isEdited: false,
            likedBy: [],
            disLikedBy: []
        };

        addNewComments(newComments);
        setFormInputs({ comment: "" });
        navigation()
    }
    return(
        <form onSubmit={handleSubmit} className="AddComment-form">
        <label>
          Leave your comment:
          <textarea type="text" name="comment"
          placeholder="type here..."
            value={formInputs.comment}
            onChange={(e) => setFormInputs({...formInputs, comment:e.target.value})}
          />
        </label>
        <input type="submit" className="submit" value="Send" />
        </form>
    );
};

export default MessageForm;