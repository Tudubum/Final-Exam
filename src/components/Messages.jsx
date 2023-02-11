import CommentsContext from "../contexts/CommentsContext";
import { useContext } from "react";
import Message from "./Message";

const Messages = () => {

  const { answers } = useContext(CommentsContext);
 
  return (
    <>
    <div className="messages_Container">
        {answers ?
          answers.map((answer, index) => 
            <Message 
              key={answer.id || index}
              data={answer}
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
