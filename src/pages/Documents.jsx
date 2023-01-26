import { useContext } from "react"
import { Store } from "../StoreContext"
import { Link } from "react-router-dom"
import Search from "../components/Search"
import { useState } from "react"

const Documents = () => {
    const {state} = useContext(Store)
    const [searchData, setSearchData] = useState({term: "", author: "", category: "", team: ""})

    const formatFilterData = () => {
        let newFilterData = {author: [], category: [], team: []}
        state.org.allDocuments.forEach(doc => {
            if (!newFilterData.author.includes(doc.expand.author.name)) {
                newFilterData.author.push(doc.expand.author.name)
            }
            doc.expand.category.map((cat) => {
                if (!newFilterData.category.includes(cat.name)) {
                    newFilterData.category.push(cat.name)
                }
            })
            doc.expand.team.map((cat) => {
                if (!newFilterData.team.includes(cat.name)) {
                    newFilterData.team.push(cat.name)
                }
            })
            
        });
        console.log(newFilterData)
        return newFilterData
    }

    const passSearchFilter = (doc) => {
        return ((doc.title.includes(searchData.term) || doc.text.includes(searchData.term)) 
        && (searchData.author === "" || doc.expand.author.name === searchData.author)
        && (searchData.category === "" || doc.expand.category.some((cat) => cat.name  === searchData.category))
        && (searchData.team === "" || doc.expand.team.some((team) => team.name  === searchData.team)))
    }

    const formatDate = (time) => {
        const dateOptions = {dateStyle: "medium", timeStyle: "short"}
        const date = new Date(time).toLocaleString("en-CA", dateOptions)
        return date
    }
    return (
        <section>
            {state.org
            ?<div>
                <Search searchData={searchData} setSearchData={setSearchData} filterData={formatFilterData()}/>
                <div className="grid grid-cols-3 mx-4">
                        {state.org.allDocuments.map((doc) => {
                            return (
                                (passSearchFilter(doc))
                                ? <Link key={doc.id} to={"/doc/" + doc.id} className="border p-4 rounded-md my-4 mr-4 shadow-lg flex flex-col">
                                    {doc.title.includes(searchData.term)
                                    ? <p>
                                        {doc.title.slice(0, doc.title.indexOf(searchData.term))}
                                            <span className="mb-4 font-bold">{searchData.term}</span>
                                        {doc.title.slice(doc.title.indexOf(searchData.term) + searchData.term.length)}
                                    </p>
                                    : <p>{doc.title}</p>}
                                    
                                    <p className="mb-4">{doc.text.slice(0, 100)} {doc.text.length > 100 ? "..." : null}</p>
                                    <p className="italic mt-auto">Last updated: {formatDate(doc.updated)}</p>
                                    <p className="font-bold">Created by: {doc.expand.author.name}</p>
                                </Link>
                                : null
                            )
                        })}
                    </div>
                </div>
            :null}
        </section>
    )
}

export default Documents