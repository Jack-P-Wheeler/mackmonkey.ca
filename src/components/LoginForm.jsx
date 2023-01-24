import { useContext, useState } from "react"
import { Store } from "../StoreContext"

const LoginForm = () => {
    const {state} = useContext(Store)
    const {pb} = state

    const [formData, setFormData] = useState({user: "", password: ""})

    const loginAuthWithPassword = async (ev, username, password) => {
        ev.preventDefault()
        const authData = await pb.collection('users').authWithPassword(
            username,
            password,
        );
        console.log(authData)
    }

    return (
        <form className="border p-4 rounded-md shadow-lg" onSubmit={(ev) => loginAuthWithPassword(ev, formData.user, formData.password)}>
            <div className="mb-2">
                <label>Username/Email</label>
                <input className="p-1 border ml-2 rounded-md" value={formData.user} onChange={(ev) => setFormData({...formData, user:ev.target.value})}></input>
            </div>
            <div>
                <label>Password</label>
                <input className="p-1 border ml-2 rounded-md" value={formData.password} onChange={(ev) => setFormData({...formData, password:ev.target.value})} type="password"></input>
            </div>
            
            <button className="border-blue-500 border px-2 py-1 rounded-md bg-blue-400 shadow-inner font-bold text-white mt-4">Log In</button>
        </form>
    )
}

export default LoginForm