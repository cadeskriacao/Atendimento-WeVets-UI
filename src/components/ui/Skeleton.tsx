import React from 'react';

interface SkeletonProps {
    className?: string;
    count?: number;
    width?: string | number;
    height?: string | number;
    variant?: 'text' | 'circular' | 'rectangular';
}

export const Skeleton: React.FC<SkeletonProps> = ({
    className = "",
    count = 1,
    width,
    height,
    variant = 'rectangular'
}) => {
    const baseClasses = "animate-pulse bg-gray-200 rounded";
    const variantClasses = {
        text: "rounded-md",
        circular: "rounded-full",
        rectangular: "rounded-md",
    };

    const style = {
        width: width,
        height: height,
    };

    const skeletons = Array(count).fill(0).map((_, i) => (
        <div
            key={i}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            style={style}
            role="status"
            aria-label="Loading..."
        >
            <span className="sr-only">Loading...</span>
        </div>
    ));

    return count === 1 ? skeletons[0] : <div className="space-y-2">{skeletons}</div>;
};
