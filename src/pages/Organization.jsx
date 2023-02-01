import { useContext, useState } from "react"
import { Store } from "../StoreContext"
import { Link } from "react-router-dom"
import { getOrganization } from "../getOrgData"
import DocumentBasic from "../components/DocumentBasic"
import LoginForm from "../components/LoginForm"

const Organization = () => {
    const {state, dispatch} = useContext(Store)
    const {pb} = state
    

    return (
        <div className="">
            {/* This section is form creating new documents */}
            {pb.authStore.model ?
                <section className="max-w-[1350px]">
                


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
            :<LoginForm/>}
        </div>
        
    )
}

export default Organization