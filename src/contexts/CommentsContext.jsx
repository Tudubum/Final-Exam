import { createContext, useState, useEffect, useContext } from "react";
import UserContext from "./UserContext"

const CommentsContext = createContext();
const CommentsProvider = ({children}) => {

    const [comments, setComments] = useState([]);
    const { loggedInUser } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://localhost:3000/comments");
            const data = await res.json();
            setComments(data);
        };
        fetchData();
    }, []);
    
    const addNewComments = async (newComments) =>{
        await fetch("http://localhost:3000/comments",{
            method: "POST",
            body: JSON.stringify(newComments),
            headers: { "Content-Type": "application/json"},
        }).then (res => res.json())
        .then(data => setComments([...comments,data]));
    }

    const deleteComment = async (id) =>{
        await fetch(`http://localhost:3000/comments/${id}`, {
            method: "DELETE",
        }).then(res => {
            if(res.ok){
                setComments(comments.filter(comment => comment.id !==id))
            }
        })
    };

    const updateComment =  async (id, updatedComment) => {
        await fetch(`http://localhost:3000/comments/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedComment),
        headers: { 'Content-Type': 'application/json' },
      }).then(res => {
        if(res.ok){
            setComments(comments.map(comment => comment.id === id ? {...comments, comment: updatedComment.com, ...updatedComment} : comment));

      }
    })
    };

    const handleLike = async (id) => {
        const updatedComment = comments.find(comment => comment.id === id);
        if(!updatedComment.likedBy.includes(loggedInUser.id)) {
            updatedComment.likedBy.push(loggedInUser.id);
            updatedComment.disLikedBy = updatedComment.disLikedBy.filter(userId => userId !== loggedInUser.id);
        } else {
            updatedComment.likedBy = updatedComment.likedBy.filter(userId => userId !== loggedInUser.id);
        }
        await updateComment(id, updatedComment);
      }
      
      const handleDisLike = async (id) => {
        const updatedComment = comments.find(comment => comment.id === id);
        if(!updatedComment.disLikedBy.includes(loggedInUser.id)) {
            updatedComment.disLikedBy.push(loggedInUser.id);
            updatedComment.likedBy = updatedComment.likedBy.filter(userId => userId !== loggedInUser.id);
        } else {
            updatedComment.disLikedBy = updatedComment.disLikedBy.filter(userId => userId !== loggedInUser.id);
        }
        await updateComment(id, updatedComment);
      }
      
    return(
        <CommentsContext.Provider
          value={{
            addNewComments,
            deleteComment,
            updateComment,
            comments,
            handleLike,
            handleDisLike
          }}
        >
        {children}
        </CommentsContext.Provider>
    );
}

export { CommentsProvider };
export default CommentsContext;