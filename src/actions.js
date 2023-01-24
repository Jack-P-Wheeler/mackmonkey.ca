export const updatePbAction = (dispatch, pocketbase) => {
    dispatch({
        type: 'UPDATE_PB',
        newPb: pocketbase
    })
}

export const getPostsAction = (dispatch, postsList) => {
    dispatch({
        type: 'SET_POSTS',
        postsList: postsList.items
    })
}