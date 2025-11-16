// src/components/contact/ContactFormItem.tsx
import React, { type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";

interface ContactFormItemProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    isTextarea?: boolean;
    textareaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
}

const ContactFormItem: React.FC<ContactFormItemProps> = ({
    label,
    isTextarea = false,
    textareaProps,
    ...props
}) => {
    const commonClasses = `
    border border-gray-300 dark:border-[#2C2C44] rounded-lg px-4 py-3 w-full text-xs
    bg-white dark:bg-[#141429] text-gray-800 dark:text-gray-200
    hover:text-[#9425FE] hover:border-[#9425FE]
    dark:hover:text-[#9425FE] dark:hover:border-[#9425FE]
    focus:outline-none focus:ring-1 focus:ring-[#9425FE]
    transition-colors duration-500
  `;

    return (
        <div className="space-y-1">
            {label && (
                <label htmlFor={props.id} className="text-gray-700 dark:text-gray-300 text-xs font-medium">
                    {label}
                </label>
            )}
            {isTextarea ? (
                <textarea
                    {...textareaProps}
                    className={`${commonClasses} ${textareaProps?.className || ''}`}
                ></textarea>
            ) : (
                <input {...props} className={`${commonClasses} ${props.className || ''}`} />
            )}
        </div>
    );
};

export default ContactFormItem;


