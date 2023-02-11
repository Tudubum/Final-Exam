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
//import MessageForm from './components/MessageForm';
import PostComments from './components/PostComments';

import AnswerPage from './components/AnswerPage';
import Footer from './components/Footer';


//  <Route path="/messageForm/:id" element={<MessageForm/>}/>


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
        <Route path="/post/:id" element={<AnswerPage/>}/>

        <Route path="/postOwnerPosts" element={<PostOwnerPosts/>}/>
        <Route path="/liked" element={<LikedPosts/>}/>
    </Routes>
    <Footer/>
    
   </>
  );
}

export default App;
