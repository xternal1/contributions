import React from "react";

interface PageHeaderProps {
    loading: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({ loading }) => {
    return (
        <>
            {loading ? (
                <div className="h-8 w-48 mb-4 rounded-lg bg-gray-200 dark:bg-[#0D0D1A] relative overflow-hidden">
                    <div className="absolute inset-0 bg-gray-200 dark:bg-[#0D0D1A]" />
                </div>
            ) : (
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                    Aktivitas Belajar
                </h2>
            )}
        </>
    );
};

export default PageHeader;