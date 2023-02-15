import { useContext } from "react"
import { Store } from "../StoreContext"
import CategoryCreator from "../components/CategoryCreator"
import InfoTagSmall from "../components/InfoTagSmall"
import { useState } from "react"

const EditBuckets = () => {
    const {state} = useContext(Store)
    const [selectedCat, setSelectedCat] = useState(null)

    const [newCatName, setNewCatName] = useState("")
    const [selectedColor, setSelectedColor] = useState("#ef4444")

    return (
        state.org
        ? <section className="ml-4 p-4 border rounded-md mt-2 text-left">
            <table className="mb-4 border">
                <tr className="bg-slate-50 border-b">
                    <th className="p-4 text-neutral-400">Name</th>
                    <th className="p-4 text-neutral-400">Color</th>
                    <th className="p-4 text-neutral-400">Preview</th>
                </tr>
                {
                    state.org.categories.map((cat) => {
                        return <tr className="mr-2 border-b hover:bg-slate-50" key={cat.name}>
                            <td className="px-4 border-r">{cat.name}</td>
                            <td className="px-4 border-r">{cat.color}</td>
                            <td className="px-4"><InfoTagSmall color={cat.color} name={cat.name} clickFunction = {() => {
                                setSelectedCat(cat.name)
                                setNewCatName(cat.name)
                                setSelectedColor(cat.color)
                                }}/></td>
                        </tr>
                    })
                }
            </table>
            
            <CategoryCreator newCatName={newCatName} setNewCatName={setNewCatName} selectedColor={selectedColor} setSelectedColor={setSelectedColor}/>
        </section>
        : null
    )
}

export default EditBuckets