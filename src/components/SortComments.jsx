import Posts from "./Posts";
import { useState, useEffect } from "react";
import { useContext } from "react";

import PostContext from "../contexts/PostContext";
import CommentsContext from "../contexts/CommentsContext";

const SortComments = () => {

    const [showPosts, setShowPosts] = useState([]);
    const [selectedButton, setSelectedButton] = useState(null);

    const { post } = useContext(PostContext);    
    const { answers } = useContext(CommentsContext);
  
    useEffect(() => {
      setShowPosts(post);
    }, [post, answers]);
  
  
    const sortFromNewest = () => {
      const sortedPosts = [...showPosts].sort((a, b) => {
        const dateA = new Date(a.time);
        const dateB = new Date(b.time);
        return dateA - dateB;
      });
      setShowPosts(sortedPosts);
    };
  
    const sortFromOldest = () => {
      const sortedPosts = [...showPosts].sort((a, b) => {
        const dateA = new Date(a.time);
        const dateB = new Date(b.time);
        return dateB - dateA;
      });
      setShowPosts(sortedPosts);
    };
    
    const answeredPosts = () => {
        const answered = post.filter(post => {
          return answers.some(answer => answer.questionId === post.id);
        });
    
        setShowPosts(answered);
      };
    
      const unansweredPosts = () => {
        const unanswered = post.filter(post => {
          return !answers.some(answer => answer.questionId === post.id);
        });
    
        setShowPosts(unanswered);
      };


    const handleButtonClick = (button) => {
        setSelectedButton(button);
      };
  
    return (
      <>
          <>
          <div className="sort_buttons">
    <button 
      className={selectedButton === 'newest' ? 'selected' : ''}
      onClick={() => {
        handleButtonClick('newest');
        sortFromNewest();
      }}
    >
      Seniausi postai
    </button>
    <button 
      className={selectedButton === 'oldest' ? 'selected' : ''}
      onClick={() => {
        handleButtonClick('oldest');
        sortFromOldest();
      }}
    >
      Naujausi postai
    </button>
 
  <button 
      className={selectedButton === 'answered' ? 'selected' : ''}
      onClick={() => {
        handleButtonClick('answered');
        answeredPosts();
      }}
    >
      Atsakyti postai
    </button>
  <button 
      className={selectedButton === 'unanswered' ? 'selected' : ''}
      onClick={() => {
        handleButtonClick('unanswered');
        unansweredPosts();
      }}
    >
      Ne Atsakyti postai
    </button>
  </div>
          </>
        <Posts showPosts={showPosts} />
      </>
    );
}
 
export default SortComments;

