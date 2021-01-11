import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { signup } from "../helpers/auth";
import { useInput } from "../helpers/input";

export default function Signup() {
    const [error, setError] = useState(null);
    const [email, emailInput] = useInput({ type: "email" });
    const [password, passwordInput] = useInput({ type: "password" });

    return(
        <div>
            <form onSubmit={this.handleSubmit}>
                <h1>
                    Sign Up to
                    <Link to="/">Chatty</Link>
                </h1>
                <p>Fill in the form below to create an acount.</p>
                <div>
                    <input placeholder="Email" name="email" type="email" onChange={this.handleChange} value={email}></input>
                </div>
                <div>
                    <input placeholder="Password" name="password" onChange={this.handleChange} value={password}></input>
                </div>
                <div>
                    {error ? <p>{error}</p> : null}
                    <button type="submit">Sign up</button>
                    <hr></hr>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </form>
        </div>
    );
}