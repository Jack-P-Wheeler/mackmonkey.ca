import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Store } from "../StoreContext"

const ParentChildTree = ({documentId, documentName}) => {
    const {state} = useContext(Store)
    const {pb} = state

    const [family, setFamily] = useState()

    const getFamily = async () => {
        const parentChildRelationships = await pb.collection('document_relationships').getFullList(200, {
            sort: '-created',
            id: documentId,
            expand: 'parent_document, child_document'
        });
        let newFamily = {parent: "", children: []}

        await parentChildRelationships.forEach(relation => {
            if (relation.expand.child_document.title === documentName) {
                newFamily.parent = relation.expand.parent_document
            } else {
                newFamily.children = [...newFamily.children, relation.expand.child_document]
            }
        });

        setFamily(newFamily)
    }
    
    useEffect(() => {
        getFamily()
        console.log(documentId)
    }, [])
    

    return (
        <>
        { family
            ? <section className="grid grid-rows-3 border rounded-md">
                <div className="border-b bg-slate-50 flex items-center justify-center">
                    {
                        family.parent.title ?
                        <a href={"/doc/" + family.parent.id}>{family.parent.title}</a>
                        : <Link to={"/docs/all"}>Back to Documents</Link>
                    }
                </div>
                <div className="border-b flex items-center justify-center"><p className="text-xl">{documentName}</p></div>
                <div className="flex items-center justify-center flex-col my-1">
                    {family.children.map((child) => {
                        return <div key={child.id} className="bg-slate-50 my-1"><a href={"/doc/" + child.id}>{child.title}</a></div>
                    })}
                </div>
            </section>
            : null
        }
        </>
    )
}

export default ParentChildTree