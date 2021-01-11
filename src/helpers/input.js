import React, { Component, useState } from 'react';

export function useInput({ type }) {
    const [value, setValue] = useState("");
    const input = <input value={value} onChange={e => setValue(e.target.value)} type={type}></input>
    return [value, input];
}
