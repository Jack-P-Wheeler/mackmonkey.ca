import { useContext, useState } from "react"
import { Store } from "../StoreContext"

const MediaUploadForm = () => {
    const {state} = useContext(Store)
    const {pb} = state

    const initialFormData = {title: "", description: "", file: null}
    const [formData, setFormData] = useState(initialFormData)
    

    const createAccount = async (ev, title, description, file) => {
        ev.preventDefault()
        
        const data = {
            "title": title,
            "description": description,
            "emailVisibility": false,
            "author": pb.authStore.model.id
        };
        
        const fileData = new FormData();

        Object.keys(data).forEach(field => {
            fileData.append(field, data[field])
        });

        fileData.append("file", file)
        
        try {
            const record = await pb.collection('media_library').create(fileData);
            console.log(record)
            setFormData(initialFormData)
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <form className="border p-4 rounded-md shadow-lg grid grid-cols-3 grid-rows-4" onSubmit={(ev) => createAccount(ev, formData.title, formData.description, formData.file)}>

                <label className="flex items-center mb-2">Title</label>
                <input className="p-1 border ml-2 rounded-md mb-2 col-span-2" value={formData.title} onChange={(ev) => setFormData({...formData, title:ev.target.value})} required></input>

                <label className="flex items-center mb-2">Description</label>
                <input className="p-1 border ml-2 rounded-md mb-2 col-span-2" value={formData.description} onChange={(ev) => setFormData({...formData, description:ev.target.value})} required></input>

                <label className="flex items-center mb-2">File</label>
                <input className="p-1 border ml-2 rounded-md mb-2 col-span-2" onChange={(ev) => setFormData({...formData, file:ev.target.files[0]})} type="file"></input>

            
            <button className="border-blue-500 border px-2 py-1 rounded-md bg-blue-400 shadow-inner font-bold text-white col-span-3 mt-4 hover:underline">Upload Media</button>
        </form>
    )
}

export default MediaUploadForm