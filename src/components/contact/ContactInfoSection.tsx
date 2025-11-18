// src/components/contact/ContactInfoSection.tsx
import React from "react";
import type { ContactData } from "../../features/contact/_contact";
import ContactAddressItem from "./ContactAddressItem";
import ContactPhoneItem from "./ContactPhoneItem";
import ContactEmailItem from "./ContactEmailItem";

interface ContactInfoSectionProps {
    contact: ContactData | null;
}

const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({ contact }) => {
    const phoneNumbers = contact?.phone_number || [];
    const emails = contact?.email || [];

    return (
        <div className="space-y-6">
            <ContactAddressItem />
            <ContactPhoneItem phoneNumbers={phoneNumbers} />
            <ContactEmailItem emails={emails} />
        </div>
    );
};

export default ContactInfoSection;


