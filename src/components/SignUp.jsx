import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";

import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

import UserContext from "../contexts/UserContext";


const SignUp = () => {
    const [formInputs, setFormInputs] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        image: ''
      });

      const [invalidUsername, setInvalidUsername] = useState(false);
      const navigation = useNavigate();
    
      const { users, addNewUser, setLoggedInUser } = useContext(UserContext);
    
      const handleSubmit = (values, { setSubmitting }) => {
        if (values.password !== values.confirmPassword) {
          setSubmitting(false);
          return;
        }
        if (users.find(user => user.userName === values.userName)) {
          setInvalidUsername(true);
          setSubmitting(false);
        } else {
          let newUser = {
            ...values,
            id: Date.now(),
         
          };
          fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
          })
            .then(response => response.json())
            .then(users => {
              addNewUser(newUser);
              setLoggedInUser(newUser);
              navigation('/');
            })
            .catch(error => {
              console.error('Error:', error);
            });
        }
      }
    
      const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
    
        const validationSchema = Yup.object().shape({
          userName: Yup.string()
            .max (15, 'Must be 10 characters or less')
            .required ('Required'),
          email: Yup.string()
            .email('This input must be a valid email.')
            .required('This field must be filled.'),
          password: Yup.string()
             .min(5)
             .matches(passwordRules, {message: "Password must contain at least 5 characters, one uppercase, one number and one lowercase character"})
             .required('Required'),
          confirmPassword: Yup.string()
             .oneOf([Yup.ref('password'), null], 'Password must match')
             .required('Required'),
          image: Yup.string()
            .url('This field must be a valid URL address.')
            .required('Required')
      })
    
      return (
        <>
        
        <Formik 
          initialValues={formInputs}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setValues }) => (
            <Form className="forma">
              <div className="background">
            <div className="shape"></div>
            <div className="shape"></div>
        </div>
        <div className="SignUp-form">
          <h3>Sign Up</h3>
        <div className="wrapper">
            <label>
              User name:
              <Field
               type="text" name="userName" value={values.userName}
              onChange={(e) => setValues({ ...values, userName: e.target.value })}
              
              />
               {invalidUsername && <span>Username already taken</span>}
               {
               errors.userName && touched.userName ?
                <span>{errors.userName}</span>
                : null
               }
            </label>
            </div>
        <div className="wrapper">
            <label>
              Email:
              <Field
               type="text" name="email" value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              
              />
               {invalidUsername && <span>Email already taken</span>}
               {
               errors.email && touched.email ?
                <span>{errors.email}</span>
                : null
               }
            </label>
            </div>
    
            <div className="wrapper">
            <label>
            Password:
              <Field
              
              type="password" name="password" value={values.password}
              onChange={(e) => setValues({ ...values, password: e.target.value })}
              />
              {
                errors.password && touched.password ?
                <span>{errors.password}</span>
                : null
              }
            </label>
            </div>
            <div className="wrapper">
            <label>
              Confirm Password:
              <Field
               type="password" name="confirmPassword" value={values.confirmPassword}
                onChange={(e) => setValues({ ...values, confirmPassword: e.target.value })}
              />
              {
              errors.confirmPassword && touched.confirmPassword ?
               <span>{errors.confirmPassword}</span>
               : null
              }
            </label>
            </div>
            <div className="wrapper">
            <label>
              Profile image:
              <Field
              type="url" name="avatar" value={values.image}
                onChange={(e) => setValues({ ...values, image: e.target.value })}
              />
               {errors.image && touched.image ? (
                <span>{errors.image}</span>
              ) : null}
            </label>
            </div>
            <input type="submit" value="SignUp" />
            </div>
          </Form>
          )}
    </Formik> 
    
        </>
    
      );
    }
 
export default SignUp;