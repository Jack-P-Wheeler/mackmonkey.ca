import { useContext, useEffect } from "react"
import { Store } from "../StoreContext"

const ParentChildTree = ({documentId, documentName}) => {
    const {state} = useContext(Store)
    const {pb} = state

    const getFamily = async () => {
        const parentChildRelationships = await pb.collection('document_relationships').getFullList(200, {
            sort: '-created',
            id: documentId,
            expand: 'parent_document, child_document'
        });
        console.log(parentChildRelationships)
    }
    
    useEffect(() => {
        getFamily()
        console.log(documentId)
    }, [])
    

    return (
        <section className="grid grid-rows-3 border h-72 rounded-md">
            <div className="border-b bg-slate-50"></div>
            <div className="border-b text-center"><p className="text-xl">{documentName}</p></div>
            <div className="bg-slate-50"></div>
        </section>
    )
}

export default ParentChildTree