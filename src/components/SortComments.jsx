import Posts from "./Posts";
import { useState, useEffect } from "react";
import { useContext } from "react";

import PostContext from "../contexts/PostContext";
import CommentsContext from "../contexts/CommentsContext";

const SortComments = () => {

    const [showPosts, setShowPosts] = useState([]);
    const [selectedButton, setSelectedButton] = useState(null);

    const { post } = useContext(PostContext);    
    const { comments } = useContext(CommentsContext);
  
    useEffect(() => {
      setShowPosts(post);
    }, [post, comments]);
  
  
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
    
    const commentedPosts = () => {
        const commented = post.filter(post => {
          return comments.some(comment => comment.questionId === post.id);
        });
    
        setShowPosts(commented);
      };
    
      const uncommentedPosts = () => {
        const uncommented = post.filter(post => {
          return !comments.some(comment => comment.questionId === post.id);
        });
    
        setShowPosts(uncommented);
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
      className={selectedButton === 'commented' ? 'selected' : ''}
      onClick={() => {
        handleButtonClick('commented');
        commentedPosts();
      }}
    >
      Atsakyti postai
    </button>
  <button 
      className={selectedButton === 'uncommented' ? 'selected' : ''}
      onClick={() => {
        handleButtonClick('uncommented');
        uncommentedPosts();
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

