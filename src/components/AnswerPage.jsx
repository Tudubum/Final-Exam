import PostContext from "../contexts/PostContext";
import AnswersContext from "../contexts/CommentsContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import Answer from "../components/Message";
import MessageForm from "../components/MessageForm"
import Post from "../components/Post";


const AnswerPage = () => {

    const { id } = useParams();
    const { post } = useContext(PostContext);    
    const { answers } = useContext(AnswersContext);

    const selectedQuestion = post.find(post => post.id.toString() === id);
    
    const selectedQuestionAnswers = answers.filter(answer => answer.questionId.toString() === id);

    return (
      <>
      <Post data={selectedQuestion}/>
      <MessageForm />
      <div>
            {
                selectedQuestionAnswers.map((answer, index) =>
                <Answer
                   key={answer.id || index}
                   data={answer}
                   />
                )
            }
        </div>
     
   
      
      </>
    );
  }
   
  export default AnswerPage;