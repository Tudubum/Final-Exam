import CommentsContext from "../contexts/CommentsContext";
import MessageForm from "./MessageForm";
import Messages from "./Messages";
import Message from "./Message";
import { useContext } from "react";

const PostComments = () => {

    return ( 
        <>
        <MessageForm/>
        <Messages/>
        </>
     );
}
 
export default PostComments;