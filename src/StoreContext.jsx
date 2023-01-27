import React, { createContext, useReducer } from 'react';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://api.mackmonkey.ca/');

const initialState = {
    posts: [],
    pb
}

export const Store = createContext(initialState)

const setPosts = (state, posts) => {
    console.log(posts)
    return ({...state, posts: posts})
}

const updatePb = (state, newPb) => {
    return ({...state, pb: newPb})
}

const setOrg = (state, organization) => {
    return ({...state, org: organization})
}

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_POSTS":
            return setPosts(state, action.postsList)
        case "UPDATE_PB":
            return updatePb(state, action.newPb)
        case "SET_ORG":
            return setOrg(state, action.organization)
        default:
            console.log(`No action of type "${action.type}"`)
            return state
        }
}

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
}