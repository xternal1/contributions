// src/components/contact/ContactEmailItem.tsx
import React from "react";
import EmailIcon from "../../assets/img/icons/emial.svg";
import ContactItem from "./ContactItem";

interface ContactEmailItemProps {
    emails: string[];
}

const ContactEmailItem: React.FC<ContactEmailItemProps> = ({ emails }) => {
    return (
        <ContactItem
            icon={<img src={EmailIcon} alt="Email" className="w-6 h-6 object-contain filter invert-0" />}
            title="E-mail Address"
            isLink={true}
        >
            {emails.length > 0 ? (
                <ul className="space-y-1">
                    {emails.map((email, idx) => (
                        <li key={idx}>
                            <a
                                href={`mailto:${email}`}
                                className="relative inline-block text-gray-600 dark:text-gray-200 text-xs transition-colors duration-500
                  hover:text-purple-400 dark:hover:text-purple-400
                  after:content-[''] after:absolute after:left-0 after:bottom-0
                  after:w-0 after:h-[1px] after:bg-purple-400
                  after:transition-all after:duration-500
                  hover:after:w-full dark:hover:after:bg-purple-400"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {email}
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

export default ContactEmailItem;