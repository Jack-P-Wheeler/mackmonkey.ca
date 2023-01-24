const WarningPopup = ({children}) => {
    return (
        <div className="bg-yellow-500 p-2 border-dotted border-yellow-200 border rounded-md shadow-inner h-full flex justify-center items-center">
            <p className="text-white ">{children}</p>
        </div>
    )
}

export default WarningPopup