const InfoTagSmallButton = ({color, id, name, docData, setDocData, isActive = true}) => {
    const toggleState = () => {
        console.log("Clicked!")
        if (docData.category.includes(id)) {
            setDocData({...docData, category: docData.category.filter((cat) => cat !== id)})
        } else {
            setDocData({...docData, category: [...docData.category, id]})
        }
    }
    return (
        <button onClick={(ev) => {toggleState()}} style={{"backgroundColor": isActive ? color : "grey", "order": isActive ? "1" : "2"}} className="max-w-fit px-2 rounded-full text-white m-1 text-center relative">
            <span className="z-10">{name}</span>
            <span style={{"backgroundColor": isActive ? color : "grey"}} className="absolute left-0 active:animate-ping inline-flex h-full w-full rounded-full active:opacity-75 z-0 opacity-0"></span>
        </button>
    )
}

export default InfoTagSmallButton