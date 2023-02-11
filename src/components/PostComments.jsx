/*import AnswersContext from "../contexts/CommentsContext";
import MessageForm from "./MessageForm";
import Messages from "./Messages";
import Post from "./Post";
import { useContext } from "react";
import PostContext from "../contexts/PostContext";
import { useParams } from "react-router-dom";


const PostComments = ({data}) => {

const { id } = useParams();

  const { answers } = useContext(AnswersContext);
  const {post} = useContext(PostContext)

  const selectedQuestion = post.find(post => post.id.toString() === id);
    console.log(selectedQuestion)
    console.log(post)

  const selectedQuestionAnswers = answers.filter(answer => answer.questionId === id);

  return (
    <>
    <Post post={selectedQuestion}/>
    <MessageForm />
    <Messages answers={selectedQuestionAnswers} />
 
    
    </>
  );
};

export default PostComments;
*/