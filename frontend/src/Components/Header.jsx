import { logout } from '../api'
import { useNavigate } from 'react-router-dom'
import Dropdown from './Dropdown'

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
        <nav className="bg-surface-a20 border-b border-primary-a40 fixed top-0 w-full z-50 select-none">
            <div className="text-primary px-5 flex flex-wrap items-center justify-between mx-auto h-12"> 
                <a href="https://github.com/dima-kharchenko/boardly" target="_blank"><i className="fa-brands fa-github text-3xl hover:text-primary-a0 transition"></i></a>
                <div>
                <Dropdown
                    menuClass={'mt-5 translate-x-1/8'}
                    itemClass={'px-4 py-1'}
                    options={[
                        { text: "Home", onClick: () => navigate("/") },
                        { text: "Profile", onClick: () => navigate("/profile") },
                        { text: "Logout", onClick: handleLogout },
                    ]}
                >
                {(menuToggle) => <i className={`fa-solid fa-bars cursor-pointer ${menuToggle && 'text-primary-a0'}`} />}
                </Dropdown>
                </div>
            </div>
        </nav>
        </div>
        </>
    );
}

export default Header


