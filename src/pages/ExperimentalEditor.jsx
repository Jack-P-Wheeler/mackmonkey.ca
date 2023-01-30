import { useContext, useState } from "react";
import { Store } from "../StoreContext";

const ExperimentalEditor = () => {
    const {state} = useContext(Store)
    const {pb} = state
    const [editor, setEditor] = useState("")

    const postNewRelationship = async () => {
        const record = await pb.collection('new_documents').getOne('568yoni9th4ggvt', {});
        setEditor(record.editor)
        console.log(record)
        }

        postNewRelationship()
    return (
        <div dangerouslySetInnerHTML={{__html: editor}}></div>
    )
}

export default ExperimentalEditor