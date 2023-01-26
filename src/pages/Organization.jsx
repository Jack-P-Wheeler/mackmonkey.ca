import { useContext, useState } from "react"
import { Store } from "../StoreContext"
import { Link } from "react-router-dom"
import { getOrganization } from "../getOrgData"

const Organization = () => {
    const {state, dispatch} = useContext(Store)
    const {pb} = state
    const [title, setTitle] = useState("")

    const formatDate = (time) => {
        const dateOptions = {dateStyle: "medium", timeStyle: "short"}
        const date = new Date(time).toLocaleString("en-CA", dateOptions)
        return date
    }

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
        <div className="flex justify-center ">
            <section className="w-[1350px]">
                <form className="mb-24">
                    <label className="mr-4">Title:</label>
                    <input className="rounded-full border p-2 mr-4 w-72" value={title} onChange={(ev) => setTitle(ev.target.value)} required></input>
                    <button onClick={(ev) => createNewDocument(ev)} className="border-blue-500 border px-2 py-1 rounded-md bg-blue-400 shadow-inner font-bold text-white col-start-2 mt-4 hover:underline">New Document</button>
                </form>
                <div className="col-span-5">
                    <h2 className="text-4xl">Recently Updated</h2>
                    <div className="grid grid-cols-3">
                        {state.org
                        ? state.org.lastUpdatedDocuments.map((doc) => {
                            return (
                                <Link key={doc.id} to={"doc/" + doc.id} className="border p-4 rounded-md my-4 mr-4 shadow-lg flex flex-col h-64">
                                    <p className="mb-4 text-3xl">{doc.title}</p>
                                    {/* <p className="mb-4">{doc.text.slice(0, 100)} {doc.text.length > 100 ? "..." : null}</p> */}
                                    <p className="italic mt-auto">Last updated: {formatDate(doc.updated)}</p>
                                    <p className="font-bold">Created by: {doc.expand.author.name}</p>
                                </Link>
                            )
                        })
                        :null}
                    </div>
                    

                </div>
                
            </section>
        </div>
        
    )
}

export default Organization