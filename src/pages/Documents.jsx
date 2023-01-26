import { useContext } from "react"
import { Store } from "../StoreContext"
import { Link } from "react-router-dom"
import Search from "../components/Search"
import { useState } from "react"
import DocumentDetailed from "../components/DocumentDetailed"

const Documents = () => {
    const {state} = useContext(Store)
    const [searchData, setSearchData] = useState({term: "", author: "", category: "", team: ""})

    const formatFilterData = () => {
        let newFilterData = {author: [], category: [], team: []}
        state.org.allDocuments.forEach(doc => {
            if (!newFilterData.author.includes(doc.expand.author.name)) {
                newFilterData.author.push(doc.expand.author.name)
            }
            if (doc.expand.category) {
                doc.expand.category.map((cat) => {
                    if (!newFilterData.category.includes(cat.name)) {
                        newFilterData.category.push(cat.name)
                    }
                })
            }
            if (doc.expand.team) {
                doc.expand.team.map((cat) => {
                    if (!newFilterData.team.includes(cat.name)) {
                        newFilterData.team.push(cat.name)
                    }
                })
            }
        });
        return newFilterData
    }

    const passSearchFilter = (doc) => {
        return ((doc.title.toLowerCase().includes(searchData.term.toLowerCase())) 
        && (searchData.author === "" || doc.expand.author.name === searchData.author)
        && (searchData.category === "" || doc.expand.category && doc.expand.category.some((cat) => cat.name  === searchData.category))
        && (searchData.team === "" || doc.expand.team && doc.expand.team.some((team) => team.name  === searchData.team)))
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
                                ? <DocumentDetailed doc={doc} searchData={searchData}/>
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