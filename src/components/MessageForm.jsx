import AnswersContext from "../contexts/CommentsContext";
import UserContext from "../contexts/UserContext";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";




const AddAnswer = ( ) => {

  const { id } = useParams();

    const [formInputs, setFormInputs] = useState({
       answer: "", 
    });

    const { addNewAnswers } = useContext(AnswersContext);
    const { loggedInUser } = useContext(UserContext);
    const navigation = useNavigate()
   

    const handleSubmit = e => {
        e.preventDefault();
        const newAnswers ={
            answer: formInputs.answer,
            id: Date.now(),
            userId: loggedInUser.id,
            questionId: Number(id),
            timestamp: new Date().toLocaleString(),
            isEdited: false,
            likedBy: [],
            disLikedBy: []
        };

        addNewAnswers(newAnswers);
        setFormInputs({ answer: "" });
        navigation()
    }
    return(
        <form onSubmit={handleSubmit} className="AddAnswer-form">
        <label>
          Here you could leave your Answer:
          <textarea type="text" name="answer"
          placeholder="type here..."
            value={formInputs.answer}
            onChange={(e) => setFormInputs({...formInputs, answer:e.target.value})}
          />
        </label>
        <input type="submit" value="Send" />
        </form>
    )
}

export default AddAnswer