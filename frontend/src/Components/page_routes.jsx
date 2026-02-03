import Home from "../Pages/Home"
import NotFound from "../Pages/NotFound"
import Login from "../Pages/Login"


const page_routes = [
    { path: '/', page: Home, protected: true },
    { path: '/login', page: Login, protected: false },
    { path: '*', page: NotFound },  
];

export default page_routes
