import { useContext, useState } from "react"
import { Store } from "../StoreContext"

const CreateAccountForm = () => {
    const {state} = useContext(Store)
    const {pb} = state

    const initialFormData = {user: "", password: "", email: "", name: "", avatar: null}
    const [formData, setFormData] = useState(initialFormData)
    

    const createAccount = async (ev, username, password, email, name, avatar) => {
        ev.preventDefault()
        
        const data = {
            "username": username,
            "email": email,
            "emailVisibility": false,
            "password": password,
            "passwordConfirm": password,
            "name": name,
        };
        
        const fileData = new FormData();

        Object.keys(data).forEach(field => {
            fileData.append(field, data[field])
        });

        fileData.append("avatar", avatar)
        
        
        try {
            const record = await pb.collection('users').create(fileData);
            console.log(record)
            setFormData(initialFormData)
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <form className="border p-4 rounded-md shadow-lg grid grid-cols-3 grid-rows-4" onSubmit={(ev) => createAccount(ev, formData.user, formData.password, formData.email, formData.name, formData.avatar)}>

                <label className="flex items-center mb-2">Username</label>
                <input className="p-1 border ml-2 rounded-md mb-2 col-span-2" value={formData.user} onChange={(ev) => setFormData({...formData, user:ev.target.value})} required></input>

                <label className="flex items-center mb-2">Email</label>
                <input className="p-1 border ml-2 rounded-md mb-2 col-span-2" value={formData.email} onChange={(ev) => setFormData({...formData, email:ev.target.value})} required type="email"></input>

                <label className="flex items-center mb-2">Password</label>
                <input className="p-1 border ml-2 rounded-md mb-2 col-span-2" value={formData.password} onChange={(ev) => setFormData({...formData, password:ev.target.value})} type="password" required></input>

                <label className="flex items-center mb-2">Name</label>
                <input className="p-1 border ml-2 rounded-md mb-2 col-span-2" value={formData.name} onChange={(ev) => setFormData({...formData, name:ev.target.value})} required></input>

                <label className="flex items-center mb-2">Avatar</label>
                <input className="p-1 border ml-2 rounded-md mb-2 col-span-2" onChange={(ev) => setFormData({...formData, avatar:ev.target.files[0]})} type="file"></input>

            
            <button className="border-blue-500 border px-2 py-1 rounded-md bg-blue-400 shadow-inner font-bold text-white col-span-3 mt-4 hover:underline">Create Account</button>
        </form>
    )
}

export default CreateAccountForm