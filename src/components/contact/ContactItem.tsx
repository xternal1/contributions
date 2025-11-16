// src/components/contact/ContactItem.tsx
import React from "react";

interface ContactItemProps {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
    isLink?: boolean;
}

const ContactItem: React.FC<ContactItemProps> = ({ icon, title, children, isLink = false }) => {
    return (
        <div className="flex items-start space-x-5 p-6 bg-gray-100 dark:bg-[#2C004F] border border-gray-200 dark:border-transparent shadow rounded-xl hover:shadow-md transition-colors duration-500">
            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-purple-600">
                {icon}
            </div>
            <div className="text-left">
                <h3 className="font-semibold text-gray-800 dark:text-white text-base sm:text-base">
                    {title}
                </h3>
                <div className={isLink ? "text-gray-600 dark:text-gray-200 text-xs space-y-1" : "text-gray-600 dark:text-gray-200 text-xs leading-relaxed"}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ContactItem;