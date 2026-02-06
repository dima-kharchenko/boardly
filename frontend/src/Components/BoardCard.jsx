function BoardCard() {
    return (
        <div className="bg-surface-a20 rounded-2xl border border-border-a0 overflow-hidden">
            <img src="https://i.sstatic.net/y9DpT.jpg" alt="board preview" />
            <div className="px-4 py-4">
                <div className="flex justify-between items-center">
                    <p className="font-bold text-primary items-center">Project board 1</p> 
                    <div className="flex gap-4 text-secondary">
                        <div className="relative w-4 h-4 group cursor-pointer">
                          <i className="fa-regular fa-star absolute opacity-100 group-hover:opacity-0 transition"></i>
                          <i className="fa-solid fa-star absolute opacity-0 group-hover:opacity-100 transition"></i>
                        </div>                        
                        <i className="fa-solid fa-ellipsis-vertical cursor-pointer"></i>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-4 text-sm text-secondary">
                    <div className="flex gap-4 items-center">
                        <p className="px-4 py-1 bg-primary-a50 rounded-full text-primary">Public</p>
                        <div className="flex items-center gap-1">
                            <i className="fa-regular fa-clock"></i>
                            <p>7h ago</p>
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
