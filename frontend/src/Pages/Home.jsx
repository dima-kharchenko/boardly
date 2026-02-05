import { useState, useRef, useEffect } from "react"
import Header from "../Components/Header"

function Home() {
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState({text: "Recently updated", value: "updated"})
    const [openSort, setOpenSort] = useState(false)

    const dropdownRef = useRef(null)
    const buttonRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                !event.target.closest(".dropdown") &&
                !event.target.closest(".dropdown-button")
            ) {
                setOpenSort(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const toggleDropdown = () => {
        setOpenSort(p => !p)
    }

    return (
        <>
        <Header />
        <div className="min-h-[calc(100vh-48px)] mt-12 bg-surface-a10 p-6 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[60px_60px]">
            <div className="flex gap-4">
                <form className="w-full">
                    <input
                      type="text"
                      id="username"
                      className={`w-full px-4 py-2 rounded-full text-primary bg-surface-a20 ring ring-primary-a40 focus:outline-none focus:ring-2 transition`}
                      placeholder="Search boards..."
                      name="search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                </form>
                <div className="relative">
                    <button 
                        ref={buttonRef}
                        onClick={toggleDropdown}
                        className={`dropdown-button whitespace-nowrap flex items-center text-primary px-4 py-2 rounded-full cursor-pointer transition ${openSort ? 'bg-primary-a0 text-white' : 'bg-surface-a20 ring ring-primary-a40 hover:ring-2'}`}>
                        {sort.text} 
                        <i className="fa-solid fa-angle-down text-sm pl-2"></i>
                    </button>
                    <div ref={dropdownRef}
                        className={`dropdown grid gap-y-2 mt-2 p-2 right-1 absolute rounded-xl bg-surface-a20 ring-1 ring-primary-a40 transition ${openSort ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
                        {[
                            {text: "Recently updated", value: 'update'}, 
                            {text: "Contributors", value: 'contributors'}, 
                            {text: "Favorites", value: 'favorites'}
                        ].map((button, index) => (
                        <button 
                            key={index} 
                            className={`whitespace-nowrap w-full px-3 py-2 rounded-lg text-primary-a20 font-medium cursor-pointer text-surface-a50 bg-primary-a50/50 ring ring-primary-a40 hover:ring-2 transition `}
                            onClick={() => setSort({text: button.text, value: button.value})}
                        >
                            {button.text} 
                        </button>
                        ))}
                    </div>
                </div>
                <button className="whitespace-nowrap flex items-center text-white px-4 bg-primary-a0 rounded-full hover:bg-primary-a20 cursor-pointer transition">
                    <i className="fa-solid fa-plus text-xs pr-2"></i>
                    New Board 
                </button>
            </div>
        </div>
        </>
    )
}

export default Home
