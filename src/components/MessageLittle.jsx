const MessageLittle = ({user, message, time}) => {
    const dateOptions = {dateStyle: "medium", timeStyle: "short"}
    const date = new Date(time).toLocaleString("en-CA", dateOptions)
    return (
        <div className="mb-2 border rounded-md p-4">
            <div className="flex items-center mb-4 ">
                <div className="rounded-full h-12 overflow-hidden">
                    <img src={"https://api.mackmonkey.ca/api/files/_pb_users_auth_/" + user.id + "/" + user.avatar} className="w-12"/>
                </div>
                
                <p className="ml-4">{user.username}</p>
                
            </div>
            <p>{message}</p>
            <p>{date}</p>
        </div>
    )
}

export default MessageLittle