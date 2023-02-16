import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Store } from "../StoreContext"
import { getOrganization } from "../getOrgData"
import InfoTagSmallButton from "../components/InfoTagSmallButton"
import ParentChildTree from "../components/ParentChildTree"
import { UilExclamationTriangle, UilSave, UilEdit, UilEye } from '@iconscout/react-unicons'
import { setDocumentAction } from "../actions"
import { marked } from 'marked';


const Document = () => {
    const { documentId } = useParams()
    const [docData, setDocData] = useState(null)
    const [edit, setEdit] = useState(true)
    const { state, dispatch } = useContext(Store)
    const { pb } = state

    marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function (code, lang) {
            const hljs = require('highlight.js');
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        },
        langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
        pedantic: false,
        gfm: true,
        breaks: true,
        sanitize: false,
        smartypants: false,
        xhtml: false
    });


    const navigate = useNavigate()

    const getDocument = async () => {
        const documentRes = await pb.collection('documents').getOne(documentId, {
            expand: 'author, category',
        });

        setDocData(await documentRes)
        setDocumentAction(dispatch, documentRes)
    }

    useEffect(() => {
        getDocument()
    }, [documentId])

    const saveDocumentUpdate = async () => {
        const data = {
            "author": docData.author,
            "title": docData.title,
            "category": docData.category,
            "team": docData.team,
            "parent": docData.parent,
            "text": docData.text
        };

        const record = await pb.collection('documents').update(docData.id, data);
        getDocument()
        getOrganization(pb, dispatch)
    }

    const deleteDocument = async () => {
        if (state.document) {
            await pb.collection('documents').delete(docData.id);
            getOrganization(pb, dispatch)
            navigate("/")
        }
    }

    return (
        <section className="flex lg:justify-center">
            {docData && state.org
                ? <div className="ml-4 mt-8p-4">

                    <div className="">
                        <input className="text-3xl w-full" value={docData.title} onChange={(ev) => setDocData({ ...docData, title: ev.target.value })}></input>
                        <div className="flex">
                            {state.org.categories.map((cat) => {
                                return (
                                    <InfoTagSmallButton key={cat.id} id={cat.id} color={cat.color} name={cat.name} docData={docData} setDocData={setDocData} type="category" isActive={docData.category && docData.category.some((docCat) => docCat === cat.id)} />
                                )
                            })}
                        </div>

                        <div className="flex">
                            {state.org.teams.map((team) => {
                                return (
                                    <InfoTagSmallButton key={team.id} id={team.id} color={team.color} name={team.name} docData={docData} setDocData={setDocData} type="team" isActive={docData.team && docData.team.some((docTeam) => docTeam === team.id)} />
                                )
                            })}
                        </div>
                    </div>

                    {pb.authStore.model.id === docData.author
                        ? <div className="flex mt-16 justify-between">

                            <div className="flex">
                                <button className="flex bg-slate-500 rounded-md hover:underline text-white p-2 font-bold w-24 justify-center items-center mr-4" onClick={(ev) => setEdit(!edit)}>
                                    {edit ? <UilEdit className="text-white" /> : <UilEye className="text-white" />}
                                    <span className="leading-none ml-2">{edit ? "Edit" : "View"}</span>
                                </button>

                            <button className="border-blue-500 border p-2 rounded-md bg-blue-400 shadow-inner font-bold text-white flex hover:underline" label="Save" onClick={() => { saveDocumentUpdate() }}>
                                <UilSave className="text-white" />
                                Save
                            </button>
                            </div>


                            <button className="flex bg-red-700 rounded-md hover:underline text-white p-2 font-bold" onClick={(ev) => deleteDocument()}>
                                <div className="flex items-center px-2">
                                    <UilExclamationTriangle className="text-white" />
                                    Delete
                                </div>
                            </button>

                        </div>

                        : null}

                    <section className="w-[1024px] h-[1920px] border p-4 rounded-lg shadow-sm mt-4" id="markdown-page">
                        {edit
                            ? <div dangerouslySetInnerHTML={{ __html: marked.parse(docData.text) }}></div>
                            : <textarea value={docData.text} onChange={(ev) => setDocData({ ...docData, text: ev.target.value })} className="w-full resize-none p-2 h-full"></textarea>}

                    </section>



                    {/* <div className="grid lg:grid-cols-2 gap-2">
                        <ParentChildTree />
                    </div> */}


                </div>

                : null}

        </section>

    )
}

export default Document