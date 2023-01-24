import { useContext, useEffect, useState } from "react"


import MessageLittle from "./components/MessageLittle";
import LoginForm from "./components/LoginForm";
import { Store } from "./StoreContext";
import CreateAccountForm from "./components/CreateAccountForm";
import PostMessageForm from "./components/PostMessageForm";

const Home = () => {
    const {state} = useContext(Store)
    const {pb} = state

    const [posts, setPosts] = useState([])
    const [message, setMessage] = useState("")

    const getPosts = async () => {
        const records = await pb.collection('messages').getFullList(200 /* batch size */, {
            sort: '-created',
            expand: 'user'
        });
        return records
    }

    const postMessage = async (ev) => {
        ev.preventDefault()
        const data = {
            "message": message,
            "user": pb.authStore.model.id
        };
        
        const record = await pb.collection('messages').create(data);
    }

    useEffect(() => {
        getPosts().then((res) => {
            console.log(res)
            setPosts(res)
        }).catch((err) => {
            console.log(err)
        })
    }, [])


    return (
        <section>
            <PostMessageForm/>
            <LoginForm/>
            <CreateAccountForm/>

            <h1 className="text-xl mb-10">View Posts:</h1>
            {posts.length && posts.map((post) => {
                return (
                    <MessageLittle key={post.id} user={post.expand.user} message={post.message} time={post.created} />
                    
                )
            })}
        </section>
    )
}

export default Home