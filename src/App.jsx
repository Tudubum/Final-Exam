import './App.css';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AddPostForm from './components/AddPostForm';
import EditPost from './components/EditPost';
import PostOwnerPosts from './components/PostOwnerPosts';
import LikedPosts from './components/LikedPosts';

function App() {
  return (
   <>
    <Navbar/>
    <Routes>
        <Route path="/signUp" element={<SignUp />}/>
        <Route path="/logIn" element={<LogIn />}/>
        <Route path="/" element={<Home />}/>
        <Route path="/add" element={<AddPostForm />}/>
        <Route path="/editPost/:id" element={<EditPost/>}/>
        <Route path="/postOwnerPosts" element={<PostOwnerPosts/>}/>
        <Route path="/liked" element={<LikedPosts/>}/>
    </Routes>
    
   </>
  );
}

export default App;
