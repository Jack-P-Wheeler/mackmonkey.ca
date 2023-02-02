import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Store } from "../StoreContext"
import { setFamilyAction } from "../actions"

const ParentChildTree = () => {
    const {state, dispatch} = useContext(Store)
    const {pb, document, family, } = state

    const getFamily = async () => {
        console.log(document.id)
        const parentChildRelationships = await pb.collection('document_relationships').getFullList(200, {
            sort: '-created',
            id: document.id,
            expand: 'parent_document, child_document'
        });
        console.log(parentChildRelationships)
        let newFamily = {parent: "", children: []}

        await parentChildRelationships.forEach(relation => {
            console.log(document.id)
            if (relation.expand.child_document.id === document.id) {
                newFamily.parent = relation.expand.parent_document
            } else {
                newFamily.children.push(relation.expand.child_document)
            }
        });
        setFamilyAction(dispatch, newFamily)
    }

    
    
    useEffect(() => {
        getFamily()
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
                <div className="border-b flex items-center justify-center"><p className="text-xl">{document.title}</p></div>
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