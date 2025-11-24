import React from 'react';

interface PersonCardProps {
    name: string;
    role: string;
    avatar: string;
    gradientFrom: string;
    gradientTo: string;
}

export const PersonCard: React.FC<PersonCardProps> = ({
    name,
    role,
    avatar,
    gradientFrom,
    gradientTo
}) => {
    return (
        <div className="bg-white dark:bg-[#0B0B15] rounded-2xl p-6 border border-gray-100 dark:border-[#171725] relative overflow-hidden">
            {/* Decorative circles - Right side */}
            <div className="absolute right-8 -bottom-12 w-24 h-24 rounded-full bg-purple-200 dark:bg-purple-500/20 opacity-40"></div>
            <div className="absolute -right-9 top-10 w-24 h-24 rounded-full bg-purple-300 dark:bg-purple-400/20 opacity-30"></div>
            {/* Decorative circles - Left side */}
            <div className="absolute left-1 -bottom-15 w-24 h-24 rounded-full bg-purple-200 dark:bg-purple-500/20 opacity-40"></div>
            <div className="absolute -left-12 top-8 w-24 h-24 rounded-full bg-purple-300 dark:bg-purple-400/20 opacity-30"></div>

            <div className="flex items-center gap-4 relative z-10">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center overflow-hidden`}>
                    <img
                        src={avatar}
                        alt={name}
                        className="w-full h-full"
                    />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                        {name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {role}
                    </p>
                </div>
            </div>
        </div>
    );
};
export default PersonCard;