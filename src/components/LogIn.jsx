import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LogIn = () => {
    const [loginError, setLoginError] = useState(false);
    const { users, setLoggedInUser } = useContext(UserContext);
    const navigation = useNavigate();
  
    const handleSubmit = async (values, { setSubmitting }) => {
      const loggedInUser = users.find(
        user => user.email === values.email && user.password === values.password
      );
  
      if (loggedInUser) {
        setLoggedInUser(loggedInUser);
        navigation("/home");
      } else {
        setLoginError(true);
      }
  
      setSubmitting(false);
    };
  
    const validationSchema = Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
    });
  
    return (
      <>
        <div>
          <Formik
            initialValues={{
              email: "",
              password: ""
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <h1>Welcome back</h1>
                <h3>Please enter your details</h3>
                <div>
                  <Field type="email" name="email" />
                  <ErrorMessage name="email" component="div" />
                </div>
                <div>
                  <Field type="password" name="password" />
                  <ErrorMessage name="password" component="div" />
                </div>
                <button type="submit" disabled={isSubmitting}>
                  Log In
                </button>
  
                {loginError && <span className="error">Incorrect login information</span>}
              </Form>
            )}
          </Formik>
        </div>
      </>
    );
  };

  export default LogIn;