import PostContext from "../contexts/PostContext";
import CommentsContext from "../contexts/CommentsContext";
import Message from "../components/Message";
import MessageForm from "../components/MessageForm"
import Post from "../components/Post";

import { useContext } from "react";
import { useParams } from "react-router-dom";

const PostComments = () => {

    const { id } = useParams();
    const { post } = useContext(PostContext);    
    const { answers } = useContext(CommentsContext);

    const selectedPosts = post.find(post => post.id.toString() === id);
    
    const selectedPostsAnswers = answers.filter(answer => answer.questionId.toString() === id);

    return (
      <>
      <Post data={selectedPosts}/>
      <MessageForm />
      <div>
            {
                selectedPostsAnswers.map((answer, index) =>
                <Message
                   key={answer.id || index}
                   data={answer}
                   />
                )
            }
        </div>
      </>
    );
  }

export default PostComments;
