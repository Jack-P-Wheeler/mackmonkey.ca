import { useState } from "react"
import InfoTagSmall from "./InfoTagSmall"

const CategoryCreator = () => {
    const [newCatName, setNewCatName] = useState("")
    const [selectedColor, setSelectedColor] = useState("#ef4444")
    const colors = ["#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e", "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899"]
    return (
        <form className="p-2 border rounded-md max-w-[10rem]">
            <input className="w-full p-1 m-auto mb-2 border-2 rounded-sm" placeholder="Category" value={newCatName} onChange={(ev) => setNewCatName(ev.target.value)} required></input>

            <div className="grid grid-cols-4 grid-rows-4 w-fit gap-1">
                {colors.map((color) => {
                    return <button className="w-8 h-8 rounded-full" style={{"backgroundColor": color}} onClick={(ev) => {setSelectedColor(color)}}></button>
                })}
                
            </div>

            <input className="w-full p-1 m-auto mt-2 border-2 rounded-sm" placeholder="#ffffff"></input>
            
            <div className="flex justify-center">
                <InfoTagSmall name={newCatName ? newCatName : "New Category"} color={selectedColor}/>
            </div>

            <button role="submit">NEW TAG!!!</button>
        </form>
    )
}

export default CategoryCreator