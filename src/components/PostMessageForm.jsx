import { useContext, useState } from "react"
import { Store } from "../StoreContext"

const PostMessageForm = () => {
    const {state} = useContext(Store)
    const {pb} = state

    const [formData, setFormData] = useState({message: ""})

    const postMessage = async (ev, message) => {
        ev.preventDefault()
        const data = {
            "message": message,
            "user": pb.authStore.model.id
        };
        
        const record = await pb.collection('messages').create(data);
    }

    return (
        <form className="border p-4 rounded-md shadow-lg" onSubmit={(ev) => postMessage(ev, formData.message)}>
            <div className="mb-2">
                <label>Message</label>
                <textarea className="p-1 border ml-2 rounded-md" value={formData.message} onChange={(ev) => setFormData({...formData, message:ev.target.value})}></textarea>
            </div>
            <button className="border-blue-500 border px-2 py-1 rounded-md bg-blue-400 shadow-inner font-bold text-white mt-4">Post</button>
        </form>
    )
}

export default PostMessageForm