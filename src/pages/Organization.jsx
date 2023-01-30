import { useContext, useState } from "react"
import { Store } from "../StoreContext"
import { Link } from "react-router-dom"
import { getOrganization } from "../getOrgData"
import DocumentBasic from "../components/DocumentBasic"

const Organization = () => {
    const {state, dispatch} = useContext(Store)
    const {pb} = state
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
        <div className="">

            {/* This section is form creating new documents */}
            <section className="max-w-[1350px]">
                <form className="mb-24">
                    <label className="mr-4">Title:</label>
                    <input className="rounded-full border p-2 mr-4 w-72" value={title} onChange={(ev) => setTitle(ev.target.value)} required></input>
                    <button onClick={(ev) => createNewDocument(ev)} className="border-blue-500 border px-2 py-1 rounded-md bg-blue-400 shadow-inner font-bold text-white col-start-2 mt-4 hover:underline">New Document</button>
                </form>


            {/* This section is for displaying the 3 most recently updated posts */}
                <div className="ml-4">
                    <h2 className="text-4xl">Recently Updated</h2>
                    <div className="grid lg:grid-cols-3">
                        {state.org ? state.org.lastUpdatedDocuments.map((doc) => <DocumentBasic key={doc.id} doc={doc}/>) :null}
                    </div>
                </div>

            <div className="ml-4">
                <h2 className="text-4xl">Most Used Buckets</h2>
                <div className="grid lg:grid-cols-3">
                    {state.org 
                    ? state.org.categories.slice(0,3).map((cat) => {
                        return <Link style={{"backgroundColor": cat.color}} key={cat.id} className="text-white text-center text-4xl font-bold rounded-md h-64 flex justify-center items-center mr-4 active:scale-90 transition-all mt-4" to={"docs/" + cat.name}>{cat.name}</Link>
                    }) 
                    : null}
                </div>
            </div>
                
            </section>
        </div>
        
    )
}

export default Organization