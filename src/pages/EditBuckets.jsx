import { useContext } from "react"
import { Store } from "../StoreContext"
import CategoryCreator from "../components/OrgAdmin/CategoryCreator"
import InfoTagSmall from "../components/InfoTagSmall"
import { useState } from "react"

const EditBuckets = () => {
    const { state } = useContext(Store)
    const [selectedCat, setSelectedCat] = useState(null)

    const [newCatName, setNewCatName] = useState("")
    const [selectedColor, setSelectedColor] = useState("#ef4444")

    return (
        state.org
            ? <section className="ml-4 p-4 border rounded-md mt-2">
                <h2 className="text-3xl font-bold mb-2">Categories</h2>
                <section className="flex">
                <CategoryCreator newCatName={newCatName} setNewCatName={setNewCatName} selectedColor={selectedColor} setSelectedColor={setSelectedColor} selectedCat={selectedCat} setSelectedCat={setSelectedCat} />
                    {state.org.categories.length
                        ? <table className=" border ml-8 p-2">
                            <thead>
                                <tr className="bg-slate-50 border-b">
                                    <th className="p-4 text-neutral-400">Name</th>
                                    <th className="p-4 text-neutral-400">Color</th>
                                    <th className="p-4 text-neutral-400">Preview</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    state.org.categories.map((cat) => {
                                        return <tr className="mr-2 border-b hover:bg-slate-50" key={cat.name}>
                                            <td className="px-4 border-r">{cat.name}</td>
                                            <td className="px-4 border-r" style={{"color": cat.color}}>{cat.color}</td>
                                            <td className="px-4"><InfoTagSmall color={cat.color} name={cat.name} clickFunction={() => {
                                                setSelectedCat(cat)
                                                setNewCatName(cat.name)
                                                setSelectedColor(cat.color)
                                            }} /></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                        : <h2 className="mr-8 font-bold text-xl">No categories created.</h2>
                    }


                    
                </section>
                <section>
                    <h2 className="text-3xl font-bold mb-2 mt-8">Teams</h2>
                    <section>
                    {state.org.teams.length
                        ? <table className=" border ml-8 p-2">
                            <thead>
                                <tr className="bg-slate-50 border-b">
                                    <th className="p-4 text-neutral-400">Name</th>
                                    <th className="p-4 text-neutral-400">Color</th>
                                    <th className="p-4 text-neutral-400">Preview</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    state.org.teams.map((cat) => {
                                        return <tr className="mr-2 border-b hover:bg-slate-50" key={cat.name}>
                                            <td className="px-4 border-r">{cat.name}</td>
                                            <td className="px-4 border-r" style={{"color": cat.color}}>{cat.color}</td>
                                            <td className="px-4"><InfoTagSmall color={cat.color} name={cat.name} clickFunction={() => {
                                                setSelectedCat(cat)
                                                setNewCatName(cat.name)
                                                setSelectedColor(cat.color)
                                            }} /></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                        : <h2 className="mr-8 font-bold text-xl">No categories created.</h2>
                    }
                    </section>
                </section>
            </section>
            : null
    )
}

export default EditBuckets