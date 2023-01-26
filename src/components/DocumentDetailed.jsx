import { Link } from "react-router-dom"
import InfoTagSmall from "./InfoTagSmall"

const DocumentDetailed = ({doc, searchData}) => {
    const formatDate = (time) => {
        const dateOptions = {dateStyle: "medium", timeStyle: "short"}
        const date = new Date(time).toLocaleString("en-CA", dateOptions)
        return date
    }
    
    return (
        <Link key={doc.id} to={"/doc/" + doc.id} className="border p-4 rounded-md my-4 mr-4 shadow-lg flex flex-col h-64 hover:shadow-xl transition-all">
            {doc.title.toLowerCase().includes(searchData.term.toLowerCase())
                ? <div className="">
                    <span className="text-3xl">{doc.title.slice(0, doc.title.toLowerCase().indexOf(searchData.term.toLowerCase()))}</span>
                    <span className="mb-4 font-bold text-3xl">{doc.title.slice(doc.title.toLowerCase().indexOf(searchData.term.toLowerCase()), searchData.term.length)}</span>
                    <span className="text-3xl">{doc.title.slice(doc.title.toLowerCase().indexOf(searchData.term.toLowerCase()) + searchData.term.length)}</span>
                </div>
                : <p className="text-3xl">{doc.title}</p>}

            {doc.expand.category
            ? doc.expand.category.map((cat) => <InfoTagSmall color={cat.color} name={cat.name}/>)
            : null}

            <p className="italic mt-auto">Last updated: {formatDate(doc.updated)}</p>

            <p className="font-bold">Created by: {doc.expand.author.name}</p>
        </Link>
    )
}

export default DocumentDetailed