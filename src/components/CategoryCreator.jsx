const CategoryCreator = () => {
    const colors = ["#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e", "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899"]
    return (
        <div className=" p-2 border rounded-md max-w-fit">
            <div className="grid grid-cols-4 grid-rows-4 w-fit gap-1">
                {colors.map((color) => {
                    return <div className="w-8 h-8 rounded-full" style={{"backgroundColor": color}}></div>
                })}
                
            </div>
            <div className="w-32 flex justify-center m-auto mt-2 border border-black rounded-sm">
                <input className="w-full"></input>
            </div>
            
        </div>
    )
}

export default CategoryCreator