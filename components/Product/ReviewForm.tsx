"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Rating from 'react-rating-star-with-type';
import { useState } from "react";
import { createProductReview } from "@/actions/products-actions";
import { ProductReview } from "@/types/product-type";
import * as Icon from "@phosphor-icons/react/dist/ssr"


// Define the validation schema with Zod
const reviewSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
  rating: z.number().min(1, "Rating is required").max(5, "rating out of limit"),
  saveAccount: z.boolean().optional(),
});

// Infer the type from the schema
type ReviewFormInputs = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  productId: string;
  onReviewSubmitted?: (review: ProductReview) => void;
}

const ReviewForm = ({ productId, onReviewSubmitted }: ReviewFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ReviewFormInputs>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      saveAccount: false,
      rating: 0, // Set a default value for the rating
    },
  });

  const onSubmit = async (data: ReviewFormInputs) => {
    setFormError(null);


    if (data.message.trim().length === 0) return;
    setIsSubmitting(true)
    try {
      const result = await createProductReview({
        productId: Number(productId),
        reviewer: data.name as string,
        reviewerEmail: data.email as string,
        review: data.message as string,
        rating: Number(data.rating),
      });

      if (result.success) {
        // Handle successful review creation (e.g., show a success message)
        console.log("Review created successfully:", result.review);
        if (result.review && onReviewSubmitted) {
          onReviewSubmitted(result.review);
        }
        reset(); // Reset the form fields

      } else {
        console.error("Error:", result.message);
      }

    } catch (error) {
      console.error("Failed to create review:", error);
      setFormError("Failed to submit review. Please try again later.");
      reset(); // Reset the form on error
    } finally {
      setIsSubmitting(false);
    }
    console.log(data);
  };

  return (
    <div id="form-review" className="form-review pt-6">
      <h3 className="text-2xl font-bold mb-4">Leave a Comment</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid sm:grid-cols-2 gap-4 gap-y-5 md:mt-6 mt-3"
      >
        <div className="name">
          <input
            key="name"
            className={`border px-4 py-3 w-full rounded-lg ${errors.name ? "border-red" : "border-gray-300"
              }`}
            id="name"
            type="text"
            placeholder="Your Name *"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="mail">
          <input
            key="email"
            className={`border px-4 py-3 w-full rounded-lg ${errors.email ? "border-red" : "border-gray-300"
              }`}
            id="email"
            type="email"
            placeholder="Your Email *"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* 👇 Updated Rating Component Section */}
        <div className="col-span-full">
          <Controller
            key="rating"
            name="rating"
            control={control}
            render={({ field }) => (
              <Rating
                onChange={(newRating: number) => field.onChange(newRating)}
                value={field.value}
                size={30}
                activeColor="#ffd700"
                isEdit={true}
              />
            )}
          />
          {errors.rating && (
            <p className="text-red text-sm mt-1">{errors.rating.message}</p>
          )}
        </div>
        {/* End of Updated Section */}

        <div className="col-span-full message">
          <textarea
            key="message"
            className={`border px-4 py-3 w-full rounded-lg ${errors.message ? "border-red " : "border-gray-300"
              }`}
            id="message"
            placeholder="Your message *"
            {...register("message")}
          ></textarea>
          {errors.message && (
            <p className="text-red text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        <div className="col-span-full flex items-start -mt-2 gap-2">
          <input
            key="saveAccount"
            type="checkbox"
            id="saveAccount"
            {...register("saveAccount")}
            className="mt-1.5"
          />
          <label htmlFor="saveAccount">
            Save my name, email, and website in this browser for the next time I
            comment.
          </label>
        </div>

        <div className="col-span-full sm:pt-3">
          <div className="text-red text-sm mb-2">
            {formError && <p>{formError}</p>}
          </div>
          <button
            type="submit"
            className={`${isSubmitting ? "opacity-50 cursor-not-allowed disabled" : ""} bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors flex gap-2 items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed`}
            style={{}}
          >
            {isSubmitting ? <><span>Submitting</span> <Icon.DotsThreeIcon className="animate-pulse" size={25} />  </> : "Submit Review"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;