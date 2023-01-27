import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Editor from "../components/Editor"
import { Store } from "../StoreContext"
import { getOrganization } from "../getOrgData"
import InfoTagSmallButton from "../components/InfoTagSmallButton"


const Document = () => {
    const {documentId} = useParams()
    const [docData, setDocData] = useState(null)
    const {state, dispatch} = useContext(Store)
    const {pb} = state

    const getDocument = async () => {
        const documentRes = await pb.collection('documents').getOne(documentId, {
            expand: 'author, category',
        });
        console.log(documentRes)
        setDocData(await documentRes)
    }

    useEffect(() => {
        getDocument()
        
    }, [])

    const saveDocumentUpdate = async () => {
        const data = {
            "author": docData.author,
            "text": docData.text + "Bruh moment",
            "title": docData.title,
            "category": docData.category,
            "team": docData.team,
            "parent": docData.parent,
            "rich_text": docData.rich_text
        };

        const record = await pb.collection('documents').update(docData.id, data);
        getDocument()
        getOrganization(pb, dispatch)
    }

    return (
        <div className="flex justify-center">
            {docData && state.org
                ? <div className="m-8">
                    <div className="mt-8">
                        <input className="text-3xl w-full" value={docData.title} onChange={(ev) => setDocData({...docData, title: ev.target.value})}></input>
                        <div className="flex">
                        {state.org.categories.map((cat) => {
                            return (
                                <InfoTagSmallButton key={cat.id} id={cat.id} color={cat.color} name={cat.name} docData={docData} setDocData={setDocData} isActive={docData.category && docData.category.some((docCat) => docCat === cat.id)}/>
                            )
                        })}
                        </div>
                    </div>
                    <Editor docData={docData} pb={pb} setDocData={setDocData} saveDocumentUpdate={saveDocumentUpdate}/>
                </div>
            : null}
            
        </div>
        
    )
}

export default Document