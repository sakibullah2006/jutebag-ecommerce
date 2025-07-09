import React from 'react';

const VariationSkeleton: React.FC = () => {
    return (
        <div className="variation-skeleton animate-pulse">
            {/* Color Options Skeleton */}
            <div className="choose-color">
                <div className="h-5 bg-surface rounded w-24 mb-3"></div>
                <div className="list-color flex items-center gap-2 flex-wrap">
                    {[1, 2, 3].map((index) => (
                        <div
                            key={index}
                            className="px-3 py-2 bg-surface rounded-md border border-line"
                            style={{ width: '60px', height: '36px' }}
                        ></div>
                    ))}
                </div>
            </div>

            {/* Size Options Skeleton */}
            <div className="choose-size mt-5">
                <div className="h-5 bg-surface rounded w-16 mb-3"></div>
                <div className="list-size flex items-center gap-2 flex-wrap">
                    {[1, 2, 3, 4].map((index) => (
                        <div
                            key={index}
                            className="w-12 h-12 bg-surface rounded-full border border-line"
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VariationSkeleton;
