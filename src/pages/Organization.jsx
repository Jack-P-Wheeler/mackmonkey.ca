import { useContext } from "react"
import { useParams } from "react-router-dom"
import { Store } from "../StoreContext"
import { setOrganizationAction } from "../actions"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import MyInput from "../components/MyInput"

const Organization = () => {
    const {state, dispatch} = useContext(Store)
    const {pb} = state

    const formatDate = (time) => {
        const dateOptions = {dateStyle: "medium", timeStyle: "short"}
        const date = new Date(time).toLocaleString("en-CA", dateOptions)
        return date
    }

    
    return (
        <div className="flex justify-center ">
            <section className="w-[1350px]">
                
                <div className="col-span-5">
                    <h2 className="text-4xl">Recently Updated</h2>
                    <div className="grid grid-cols-3">
                        {state.org
                        ? state.org.lastUpdatedDocuments.map((doc) => {
                            return (
                                
                                <Link key={doc.id} to={"doc/" + doc.id} className="border p-4 rounded-md my-4 mr-4 shadow-lg flex flex-col">
                                    <p className="mb-4">{doc.title}</p>
                                    <p className="mb-4">{doc.text.slice(0, 100)} {doc.text.length > 100 ? "..." : null}</p>
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