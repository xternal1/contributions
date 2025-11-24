import React from 'react';

interface ClassHeaderProps {
    title?: string;
    subtitle?: string;
    illustration?: string;
}

const ClassHeader: React.FC<ClassHeaderProps> = ({
    title = "Daftar Kelas",
    subtitle = "Daftar Kelas Anda pada kelas industri",
    illustration = "/src/assets/img/track-bg1.png"
}) => {
    return (
        <div className="mt-6 bg-[#7209DB1A] dark:bg-[#1B1B33] rounded-2xl p-8 mb-6 relative overflow-hidden h-[160px]">
            <div className="flex items-center justify-between">
                <div className="flex-1 mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 text-left">
                        {title}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-left">
                        {subtitle}
                    </p>
                </div>
                <div className="hidden md:block">
                    <img
                        src={illustration}
                        alt="track-bg 1"
                        className="w-32 h-32 object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

export default ClassHeader;