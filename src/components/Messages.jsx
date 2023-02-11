import AnswersContext from "../contexts/CommentsContext";
import { useContext } from "react";
import Answer from "./Message";

const Answers = () => {

  const { answers } = useContext(AnswersContext);
 
console.log(answers)
  return (
    <>
    <div className="AnswersCardsWrapper">
        {answers ?
          answers.map((answer, index) => 
            <Answer 
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
 
export default Answers;
