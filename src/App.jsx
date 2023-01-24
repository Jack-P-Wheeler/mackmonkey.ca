import { useContext, useEffect } from "react"
import Home from "./pages/Home"
import { Store } from "./StoreContext"
import { updatePbAction } from "./actions"

const App = () => {
  const {state, dispatch} = useContext(Store)
  const {pb} = state
  useEffect(() => {
    const getAuth = async () => {
      const authData = await pb.collection('users').authRefresh();
      console.log(pb)
      updatePbAction(dispatch, await pb)
    }
    getAuth()
  }, [])
  return (
    <div className="App flex justify-center">
      <Home/>
    </div>
  )
}

export default App
