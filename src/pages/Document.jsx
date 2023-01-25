import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Store } from "../StoreContext"

const Document = () => {
    const {documentId} = useParams()
    const [docData, setDocData] = useState(null)
    const {state} = useContext(Store)
    const {pb} = state
    
    useEffect(() => {
        const getDocument = async () => {
            const documentRes = await pb.collection('documents').getOne(documentId, {
                expand: 'author',
            });
            setDocData(await documentRes)
        }
        getDocument()
    }, [])
    console.log(docData)
    return (
        <div className="flex justify-center">
            {docData
            ? <section className="border rounded-xl w-[1350px] m-8 shadow-xl p-10">
                <h1 className="text-2xl font-bold">{docData.title}</h1>
                <h3 className="italic mb-10 font-thin">{docData.expand.author.name}</h3>
                <p>{docData.text}</p>
            </section>
            : null}
        </div>
        
    )
}

export default Document