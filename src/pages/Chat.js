import React, { useRef, useEffect, useState } from 'react';
import Header from "../components/Header";
import { auth, db } from '../services/firebase';

export default function Chat() {
    const [state, setState] = useState({
        user: auth().currentUser,
        chats: [],
        content: '',
        readError: null,
        writeError: null
    });

    useEffect(async () => {
        setState((prevProps) => ({
            ...prevProps,
            readError: null
        }));
        try {
            db.ref("chats").on("value", snapshot => {
                let chats = [];
                snapshot.forEach((snap) => {
                    chats.push(snap.val());
                });
                setState((prevProps) => ({
                    ...prevProps,
                    chats
                }));
            })
        } catch(error) {
            setState((prevProps) => ({
                ...prevProps,
                readError: error.message
            }));
        }
    }, []);

    function handleChange(event) {
        setState((prevProps) => ({
            ...prevProps,
            content: event.target.value
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        setState((prevProps) => ({
            ...prevProps,
            writeError: null
        }));
        // const chatArea = 
    }

    function formatTime(timestamp) {
        const d = new Date(timestamp);
        const time = ``;
    }

    return (
        <div>
            <Header />
            <div className="chat-area" ref={myRef}>
                {/* loading indicator */}
                {state.loadingChats ? <div className="spinner-border text-success" role="status">
                    <span className="sr-only">Loading...</span>
                </div> : ""}
                {/* chat area */}
                {state.chats && state.chats.map(chat => {
                    return <p key={chat.timestamp} className={"chat-bubble " + (state.user.uid === chat.uid ? "current-user" : "")}>
                    {chat.content}
                    <br />
                    <span className="chat-time float-right">{formatTime(chat.timestamp)}</span>
                    </p>
                })}
                </div>
                <form onSubmit={handleSubmit} className="mx-3">
                <textarea className="form-control" name="content" onChange={handleChange} value={state.content}></textarea>
                {state.error ? <p className="text-danger">{state.error}</p> : null}
                <button type="submit" className="btn btn-submit px-5 mt-4">Send</button>
                </form>
                <div className="py-5 mx-3">
                Login in as: <strong className="text-info">{state.user.email}</strong>
            </div>
      </div>
    );
}