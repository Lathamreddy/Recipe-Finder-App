import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import './Login.css';
 
const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
});
 
const Login = () => {
    const navigate = useNavigate();
 
    return (
        <div className="login-page">
            <h1 className="welcome-title text-center mb-4">Welcome To Recipe Finder</h1>
        
        <div className="login-wrapper">
            <div className="container mt-4">
                
                <h2>Login</h2>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={LoginSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        const users = JSON.parse(localStorage.getItem("users")) || [];
                        const match = users.find(
                            (u) => u.email === values.email && u.password === values.password
                        );
                        if (match) {
                            localStorage.setItem("user", JSON.stringify(match));
                            alert("Login successful!");
                            navigate("/home");
                        } else {
                            alert("Invalid credentials");
                        }
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-3">
                                <label>Email</label>
                                <Field type="email" name="email" className="form-control" />
                                <ErrorMessage name="email" component="div" className="text-danger" />
                            </div>
 
                            <div className="mb-3">
                                <label>Password</label>
                                <Field type="password" name="password" className="form-control" />
                                <ErrorMessage name="password" component="div" className="text-danger" />
                            </div>
 
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                {isSubmitting ? "Logging in..." : "Login"}
                            </button>
 
                            <p className="mt-3">
                                Don't have an account? <Link to="/signup">Sign up</Link>
                            </p>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
        </div>
 
    );
};
 
export default Login;