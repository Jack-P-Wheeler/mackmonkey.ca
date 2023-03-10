import { useContext, useEffect } from "react"
import Organization from "./pages/Organization"
import Document from "./pages/Document"
import { Store } from "./StoreContext"
import { updatePbAction } from "./actions"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header"
import Documents from "./pages/Documents"
import { getOrganization } from "./getOrgData"
import MediaLibrary from "./pages/MediaLibrary"
import EditBuckets from "./pages/EditBuckets"


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
      <div className="lg:grid lg:grid-cols-page">
      <Header/>
      <Routes>
          <Route path="/" element={<Organization/>} />
          <Route path="/doc/:documentId" element={<Document/>} />
          <Route path="/docs/:category" element={<Documents/>} />
          <Route path="/media-library" element={<MediaLibrary/>}/>
          <Route path="/edit-buckets" element={<EditBuckets/>}/>
          <Route path="*" element={<h1>No page of this name, go back to whence you came...</h1>}/>
        </Routes>
      </div>
      
    </Router>
    
  )
}

export default App
