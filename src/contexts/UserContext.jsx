import { useEffect } from "react";
import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {

  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
        const res = await fetch('http://localhost:3000/users');
        const data = await res.json();
        setUsers(data);
    }
    fetchData();
}, []);

      const addNewUser = (newUser) =>{
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(data => {
            setUsers([...users, newUser]);
        });
    }

  const handleLogout = () => {
    setLoggedInUser(null);
    navigate("/");
};

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        loggedInUser,
        setLoggedInUser,
        addNewUser,
        handleLogout
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
export default UserContext;