const InfoTagSmall = ({color, name, isActive = true}) => {
    return (
        <button style={{"backgroundColor": isActive ? color : "grey", "order": isActive ? "1" : "2"}} className="max-w-fit px-2 rounded-full text-white m-1 text-center relative">
            <span className="z-10">{name}</span>
            <span style={{"backgroundColor": isActive ? color : "grey"}} className="absolute left-0 active:animate-ping inline-flex h-full w-full rounded-full active:opacity-75 z-0 opacity-0"></span>
        </button>
    )
}

export default InfoTagSmall