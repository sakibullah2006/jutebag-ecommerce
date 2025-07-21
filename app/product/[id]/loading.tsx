export default function LoadingProductPage() {
    return (
        <div className="animate-pulse">
            {/* Navbar Placeholder */}
            <div className="w-full h-20 bg-gray-200"></div>

            <div className="container mx-auto">
                {/* Breadcrumb Placeholder */}
                <div className="py-4">
                    <div className="w-1/3 h-6 bg-gray-200 rounded"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-8">
                    {/* Left Column: Image Gallery */}
                    <div className="flex flex-col gap-4">
                        <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg"></div>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="w-full aspect-square bg-gray-200 rounded-md"></div>
                            <div className="w-full aspect-square bg-gray-200 rounded-md"></div>
                            <div className="w-full aspect-square bg-gray-200 rounded-md"></div>
                            <div className="w-full aspect-square bg-gray-200 rounded-md"></div>
                        </div>
                    </div>

                    {/* Right Column: Product Details */}
                    <div className="flex flex-col gap-5">
                        <div className="w-3/4 h-8 bg-gray-200 rounded"></div> {/* Title */}
                        <div className="w-1/4 h-6 bg-gray-200 rounded"></div> {/* Rating */}
                        <div className="w-1/3 h-8 bg-gray-200 rounded"></div> {/* Price */}
                        <div className="space-y-2"> {/* Short description */}
                            <div className="w-full h-4 bg-gray-100 rounded"></div>
                            <div className="w-full h-4 bg-gray-100 rounded"></div>
                            <div className="w-5/6 h-4 bg-gray-100 rounded"></div>
                        </div>

                        {/* Color options */}
                        <div className="flex gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                        </div>

                        {/* Size options */}
                        <div className="flex gap-3">
                            <div className="w-16 h-10 rounded-md bg-gray-200"></div>
                            <div className="w-16 h-10 rounded-md bg-gray-200"></div>
                            <div className="w-16 h-10 rounded-md bg-gray-200"></div>
                        </div>

                        {/* Quantity and Add to Cart */}
                        <div className="flex gap-4">
                            <div className="w-32 h-12 bg-gray-200 rounded-lg"></div>
                            <div className="flex-1 h-12 bg-gray-300 rounded-lg"></div>
                        </div>
                        <div className="w-full h-12 bg-gray-300 rounded-lg"></div> {/* Buy now button */}

                        {/* Meta Info */}
                        <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                            <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                            <div className="w-1/3 h-4 bg-gray-200 rounded"></div>
                            <div className="w-1/4 h-4 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>

                {/* Tabs Placeholder */}
                <div className="mt-16 border-t border-gray-200 pt-8">
                    <div className="flex justify-center gap-8">
                        <div className="w-32 h-8 bg-gray-200 rounded-md"></div>
                        <div className="w-32 h-8 bg-gray-200 rounded-md"></div>
                        <div className="w-32 h-8 bg-gray-200 rounded-md"></div>
                    </div>
                </div>

                {/* Related products skeleton */}
                <div className="mt-16 py-10">
                    <div className="w-1/4 h-8 bg-gray-200 rounded mx-auto mb-8"></div> {/* "Related Products" heading */}
                    <div className="grid lg:grid-cols-4 grid-cols-2 gap-8">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="flex flex-col gap-4">
                                <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg" />
                                <div className="w-5/6 h-5 bg-gray-200 rounded" />
                                <div className="w-1/3 h-5 bg-gray-200 rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
