import { Link } from "react-router-dom"

const Header = () => {
    return (
        <nav className="mb-8 mt-4 border-r-2 flex flex-col pl-4 pr-8">
            <Link className="mr-4" to="/">Home</Link>
            <Link className="mr-4" to="/docs">Documents</Link>
            <Link className="mr-4" to="/">Home</Link>
        </nav>
    )
}

export default Header