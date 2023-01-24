import { useEffect, useState } from "react"
import PocketBase from 'pocketbase';

const Home = () => {
    const pb = new PocketBase('http://mackmonkey.ca:8090');
    const [posts, setPosts] = useState([])
    const [message, setMessage] = useState("")
    const [authData, setAuthData] = useState({})

    const getPosts = async () => {
        const records = await pb.collection('messages').getFullList(200 /* batch size */, {
            sort: '-created',
        });
        return records
    }

    const loginAuthWithPassword = async (username, password) => {
        const authData = await pb.collection('users').authWithPassword(
            username,
            password,
        );
        setAuthData(authData)
    }

    const postMessage = async (ev) => {
        ev.preventDefault()
        const data = {
            "message": message,
            "user": authData.record.id
        };
        
        const record = await pb.collection('messages').create(data);
    }

    useEffect(() => {
        getPosts().then((res) => {
            setPosts(res)
        }).catch((err) => {
            console.log(err)
        })
    }, [])


    return (
        <section>
            <button className="border rounded-sm" onClick={(ev) => loginAuthWithPassword("Test_user", "Test_pass")}>Login</button>
            <form onSubmit={(ev) => postMessage(ev)}>
                <input value={message} onChange={(ev) => setMessage(ev.target.value)}></input>
                <button>Post</button>
            </form>
            <h1>View Posts:</h1>
            {posts.length && posts.map((post) => {
                return (
                    <h1 key={post.id}>{post.message}</h1>
                )
            })}
        </section>
    )
}

export default Home