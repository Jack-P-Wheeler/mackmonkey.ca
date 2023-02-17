import { useContext, useState } from "react"
import { Store } from "../../StoreContext"
import InfoTagSmall from "../InfoTagSmall"
import { getOrganization } from "../../getOrgData"
import { UilTimes } from '@iconscout/react-unicons'

const TeamCreator = ({newCatName, setNewCatName, selectedColor, setSelectedColor, selectedCat, setSelectedCat}) => {

    const {state, dispatch} = useContext(Store)
    const {pb} = state
    
    const colors = ["#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e", "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899"]

    const resetForm = () => {
        setNewCatName("")
        setSelectedColor("#ef4444")
        setSelectedCat(null)
        getOrganization(pb, dispatch)
    }
    
    const saveNewCategory = async (ev) => {
        ev.preventDefault()
        const data = {
            "name": newCatName,
            "color": selectedColor,
        };
        const record = await pb.collection('buckets').create(data);
        console.log(record)
        resetForm()
    }

    const updateCategory = async (ev) => {
        ev.preventDefault()
        const data = {
            "name": newCatName,
            "color": selectedColor,
        };
        const record = await pb.collection('buckets').update(selectedCat.id, data);
        resetForm()
    }

    const deleteCategory = async () => {
        const record = await pb.collection('buckets').delete(selectedCat.id);
        resetForm()
    }

    return (
        <form className="p-2 border rounded-md max-w-[10rem] flex items-center flex-col h-fit" onSubmit={(ev) => selectedCat ? updateCategory(ev) : saveNewCategory(ev)}>
            {selectedCat
            ? <button className="mr-auto" type="button" onClick={(ev) => resetForm()}><UilTimes/></button>
            : null}
            <input className="w-full p-1 mx-auto mb-2 border-2 rounded-sm" placeholder="Category" value={newCatName} onChange={(ev) => setNewCatName(ev.target.value)} required></input>

            <div className="grid grid-cols-4 grid-rows-4 w-fit gap-1">
                {colors.map((color) => {
                    return <button key={color} className="w-8 h-8 rounded-full shadow-inner" type="button" style={{"backgroundColor": color}} onClick={(ev) => {setSelectedColor(color)}}></button>
                })}
                
            </div>

            <input className="w-full p-1 mx-auto my-2 border-2 rounded-sm" placeholder="#ffffff"></input>
            
            <div className="flex justify-center">
                <InfoTagSmall name={newCatName ? newCatName : "New Category"} color={selectedColor}/>
            </div>
            {selectedCat
            ? <div className="flex">
                <button role="submit" className="border-blue-500 border px-2 py-1 rounded-md bg-blue-400 shadow-inner font-bold text-white flex mt-2 hover:underline">Update</button>
                <button type="button" className="border-red-500 border px-2 py-1 rounded-md bg-red-400 shadow-inner font-bold text-white flex mt-2 hover:underline" onClick={() => deleteCategory()}>Delete</button>
            </div>
            : <button role="submit" className="border-blue-500 border px-2 py-1 rounded-md bg-blue-400 shadow-inner font-bold text-white flex mt-2 hover:underline">Save</button>}
            
        </form>
    )
}

export default TeamCreator