import { useContext } from "react"
import { Store } from "../StoreContext"
import { Link } from "react-router-dom"
import Search from "../components/Search"
import { useState } from "react"

const Documents = () => {
    const {state} = useContext(Store)
    const [searchData, setSearchData] = useState({term: ""})

    const formatDate = (time) => {
        const dateOptions = {dateStyle: "medium", timeStyle: "short"}
        const date = new Date(time).toLocaleString("en-CA", dateOptions)
        return date
    }
    return (
        <section>
            <Search searchData={searchData} setSearchData={setSearchData}/>
            <div className="grid grid-cols-3">
            {state.org
                        ? state.org.allDocuments.map((doc) => {
                            return (
                                doc.title.includes(searchData.term) || doc.text.includes(searchData.term)
                                ? <Link key={doc.id} to={"/doc/" + doc.id} className="border p-4 rounded-md my-4 mr-4 shadow-lg flex flex-col">
                                    {doc.title.includes(searchData.term)
                                    ? <p>
                                        {doc.title.slice(0, doc.title.indexOf(searchData.term))}
                                            <span className="mb-4 font-bold">{searchData.term}</span>
                                        {doc.title.slice(doc.title.indexOf(searchData.term) + searchData.term.length)}
                                    </p>
                                    : <p>{doc.title}</p>}
                                    <p>{doc.title.indexOf}</p>
                                    
                                    <p className="mb-4">{doc.text.slice(0, 100)} {doc.text.length > 100 ? "..." : null}</p>
                                    <p className="italic mt-auto">Last updated: {formatDate(doc.updated)}</p>
                                    <p className="font-bold">Created by: {doc.expand.author.name}</p>
                                </Link>
                                : null
                            )
                        })
                        :null}
            </div>
            
        </section>
    )
}

export default Documents