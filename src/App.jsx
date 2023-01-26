import { useContext, useEffect } from "react"
import Home from "./pages/Home"
import Organization from "./pages/Organization"
import Document from "./pages/Document"
import { Store } from "./StoreContext"
import { updatePbAction } from "./actions"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header"
import Documents from "./pages/Documents"
import { getOrganization } from "./getOrgData"


const App = () => {
  const {state, dispatch} = useContext(Store)
  const {pb} = state
  useEffect(() => {
    const getAuth = async () => {
      const authData = await pb.collection('users').authRefresh();
      updatePbAction(dispatch, await pb)
    }
    getAuth()
  }, [])

  useEffect(() => {
    getOrganization(pb, dispatch)
}, [])
  return (
    <Router>
      <div className="grid grid-cols-page">
      <Header/>
      <Routes>
          <Route path="/" element={<Organization/>} />
          <Route path="/doc/:documentId" element={<Document/>} />
          <Route path="/docs/:category" element={<Documents/>} />
          <Route path="/elements" element={<Home/>} />
          <Route path="*" element={<h1>No match</h1>}/>
        </Routes>
      </div>
      
    </Router>
    
  )
}

export default App
