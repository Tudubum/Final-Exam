import PostContext from "../contexts/PostContext";
import CommentsContext from "../contexts/CommentsContext";
import Message from "../components/Message";
import MessageForm from "../components/MessageForm"
import Post from "../components/Post";
import UserContext from "../contexts/UserContext";

import { useContext } from "react";
import { useParams } from "react-router-dom";

const PostComments = () => {

    const { id } = useParams();
    const { post } = useContext(PostContext);    
    const { comments } = useContext(CommentsContext);

    const { loggedInUser } = useContext(UserContext);

    const selectedPosts = post.find(post => post.id.toString() === id);
    
    const selectedPostsComments = comments.filter(comment => comment.questionId.toString() === id);

    return (
      <>
           { loggedInUser ? (
        <>
          <div className="both_commentForm_post">
            <Post data={selectedPosts}/>
            <hr className="line"/>
            <MessageForm />
          </div>
          <div className="post_commentsPart">
            <h3>All comments:</h3>
              {
                selectedPostsComments.length ? (
                  selectedPostsComments.map((comment, index) =>
                  <Message
                     key={comment.id || index}
                     data={comment}
                     />
                  )
                ) : (
                  <p>No comments yet</p>
                )
              }
            </div>
        </>
      ) : (
        <p>Please log in to see the post and comments.</p>
      )}
    </>
  );
}


export default PostComments;
