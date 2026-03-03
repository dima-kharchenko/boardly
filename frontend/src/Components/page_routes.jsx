import Home from "../Pages/Home"
import NotFound from "../Pages/NotFound"
import Login from "../Pages/Login"
import Signup from "../Pages/Signup"
import Board from "../Pages/Board"


const page_routes = [
    { path: '/', page: Home, protected: true },
    { path: '/login', page: Login, protected: false },
    { path: '/signup', page: Signup, protected: false },
    { path: '/boards/:board_id', page: Board, protected: false },
    { path: '*', page: NotFound },  
];

export default page_routes
