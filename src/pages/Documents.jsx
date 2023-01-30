import { useContext, useEffect } from "react"
import { Store } from "../StoreContext"
import Search from "../components/Search"
import { useState } from "react"
import DocumentDetailed from "../components/DocumentDetailed"

const Documents = () => {
    const {state} = useContext(Store)
    const [searchData, setSearchData] = useState({term: "", author: "", category: "", team: ""})
    const [textLookup, setTextLookup] = useState({})



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
        return ((doc.title.toLowerCase().includes(searchData.term.toLowerCase()) || textLookup[doc.id].toLowerCase().includes(searchData.term.toLowerCase())) 
        && (searchData.author === "" || doc.expand.author.name === searchData.author)
        && (searchData.category === "" || doc.expand.category && doc.expand.category.some((cat) => cat.name  === searchData.category))
        && (searchData.team === "" || doc.expand.team && doc.expand.team.some((team) => team.name  === searchData.team)))
    }

    const reduceJson = (array, init) => {
        const reduced = array.reduce((acc, c) => {
            if (c.children) {
                return acc + reduceJson(c.children, init)
            } else {
                return acc + c.text
            }
        }, init)
        return reduced
    }

    const calculateTextLookup = () => {
        let newLookupText = {}
        if (state.org) {
            state.org.allDocuments.forEach((doc) => {
                newLookupText = {...newLookupText, [doc.id]: reduceJson(doc.rich_text.root.children, "")}
            })
        }
        setTextLookup(newLookupText)
    }

    useEffect(() => {
        calculateTextLookup()
    }, [state.org])
    
    return (
        <section>
            {state.org
            ?<div>
                <Search searchData={searchData} setSearchData={setSearchData} filterData={formatFilterData()}/>
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mx-4">
                        {state.org.allDocuments.map((doc) => {
                            // console.log(reduceJson(doc.rich_text.root.children, ""))
                            return (
                                (passSearchFilter(doc))
                                ? <DocumentDetailed key={doc.id} doc={doc} searchData={searchData}/>
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