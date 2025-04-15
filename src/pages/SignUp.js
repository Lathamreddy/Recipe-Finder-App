import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import './SignUp.css';

const SignUpSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(4, "Minimum 4 characters").required("Required"),
});

const SignUp = () => {
    const navigate = useNavigate();

    return (
        <div className="login-wrapper">
            <div className="container mt-4">
                <h2>Sign Up</h2>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={SignUpSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        const users = JSON.parse(localStorage.getItem("users")) || [];
                        const exists = users.find((u) => u.email === values.email);
                        if (exists) {
                            alert("User already exists!");
                            setSubmitting(false);
                        } else {
                            users.push(values);
                            localStorage.setItem("users", JSON.stringify(users));
                            alert("Signup successful!");
                            navigate("/"); // 👈 Redirect to login ("/") instead of "/login"
                        }
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

                            <button type="submit" className="btn btn-success" disabled={isSubmitting}>
                                {isSubmitting ? "Signing up..." : "Sign Up"}
                            </button>

                            <p className="mt-3">
                                Already have an account? <Link to="/">Login</Link> {/* 👈 updated */}
                            </p>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default SignUp;
