import Modal from "./Modal"
import { deleteBoard } from "../api"
import { useState } from "react"


function BoardDeleteModal({ onOpen, boardId, loadBoards }) {
    const [loading, setLoading] = useState(false)

    const handleDelete = async (close) => {
        try {
            setLoading(true)
            await deleteBoard(boardId)
            await loadBoards()
            close()
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }
    return (
        <Modal
            trigger={({ setOpen }) => {
                onOpen(() => setOpen(true))
            }}
        >
            {({ close }) => (
                <div className="max-w-60">
                    <p className="text-lg text-center text-primary font-bold">Delete Board?</p>
                    <p className="text-sm text-secondary mt-2 mb-6 text-center">
                        This action cannot be undone. All data will be permanently removed.
                    </p>
                    <div className="flex gap-6 justify-center">
                        <button 
                            disabled={loading}
                            className={`px-3 py-1 rounded-lg font-medium cursor-pointer bg-error/20 ring hover:ring-2 text-error ring-error disabled:opacity-50 transition`}
                            onClick={() => handleDelete(close)}
                        >
                        {loading ? "Deleting…" : "Delete"}
                        </button>
                        <button 
                            disabled={loading}
                            className={`px-3 py-1 rounded-lg font-medium cursor-pointer bg-primary-a50/50 ring hover:ring-2 text-primary-a20 ring-primary-a20 transition`}
                            onClick={close}
                        >Close</button>
                    </div>
                </div>
            )}
        </Modal>
    )
}

export default BoardDeleteModal 
