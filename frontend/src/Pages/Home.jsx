import { useState } from "react"
import Header from "../Components/Header"
import Dropdown from "../Components/Dropdown"


function Home() {
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState({text: "Recently updated", value: "updated"})

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
                <Dropdown
                  onChange={setSort}
                  options={[
                    { text: "Recently updated", value: "updated" },
                    { text: "Contributors", value: "contributors" },
                    { text: "Favorites", value: "favorites" },
                  ]}
                >
                    {(menuToggle) => (
                    <button 
                        className={`dropdown-button whitespace-nowrap flex items-center text-primary px-4 py-2 rounded-full cursor-pointer transition ${menuToggle ? 'bg-primary-a0 text-white' : 'bg-surface-a20 ring ring-primary-a40 hover:ring-2'}`}>
                        {sort.text}
                        <i className="fa-solid fa-angle-down text-sm pl-2" />
                    </button>
                    )}
                </Dropdown>
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
