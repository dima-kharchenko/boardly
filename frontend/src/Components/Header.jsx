import { logout } from '../api'
import { useNavigate } from 'react-router-dom'

function Header(){
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logout()
            navigate('/login')
        } catch(e) {
            console.error(e)
        }
    }
    return(
        <>
        <div>
        <nav className="border-b-1 border-border fixed top-0 w-full z-50 select-none">
            <div className="text-foreground px-5 flex flex-wrap items-center justify-between mx-auto h-12"> 
                <a href="https://github.com/dima-kharchenko/boardly" target="_blank"><i className="fa-brands fa-github text-3xl"></i></a>
                <div className="flex">
                    <a href="/" className="cursor-pointer font-medium">Home</a>
                    <p onClick={handleLogout} className="cursor-pointer ml-2">Logout</p>
                </div>
            </div>
        </nav>
        </div>
        </>
    );
}

export default Header


