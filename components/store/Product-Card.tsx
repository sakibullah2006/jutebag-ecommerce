import { useCart } from "@/hooks/use-cart"
import { cn } from "@/lib/utils"
import { Product } from "@/types/woocommerce"
import { Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "../ui/button"

const ProductCard = ({ product }: { product: Product }) => {
    const { id, name, price, images, attributes, default_attributes } = product
    const [isHovered, setIsHovered] = useState(false)
    const { addItem } = useCart()

    // const hasAttributes = () => {
    //     return (attributes && attributes?.length > 0) || false;
    // }

    // useEffect(() => {
    //     // setIsHovered(false)
    //     console.log(hasAttributes(), "hasAttributes")
    // }, [id])

    const handleAddToCart = (e: React.MouseEvent) => {
        if (!addItem) return
        e.preventDefault()
        e.stopPropagation()

        addItem(product)
        toast.success(`${product.name} added to cart`, {
            description: "You can view your cart in the top right corner.",
            position: "bottom-left",
            // action: {
            //     label: "View Cart",
            //     onClick: () => isOpen ? console.log("cart sheet already opened") : setIsOpen(true),
            // },
        })
    }

    return (
        <Link
            href={`/products/${id}`}
            className="group block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative overflow-hidden mb-4">
                <div className="aspect-square bg-gray-50">
                    <Image
                        src={images[0].src || "/placeholder.svg"}
                        alt={images[0].alt}
                        width={400}
                        height={400}
                        className={cn(
                            "object-cover w-full h-full transition-transform duration-700",
                            isHovered ? "scale-105" : "scale-100",
                        )}
                    />
                </div>
                <Button
                    onClick={handleAddToCart}
                    className={cn(
                        "absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 opacity-100 translate-y-0",
                        'md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0',
                    )}
                    aria-label={`Add ${name} to cart`}
                >
                    <Plus className="h-5 w-5 text-gray-800" />
                </Button>
            </div>
            <div className="flex items-center justify-between">
                <h3 className="font-mono text-lg">{name}</h3>
                <p className="text-md font-mono">${Number(price).toFixed(2)}</p>
            </div>
        </Link>
    )
}

export default ProductCard