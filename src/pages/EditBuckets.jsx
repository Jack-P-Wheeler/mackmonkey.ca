import { useContext } from "react"
import { Store } from "../StoreContext"
import CategoryCreator from "../components/CategoryCreator"
import InfoTagSmall from "../components/InfoTagSmall"
import { useState } from "react"

const EditBuckets = () => {
    const {state} = useContext(Store)
    const [selectedCat, setSelectedCat] = useState(null)
    return (
        state.org
        ? <section className="ml-4 p-4 border rounded-md mt-2">
            <div className="flex mb-4">
                {
                    state.org.categories.map((cat) => {
                        return <div className="mr-2" key={cat.name}>
                            <InfoTagSmall color={cat.color} name={cat.name} clickFunction = {() => setSelectedCat(cat.name)}/>
                        </div>
                    })
                }
            </div>
            
            <p>{selectedCat}</p>
            <CategoryCreator/>
        </section>
        : null
    )
}

export default EditBuckets