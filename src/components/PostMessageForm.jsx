import { useContext, useState } from "react"
import { Store } from "../StoreContext"
import InfoPopup from "./InfoPopup"

const PostMessageForm = () => {
    const {state} = useContext(Store)
    const {pb} = state

    const initialFormData = {message: "", failed: false}
    const [formData, setFormData] = useState(initialFormData)

    const postMessage = async (ev, message) => {
        ev.preventDefault()
        
        try {
            const data = {
                "message": message,
                "user": pb.authStore.model.id
            };
            const record = await pb.collection('messages').create(data);
            setFormData(initialFormData)
        } catch(err){
            setFormData({...formData, failed: true})
            console.log(err)
        }
    }

    return (
            <form className=" grid grid-cols-3 grid-rows-4 border p-4 rounded-md shadow-lg" onSubmit={(ev) => postMessage(ev, formData.message)}>
                <textarea className="p-1 border rounded-md col-span-4 row-span-3 resize-none" value={formData.message} onChange={(ev) => setFormData({...formData, message:ev.target.value})}></textarea>
                <button className="border-blue-500 border px-2 py-1 rounded-md bg-blue-400 shadow-inner font-bold text-white mt-4 hover:underline">Post</button>
                <p className={"col-start-3 flex items-center justify-center mt-4"} style={{"color": ((200 - formData.message.length) >= 0 ? "black": "red")}}>{200 - formData.message.length}</p>
            </form>        
    )
}

export default PostMessageForm