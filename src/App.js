import React, { Component, useEffect, useState } from 'react';
import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-router-dom";
// import Home from './pages/Home';
import Chat from './pages/Chat';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { auth } from './services/firebase';
import './styles.css';

function PrivateRoute({ component: Component, authenticated, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => authenticated === true ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
        />
    );
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => authenticated === false ? <Component {...props} /> : <Redirect to='/chat' />}
        />
    );
}

function App() {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            if (user) {
                setAuthenticated(true);
                setLoading(false);
            } else {
                setAuthenticated(false);
                setLoading(false);
            }
        });
    });

    return (
        loading === true ? <h2>Loading...</h2> : (
            <Router>
                <Switch>
                    {/* <Route exact path="/" component={Home}></Route> */}
                    <PrivateRoute path="/chat" authenticated={authenticated} component={Chat}></PrivateRoute>
                    <PublicRoute path="/signup" authenticated={authenticated} component={Signup}></PublicRoute>
                    <PublicRoute path="/login" authenticated={authenticated} component={Login}></PublicRoute>
                </Switch>
            </Router>
        )
    );
}

export default App;
