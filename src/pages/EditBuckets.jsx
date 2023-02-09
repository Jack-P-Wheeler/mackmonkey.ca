import { useContext } from "react"
import { Store } from "../StoreContext"
import CategoryCreator from "../components/CategoryCreator"

const EditBuckets = () => {
    const {state} = useContext(Store)
    return (
        state.org
        ? <section className="ml-4 p-4 border rounded-md mt-2">
            {
                state.org.categories.map((cat) => {
                    return <p key={cat.name}>{cat.name}</p>
                })
            }

            <CategoryCreator/>
        </section>
        : null
    )
}

export default EditBuckets