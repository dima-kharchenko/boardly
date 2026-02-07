import Modal from "./Modal"

function BoardSettingsModal({ onOpen }) {
    return (
        <Modal
            trigger={({ setOpen }) => {
                onOpen(() => setOpen(true))
            }}
        >
            {({ close }) => (
                <div className="w-80">
                    <p className="text-lg mb-4">Board settings</p>
                    <button onClick={close}>Close</button>
                </div>
            )}
        </Modal>
    )
}

export default BoardSettingsModal
