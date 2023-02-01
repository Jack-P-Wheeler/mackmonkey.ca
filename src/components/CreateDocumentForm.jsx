import { useState } from "react"

const CreateDocumentForm = () => {
    const [title, setTitle] = useState("")

    const createNewDocument = async (ev) => {
        ev.preventDefault()
        if (title) {
            const data = {
                "author": pb.authStore.model.id,
                "text": "test",
                "title": title,
                "category": [],
                "team": [],
                "rich_text": ""
            };

            const record = await pb.collection('documents').create(data);
            console.log(record)
            getOrganization(pb, dispatch)
        }
    }

    return (
        <form className="">
            <label className="mx-4">Title:</label>
            <input className="rounded-full border p-2 mr-4 w-72" value={title} onChange={(ev) => setTitle(ev.target.value)} required></input>
            <button onClick={(ev) => createNewDocument(ev)} className="border-blue-500 border px-2 py-1 rounded-md bg-blue-400 shadow-inner font-bold text-white col-start-2 mt-4 hover:underline">New Document</button>
        </form>
    )
}

export default CreateDocumentForm