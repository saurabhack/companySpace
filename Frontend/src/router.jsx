import {createBrowserRouter} from "react-router-dom"
import App from "./App"
import Home from "./pages/Home"
import About from "./pages/About"
import Services from "./pages/Services"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Signup from "./pages/Signup"


const router=createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[{
            path:"/",
            element:<Home/>
        },
        {
            path:"/About",
            element:<About/>
        },
        {
            path:"/Services",
            element:<Services/>
        },
        {
            path:"/Contact",
            element:<Contact/>
        },
        {
            path:"/Login",
            element:<Login/>
        },
        {
            path:"/Signup",
            element:<Signup/>
        }
    ]
    }
])

export default router