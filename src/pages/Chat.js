import React, { useEffect, useState } from 'react';
import { auth } from '../services/firebase';
import { db } from '../services/firebase';

export default function Chat() {
    const [state, setState] = useState({
        user: auth().currentUser,
        chats: [],
        content: '',
        readError: null,
        writeError: null
    });

    useEffect(() => {
        setState({ readError: null });
        try {
            db.ref("chats").on("value", snapshot => {
                let chats = [];
                snapshot.forEach((snap) => {
                    chats.push(snap.val());
                });
                setState({ chats });
            })
        } catch(error) {
            setState({ readError: error.message });
        }
    });

    return (
        <div>
            <div className="chats">
                {state.chats.map(chat => {
                    return <p key={chat.timestamp}>{chat.content}</p>
                })}
            </div>
            <div>
                Login in as: <strong>{state.user.email}</strong>
            </div>
        </div>
    );
}