import Link from 'next/link';
import React from 'react';

interface BackLinkProps {
  href: string;
  text?: string;
}

const BackLink: React.FC<BackLinkProps> = ({ href, text = '<< назад' }) => {
  return (
    <Link href={href} className="back-link">
      {text}
    </Link>
  );
};

export default BackLink;