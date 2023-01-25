import { useContext, useEffect, useState } from "react"
import { Store } from "../StoreContext"
import { getPostsAction } from "../actions"
import MessageLittle from "./MessageLittle"

const PostLoader = ({postType}) => {
    const {state, dispatch} = useContext(Store)
    const [page, setPage] = useState(1)
    const [maxPages, setMaxPages] = useState(1)
    const {pb} = state

    const getPosts = async () => {
        const records = await pb.collection('messages').getList(page, 3 /* batch size */, {
            sort: '-created',
            expand: 'user',
        });
        console.log(records)
        setMaxPages(records.totalPages)
        getPostsAction(dispatch, records)
    }

    useEffect(() => {
        getPosts()
    }, [page])

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
            <nav className="flex justify-center">
                <button className="font-bold" onClick={() => page > 1 ? setPage(page - 1) : null}>Prev</button>
                <button className="font-bold ml-4" onClick={() => page < maxPages ? setPage(page + 1) : null}>Next</button>
            </nav>
            
        </section>
        
    )
}

export default PostLoader