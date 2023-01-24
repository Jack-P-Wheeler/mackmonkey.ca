import { useContext, useState } from "react"
import { Store } from "../StoreContext"

const CreateAccountForm = () => {
    const {state} = useContext(Store)
    const {pb} = state

    const [formData, setFormData] = useState({user: "", password: "", email: ""})

    const createAccount = async (ev, username, password, email) => {
        ev.preventDefault()
        const data = {
            "username": username,
            "email": email,
            "emailVisibility": false,
            "password": password,
            "passwordConfirm": password,
            "name": "test",
            "verified": true
        };
        const record = await pb.collection('users').create(data);
        console.log(record)
    }

    return (
        <form className="border p-4 rounded-md shadow-lg" onSubmit={(ev) => createAccount(ev, formData.user, formData.password, formData.email)}>
            <div className="mb-2">
                <label>Username</label>
                <input className="p-1 border ml-2 rounded-md" value={formData.user} onChange={(ev) => setFormData({...formData, user:ev.target.value})} required></input>
            </div>
            <div className="mb-2">
                <label>Email</label>
                <input className="p-1 border ml-2 rounded-md" value={formData.email} onChange={(ev) => setFormData({...formData, email:ev.target.value})} required type="email"></input>
            </div>
            <div>
                <label>Password</label>
                <input className="p-1 border ml-2 rounded-md" value={formData.password} onChange={(ev) => setFormData({...formData, password:ev.target.value})} type="password" required></input>
            </div>
            
            <button className="border-blue-500 border px-2 py-1 rounded-md bg-blue-400 shadow-inner font-bold text-white mt-4">Create Account</button>
        </form>
    )
}

export default CreateAccountForm