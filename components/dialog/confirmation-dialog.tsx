"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"

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

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] p-2
            ">
                {children}
            </DialogContent>
        </Dialog>
    )
}


{/* <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={handleCancel}>
                        {cancelText}
                    </Button>
                    <Button variant={variant === "destructive" ? "destructive" : "default"} onClick={handleConfirm}>
                        {confirmText}
                    </Button>
                </DialogFooter> */}