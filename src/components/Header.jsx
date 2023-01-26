import { useContext } from "react"
import { Link, NavLink } from "react-router-dom"
import { Store } from "../StoreContext"
import LoginForm from "./LoginForm"

const Header = () => {
    const {state} = useContext(Store)
    const {pb} = state
    return (
        <section className="sticky h-min top-0">
            <nav className="mb-8 mt-4 border-r-2 flex flex-col pl-4 pr-8">
                <NavLink style={({isActive}) => ({"fontWeight": isActive ? 'bold' : ""})} className="mr-4" to="/">Home</NavLink>
                <NavLink style={({isActive}) => ({"fontWeight": isActive ? 'bold' : ""})} className="mr-4" to="/docs">Documents</NavLink>
                <NavLink style={({isActive}) => ({"fontWeight": isActive ? 'bold' : ""})} className="mr-4" to="/elements">Testing</NavLink>
                <div className="mt-8">
                    {pb.authStore.model
                    ? <p>Howdy, {pb.authStore.model.name}</p>
                    : <LoginForm/>}
                </div>
                
            </nav>
        </section>
        
    )
}

export default Header