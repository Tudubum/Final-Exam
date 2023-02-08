import PostContext from "../contexts/PostContext";
import { useContext } from "react";
import Post from "./Post";

const Posts = () => {
    const { post } = useContext(PostContext);
  
    return (
      <div className="Cards">
        {
            post ?
            <>
                {post.map(p =>
                 <Post 
                 key={p.id}
                 data={p}
                />     
            )}
        </>
        :
        <div className="loading">
            <h1>loading...</h1>
        </div>
        } 
      </div>
    );
  }
   
  export default Posts;