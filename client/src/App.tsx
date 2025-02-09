import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Toast from "./components/toast/Toast"
import EditorPage from "./pages/EditorPage"
import HomePage from "./pages/HomePage"
import DrawingPage from "./pages/DrawingPage"
// import Gradientdiv from "./components/Gradientdiv";

const App = () => {
    return (
        
        <>
        
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/editor/:roomId" element={<EditorPage />} />
                    <Route path="/drawing/:roomId" element={<DrawingPage />} />
                </Routes>
            </Router>
            <Toast /> {/* Toast component from react-hot-toast */}
        </>
    )
}

export default App
