import Post from "./Post";

const Posts = ({showPosts}) => {
  
    return (
      <div className="Cards">
        { showPosts ?
            showPosts.map((post, index) =>
              <Post 
              key={post.id || index}
              data={post}
             />     
         )
        :
        <div className="loading">
            <h1>Loading...</h1>
        </div>
        } 
      </div>
    );
  }
   
  export default Posts;