import PostContext from "../contexts/PostContext";
import { useContext } from "react";
import Post from "./Post";

const Posts = ({postToShow}) => {
    const { post } = useContext(PostContext);
  
    return (
      <div className="Cards">
        { post ?
            post.map((post, index) =>
              <Post 
              key={post.id || index}
              data={post}
             />     
         )
        :
        <div className="loading">
            <h1>loading...</h1>
        </div>
        } 
      </div>
    );
  }
   
  export default Posts;