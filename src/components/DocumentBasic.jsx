import { Link } from "react-router-dom"

const DocumentBasic = ({doc}) => {
    const formatDate = (time) => {
        const dateOptions = {dateStyle: "medium", timeStyle: "short"}
        const date = new Date(time).toLocaleString("en-CA", dateOptions)
        return date
    }

    return (
        <Link to={"doc/" + doc.id} className="border p-4 rounded-md my-4 mr-4 shadow-lg flex flex-col h-64">
            <p className="mb-4 text-3xl">{doc.title}</p>
            <p className="italic mt-auto">Last updated: {formatDate(doc.updated)}</p>
            <p className="font-bold">Created by: {doc.expand.author.name}</p>
        </Link>
    )
}

export default DocumentBasic