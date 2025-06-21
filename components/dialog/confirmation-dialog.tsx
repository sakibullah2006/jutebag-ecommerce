// "use client"
// import { Button } from "@/components/ui/button"
// import {
//     Dialog,
//     DialogContent,
// } from "@/components/ui/dialog"
// import { DialogOverlay, DialogPortal } from "@radix-ui/react-dialog"

// interface ConfirmationDialogProps {
//     open: boolean
//     onOpenChange: (open: boolean) => void
//     children?: React.ReactNode
// }

// export function ConfirmationDialog({
//     open,
//     onOpenChange,
//     children
// }: ConfirmationDialogProps) {

//     return (
//         <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
//             <DialogPortal>
//                 <DialogOverlay>

//                     <DialogContent className="sm:max-w-[425px] p-2">
//                         {children}
//                     </DialogContent>
//                 </DialogOverlay>
//             </DialogPortal>
//         </Dialog >
//     )
// }

"use client"
import { useEffect, useRef } from "react"

interface ConfirmationDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    children?: React.ReactNode
}

export function ConfirmationDialog({
    open,
    onOpenChange,
    children
}: ConfirmationDialogProps) {
    const dialogRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return

        if (open) {
            dialog.showModal()
        } else {
            dialog.close()
        }

        // Handle ESC key
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onOpenChange(false)
            }
        }

        dialog.addEventListener('keydown', handleKeyDown)
        return () => dialog.removeEventListener('keydown', handleKeyDown)
    }, [open, onOpenChange])

    return (
        <dialog
            ref={dialogRef}
            className="modal px-8 py-5 w-[500px] max-sm:w-3xl z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-base-100 rounded-lg shadow-lg"
        // onClick={() => onOpenChange(false)}
        >
            <div className="modal-box" onClick={e => e.stopPropagation()}>
                <form method="dialog">
                    {/* Close button that works with Daisy UI's form method */}
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={() => onOpenChange(false)}
                    >
                        ✕
                    </button>
                </form>
                {children}
            </div>
        </dialog>
    )
}