import { useContext, useEffect } from "react"
import { Store } from "../StoreContext"
import Search from "../components/Search"
import { useState } from "react"
import DocumentDetailed from "../components/DocumentDetailed"
import { useParams } from "react-router-dom"
import CreateDocumentForm from "../components/CreateDocumentForm"

const Documents = () => {
    const {state} = useContext(Store)
    const {pb} = state
    const [searchData, setSearchData] = useState({term: "", author: "", category: "", team: ""})
    const [textLookup, setTextLookup] = useState({})
    const { category } = useParams()
    



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
        && (category === "all" || doc.expand.category && doc.expand.category.some((cat) => cat.name === category))
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
        // if (state.org) {
        //     state.org.allDocuments.forEach((doc) => {
        //         newLookupText = {...newLookupText, [doc.id]: reduceJson(doc.rich_text.root.children, "")}
        //     })
        // }
        setTextLookup(newLookupText)
    }

    const updateViews = async () => {
        if (state.org && category !== "all") {
            console.log(category)
            const data = { "visits+": 1 };
            const catId = state.org.categories.find((cat) => cat.name === category).id
            const record = await pb.collection('buckets').update(catId, data);
        }

    }

    useEffect(() => {
        updateViews()
    }, [category, state.org])

    useEffect(() => {
        calculateTextLookup()
    }, [state.org])
    
    return (
        <section>
            {state.org
            ?<div>
                <CreateDocumentForm/>
                <Search searchData={searchData} setSearchData={setSearchData} filterData={formatFilterData()}/>

                <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mx-4">
                        {state.org.allDocuments.map((doc) => {
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