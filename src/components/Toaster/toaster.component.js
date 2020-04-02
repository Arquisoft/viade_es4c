import React from 'react';

type Props = {
  title: String,
  content: String,
  link: { href: string, label: string }
};


const Toaster = (props: Props) => {
  const { title, content, link } = props;
  console.log("FUNCIONAA");
  return (
    <div className="toaster">
      <span>{title}</span>
      <p>{content}</p>
      {link && (
        <a href={link.href} target="_blank" rel="noopener noreferrer">
          {link.label}
        </a>
      )}
    </div>
  );
};

export default Toaster;
