import { useState, useEffect, useRef } from "react"


function Modal({ children, trigger }) {
    const [open, setOpen] = useState(false)

    const modalRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setOpen(false)
            }
        }

        if (open) {
            document.addEventListener("mousedown", handleClickOutside)
            return () => document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [open])


    return (
    <div className="relative">
        <div onClick={() => setOpen(p => !p)}>
            {trigger?.(open)}
        </div>
        <div
            className={`fixed inset-0 z-60 flex items-center justify-center bg-black/50 transition ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        >
            <div
                ref={modalRef}
                className={`bg-surface-a20 rounded-xl p-4 ring-1 ring-primary-a40 transition ${open ? "scale-100" : "scale-95"}`}
            >
            {children}
            </div>
        </div>
    </div>

    )
}

export default Modal
