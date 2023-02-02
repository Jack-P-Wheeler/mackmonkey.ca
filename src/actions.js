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

export const setOrganizationAction = (dispatch, orgInfo) => {
    dispatch({
        type: "SET_ORG",
        organization: orgInfo
    })
}

export const setDocumentAction = (dispatch, document) => {
    dispatch({
        type: "SET_DOCUMENT",
        document: document
    })
}

export const setFamilyAction = (dispatch, family) => {
    dispatch({
        type: "SET_FAMILY",
        family: family
    })
}