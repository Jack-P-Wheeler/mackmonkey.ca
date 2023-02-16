import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { Store } from "../StoreContext"

const Header = () => {
    const {state} = useContext(Store)
    const {pb} = state

    const setBold = (isActive) => {
        return {"fontWeight": isActive ? 'bold' : ""}
    }
    return (
        <section className="h-min top-0 bg-white z-20">
            <nav className="mb-8 pt-4 border-r-2 flex flex-col pl-4 pr-8 fixed h-screen">
                <div className="flex lg:flex-col">
                    <NavLink style={({isActive}) => setBold(isActive)} className="mr-4" to="/">Home</NavLink>
                    <NavLink style={({isActive}) => setBold(isActive)} className="mr-4" to="/docs/all">Documents</NavLink>
                    <NavLink style={({isActive}) => setBold(isActive)} className="mr-4" to="/media-library">Media Library</NavLink>
                    <NavLink style={({isActive}) => setBold(isActive)} className="mr-4" to="/edit-buckets">Organization</NavLink>
                </div>
                
                <div className="lg:mt-8">
                    {state.org
                    ? <div className="flex lg:flex-col">
                        {
                            state.org.categories.map((category) => {
                                return <NavLink style={({isActive}) => setBold(isActive)} key={category.id} className="lg:mb-2" to={"/docs/" + category.name}>{category.name}</NavLink>
                            })
                        }
                    </div>
                    : null}
                </div>
                <div className="mt-16 hidden lg:block">
                    {pb.authStore.model
                    ? <p>Howdy, {pb.authStore.model.name}</p>
                    : null}
                </div>
                
            </nav>
        </section>
        
    )
}

export default Header