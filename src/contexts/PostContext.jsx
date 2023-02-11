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
     await fetch('http://localhost:3000/posts', {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: {
            'Content-Type': 'application/json'
        }
    }) 
    .then(res => res.json())
    .then(data => setPost([...post, data]));
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
      method: 'PATCH',
      body: JSON.stringify(updatedPost),
      headers: { 'Content-Type': 'application/json' },
    }).then(res => {
      if(res.ok){
        setPost(post.map(post => post.id.toString() === id? {...post, ...updatedPost} : post));
      }
    })
  };
  
  const handleLike = async (id) => {
    const updatedPost= post.find(post => post.id === id);
    if(!updatedPost.likedBy.includes(loggedInUser.id)) {
        updatedPost.likedBy.push(loggedInUser.id);
        updatedPost.disLikedBy = updatedPost.disLikedBy.filter(userId => userId !== loggedInUser.id);
    } else {
        updatedPost.likedBy = updatedPost.likedBy.filter(userId => userId !== loggedInUser.id);
    }
    await updatePost(id, updatedPost);
  }

const handleDisLike = async (id) => {
  const updatedPost= post.find(post => post.id === id);
  if(!updatedPost.disLikedBy.includes(loggedInUser.id)) {
      updatedPost.disLikedBy.push(loggedInUser.id);
      updatedPost.likedBy = updatedPost.likedBy.filter(userId => userId !== loggedInUser.id);
  } else {
      updatedPost.disLikedBy = updatedPost.disLikedBy.filter(userId => userId !== loggedInUser.id);
  }
  await updatePost(id, updatedPost);
}


return (
    <PostContext.Provider
        value={{
            post,
            setPost,
            addNewPost,
            deletePost,
            updatePost,
            handleLike,
            handleDisLike
            
            
        }}
        >
        {children}
    </PostContext.Provider>
)

}

export {PostProvider};
export default PostContext;