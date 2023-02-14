const InfoTagSmall = ({color, name, isActive = true, clickFunction = () => null}) => {
    
    return (
        <button style={{"backgroundColor": isActive ? color : "grey", "order": isActive ? "1" : "2"}} className="max-w-fit px-4 py-1 rounded-full text-white my-1 text-center relative " onClick={() => clickFunction()}>
            <span className="z-10 text-sm font-medium">{name}</span>
        </button>
    )
}

export default InfoTagSmall