import dayjs from "../utils/dayjs"
import Dropdown from "./Dropdown"
import BoardSettingsModal from "./BoardSettingsModal"
import BoardDeleteModal from "./BoardDeleteModal"
import { updateMyBoardMember } from "../api"


function BoardCard({ data, loadBoards }) {
    let openSettings, openDelete

    const handleFavorite = async () => {
        try {
            await updateMyBoardMember(data.board.id, {is_favorite: !data.is_favorite})
            await loadBoards()
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="bg-surface-a20 rounded-2xl ring ring-border-a0 hover:ring-primary-a40 hover:ring-2 cursor-pointer transition">
            <BoardSettingsModal onOpen={(fn) => (openSettings = fn)} loadBoards={loadBoards} data={data} />
            <BoardDeleteModal onOpen={(fn) => (openDelete = fn)} boardId={data.board.id} loadBoards={loadBoards} />

            <img src="https://i.sstatic.net/y9DpT.jpg" alt="board preview" className="rounded-t-2xl"/>
            <div className="px-4 py-4">
                <div className="flex justify-between items-center">
                    <p className="font-bold text-primary items-center">{data.board.title}</p> 
                    <div className="flex gap-4 text-secondary items-center">
                        <i 
                            className={`${data.is_favorite ? "fa-solid" : "fa-regular"} fa-star cursor-pointer hover:text-primary-a0 transition`}
                            onClick={() => handleFavorite()}
                        ></i>
                        <Dropdown
                            itemClass={"px-4 py-1"}
                            options={[
                                { text: "Settings", onClick: () => openSettings() },
                                { text: "Share", onClick: () => null },
                                { text: "Delete", onClick: () => openDelete(), color: "text-error bg-error/20"},
                            ]}
                        >  
                            {(open) => (
                                <div className="inline-flex p-2 -m-2 hover:text-primary-a0">
                                    <i className={`fa-solid fa-ellipsis-vertical transition ${open && "text-primary-a0"}`}></i>
                                </div>
                            )}
                        </Dropdown>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-4 text-sm text-secondary">
                    <div className="flex gap-4 items-center">
                        <p className="px-4 py-1 bg-primary-a50 rounded-full text-primary">{data.board.is_public ? "Public" : "Private"}</p>
                        <div className="flex items-center gap-1">
                            <i className="fa-regular fa-clock"></i>
                            <p>{dayjs(data.board.updated_at).fromNow()}</p>
                        </div>
                    </div>
                    <div className="flex gap-1 items-center">
                        <i className="fa-regular fa-user"></i>
                        <p>3</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BoardCard
