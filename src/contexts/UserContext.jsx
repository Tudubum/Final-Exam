import { useEffect } from "react";
import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState();


  useEffect(() => {
    const data = async () => {
        const res = await fetch('http://localhost:3000/users');
        const data = await res.json();
        setUsers(data);
    }
    data();
}, []);

  /*const addNewUser = (newUser) => {
    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();
        console.log(data);
        } catch (error) {
        console.error(error);
      }
      }  
*/
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

//const updatedUsers = await res.json();
//      setUsers([...users, updatedUsers]);
//      localStorage.setItem("users", JSON.stringify([...users, updatedUsers]));
//    } catch (err) {
//      console.error(err);
//    }
  


  const navigate = useNavigate();

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