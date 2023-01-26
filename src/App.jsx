import { useContext, useEffect } from "react"
import Home from "./pages/Home"
import Organization from "./pages/Organization"
import Document from "./pages/Document"
import { Store } from "./StoreContext"
import { updatePbAction } from "./actions"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header"
import Documents from "./pages/Documents"
import { setOrganizationAction } from "./actions"


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
    console.log("Bruh")
    const getOrganization = async () => {
      
        const allDocuments = await pb.collection('documents').getFullList(200 /* batch size */, {
            sort: '-created',
            expand: 'author, category, team'
        });

        const lastUpdatedDocuments = await pb.collection('documents').getList(1, 3, {
            sort: '-updated',
            expand: 'author, category, team'
        });

        const organizationData = {
            allDocuments,
            lastUpdatedDocuments: lastUpdatedDocuments.items
        }

        console.log(organizationData)

        setOrganizationAction(dispatch, organizationData)
    }
    getOrganization()
}, [])
  return (
    <Router>
      <div className="grid grid-cols-page">
      <Header/>
      <Routes>
          <Route path="/" element={<Organization/>} />
          <Route path="/doc/:documentId" element={<Document/>} />
          <Route path="/docs" element={<Documents/>} />
          <Route path="/elements" element={<Home/>} />
          <Route path="*" element={<h1>No match</h1>}/>
        </Routes>
      </div>
      
    </Router>
    
  )
}

export default App
