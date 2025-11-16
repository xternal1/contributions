// src/components/contact/ContactAddressItem.tsx
import React from "react";
import MapIcon from "../../assets/img/icons/map.svg";
import ContactItem from "./ContactItem";

const ContactAddressItem: React.FC = () => {
    return (
        <ContactItem
            icon={<img src={MapIcon} alt="Alamat" className="w-6 h-6 sm:w-7 sm:h-7 object-contain filter invert-0" />}
            title="Address"
        >
            Perum Permata Regency 1 Blok 10/28, Perun Gpa, Ngijo,
            Kec. Karang Ploso, Kabupaten Malang, Jawa Timur 65152.
        </ContactItem>
    );
};

export default ContactAddressItem;