import { createContext, useEffect, useState } from "react";

const PostContext = createContext();

const PostProvider = ({children}) =>{
    const [post, setPost] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:3000/posts');
            const duomenys = await res.json();
            setPost(duomenys);
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

return (
    <PostContext.Provider
        value={{
            post,
            setPost,
            addNewPost
            
            
        }}
        >
        {children}
    </PostContext.Provider>
)

}

export {PostProvider};
export default PostContext;