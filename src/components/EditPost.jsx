import PostContext from "../contexts/PostContext";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {

  const { id } = useParams();

  const { post, updatePost } = useContext(PostContext);
  
  const navigation = useNavigate();

  const currentPost = post.find(post => post.id.toString() === id)

  const [formInputs, setFormInputs] = useState({
    title: currentPost.title,
    description: currentPost.description,
    time: currentPost.time,
    isEdited: currentPost.isEdited
  });
  
  const handleSubmit = e => {
    e.preventDefault();
    updatePost(id, {...formInputs, time: new Date().toLocaleString(), isEdited: true});
    navigation('/');
  }

  return (
    <>
    <form onSubmit={handleSubmit} className='Edit-form'>
      <h2>Edit Question</h2>
        <label>
          Title:
          <input type="text" name="title"
            value={formInputs.title}
            onChange={(e) => setFormInputs({...formInputs, title:e.target.value})}
          />
        </label>
        <label>
          Description:
          <textarea type="text" name="description"
            value={formInputs.description}
            onChange={(e) => setFormInputs({...formInputs, description:e.target.value})}
          />
        </label>
        <input type="submit" value="Edit" />
        </form>
    </>
  );
}
 
export default EditPost;