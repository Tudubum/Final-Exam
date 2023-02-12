import PostContext from "../contexts/PostContext";
import UserContext from "../contexts/UserContext";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPostForm = () => {

    const [formInputs, setFormInputs] = useState({
      title: '',
      description: '',
   
    });
     
      const { addNewPost } = useContext(PostContext);
      const { loggedInUser } = useContext(UserContext);
    
      const navigation = useNavigate();
    
      const handleSubmit = e => {
        e.preventDefault();
        const newPost = {
          title: formInputs.title,
          description: formInputs.description,
          time: new Date().toLocaleString(),
          id: Date.now(),
          userId: loggedInUser.id,
          isEdited: false,
          likedBy: [],
          disLikedBy: [],
        };
    
        addNewPost(newPost);
        navigation('/');
      }
    
      if (!loggedInUser) {
        return (
          <div>
            <h3>Please log in to add a new post.</h3>
          </div>
        );
      }
      
      return (
         <>
         
         <div className="postForm">
         <h3>ADD NEW POST</h3>
             <form onSubmit={handleSubmit}>
                 <label>
                     Pavadinimas:
                     <input type="text" value={formInputs.title} 
                    onChange={(e) => setFormInputs({...formInputs, title:e.target.value})}
                      />
                 </label>
                 <label>
                     Aprašymas:
                     <textarea type="textarea" value={formInputs.description} 
                     onChange={(e)=> setFormInputs({...formInputs, description:e.target.value})}
                     />
                 </label>
                 <button className="submit" type="submit">Add</button>
             </form>
         </div>
     </> );
}
 
export default AddPostForm;