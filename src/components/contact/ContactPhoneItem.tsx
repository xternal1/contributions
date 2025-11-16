// src/components/contact/ContactPhoneItem.tsx
import React from "react";
import PhoneIcon from "../../assets/img/icons/contact_phone.svg";
import ContactItem from "./ContactItem";

interface ContactPhoneItemProps {
    phoneNumbers: string[];
}

const ContactPhoneItem: React.FC<ContactPhoneItemProps> = ({ phoneNumbers }) => {
    return (
        <ContactItem
            icon={<img src={PhoneIcon} alt="Phone" className="w-6 h-6 object-contain filter invert-0" />}
            title="Phone"
            isLink={true}
        >
            {phoneNumbers.length > 0 ? (
                <ul className="space-y-1">
                    {phoneNumbers.map((num, idx) => (
                        <li key={idx}>
                            <a
                                href={`tel:${num.replace(/\s+/g, "")}`}
                                className="relative inline-block text-gray-600 dark:text-gray-200 text-xs transition-colors duration-500
                  hover:text-purple-400 dark:hover:text-purple-400
                  after:content-[''] after:absolute after:left-0 after:bottom-0
                  after:w-0 after:h-[1px] after:bg-purple-400
                  after:transition-all after:duration-500
                  hover:after:w-full dark:hover:after:bg-purple-400"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {num}
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600 dark:text-gray-200 text-xs">-</p>
            )}
        </ContactItem>
    );
};

export default ContactPhoneItem;


