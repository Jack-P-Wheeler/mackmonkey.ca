const MessageLittle = ({user, message, time}) => {
    const dateOptions = {dateStyle: "medium", timeStyle: "short"}
    const date = new Date(time).toLocaleString("en-CA", dateOptions)
    return (
        <div className="mb-10">
            <p>{user.username}</p>
            <p>{message}</p>
            <p>{date}</p>
        </div>
    )
}

export default MessageLittle