import { useState, useEffect, useRef } from "react"


function Dropdown({ options, onChange, children }) {
    const [menuToggle, setMenuToggle] = useState(false)

    const dropdownRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                !event.target.closest(".dropdown") &&
                !event.target.closest(".dropdown-button")
            ) {
                setMenuToggle(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])


    return (
    <div className="relative">
    <div onClick={() => setMenuToggle(p => !p)}>
        {children?.(menuToggle)}
    </div>
    <div ref={dropdownRef}
        className={`dropdown absolute z-20 right-0 grid gap-y-2 mt-2 p-2 rounded-xl bg-surface-a20 ring-1 ring-primary-a40 transition ${menuToggle ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
        {options.map((item, index) => (
        <button 
            key={index} 
            className={`whitespace-nowrap w-full px-3 py-2 rounded-lg text-primary-a20 font-medium cursor-pointer text-surface-a50 bg-primary-a50/50 ring ring-primary-a40 hover:ring-2 transition `}
            onClick={() => {
              item.onClick?.()
              onChange?.(item)
              setMenuToggle(false)
            }}
        >
            {item.text} 
        </button>
        ))}
    </div>
    </div>

    )
}

export default Dropdown
