import React, { useState } from "react";
import { signout } from "../helpers/auth";

export default function Chat() {
    const [state, setState] = useState({
        error: null
    });

    const signOutUser = async () => {
        try {
            await signout();
        } catch(error) {
            setState({ error: error.message });
        }
    };

    return (
        <button onClick={signOutUser}>Sign out</button>
    );
}