import { useState, useEffect, useRef } from "react"


function Dropdown({ options, children, menuClass, itemClass }) {
    const [open, setOpen] = useState(false)

    const dropdownRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false)
            }
        }

        if (open) {
            document.addEventListener("mousedown", handleClickOutside)
            return () => document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [open])

    const handleSelect = (item) => {
        item.onClick?.()
        setOpen(false)
    }


    return (
    <div className="relative">
        <div onClick={() => setOpen(p => !p)}>
            {children?.(open)}
        </div>
        <div ref={dropdownRef}
            className={`${menuClass} absolute z-20 right-0 grid gap-y-2 mt-2 p-2 rounded-xl bg-surface-a20 ring-1 ring-primary-a40 transition ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
            {options.map((item, index) => (
            <button 
                key={index} 
                className={`${itemClass} whitespace-nowrap w-full rounded-lg font-medium cursor-pointer bg-primary-a50/50 ring hover:ring-2 ${item.color ? item.color : "text-primary-a20 ring-primary-a40"} transition`}
                onClick={() => handleSelect(item)}
            >
                {item.text} 
            </button>
            ))}
        </div>
    </div>

    )
}

export default Dropdown
