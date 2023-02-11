/*import UserContext from "../contexts/UserContext";
import CommentsContext from "../contexts/CommentsContext";
import { useContext } from "react";
import Message from "./Message";

const UserPostedMessage = () => {

  const { loggedInUser } = useContext(UserContext);
  const { chatMessage } = useContext(CommentsContext);

  return (
    <>
      {
        chatMessage
          .filter(message => message.userId === loggedInUser.id)
          .map(message => 
            <Message 
              key={message.id}
              data={message}
            />  
          )
      }
    </>
  );
}
 
export default UserPostedMessage;
*/