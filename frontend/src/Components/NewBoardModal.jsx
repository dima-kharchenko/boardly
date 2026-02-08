import { useState } from "react"
import Modal from "./Modal"
import { createBoard } from "../api"

function NewBoardModal({ onOpen, loadBoards }) {
    const [title, setTitle] = useState('')
    const [isPublic, setIsPublic] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e, close) => {
        e.preventDefault()
        if (!title) return  

        try {
            await createBoard({ title: title, is_public: isPublic, is_favorite: isFavorite })
            await loadBoards()
            close()
        } catch (e) {
            console.error(e)
            setError("Failed to create board")
        }
    }

    return (
        <Modal
            trigger={({ setOpen }) => {
                onOpen(() => setOpen(true))
            }}
        >
            {({ close }) => (
                <div className="text-secondary p-2">
                    <p className="text-lg text-center text-primary font-bold">New Board</p>
                    <p className="text-sm mb-6 text-center">
                        Create a new whiteboard
                    </p>
                    <form className="space-y-4" onSubmit={(e) => handleSubmit(e, close)}>
                        <p className="ml-1 my-1 text-tertiary">Title</p>
                        <input
                          type="text"
                          id="title"
                          className={`w-full px-4 py-2 rounded-lg bg-primary-a50/50 placeholder:text-primary-a30 text-primary-a0 focus:outline-none ring focus:ring-2 ring-primary-a40 transition`}
                          placeholder="Board Title"
                          name="username"
                          value={title}
                          onChange={(e) => {
                            setTitle(e.target.value)
                            setError('')
                          }}
                        />
                        <p className="ml-1 my-1 text-tertiary">Visibility</p>
                        <div className="flex gap-2 justify-center w-full">
                            <button
                                className={`w-full py-1 rounded-lg font-medium cursor-pointer ring hover:ring-2 ${!isPublic ? "bg-primary-a50/50 text-primary-a20 ring-primary-a20" : "ring-tertiary text-tertiary"} transition`}
                                onClick={(e) => {
                                    e.preventDefault()
                                    setIsPublic(false)
                                    setError('')
                                }}
                            >Private</button>
                            <button
                                className={`w-full py-1 rounded-lg font-medium cursor-pointer ring hover:ring-2 ${isPublic ? "bg-primary-a50/50 text-primary-a20 ring-primary-a20" : "ring-tertiary text-tertiary"} transition`}
                                onClick={(e) => {
                                    e.preventDefault()
                                    setIsPublic(true)
                                    setError('')
                                }}
                            >Public</button>
                        </div>
                        <div className="flex mx-1 mt-5 justify-between">
                            <div>
                                <p>Favorite</p>
                                <p className="text-sm text-tertiary">Add board to favorites</p>
                            </div>
                            <i 
                                className={`${isFavorite ? "fa-solid" : "fa-regular"} fa-star cursor-pointer hover:text-primary-a0 my-auto text-lg text-tertiary transition`}
                                onClick={() => setIsFavorite(p => !p)}
                            ></i>
                        </div>
                        <div className="flex justify-end gap-4 mt-8">
                            <button
                                onClick={(e) => {
                                    e.preventDefault()
                                    close()
                                    setError('')
                                }}
                                className={`px-3 py-1 rounded-lg font-medium cursor-pointer ring hover:ring-2 text-tertiary ring-tertiary disabled:opacity-50 transition`}
                            >
                                Close 
                            </button>
                            <button
                                type="submit"
                                className={`px-3 py-1 rounded-lg font-medium cursor-pointer bg-primary-a50/50 ring hover:ring-2 text-primary-a20 ring-primary-a20 disabled:opacity-50 transition`}
                            >
                                Create 
                            </button>
                        </div>
                    </form>
                    {error && (
                        <p className="mt-6 text-center text-sm text-error">
                            {error}
                        </p>
                    )} 
                </div>
            )}
        </Modal>
    )
}

export default NewBoardModal
