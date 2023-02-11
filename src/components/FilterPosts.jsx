/*import { useState, useContext, useEffect } from 'react';
import PostContext from "../contexts/PostContext";
import AnswersContext from "../../context/CommentsContext";
import Posts from './Posts';

const FilterPosts = () => {

    const [postToShow, setPostToShow] = useState([]);
    const { post } = useContext(PostContext);    
    const { answers } = useContext(AnswersContext);

    useEffect(() => {
        setPostToShow(post);
      }, [post, answers]);

    return ( 
        <>
            <Posts postToShow={postToShow} />
        </>
     );
}
 
export default FilterPosts;
*/