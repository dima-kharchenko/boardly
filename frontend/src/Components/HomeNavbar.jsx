import { useState } from "react"
import Dropdown from "../Components/Dropdown"
import NewBoardModal from "./NewBoardModal"


function HomeNavbar({ loadBoards }) {
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState({text: "Recently updated", value: "updated"})
    let openNewBoard

    return (
    <div className="flex gap-4">
        <NewBoardModal onOpen={(fn) => (openNewBoard = fn)} loadBoards={loadBoards} />
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
            itemClass={'px-4 py-2'}
            options={[
                { text: "Recently updated", onClick: () => setSort({text: "Recently updated", value: "updated"}) },
                { text: "Contributors", onClick: () => setSort({text: "Contributors", value: "contributors"}) },
                { text: "Favorites", onClick: () => setSort({text: "Favorites", value: "favorites"}) },
            ]}
        >
            {(open) => (
            <button 
                className={`whitespace-nowrap flex items-center text-primary px-4 py-2 rounded-full cursor-pointer transition ${open ? 'bg-primary-a0 text-white' : 'bg-surface-a20 ring ring-primary-a40 hover:ring-2'}`}>
                {sort.text}
                <i className="fa-solid fa-angle-down text-sm pl-2" />
            </button>
            )}
        </Dropdown>
        <button 
        className="whitespace-nowrap flex items-center text-white px-4 bg-primary-a0 rounded-full hover:bg-primary-a20 cursor-pointer transition"
        onClick={() => openNewBoard()}
        >
            <i className="fa-solid fa-plus text-xs pr-2"></i>
            New Board 
        </button>
    </div>
    )
}

export default HomeNavbar
