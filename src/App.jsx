import './App.css';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
   <>
    <Navbar/>
    <Routes>
        <Route path="/signUp" element={<SignUp />}/>
        <Route path="/logIn" element={<LogIn />}/>
    </Routes>
   </>
  );
}

export default App;
