const InfoTagSmallButton = ({color, id, name, docData, setDocData, type, isActive = true}) => {
    const toggleCategory = (toggleType) => {
        if (docData[toggleType].includes(id)) {
            setDocData({...docData, [toggleType]: docData[toggleType].filter((cat) => cat !== id)})
        } else {
            setDocData({...docData, [toggleType]: [...docData[toggleType], id]})
        }
    }

    return (
        <button onClick={(ev) => {toggleCategory(type)}} style={{"backgroundColor": isActive ? color : "grey", "order": isActive ? "1" : "2"}} className="max-w-fit px-4 py-1 rounded-full text-white m-1 text-center relative active:scale-90 transition-all">
            <span className="z-10 text-sm font-medium">{name}</span>
        </button>
    )
}

export default InfoTagSmallButton