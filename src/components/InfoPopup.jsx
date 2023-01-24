const InfoPopup = ({children}) => {
    return (
        <div className="bg-blue-500 p-2 border-dotted border-blue-200 border rounded-md shadow-inner h-full flex justify-center items-center">
            <p className="text-white ">{children}</p>
        </div>
    )
}

export default InfoPopup