import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Editor from "../components/Editor"
import { Store } from "../StoreContext"


const Document = () => {
    const {documentId} = useParams()
    const [docData, setDocData] = useState(null)
    const {state} = useContext(Store)
    const {pb} = state


    const getDocument = async () => {
        const documentRes = await pb.collection('documents').getOne(documentId, {
            expand: 'author',
        });
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
    }

    console.log(docData)
    return (
        <div className="flex justify-center">
            {docData
                ? <div className="m-8">
                    <Editor docData={docData} pb={pb} setDocData={setDocData} />
                    <button className="border-blue-500 border px-2 py-1 rounded-md bg-blue-400 shadow-inner font-bold text-white col-start-2 mt-4 hover:underline" label="Save" onClick={() => {
                        saveDocumentUpdate()
                    }}>Save</button>
                </div>
            : null}
        </div>
        
    )
}

export default Document