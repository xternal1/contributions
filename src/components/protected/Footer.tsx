import React from 'react';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const year = new Date().getFullYear();

  return (
    <footer className={`bg-white text-center text-xs sm:text-sm text-gray-500 py-3 sm:py-4 shadow-sm ${className ?? ''}`}>
      <p>&copy; {year} GetSkill. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
