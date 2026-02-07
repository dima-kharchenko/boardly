import dayjs from "../main"


function BoardCard({ data }) {
    return (
        <div className="bg-surface-a20 rounded-2xl border border-border-a0 overflow-hidden">
            <img src="https://i.sstatic.net/y9DpT.jpg" alt="board preview" />
            <div className="px-4 py-4">
                <div className="flex justify-between items-center">
                    <p className="font-bold text-primary items-center">{data.board.title}</p> 
                    <div className="flex gap-4 text-secondary">
                        <i className={`${data.is_favorite ? "fa-solid" : "fa-regular"} fa-star cursor-pointer hover:text-primary-a0 transition`}></i>
                        <i className="fa-solid fa-ellipsis-vertical cursor-pointer hover:text-primary-a0 transition"></i>
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
