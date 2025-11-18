import React from "react";

const ProfileSkeleton: React.FC = () => (
    <div className="animate-pulse">
        {/* Banner Skeleton */}
        <div className="relative bg-gray-200 dark:bg-[#141427] rounded-lg mb-10 overflow-hidden">
            {/* Banner */}
            <div className="h-40 bg-gray-200 dark:bg-[#141427]" />

            {/* Foto profil + nama */}
            <div className="absolute bottom-5 left-8 flex items-center space-x-4">
                <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-[#141427] border-8 border-white shadow-md dark:border-[#0D0D1A]" />
                <div className="flex flex-col space-y-2">
                    <div className="h-4 w-24 bg-gray-200 dark:bg-[#141427] rounded" />
                </div>
            </div>

            {/* Tombol edit cover */}
            <div className="absolute bottom-5 right-7 h-10 w-40 bg-gray-300 dark:bg-[#141427] rounded-full"></div>
        </div>

        {/* Form Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-start text-xs">
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i}>
                    <div className="h-4 w-24 bg-gray-200 dark:bg-[#141427] rounded mb-2"></div>
                    <div className="h-10 w-full bg-gray-200 dark:bg-[#141427] rounded"></div>
                </div>
            ))}
        </div>

        {/* Button Skeleton */}
        <div className="flex justify-start mt-8">
            <div className="h-10 w-36 bg-gray-200 dark:bg-[#141427] rounded-full"></div>
        </div>
    </div>
);

export default ProfileSkeleton;