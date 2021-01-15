import React, { useRef, useEffect, useState } from 'react';
import Header from "../components/Header";
import { auth, db } from '../services/firebase';

export default function Chat() {
    const [state, setState] = useState({
        user: auth().currentUser,
        chats: [],
        content: '',
        readError: null,
        writeError: null,
        loadingChats: false
    });

    const myRef = useRef();

    useEffect(() => {
        setState((prevProps) => ({
            ...prevProps,
            readError: null,
            loadingChats: true
        }));
        const chatArea = myRef.current;
        try {
            db.ref("chats").on("value", snapshot => {
                let chats = [];
                snapshot.forEach((snap) => {
                    chats.push(snap.val());
                });
                chats.sort((a, b) => { return a.timestamp - b.timestamp })
                setState((prevProps) => ({
                    ...prevProps,
                    chats,
                    loadingChats: false
                }));
                chatArea.scrollBy(0, chatArea.scrollHeight);
            })
        } catch(error) {
            setState((prevProps) => ({
                ...prevProps,
                readError: error.message,
                loadingChats: false
            }));
        }
    }, []);

    const handleChange = (event) => {
        setState((prevProps) => ({
            ...prevProps,
            content: event.target.value
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setState((prevProps) => ({
            ...prevProps,
            writeError: null
        }));
        const chatArea = myRef.current;
        try {
            await db.ref("chats").push({
                content: state.content,
                timestamp: Date.now(),
                uid: state.user.uid
            });
            setState((prevProps) => ({
                ...prevProps,
                content: ''
            }));
            chatArea.scrollBy(0, chatArea.scrollHeight);

        } catch (error) {
            setState((prevProps) => ({
                ...prevProps,
                writeError: error.message
            }));
        }
    }

    const formatTime = (timestamp) => {
        const d = new Date(timestamp);
        const time = `${d.getDate()}/${(d.getMonth()+1)}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
        return time;
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