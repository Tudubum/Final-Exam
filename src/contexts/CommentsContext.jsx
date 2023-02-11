import { createContext, useState, useEffect, useContext } from "react";
import UserContext from "./UserContext"

const CommentsContext = createContext();
const CommentsProvider = ({children}) => {

    const [answers, setAnswers] = useState([]);
    const { loggedInUser } = useContext(UserContext);

    useEffect(() => {
        const data = async () => {
            const res = await fetch("http://localhost:3000/answers");
            const data = await res.json();
            setAnswers(data);
        };
        data();
    }, []);
    
    const addNewAnswers = async (newAnswers) =>{
        await fetch("http://localhost:3000/answers",{
            method: "POST",
            body: JSON.stringify(newAnswers),
            headers: { "Content-Type": "application/json"},
        }).then (res => res.json())
        .then(data => setAnswers([...answers,data]));
    }

    const deleteAnswer = async (id) =>{
        await fetch(`http://localhost:3000/answers/${id}`, {
            method: "DELETE",
        }).then(res => {
            if(res.ok){
                setAnswers(answers.filter(answer => answer.id !==id))
            }
        })
    };

    const updateAnswer =  async (id, updatedAnswer) => {
        await fetch(`http://localhost:3000/answers/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedAnswer),
        headers: { 'Content-Type': 'application/json' },
      }).then(res => {
        if(res.ok){
            setAnswers(answers.map(answer => answer.id === id ? {...answer, answer: updatedAnswer.answer, ...updatedAnswer} : answer));

      }
    })
    };

    const handleLike = async (id) => {
        const updatedAnswer = answers.find(answer => answer.id === id);
        if(!updatedAnswer.likedBy.includes(loggedInUser.id)) {
            updatedAnswer.likedBy.push(loggedInUser.id);
            updatedAnswer.disLikedBy = updatedAnswer.disLikedBy.filter(userId => userId !== loggedInUser.id);
        } else {
            updatedAnswer.likedBy = updatedAnswer.likedBy.filter(userId => userId !== loggedInUser.id);
        }
        await updateAnswer(id, updatedAnswer);
      }
      
      
      const handleDisLike = async (id) => {
        const updatedAnswer= answers.find(answer => answer.id === id);
        if(!updatedAnswer.disLikedBy.includes(loggedInUser.id)) {
            updatedAnswer.disLikedBy.push(loggedInUser.id);
            updatedAnswer.likedBy = updatedAnswer.likedBy.filter(userId => userId !== loggedInUser.id);
        } else {
            updatedAnswer.disLikedBy = updatedAnswer.disLikedBy.filter(userId => userId !== loggedInUser.id);
        }
        await updateAnswer(id, updatedAnswer);
      }
      
    return(
        <CommentsContext.Provider
          value={{
            addNewAnswers,
            deleteAnswer,
            updateAnswer,
            answers,
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