import './App.css';

import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import Home from './components/Home';
import AddPostForm from './components/AddPostForm';
import EditPost from './components/EditPost';
import PostOwnerPosts from './components/PostOwnerPosts';
import LikedPosts from './components/LikedPosts';
import PostComments from './components/PostComments';
import Footer from './components/Footer';
import AllPosts from './components/AllPosts';

function App() {
  return (
   <>
  <Navbar/>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/signUp" element={<SignUp />}/>
      <Route path="/logIn" element={<LogIn />}/>
      <Route path="/add" element={<AddPostForm />}/>
      <Route path="/editPost/:id" element={<EditPost/>}/>
      <Route path="/post/:id" element={<PostComments/>}/>
      <Route path="/postOwnerPosts" element={<PostOwnerPosts/>}/>
      <Route path="/liked" element={<LikedPosts/>}/>
      <Route path="/allPosts" element={<AllPosts/>}/>
    </Routes>
    <Footer/>
  </>
  );
}

export default App;
