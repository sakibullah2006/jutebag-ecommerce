"use client"

import type React from "react"

import { createProductReview } from "@/actions/products-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/hooks/use-auth"
import { ProductReview } from "@/types/woocommerce"
import { Star, User } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface AddReviewProps {
    productId: number
    onReviewSubmitted?: (review: ProductReview) => void
}

export function AddReview({ productId, onReviewSubmitted }: AddReviewProps) {
    const { isAuthenticated, user } = useAuth()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)
    const [reviewText, setReviewText] = useState("")
    const [reviewerName, setReviewerName] = useState(user?.user_display_name || "")
    const [reviewerEmail, setReviewerEmail] = useState(user?.user_email || "")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!isAuthenticated) return
        if (rating === 0 || !reviewText.trim()) return

        setIsSubmitting(true)

        // console log my review data
        console.log("Submitting review:", {
            productId,
            reviewer: reviewerName,
            reviewerEmail,
            review: reviewText,
            rating,
        })

        try {
            const result = await createProductReview({
                productId: Number(productId),
                reviewer: reviewerName as string,
                reviewerEmail: reviewerEmail as string,
                review: reviewText as string,
                rating: Number(rating),
            });

            if (result.success) {
                console.log("Review created:", result.review);
                onReviewSubmitted?.(result.review as ProductReview);
                toast.success("Review submitted successfully!");
                // Reset form
                setRating(0)
                setReviewText("")
            } else {
                console.error("Error:", result.message);
            }

        } catch (error) {
            console.error("Failed to create review:", error);
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!isAuthenticated) {
        return (
            <Card className="w-full">
                <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Sign in to write a review</h3>
                    <p className="text-gray-500 mb-4">Share your experience with other customers</p>
                    <Button variant="outline">Sign In</Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-xl">Write a Review</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Rating */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">Rating *</Label>
                        <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }, (_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className="p-1 hover:scale-110 transition-transform"
                                    onMouseEnter={() => setHoverRating(index + 1)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    onClick={() => setRating(index + 1)}
                                >
                                    <Star
                                        size={24}
                                        className={
                                            index < (hoverRating || rating) ? "fill-gray-900 text-gray-900" : "fill-gray-200 text-gray-200"
                                        }
                                    />
                                </button>
                            ))}
                            {rating > 0 && <span className="ml-2 text-sm text-gray-600">{rating}/5</span>}
                        </div>
                    </div>

                    {/* Review Text */}
                    <div className="space-y-2">
                        <Label htmlFor="review" className="text-sm font-medium">
                            Your Review *
                        </Label>
                        <Textarea
                            id="review"
                            placeholder="Share your experience with this product..."
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            className="min-h-[120px] resize-none"
                            required
                        />
                    </div>

                    {/* Reviewer Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium">
                                Name *
                            </Label>
                            <Input id="name" value={reviewerName} onChange={(e) => setReviewerName(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">
                                Email *
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={reviewerEmail}
                                onChange={(e) => setReviewerEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <Button
                            type="submit"
                            disabled={isSubmitting || rating === 0 || !reviewText.trim()}
                            className="w-full md:w-auto"
                        >
                            {isSubmitting ? "Submitting..." : "Submit Review"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
