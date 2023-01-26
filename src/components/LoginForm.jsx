import { useContext, useState } from "react"
import { Store } from "../StoreContext"
import { updatePbAction } from "../actions"
import { getOrganization } from "../getOrgData"

const LoginForm = () => {
    const {state, dispatch} = useContext(Store)
    const {pb} = state

    const initialFormData = {user: "", password: ""}
    const [formData, setFormData] = useState(initialFormData)

    const loginAuthWithPassword = async (ev, username, password) => {
        ev.preventDefault()
        try{
            const authData = await pb.collection('users').authWithPassword(
                username,
                password,
            );
            setFormData(initialFormData)
            updatePbAction(dispatch, pb)
            console.log(authData)

            
            getOrganization(pb, dispatch)
        } catch(err) {
            console.log(err)
        }
        
    }

    return (
        <form className="border p-4 rounded-md shadow-lg grid grid-cols-1 grid-rows-4" onSubmit={(ev) => loginAuthWithPassword(ev, formData.user, formData.password)}>
                <label className="flex items-center mb-2">Username/Email</label>
                <input className="p-1 border ml-2 rounded-md col-span-2 mb-2" value={formData.user} onChange={(ev) => setFormData({...formData, user:ev.target.value})} required></input>
                <label className="flex items-center mb-2">Password</label>
                <input className="p-1 border ml-2 rounded-md col-span-2 mb-2" value={formData.password} onChange={(ev) => setFormData({...formData, password:ev.target.value})} type="password" required></input>
            
            <button className="border-blue-500 border px-2 py-1 rounded-md bg-blue-400 shadow-inner font-bold text-white col-start-2 mt-4 hover:underline">Log In</button>
        </form>
    )
}

export default LoginForm