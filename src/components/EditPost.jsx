import PostContext from "../contexts/PostContext";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const EditPost = () => {

    const { id } = useParams();

  const { post, updatePost } = useContext(PostContext);

  const currentPost = post.find(post => post.id.toString() === id) || {};

  const navigation = useNavigate();

  const [formInputs, setFormInputs] = useState({
    title: currentPost.title || "",
    description: currentPost.description || "",
  });

  const handleSubmit = e => {
    e.preventDefault();
    
    updatePost(id, formInputs);
    
    navigation('/');
  }

  return (
    <div className="editPostForm">
      <h3>EDIT POST</h3>
         <form onSubmit={handleSubmit}>
             <label>
                 Pavadinimas:
                 <input type="text" value={formInputs.title} 
                onChange={(e) => setFormInputs({...formInputs, title:e.target.value})}
                  />
             </label>
             <label>
                 Aprašymas:
                 <input type="text" value={formInputs.description} 
                 onChange={(e)=> setFormInputs({...formInputs, description:e.target.value})}
                 />
             </label>
             <button className="submit" type="submit">Edit post</button>
         </form>
    </div>
  );
}

 
export default EditPost;