import { Avatar, AvatarFallback, } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { getRelativeTime } from "@/lib/utils"
import { ProductReview, ProductReviewsProps } from "@/types/woocommerce"
import { ReviewStars } from "./product-review-start"
import { Star } from "lucide-react"

function getInitials(name: string): string {
    return name
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2)
}

function ReviewItem({ review }: { review: ProductReview }) {
    return (
        <div className="space-y-4 p-6">
            <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gray-100 text-gray-600">{getInitials(review.reviewer)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <h4 className="font-medium">{review.reviewer}</h4>
                                {review.verified && (
                                    <Badge variant="secondary" className="text-xs">
                                        Verified
                                    </Badge>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <ReviewStars rating={review.rating} />
                                <span className="text-sm text-gray-500">{review.rating}/5</span>
                            </div>
                        </div>
                        <span className="text-sm text-gray-500">{getRelativeTime(review.date_created)}</span>
                    </div>

                    <p className="text-gray-700 leading-relaxed">{review.review}</p>

                    {review.status !== "approved" && (
                        <Badge variant="outline" className="text-xs">
                            {review.status}
                        </Badge>
                    )}
                </div>
            </div>
        </div>
    )
}

export default function ProductReviews({ reviews, showProductId = false }: ProductReviewsProps) {
    if (!reviews || reviews.length === 0) {
        return (
            <div className="w-full max-w-4xl mx-auto">
                <div className="text-center py-16">
                    <div className="mb-6">
                        <div className="w-24 h-24 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                />
                            </svg>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-semibold text-gray-900">No reviews yet</h3>
                            <p className="text-gray-500 max-w-sm mx-auto">
                                Be the first to share your thoughts and help others discover this product.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-1 text-gray-300">
                        {Array.from({ length: 5 }, (_, i) => (
                            <Star key={i} size={20} className="fill-current" />
                        ))}
                    </div>
                    <p className="text-sm text-gray-400 mt-2">Waiting for the first review...</p>
                </div>
            </div>
        )
    }

    // Calculate average rating
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    const approvedReviews = reviews.filter((review) => review.status === "approved")

    return (
        <div className="max-w-screen mx-auto space-y-6">
            {/* Reviews Summary */}
            <div className="border-b w-full pb-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold">Reviews</h2>
                        <div className="flex items-center gap-3">
                            <ReviewStars rating={Math.round(averageRating)} />
                            <span className="font-medium">{averageRating.toFixed(1)}</span>
                            <span className="text-gray-500">
                                ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
                            </span>
                        </div>
                    </div>
                    {showProductId && reviews[0] && <Badge variant="outline">Product #{reviews[0].product_id}</Badge>}
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-0 divide-y">
                {approvedReviews.map((review) => (
                    <ReviewItem key={review.id} review={review} />
                ))}
            </div>
        </div>
    )
}
