import { useContext, useEffect, useState } from "react"
import MediaUploadForm from "../components/MediaUploadForm"
import MediaItemDisplay from "../components/MediaItemDisplay"
import { Store } from "../StoreContext"
import { UilTimes } from '@iconscout/react-unicons'

const MediaLibrary = () => {
    const { state } = useContext(Store)
    const { pb } = state

    const [page, setPage] = useState(1)
    const [media, setMedia] = useState([])
    const [maxPage, setMaxPage] = useState()
    const [selectedImage, setSelectedImage] = useState([])

    const retrieveMedia = async () => {
        const resultList = await pb.collection('media_library').getList(page, 10, {});
        console.log(resultList)
        setMaxPage(resultList.totalPages)
        setMedia([...media, ...resultList.items])
    }

    useEffect(() => {
        retrieveMedia()
    }, [page])

    return (
        <section className="ml-4">
            <h1 className="text-4xl">Media Library</h1>
            <section className="grid grid-cols-media grid-rows-1">
                <div>

                <div className="flex flex-wrap h-min">
                    {
                        media
                            ? media.map((item) => {
                                return (
                                    <button className="mr-2 mt-2 h-min" key={item.id} onClick={(() => setSelectedImage(item))}>
                                        <img src={"https://api.mackmonkey.ca/api/files/media_library/" + item.id + "/" + item.file + "?thumb=200x200"} style={{"borderColor": item.id === selectedImage.id ? "red" : "transparent"}} className="rounded-md border-2" />
                                    </button>
                                )
                            })
                            : <p>You have not uploaded any media...</p>
                    }
                </div>
                <button className="border-blue-500 border px-2 py-1 rounded-md bg-blue-400 shadow-inner font-bold text-white mt-4 hover:underline" onClick={(ev) => page < maxPage ? setPage(page + 1) : null}>
                {page < maxPage ? "Load More" : "All pictures loaded"}
            </button>
                </div>
                

                <div className="mr-4">
                    {
                        selectedImage.id
                        ? <div>
                            <button onClick={() => setSelectedImage([])}><UilTimes/></button>
                            <MediaItemDisplay item={selectedImage}/>
                        </div>
                        : <MediaUploadForm/>
                    }
                </div>
            </section>
            
        </section>
    )
}

export default MediaLibrary