import { Link } from "react-router-dom"
import InfoTagSmall from "./InfoTagSmall"

const DocumentDetailed = ({ doc, searchData }) => {
    const formatDate = (time) => {
        const dateOptions = { dateStyle: "medium", timeStyle: "short" }
        const date = new Date(time).toLocaleString("en-CA", dateOptions)
        return date
    }

    const documentTitle = () => {
        const searchIndex = doc.title.toLowerCase().indexOf(searchData.term.toLowerCase())
        return (<div className="ml-2">
            <span className="text-3xl">{doc.title.slice(0, searchIndex)}</span>
            <span className="mb-4 font-bold text-3xl">{doc.title.slice(searchIndex, searchIndex + searchData.term.length)}</span>
            <span className="text-3xl">{doc.title.slice(searchIndex + searchData.term.length)}</span>
        </div>)
    }

    return (
        <Link key={doc.id} to={"/doc/" + doc.id} className="border p-4 rounded-md my-4 mr-4 shadow-lg flex flex-col h-64 hover:shadow-xl transition-all">
            {doc.title.toLowerCase().includes(searchData.term.toLowerCase())
                ? documentTitle()
                : <p className="text-3xl ml-4">{doc.title}</p>}
            
            <div className="flex">

                <div className="flex flex-col">
                    {doc.expand.category
                        ? doc.expand.category.map((cat) => <InfoTagSmall key={cat.id} color={cat.color} name={cat.name} />)
                        : null}
                </div>

                <div className="flex flex-col ml-8">
                    {doc.expand.team
                        ? doc.expand.team.map((team) => <InfoTagSmall key={team.id} color={team.color} name={team.name} />)
                        : null}
                </div>
            </div>
            
            <p className="italic mt-auto">Last updated: {formatDate(doc.updated)}</p>

            <p className="font-bold">Created by: {doc.expand.author.name}</p>
        </Link>
    )
}

export default DocumentDetailed