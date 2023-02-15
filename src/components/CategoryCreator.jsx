import { useContext, useState } from "react"
import { Store } from "../StoreContext"
import InfoTagSmall from "./InfoTagSmall"
import { getOrganization } from "../getOrgData"

const CategoryCreator = ({newCatName, setNewCatName, selectedColor, setSelectedColor}) => {

    const {state, dispatch} = useContext(Store)
    const {pb} = state
    
    const colors = ["#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e", "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899"]

    const saveNewCategory = async (ev) => {
        ev.preventDefault()

        const data = {
            "name": newCatName,
            "color": selectedColor,
        };
        
        const record = await pb.collection('buckets').create(data);
        console.log(record)

        setNewCatName("")
        setSelectedColor("#ef4444")
        getOrganization(pb, dispatch)
    }

    return (
        <form className="p-2 border rounded-md max-w-[10rem] flex items-center flex-col" onSubmit={(ev) => saveNewCategory(ev)}>
            <input className="w-full p-1 m-auto mb-2 border-2 rounded-sm" placeholder="Category" value={newCatName} onChange={(ev) => setNewCatName(ev.target.value)} required></input>

            <div className="grid grid-cols-4 grid-rows-4 w-fit gap-1">
                {colors.map((color) => {
                    return <button key={color} className="w-8 h-8 rounded-full" type="button" style={{"backgroundColor": color}} onClick={(ev) => {setSelectedColor(color)}}></button>
                })}
                
            </div>

            <input className="w-full p-1 m-auto mt-2 border-2 rounded-sm" placeholder="#ffffff"></input>
            
            <div className="flex justify-center">
                <InfoTagSmall name={newCatName ? newCatName : "New Category"} color={selectedColor}/>
            </div>

            <button role="submit" className="border-blue-500 border px-2 py-1 rounded-md bg-blue-400 shadow-inner font-bold text-white flex mt-2 hover:underline">Create Category</button>
        </form>
    )
}

export default CategoryCreator