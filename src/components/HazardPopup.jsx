const HazardPopup = ({children}) => {
    return (
        <div className="bg-red-500 p-2 border-dotted border-red-200 border rounded-md shadow-inner h-full flex justify-center items-center">
            <p className="text-white ">{children}</p>
        </div>
    )
}

export default HazardPopup