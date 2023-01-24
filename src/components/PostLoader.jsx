import { useContext, useEffect } from "react"
import { Store } from "../StoreContext"
import { getPostsAction } from "../actions"
import MessageLittle from "./MessageLittle"

const PostLoader = ({postType}) => {
    const {state, dispatch} = useContext(Store)
    const {pb} = state

    const getPosts = async () => {
        const records = await pb.collection('messages').getList(1, 3 /* batch size */, {
            sort: '-created',
            expand: 'user',
        });
        getPostsAction(dispatch, records)
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <section>
            {state.posts
                ? state.posts.map((post) => {
                    return (
                        <MessageLittle key={post.id} user={post.expand.user} message={post.message} time={post.created} />
                    )
                })
                : null
            }
        </section>
        
    )
}

export default PostLoader