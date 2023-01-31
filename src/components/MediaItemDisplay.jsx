const MediaItemDisplay = ({item}) => {
    console.log(item)
    return (
        <section>
            
            <img src={"https://api.mackmonkey.ca/api/files/media_library/" + item.id + "/" + item.file}/>
            <h2 className="text-3xl font-bold">{item.title}</h2>
            <p className="">{item.description}</p>
        </section>
    )
}

export default MediaItemDisplay