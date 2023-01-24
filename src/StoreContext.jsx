import React, { createContext, useReducer } from 'react';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://mackmonkey.ca:8090');

const initialState = {
    pb
}

export const Store = createContext(initialState)

const reducer = (state, action) => {
    switch (action.type) {
        default:
            console.log(`No action of type "${action.type}"`)
            return state
        }
}

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
}