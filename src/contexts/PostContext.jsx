import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import UserContext from "./UserContext";

const PostContext = createContext();

const PostProvider = ({children}) =>{
    const [post, setPost] = useState([]);
    const { loggedInUser } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:3000/posts');
            const data = await res.json();
            setPost(data);
        };
        fetchData();
    },[]);


const addNewPost = async (newPost) => {
    const res = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    });
    const data = await res.json();
    setPost([...post, data]);
}

const deletePost = async (id) => {
    await fetch(`http://localhost:3000/posts/${id}`, {
      method: 'DELETE',
    }).then(res => {
      if(res.ok){
        setPost(post.filter(post => post.id !== id))
      }
    }).catch(error => console.error(error));
  };

  const updatePost = async (id, updatedPost ) => {
    await fetch(`http://localhost:3000/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedPost),
      headers: { 'Content-Type': 'application/json' },
    }).then(res => {
      if(res.ok){
        setPost(post.map(post => post.id.toString() === id? {...post, ...updatedPost} : post));
      }
    }).catch(error => console.error(error));
  };

  const handleLike = async (id) => {
    const updatedPost = post.find(post => post.id === id);
    updatedPost.likedBy = updatedPost.likedBy ?? [];
    if(!updatedPost.likedBy.includes(loggedInUser.id)) {
        updatedPost.likedBy.push(loggedInUser.id);
    } else {
        updatedPost.likedBy = updatedPost.likedBy.filter(userId => userId !== loggedInUser.id);
    }
    await updatePost(id, updatedPost);
}

const handleDislike = async (id) => {
    const updatedPost = post.find(post => post.id === id);
    updatedPost.dislikedBy = updatedPost.dislikedBy ?? [];
    if (!updatedPost.dislikedBy.includes(loggedInUser.id)) {
      updatedPost.dislikedBy.push(loggedInUser.id);
    } else {
      updatedPost.dislikedBy = updatedPost.dislikedBy.filter(
        userId => userId !== loggedInUser.id
      );
    }
    await updatePost(id, updatedPost);
  };

return (
    <PostContext.Provider
        value={{
            post,
            setPost,
            addNewPost,
            deletePost,
            updatePost,
            handleLike,
            handleDislike
            
        }}
        >
        {children}
    </PostContext.Provider>
)

}

export {PostProvider};
export default PostContext;