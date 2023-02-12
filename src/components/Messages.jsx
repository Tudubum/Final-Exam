import CommentsContext from "../contexts/CommentsContext";
import { useContext } from "react";
import Message from "./Message";

const Messages = () => {

  const { comments } = useContext(CommentsContext);
 
  return (
    <>
    <div className="messages_Container">
        {comments ?
          comments.map((comment, index) => 
            <Message 
              key={comment.id || index}
              data={comment}
            />  
          )
          :
          <p>Loading...</p>
        }
      </div>
    </>
  );
}
 
export default Messages;
