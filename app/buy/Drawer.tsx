import { useEffect, useRef } from "react"

const Drawer = ({
    isOpen,
    onClose,
    title,
    children
}: {
    isOpen: boolean
    onClose: () => void
    title: string
    children: React.ReactNode
}) => {

    const contentRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }

        return () => {
            document.body.style.overflow = "auto"
        }
    }, [isOpen])
    useEffect(() => {
        if (isOpen && contentRef.current) {
            contentRef.current.scrollTop = 0
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex">

            {/* overlay */}
            <div
                className="absolute inset-0 bg-black/30 z-40"
                onClick={onClose}
            />

            {/* panel */}
            <div className="
        relative
        ml-auto
        w-[420px]
        h-full
        bg-white
        shadow-2xl
        flex flex-col
        z-50
        animate-slideIn
      ">

                {/* header */}
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <h2 className="text-lg font-semibold">{title}</h2>

                    <button
                        onClick={onClose}
                        className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center"
                    >
                        ✕
                    </button>
                </div>

                {/* content */}
                <div
                    ref={contentRef}
                    className="p-6 overflow-y-auto flex-1"
                >
                    {children}
                </div>

            </div>
        </div>
    )
}

export default Drawer