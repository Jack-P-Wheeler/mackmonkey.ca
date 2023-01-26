const InfoTagSmall = ({color, name}) => {
    return (
        <div style={{"background-color": color}} className=" w-32 px-2 rounded-full text-white my-1 text-center">
            {name}
        </div>
    )
}

export default InfoTagSmall