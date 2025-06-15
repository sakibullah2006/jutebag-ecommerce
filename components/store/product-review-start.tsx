import { Star } from "lucide-react"

interface ReviewStarsProps {
    rating: number
    maxRating?: number
    size?: number
}

export function ReviewStars({ rating, maxRating = 5, size = 16 }: ReviewStarsProps) {
    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: maxRating }, (_, index) => (
                <Star
                    key={index}
                    size={size}
                    className={index < rating ? "fill-gray-900 text-gray-900" : "fill-gray-200 text-gray-200"}
                />
            ))}
        </div>
    )
}
